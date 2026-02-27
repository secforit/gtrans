'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/clients', label: 'Clients', icon: '👤' },
  { href: '/pets', label: 'Pets', icon: '🐾' },
  { href: '/appointments', label: 'Appointments', icon: '📅' },
  { href: '/records', label: 'Records', icon: '📋' },
  { href: '/prescriptions', label: 'Prescriptions', icon: '💊' },
  { href: '/sales', label: 'Sales', icon: '💰' },
  { href: '/reminders', label: 'Reminders', icon: '🔔' },
  { href: '/vets', label: 'Vets', icon: '👨‍⚕️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-3 left-3 z-50 md:hidden bg-white border border-gray-200 rounded p-2 shadow"
        aria-label="Toggle menu"
      >
        <span className="text-xl">{open ? '✕' : '☰'}</span>
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-56 bg-gray-900 text-white z-40 flex flex-col
        transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex
      `}>
        <div className="px-5 py-5 border-b border-gray-700">
          <div className="text-base font-bold leading-tight">Cabinet Veterinar</div>
          <div className="text-xs text-gray-400 mt-0.5">Arad</div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map(({ href, label, icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-3 border-t border-gray-700 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
          <div className="text-xs text-gray-600">VetAgricola © 2024</div>
        </div>
      </aside>
    </>
  );
}
