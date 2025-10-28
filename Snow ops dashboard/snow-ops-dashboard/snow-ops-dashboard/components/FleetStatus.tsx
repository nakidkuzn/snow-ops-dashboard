'use client';

import React, { useMemo, useState } from 'react';
import { Truck } from 'lucide-react';
import { Vehicle } from '../lib/types';
import { getStatusColor, safeStr } from '../lib/ui';

type Props = { vehicles: Vehicle[] };
type SortKey = 'vehicle' | 'type' | 'status' | 'fuel' | 'location';

export default function FleetStatus({ vehicles }: Props) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | string>('All');
  const [sortKey, setSortKey] = useState<SortKey>('fuel');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const statuses = useMemo(() => ['All', ...Array.from(new Set(vehicles.map((v) => v.status)))], [vehicles]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = vehicles.filter((v) => {
      const matchesQ =
        v.vehicle.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q) ||
        v.operator.toLowerCase().includes(q);
      const matchesS = status === 'All' || v.status === status;
      return matchesQ && matchesS;
    });

    list.sort((a, b) => {
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      const as = safeStr(av).toLowerCase();
      const bs = safeStr(bv).toLowerCase();
      if (as < bs) return sortDir === 'asc' ? -1 : 1;
      if (as > bs) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [vehicles, query, status, sortKey, sortDir]);

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
          <Truck className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold">Fleet Status</h3>
        </div>
        <span className="text-sm text-gray-500">{vehicles.length} vehicles</span>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicle, location, operator..."
            className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded px-3 py-2 text-sm">
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort:</label>
          <button onClick={() => toggleSort('fuel')} className="px-3 py-1 border rounded text-sm">
            Fuel {sortKey === 'fuel' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('status')} className="px-3 py-1 border rounded text-sm">
            Status {sortKey === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('vehicle')} className="px-3 py-1 border rounded text-sm">
            Name {sortKey === 'vehicle' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button onClick={() => toggleSort('location')} className="px-3 py-1 border rounded text-sm">
            Location {sortKey === 'location' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map((vehicle) => (
          <div key={vehicle.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-gray-800">{vehicle.vehicle}</div>
                <p className="text-xs text-gray-500">{vehicle.type} • {vehicle.location}</p>
                <p className="text-xs text-gray-600">Operator: {vehicle.operator}</p>
              </div>
              <div className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(vehicle.status)}`}>{vehicle.status}</div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Fuel</span>
                  <span>{vehicle.fuel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${vehicle.fuel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {!filtered.length && <div className="text-sm text-gray-500 py-6 text-center">No vehicles match your filters.</div>}
      </div>
    </div>
  );
}
EOF
