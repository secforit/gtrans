import { NextRequest, NextResponse } from 'next/server';
import getDb from './db';

export function listRoute(table: string) {
  return function GET(req: NextRequest) {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') ?? '';
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '200');
    const offset = (page - 1) * limit;

    let rows;
    if (search) {
      // SQLite FTS-lite: search all text columns with LIKE
      const info = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string; type: string }[];
      const textCols = info.filter(c => c.type === 'TEXT' || c.type === '').map(c => c.name);
      const conditions = textCols.map(c => `CAST(${c} AS TEXT) LIKE ?`).join(' OR ');
      const likeVal = `%${search}%`;
      const params = textCols.map(() => likeVal);
      rows = db.prepare(`SELECT * FROM ${table} WHERE ${conditions} LIMIT ? OFFSET ?`).all(...params, limit, offset);
    } else {
      rows = db.prepare(`SELECT * FROM ${table} LIMIT ? OFFSET ?`).all(limit, offset);
    }
    const total = (db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number }).c;
    return NextResponse.json({ data: rows, total });
  };
}

export function createRoute(table: string) {
  return async function POST(req: NextRequest) {
    const db = getDb();
    const body = await req.json();
    const keys = Object.keys(body).filter(k => k !== 'id');
    const cols = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const vals = keys.map(k => body[k] ?? null);
    const result = db.prepare(`INSERT INTO ${table} (${cols}) VALUES (${placeholders})`).run(...vals);
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
    return NextResponse.json(row, { status: 201 });
  };
}

export function getOneRoute(table: string) {
  return function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return params.then(({ id }) => {
      const db = getDb();
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
      if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(row);
    });
  };
}

export function updateRoute(table: string) {
  return async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = getDb();
    const body = await req.json();
    const keys = Object.keys(body).filter(k => k !== 'id');
    const sets = keys.map(k => `${k} = ?`).join(', ');
    const vals = keys.map(k => body[k] ?? null);
    db.prepare(`UPDATE ${table} SET ${sets} WHERE id = ?`).run(...vals, id);
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    return NextResponse.json(row);
  };
}

export function deleteRoute(table: string) {
  return async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = getDb();
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
    return NextResponse.json({ success: true });
  };
}
