'use client';

import { useEffect, useState, useCallback } from 'react';
import DataTable from './DataTable';
import { Column } from '@/lib/types';

interface SectionPageProps {
  title: string;
  apiPath: string;
  columns: Column[];
}

export default function SectionPage({ title, apiPath, columns }: SectionPageProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${apiPath}?limit=5000`);
      const json = await res.json();
      setData(json.data ?? []);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => { load(); }, [load]);

  async function handleSave(record: Record<string, unknown>, isNew: boolean) {
    if (isNew) {
      await fetch(`/api/${apiPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } else {
      await fetch(`/api/${apiPath}/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    }
    await load();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/${apiPath}/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <DataTable
        columns={columns}
        data={data}
        onSave={handleSave}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}
