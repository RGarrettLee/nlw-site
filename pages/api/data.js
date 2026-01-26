import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export default async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data, error } = await supabase.functions.invoke('database-access', {
    body: { name: 'Functions' },
  });

  return NextResponse.json({ data });
}
