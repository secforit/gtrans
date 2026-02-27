'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SECTIONS = [
  { key: 'clients', label: 'Clients', icon: '👤', href: '/clients', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'pets', label: 'Pets', icon: '🐾', href: '/pets', color: 'bg-green-50 border-green-200 text-green-700' },
  { key: 'appointments', label: 'Appointments', icon: '📅', href: '/appointments', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { key: 'records', label: 'Records', icon: '📋', href: '/records', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  { key: 'prescriptions', label: 'Prescriptions', icon: '💊', href: '/prescriptions', color: 'bg-red-50 border-red-200 text-red-700' },
  { key: 'sales', label: 'Sales', icon: '💰', href: '/sales', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { key: 'reminders', label: 'Reminders', icon: '🔔', href: '/reminders', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { key: 'vets', label: 'Vets', icon: '👨‍⚕️', href: '/vets', color: 'bg-teal-50 border-teal-200 text-teal-700' },
];

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(setCounts);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {SECTIONS.map(({ key, label, icon, href, color }) => (
          <Link
            key={key}
            href={href}
            className={`border rounded-xl p-5 flex flex-col gap-2 hover:shadow-md transition-shadow ${color}`}
          >
            <div className="text-3xl">{icon}</div>
            <div className="text-2xl font-bold">{counts[key] ?? '—'}</div>
            <div className="text-sm font-medium">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
