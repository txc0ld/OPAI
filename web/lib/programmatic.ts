// Single source of truth for the programmatic suburb x trade pages.
export type Trade = {
  slug: string;
  namePlural: string;
  nameSingular: string;
  tradieWord: string; // colloquial, en-AU
};

export type Suburb = {
  slug: string;
  name: string;
  region: string; // e.g. "northern suburbs"
};

export const TRADES: Trade[] = [
  { slug: "plumbers", namePlural: "plumbers", nameSingular: "plumber", tradieWord: "plumber" },
  { slug: "electricians", namePlural: "electricians", nameSingular: "electrician", tradieWord: "sparky" },
  { slug: "air-conditioning", namePlural: "air-conditioning installers", nameSingular: "air-conditioning installer", tradieWord: "air-con tech" },
  { slug: "builders", namePlural: "builders", nameSingular: "builder", tradieWord: "builder" },
  { slug: "landscapers", namePlural: "landscapers", nameSingular: "landscaper", tradieWord: "landscaper" },
  { slug: "painters", namePlural: "painters", nameSingular: "painter", tradieWord: "painter" },
];

export const SUBURBS: Suburb[] = [
  { slug: "subiaco", name: "Subiaco", region: "inner western suburbs" },
  { slug: "fremantle", name: "Fremantle", region: "Fremantle and port suburbs" },
  { slug: "joondalup", name: "Joondalup", region: "northern suburbs" },
  { slug: "scarborough", name: "Scarborough", region: "coastal suburbs" },
  { slug: "mount-lawley", name: "Mount Lawley", region: "inner northern suburbs" },
  { slug: "cannington", name: "Cannington", region: "south-eastern suburbs" },
  { slug: "midland", name: "Midland", region: "eastern suburbs" },
  { slug: "rockingham", name: "Rockingham", region: "southern suburbs" },
];

export function getTrade(slug: string): Trade | undefined {
  return TRADES.find((t) => t.slug === slug);
}

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}

export function allPairs(): { trade: Trade; suburb: Suburb }[] {
  return TRADES.flatMap((trade) => SUBURBS.map((suburb) => ({ trade, suburb })));
}
