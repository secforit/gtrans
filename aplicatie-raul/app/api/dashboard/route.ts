import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export function GET() {
  const db = getDb();
  const tables = ['clients', 'pets', 'vets', 'appointments', 'records', 'prescriptions', 'reminders', 'sales'];
  const counts: Record<string, number> = {};
  for (const t of tables) {
    const row = db.prepare(`SELECT COUNT(*) as c FROM ${t}`).get() as { c: number };
    counts[t] = row.c;
  }
  return NextResponse.json(counts);
}
