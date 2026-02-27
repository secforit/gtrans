'use client';

import { useState, useMemo } from 'react';
import { Column } from '@/lib/types';
import EditModal from './EditModal';

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onSave: (record: Record<string, unknown>, isNew: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

const PAGE_SIZE = 50;

export default function DataTable({ columns, data, onSave, onDelete, loading }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [modalRecord, setModalRecord] = useState<Record<string, unknown> | null | undefined>(undefined);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        const v = row[col.key];
        return v != null && String(v).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortAsc ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(key: string) {
    if (key === sortKey) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(true); }
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this record?')) return;
    await onDelete(id);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-sm text-gray-500">{filtered.length} records</span>
        <button
          onClick={() => setModalRecord(null)}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-3 py-2 text-left font-medium text-gray-700 cursor-pointer select-none whitespace-nowrap hover:bg-gray-100"
                >
                  {col.label}
                  {sortKey === col.key && (sortAsc ? ' ▲' : ' ▼')}
                </th>
              ))}
              <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + 1} className="px-3 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : pageData.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-3 py-8 text-center text-gray-400">No records found</td></tr>
            ) : pageData.map((row, i) => (
              <tr key={row.id as number ?? i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map(col => (
                  <td key={col.key} className="px-3 py-1.5 text-gray-800 max-w-[200px] truncate" title={String(row[col.key] ?? '')}>
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
                <td className="px-3 py-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setModalRecord(row)}
                    className="text-blue-600 hover:underline text-xs mr-3"
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(row.id as number)}
                    className="text-red-500 hover:underline text-xs"
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >«</button>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >‹</button>
        <span className="text-gray-600">Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >›</button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >»</button>
      </div>

      {/* Modal */}
      {modalRecord !== undefined && (
        <EditModal
          columns={columns}
          record={modalRecord}
          onClose={() => setModalRecord(undefined)}
          onSave={async (record) => {
            await onSave(record, modalRecord === null);
            setModalRecord(undefined);
          }}
        />
      )}
    </div>
  );
}
