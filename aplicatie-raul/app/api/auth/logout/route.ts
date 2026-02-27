import { NextResponse } from 'next/server';

export function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('auth_token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return res;
}
