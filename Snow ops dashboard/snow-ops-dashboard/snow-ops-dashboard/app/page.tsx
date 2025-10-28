'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CloudSnow } from 'lucide-react';
import type { Site, Vehicle, NotificationItem } from '../lib/types';
import { getSitesFromProxy } from '../lib/airtable';
import SiteStatus from '../components/SiteStatus';
import FleetStatus from '../components/FleetStatus';
import WeatherAlerts from '../components/WeatherAlerts';
import Notifications from '../components/Notifications';
import StatsCards from '../components/StatsCards';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { safeStr, getPriorityColor, getStatusColor, getStatusIcon } from '../lib/ui';

const mockSites: Site[] = [
  { id: 1, name: 'North Plaza', address: '123 North St', district: 'North', status: 'Active', priority: 'High', crew: 'Team A', lastService: '2 hours ago' },
  { id: 2, name: 'East Mall', address: '456 East Ave', district: 'East', status: 'Completed', priority: 'Medium', crew: 'Team B', lastService: '4 hours ago' },
  { id: 3, name: 'South Center', address: '789 South Blvd', district: 'South', status: 'Pending', priority: 'High', crew: 'Unassigned', lastService: '6 hours ago' },
  { id: 4, name: 'West Park', address: '321 West Dr', district: 'West', status: 'Active', priority: 'Low', crew: 'Team C', lastService: '1 hour ago' },
  { id: 5, name: 'Central Station', address: '555 Main St', district: 'Central', status: 'Completed', priority: 'High', crew: 'Team A', lastService: '3 hours ago' },
  { id: 6, name: 'Harbor View', address: '888 Harbor Rd', district: 'North', status: 'Issue', priority: 'High', crew: 'Team D', lastService: '5 hours ago' }
];

const fleetData: Vehicle[] = [
  { id: 1, vehicle: 'Truck 01', type: 'Plow', status: 'Active', location: 'North Plaza', fuel: 85, operator: 'John D.' },
  { id: 2, vehicle: 'Truck 02', type: 'Plow', status: 'Active', location: 'West Park', fuel: 72, operator: 'Mike S.' },
  { id: 3, vehicle: 'Truck 03', type: 'Salter', status: 'Maintenance', location: 'Depot', fuel: 100, operator: 'N/A' },
  { id: 4, vehicle: 'Truck 04', type: 'Plow', status: 'Standby', location: 'Depot', fuel: 95, operator: 'Sarah L.' },
  { id: 5, vehicle: 'Truck 05', type: 'Combo', status: 'Active', location: 'South Center', fuel: 68, operator: 'Dave M.' }
];

const notifications: NotificationItem[] = [
  { id: 1, type: 'success', message: 'East Mall - Service completed', time: '15 min ago' },
  { id: 2, type: 'warning', message: 'Harbor View - Equipment issue reported', time: '45 min ago' },
  { id: 3, type: 'info', message: 'Team B returning to depot for refuel', time: '1 hour ago' }
];

export default function Page() {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [now, setNow] = useState(new Date());
  const [view, setView] = useLocalStorage<'dashboard' | 'planning'>('snowops:view', 'dashboard');
  const [autoRefresh, setAutoRefresh] = useLocalStorage<boolean>('snowops:autoRefresh', true);

  const fetchSites = async () => {
    try {
      const s = await getSitesFromProxy();
      setSites(s);
    } catch (e) {
      console.error(e);
      setSites(mockSites);
    }
  };

  useEffect(() => {
    fetchSites();
    const clock = setInterval(() => setNow(new Date()), 1000);
    let refresh: any;
    if (autoRefresh) refresh = setInterval(fetchSites, 60_000);
    return () => {
      clearInterval(clock);
      if (refresh) clearInterval(refresh);
    };
  }, [autoRefresh]);

  const stats = useMemo(() => {
    const lower = (s: string) => safeStr(s).toLowerCase();
    return {
      total: sites.length,
      active: sites.filter((s) => lower(s.status) === 'active').length,
      pending: sites.filter((s) => lower(s.status) === 'pending').length,
      completed: sites.filter((s) => lower(s.status) === 'completed').length,
      issues: sites.filter((s) => lower(s.status) === 'issue').length
    };
  }, [sites]);

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CloudSnow className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Snow Operations Dashboard</h1>
                <p className="text-sm opacity-90">Real-time monitoring and resource management</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{now.toLocaleDateString()}</div>
              <div className="text-lg">{now.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Dashboard View
          </button>
          <button
            onClick={() => setView('planning')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${view === 'planning' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Planning & Resources
          </button>
          <div className="flex-1" />
          <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-gray-700">Auto-refresh</span>
          </label>
        </div>

        {view === 'dashboard' ? (
          <div className="space-y-4">
            <WeatherAlerts now={now} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SiteStatus sites={sites} onSync={fetchSites} />
              <FleetStatus vehicles={fleetData} />
            </div>
            <Notifications items={notifications} />
          </div>
        ) : (
          <div className="space-y-4">
            <StatsCards {...stats} />
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Resource Allocation & Deployment</h3>
                <button onClick={fetchSites} className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                  Sync Airtable
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 font-semibold">Site Name</th>
                      <th className="text-left p-3 font-semibold">Address</th>
                      <th className="text-left p-3 font-semibold">District</th>
                      <th className="text-left p-3 font-semibold">Priority</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Assigned Crew</th>
                      <th className="text-left p-3 font-semibold">Last Service</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sites.map((site) => (
                      <tr key={site.id} className="hover:bg-gray-50">
                        <td className="p-3 font-medium">{site.name}</td>
                        <td className="p-3 text-gray-600">{site.address}</td>
                        <td className="p-3"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{site.district}</span></td>
                        <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(site.priority)}`}>{site.priority}</span></td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs ${getStatusColor(site.status)}`}>
                            {getStatusIcon(site.status)}
                            {site.status}
                          </span>
                        </td>
                        <td className="p-3"><span className={`${site.crew === 'Unassigned' ? 'text-red-600' : 'text-gray-800'}`}>{site.crew}</span></td>
                        <td className="p-3 text-gray-600">{site.lastService}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Airtable Integration</h4>
                <p className="text-sm text-blue-700 mb-2">This app uses a secure API route at /api/airtable/sites. Add your Airtable API key and Base ID to .env.local.</p>
                <ol className="text-sm text-blue-700 space-y-1 ml-4 list-decimal">
                  <li>Set AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME in .env.local</li>
                  <li>Restart dev server</li>
                  <li>Click Sync Airtable</li>
                </ol>
                <p className="text-xs text-blue-600 mt-2">Expected fields: Name/SiteName, Address/ServiceAddress, District, Status, Priority, Crew/AssignedCrew, LastService</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Snow Operations Dashboard • Optimized for OptiSigns Digital Signage</p>
        </div>
      </div>
    </div>
  );
}
