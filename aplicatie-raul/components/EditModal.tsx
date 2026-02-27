'use client';

import { useState, useEffect } from 'react';
import { Column } from '@/lib/types';

interface EditModalProps {
  columns: Column[];
  record: Record<string, unknown> | null;
  onClose: () => void;
  onSave: (record: Record<string, unknown>) => Promise<void>;
}

export default function EditModal({ columns, record, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initial: Record<string, string> = {};
    for (const col of columns) {
      initial[col.key] = record ? String(record[col.key] ?? '') : '';
    }
    setForm(initial);
  }, [record, columns]);

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {record ? 'Edit Record' : 'New Record'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-4 flex flex-col gap-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columns.map(col => {
              if (col.readOnly) {
                return (
                  <div key={col.key} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">{col.label}</label>
                    <input
                      type="text"
                      value={form[col.key] ?? ''}
                      readOnly
                      className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-gray-50 text-gray-400"
                    />
                  </div>
                );
              }
              if (col.type === 'textarea') {
                return (
                  <div key={col.key} className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-xs font-medium text-gray-600">{col.label}</label>
                    <textarea
                      value={form[col.key] ?? ''}
                      onChange={e => set(col.key, e.target.value)}
                      rows={3}
                      className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                    />
                  </div>
                );
              }
              if (col.type === 'select' && col.options) {
                return (
                  <div key={col.key} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-600">{col.label}</label>
                    <select
                      value={form[col.key] ?? ''}
                      onChange={e => set(col.key, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">— select —</option>
                      {col.options.map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              return (
                <div key={col.key} className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">{col.label}</label>
                  <input
                    type={col.type === 'date' ? 'date' : col.type === 'number' ? 'number' : 'text'}
                    value={form[col.key] ?? ''}
                    onChange={e => set(col.key, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
