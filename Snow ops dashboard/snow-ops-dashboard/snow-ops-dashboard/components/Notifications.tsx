import React from 'react';
import { NotificationItem } from '../lib/types';

type Props = { items: NotificationItem[] };

export default function Notifications({ items }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold mb-3">Recent Notifications</h3>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {items.map((notif) => (
          <div key={notif.id} className="flex items-start gap-3 p-2 border-l-4 rounded bg-gray-50" style={{ borderColor: notif.type === 'success' ? '#16a34a' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6' }}>
            <div className={`w-2 h-2 rounded-full mt-2 ${notif.type === 'success' ? 'bg-green-500' : notif.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notif.message}</p>
              <span className="text-xs text-gray-500">{notif.time}</span>
            </div>
          </div>
        ))}
        {!items.length && <div className="text-sm text-gray-500 py-4 text-center">No notifications.</div>}
      </div>
    </div>
  );
}
EOF
