import { Site } from './types';

export async function getSitesFromProxy(): Promise<Site[]> {
  const res = await fetch('/api/airtable/sites', { cache: 'no-store' });
  if (!res.ok) throw new Error(await res.text());
  const { sites } = (await res.json()) as { sites: Site[] };
  return sites;
}
