import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export const safeStr = (v: any, fallback = '') => (typeof v === 'string' ? v : fallback);

export const getStatusColor = (status: string) => {
  const s = safeStr(status).toLowerCase();
  switch (s) {
    case 'active': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'pending': return 'bg-yellow-500';
    case 'issue': return 'bg-red-500';
    case 'standby': return 'bg-gray-500';
    case 'maintenance': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusIcon = (status: string) => {
  const s = safeStr(status).toLowerCase();
  switch (s) {
    case 'completed': return <CheckCircle className="w-5 h-5" />;
    case 'issue': return <XCircle className="w-5 h-5" />;
    case 'pending': return <Clock className="w-5 h-5" />;
    default: return <AlertCircle className="w-5 h-5" />;
  }
};

export const getPriorityColor = (priority: string) => {
  const p = safeStr(priority).toLowerCase();
  switch (p) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
