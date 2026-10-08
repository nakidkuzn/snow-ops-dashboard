import React from 'react';

export default function StatsCards({ total, active, pending, completed, issues }: { total: number; active: number; pending: number; completed: number; issues: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-gray-800">{total}</div>
        <div className="text-sm text-gray-500">Total Sites</div>
      </div>
      <div className="bg-blue-50 rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-blue-600">{active}</div>
        <div className="text-sm text-gray-600">Active</div>
      </div>
      <div className="bg-yellow-50 rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-yellow-600">{pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-green-50 rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-red-50 rounded-lg shadow p-4">
        <div className="text-2xl font-bold text-red-600">{issues}</div>
        <div className="text-sm text-gray-600">Issues</div>
      </div>
    </div>
  );
}

