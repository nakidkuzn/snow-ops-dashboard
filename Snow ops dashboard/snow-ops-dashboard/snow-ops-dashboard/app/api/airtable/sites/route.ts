import { NextResponse } from 'next/server';

type AirtableRecord = { id: string; fields: Record<string, any> };
type AirtableResponse = { records: AirtableRecord[]; offset?: string };

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Sites';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return NextResponse.json({ error: 'Missing Airtable env vars' }, { status: 500 });
  }

  try {
    const baseUrl = `https://api.airtable.com/v0/${encodeURIComponent(AIRTABLE_BASE_ID)}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    let all: AirtableRecord[] = [];
    let offset: string | undefined;

    do {
      const url = new URL(baseUrl);
      if (offset) url.searchParams.set('offset', offset);
      ['Name','SiteName','Address','ServiceAddress','District','Status','Priority','Crew','AssignedCrew','LastService']
        .forEach((f) => url.searchParams.append('fields[]', f));

      const r = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!r.ok) {
        const text = await r.text();
        return new NextResponse(text, { status: r.status });
      }

      const data = (await r.json()) as AirtableResponse;
      all = all.concat(data.records || []);
      offset = data.offset;
    } while (offset);

    const sites = all.map(({ id, fields = {} }) => ({
      id,
      name: fields.Name || fields.SiteName || 'Untitled Site',
      address: fields.Address || fields.ServiceAddress || '—',
      district: fields.District || '—',
      status: fields.Status || 'Pending',
      priority: fields.Priority || 'Medium',
      crew: fields.Crew || fields.AssignedCrew || 'Unassigned',
      lastService: fields.LastService || 'N/A'
    }));

    return NextResponse.json({ sites });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Failed to fetch Airtable' }, { status: 500 });
  }
}
