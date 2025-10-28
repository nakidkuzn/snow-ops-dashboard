'use client';

import React, { useEffect, useState } from 'react';
import { CloudSnow, AlertTriangle } from 'lucide-react';
import { WeatherAlert } from '../lib/types';

type Props = { now: Date };

export default function WeatherAlerts({ now }: Props) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function load() {
      setLoading(true);
      try {
        const lat = 42.4084;
        const lon = -71.0537;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum,snowfall_sum&current_weather=true&timezone=auto`;
        const r = await fetch(url);
        const data = await r.json();

        const items: WeatherAlert[] = [];
        if (data?.current_weather) {
          const wind = data.current_weather.windspeed;
          if (wind >= 30) {
            items.push({
              id: 'wind',
              severity: wind >= 40 ? 'high' : 'medium',
              title: 'Wind Advisory',
              message: `Gusts up to ${Math.round(wind)} mph expected`,
              time: 'now'
            });
          }
        }

        if (data?.daily?.snowfall_sum?.[0] >= 2) {
          const snow = data.daily.snowfall_sum[0];
          items.push({
            id: 'snow',
            severity: snow >= 6 ? 'high' : snow >= 3 ? 'medium' : 'low',
            title: 'Snowfall Expected',
            message: `Expected ${snow.toFixed(1)} in of snow in next 24h`,
            time: 'today'
          });
        }

        if (!items.length) {
          items.push({
            id: 'info',
            severity: 'low',
            title: 'No severe alerts',
            message: 'Conditions are stable. Monitoring...',
            time: 'now'
          });
        }

        if (!canceled) setAlerts(items);
      } catch {
        if (!canceled) {
          setAlerts([
            {
              id: 'fallback',
              severity: 'medium',
              title: 'Weather Service Unavailable',
              message: 'Showing fallback info.',
              time: 'now'
            }
          ]);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 15 * 60 * 1000);
    return () => {
      canceled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CloudSnow className="w-6 h-6" />
          <h2 className="text-xl font-bold">Weather Alerts</h2>
        </div>
        <span className="text-sm opacity-90">{now.toLocaleTimeString()}</span>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded ${
              alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
            } bg-opacity-30`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">{alert.title}</span>
                </div>
                <p className="text-sm opacity-90">{alert.message}</p>
              </div>
              <span className="text-xs opacity-75">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
