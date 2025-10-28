export type Site = {
  id: string | number;
  name: string;
  address: string;
  district: string;
  status: string;
  priority: string;
  crew: string;
  lastService: string;
};

export type Vehicle = {
  id: number | string;
  vehicle: string;
  type: 'Plow' | 'Salter' | 'Combo' | string;
  status: 'Active' | 'Completed' | 'Pending' | 'Issue' | 'Standby' | 'Maintenance' | string;
  location: string;
  fuel: number;
  operator: string;
};

export type WeatherAlert = {
  id: string | number;
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  time: string;
};

export type NotificationItem = {
  id: string | number;
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
};
