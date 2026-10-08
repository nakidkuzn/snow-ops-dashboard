'use client';

import React, { useMemo, useState } from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import { Site } from '../lib/types';
import { getPriorityColor, getStatusColor, getStatusIcon, safeStr } from '../lib/ui';

type Props = { sites: Site[]; onSync?: () => void };
type SortKey = 'name' | 'district' | 'status' | 'priority' | 'crew';

export default function SiteStatus({ sites, onSync }: Props) {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('priority');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const districts = useMemo(() => ['All', ...Array.from(new Set(sites.map((s) => s.district)))], [sites]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = sites.filter((s) => {
      const matchesQ =
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.crew.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q);
      const matchesD = district === 'All' || s.district === district;
      return matchesQ && matchesD;
    });

    const cmp = (a: Site, b: Site) => {
      const av = safeStr((a as any)[sortKey]).toLowerCase();
      const bv = safeStr((b as any)[sortKey]).toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    };

    return list.sort(cmp);
  }, [sites, query, district, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold">Site Status</h3>
        </div>
        <span className="text-sm text-gray-500">{sites.length} total sites</span>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sites, address, crew..."
            className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
          />
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm">
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort:</label>
          <button onClick={() => toggleSort('priority')} className="px-3 py-1 border rounded text-sm">
            Priority {sortKey === 'priority' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('status')} className="px-3 py-1 border rounded text-sm">
            Status {sortKey === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('district')} className="px-3 py-1 border rounded text-sm">
            District {sortKey === 'district' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('name')} className="px-3 py-1 border rounded text-sm">
            Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          {onSync && (
            <button onClick={onSync} className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
              Sync Airtable
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map((site) => (
          <div key={site.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{site.name}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(site.priority)}`}>{site.priority}</span>
                </div>
                <p className="text-xs text-gray-500">{site.address}</p>
                <p className="text-xs text-gray-500">District: {site.district}</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-white text-xs ${getStatusColor(site.status)}`}>
                {getStatusIcon(site.status)}
                <span>{site.status}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {site.crew}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {site.lastService}
              </span>
            </div>
          </div>
        ))}

        {!filtered.length && <div className="text-sm text-gray-500 py-6 text-center">No sites match your filters.</div>}
      </div>
    </div>
  );
}

