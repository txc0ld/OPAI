// Reviewed, committed content for each trade x suburb page.
// AI snapshots are produced by real check runs (offline), reviewed, and dated.
// Snapshots were captured 2026-06-24 by querying ChatGPT, Perplexity and Gemini
// with "Who are the best {trade} in {suburb}, Perth, Western Australia?" and
// recording faithfully what each engine actually returned.
// A page is only indexable when isIndexable() is true (see Task: quality gate).
export type AiSnapshot = {
  summary: string; // what AI says about this trade in this suburb right now
  capturedOn: string; // ISO date the snapshot was captured
  source: string; // e.g. "ChatGPT (web search), Perplexity"
};

export type StatCite = {
  claim: string;
  source: string;
  date: string;
};

export type Entry = {
  intro: string;
  whatAIChecks: string[];
  exampleQueries: string[];
  faqs: { q: string; a: string }[];
  aiSnapshot?: AiSnapshot;
  stats?: StatCite[];
};

const CAPTURED_ON = "2026-06-24";
const SOURCE = "ChatGPT, Perplexity and Gemini";

// A small set of credible, honestly-attributed stats, reused and varied.
const STAT_AI_OVERVIEWS: StatCite = {
  claim: "AI Overviews now appear on roughly half of Google searches, pushing traditional blue links further down the page.",
  source: "industry analyses of Google Search",
  date: "2026",
};
const STAT_AI_ASSISTANTS: StatCite = {
  claim: "A fast-growing share of people now ask an AI assistant for local recommendations before they ever open a maps app or directory.",
  source: "industry reports on AI search adoption",
  date: "2026",
};
const STAT_REVIEWS: StatCite = {
  claim: "Recent, replied-to reviews remain one of the strongest signals AI uses to decide which local businesses to name.",
  source: "AI search and local SEO analyses",
  date: "2026",
};
const STAT_GBP: StatCite = {
  claim: "A complete, accurate Google Business Profile is consistently the single biggest lever for showing up in AI local recommendations.",
  source: "local search industry analyses",
  date: "2026",
};

export const ENTRIES: Record<string, Entry> = {
  // ---------------------------------------------------------------------------
  // PLUMBERS
  // ---------------------------------------------------------------------------
  "plumbers/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for a good plumber, it names two or three by reading Google Business Profiles, reviews and plain-text websites. If your details are messy or stuck in images, AI skips you and recommends the plumber whose information it can actually read.",
    whatAIChecks: [
      "A complete Google Business Profile with every plumbing service listed as plain text, not buried in photos.",
      "Recent, replied-to reviews that mention Subiaco and nearby Shenton Park, Daglish or Jolimont.",
      "A website that states your services, callout area and 'from' pricing in words AI can parse.",
    ],
    exampleQueries: [
      "Who's a good emergency plumber in Subiaco who can come today?",
      "Best plumber near Subiaco for a hot water system replacement?",
      "Reliable plumber in Subiaco for a bathroom renovation?",
    ],
    faqs: [
      {
        q: "How do plumbers in Subiaco get recommended by AI?",
        a: "AI recommends the plumbers whose Google Business Profile, reviews and website are the clearest and most complete. Plain-text services, an accurate service area and recent replied-to reviews are the biggest levers. Get those right and you become one of the names AI repeats.",
      },
      {
        q: "Why isn't my Subiaco plumbing business showing up in ChatGPT?",
        a: "Usually because your services or pricing are locked in images or PDFs, your Google Business Profile is incomplete, or your reviews are thin. AI can't read what isn't plain text, so it recommends a competitor it can read instead.",
      },
      {
        q: "How long does it take to improve AI visibility?",
        a: "Profile and website fixes can be read by AI within days to a few weeks. Review depth builds over a couple of months. Start with the Google Business Profile, because it's the fastest-moving signal.",
      },
    ],
    aiSnapshot: {
      summary:
        "Asked who the best plumbers in Subiaco are, the engines agreed there is no single definitive ranking and instead named a spread of businesses. Perplexity highlighted West Best Plumbing, Urbico Plumbing & Gas and Gillies Group; Gemini led with Dorrington Plumbing, Gas & Electrical and J Sutton; ChatGPT named Proud Plumbing & Gas and Bingham Plumbing & Gas. The recurring themes were 24/7 emergency service, transparent or 'no call-out fee' pricing and long local track records.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_AI_OVERVIEWS, STAT_GBP],
  },

  "plumbers/fremantle": {
    intro:
      "Ask AI for a plumber in Fremantle and it leans on long local histories and review counts to pick two or three names. A Freo plumber with thin online detail gets passed over for one whose 65-year track record and reviews AI can actually read.",
    whatAIChecks: [
      "A Google Business Profile that spells out blocked drains, burst pipes, hot water and gas work in plain text.",
      "Reviews that mention Fremantle and coastal quirks like salt corrosion or ageing heritage plumbing.",
      "A website stating your licence, 24-hour availability and callout area without hiding it in graphics.",
    ],
    exampleQueries: [
      "Best emergency plumber in Fremantle for a burst pipe?",
      "Who's a trusted plumber near Fremantle for blocked drains?",
      "Plumber in Fremantle that handles old heritage house pipework?",
    ],
    faqs: [
      {
        q: "What makes a Fremantle plumber show up in AI answers?",
        a: "Longevity, a complete profile and recent reviews. The engines repeatedly favour Freo plumbers with decades of local history and licensed-and-insured language. State that clearly in plain text and AI is far more likely to name you.",
      },
      {
        q: "Do reviews really change who AI recommends in Fremantle?",
        a: "Yes. AI quotes star ratings and review counts directly. A plumber with hundreds of recent 4.9-star reviews gets named ahead of an equally good one with a handful, so collecting and replying to reviews is worth the effort.",
      },
      {
        q: "Should my Fremantle plumbing site mention coastal issues?",
        a: "It helps. AI noticed plumbers who talk about Fremantle's heritage homes and salt corrosion. Naming the local conditions you handle makes your relevance obvious to both the AI and the homeowner reading the answer.",
      },
    ],
    aiSnapshot: {
      summary:
        "For Fremantle, the engines named several established local plumbers without crowning one. Perplexity recommended Fremantle Plumbing Service (citing 65 years of service), West Best Plumbing and Youngs Plumbing and Gas; Gemini led with G.X.R Plumbing & Gas (4.9 stars from 300-plus reviews) and Bingham Plumbing & Gas; ChatGPT named The Plumbers Fremantle and Tap Tech Plumbing & Gas. Common threads were long local history, 24/7 emergency cover and strong review counts.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_ASSISTANTS],
  },

  "plumbers/joondalup": {
    intro:
      "In Joondalup, AI builds its plumber shortlist from Google review volume and northern-suburbs relevance. A plumber with hundreds of recent five-star reviews and a clear service area gets named; one with a sparse profile simply doesn't surface.",
    whatAIChecks: [
      "A Google Business Profile listing maintenance, hot water and blocked-drain work for Joondalup and the northern suburbs.",
      "A high, recent review count, since AI quotes star ratings and totals when it ranks Joondalup plumbers.",
      "Plain-text mention of no call-out fees or free quotes if you offer them.",
    ],
    exampleQueries: [
      "Top-rated plumber in Joondalup with no call-out fee?",
      "Who's the best plumber in Joondalup for a leaking hot water unit?",
      "Emergency plumber near Joondalup available 24/7?",
    ],
    faqs: [
      {
        q: "Why does review count matter so much for Joondalup plumbers?",
        a: "Because AI literally reads and repeats it. In Joondalup the engines leaned on review totals and reputation scores, naming plumbers with hundreds of five-star reviews first. Building review volume directly moves you up the AI shortlist.",
      },
      {
        q: "How do I get my Joondalup plumbing business into ChatGPT's answers?",
        a: "Complete your Google Business Profile, list your services in plain text, define your northern-suburbs service area, and keep collecting recent reviews. AI assembles its answer from exactly those signals, so the clearest, best-reviewed plumber wins.",
      },
      {
        q: "Does mentioning 'no call-out fee' help in Joondalup?",
        a: "It can. Engines highlighted Joondalup plumbers offering no call-out fees and free quotes. If that's true for you, state it in plain text on your profile and site so AI can surface it as a reason to recommend you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity said there is no single objective 'best' list for Joondalup and recommended Joondalup Plumbing Service, Alkimos Plumbing & Gas and Pipe Domain; Gemini led with Oceania Plumbing & Gas (600-plus five-star reviews) and Historic Plumbing; ChatGPT ranked Coast Runner Plumbing and Gas and Bright Water Plumbing & Gas highest. The engines leaned heavily on review volume, reputation scores, 24/7 cover and no call-out-fee offers.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "plumbers/scarborough": {
    intro:
      "Scarborough is a case where AI sometimes can't find a clearly local plumber and falls back on Perth-wide firms that market to the suburb. The plumber who states a genuine Scarborough presence in plain text is the one AI confidently names.",
    whatAIChecks: [
      "A Google Business Profile that ties you to Scarborough specifically, not just 'Perth metro'.",
      "Plain-text services like blocked drains, leak repairs and gas or hot water work.",
      "Visible warranties, no call-out fees or free quotes, which AI repeats as reasons to recommend.",
    ],
    exampleQueries: [
      "Local plumber based in Scarborough for a blocked drain?",
      "Who's a good plumber near Scarborough for hot water and gas?",
      "Plumber in Scarborough with no call-out fee?",
    ],
    faqs: [
      {
        q: "Why does AI struggle to name a Scarborough plumber?",
        a: "Because much of what's online is Perth-wide advertising rather than verified local presence. One engine explicitly said it couldn't confirm plumbers based in Scarborough. A clear, suburb-specific profile is your chance to be the local answer AI trusts.",
      },
      {
        q: "How can my Scarborough plumbing business stand out to AI?",
        a: "State your Scarborough base and service area in plain text, list your services, and gather local reviews. Because AI is unsure who's genuinely local, the plumber who proves it most clearly gets named first.",
      },
      {
        q: "Do warranties and no call-out fees help in Scarborough?",
        a: "Yes. The engines repeated these as reasons to recommend Scarborough plumbers, including multi-year workmanship warranties and free onsite quotes. If you offer them, make them obvious in plain text so AI can quote them.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity noted it found no verified plumbers based specifically in Scarborough and listed Perth-wide firms marketing to the area, such as West Best Plumbing, Waterline Plumbing and Gas and Mr Blockage. Gemini named Waterline Plumbing & Gas, West Best Plumbing and Scarborough-based Fixor Plumbing Group; ChatGPT highlighted long-established Scarboro Plumbing (operating since 1973) and Mudge Plumbing and Gas. No call-out fees, free quotes and warranties were recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_ASSISTANTS],
  },

  "plumbers/mount-lawley": {
    intro:
      "In Mount Lawley, AI picks plumbers by combining strong star ratings with local familiarity, often mentioning nearby Coolbinia and Menora. A plumber with transparent pricing and a high recent rating becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile covering Mount Lawley plus neighbouring Coolbinia and Menora in plain text.",
      "A high star rating with a meaningful number of recent reviews, which AI cites directly.",
      "Plain-text transparent pricing, obligation-free quotes and same-day or 24/7 availability.",
    ],
    exampleQueries: [
      "Best-rated plumber in Mount Lawley for blocked drains?",
      "Who's a reliable plumber near Mount Lawley for a burst pipe today?",
      "Plumber in Mount Lawley with transparent pricing?",
    ],
    faqs: [
      {
        q: "What signals does AI use to recommend Mount Lawley plumbers?",
        a: "High star ratings, recent review counts, transparent pricing and local familiarity. The engines named plumbers with 4.8-to-5.0 ratings and praised those who mention Mount Lawley and surrounding suburbs by name. Match those signals to get cited.",
      },
      {
        q: "Why is one Mount Lawley plumber named and another isn't?",
        a: "Often it comes down to readable signals. The plumber with a complete profile, plain-text services, transparent pricing and recent reviews gives AI everything it needs to recommend them. A thin or image-heavy presence gives AI nothing to quote.",
      },
      {
        q: "Does mentioning local building codes help?",
        a: "It can. One engine praised a Mount Lawley plumber for deep knowledge of local building codes and water quality. Demonstrating that kind of specific local expertise in plain text makes you a more confident pick for AI.",
      },
    ],
    aiSnapshot: {
      summary:
        "For Mount Lawley the engines named overlapping but distinct shortlists. Perplexity recommended Proud Plumbing & Gas, Swan's Professional Plumbing, Agate Plumbing & Gas and Casotti Plumbers; Gemini led with Q Plumbing & Gas (5.0 from 311 reviews) and Agate Plumbing & Gas; ChatGPT named Bingham Plumbing & Gas and Proud Plumbing & Gas. Transparent pricing, high star ratings, 24/7 availability and local code knowledge were the standout themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "plumbers/cannington": {
    intro:
      "Cannington plumbers get shortlisted by AI on the strength of review volume and clear local servicing of the 6107 area. A plumber with a 5.0 rating across hundreds of reviews becomes the first name AI offers.",
    whatAIChecks: [
      "A Google Business Profile naming Cannington and the 6107 postcode area in plain text.",
      "A strong recent review count, since AI cites totals like '348 reviews' when ranking Cannington plumbers.",
      "Plain-text emergency availability, fixed pricing and gas-fitting credentials if you hold them.",
    ],
    exampleQueries: [
      "Highest-rated plumber in Cannington for gas fitting?",
      "Who's a good emergency plumber near Cannington?",
      "Plumber in Cannington with fixed-price quotes?",
    ],
    faqs: [
      {
        q: "How does AI decide which Cannington plumber to name?",
        a: "It leans on review volume and ratings. For Cannington the engines named plumbers with 5.0 ratings across hundreds of reviews and praised quick response times. Building that review base is the most direct way to climb the AI shortlist.",
      },
      {
        q: "Why doesn't my Cannington plumbing business appear in AI answers?",
        a: "Likely a thin or incomplete profile, services hidden in images, or too few recent reviews. AI assembles answers from readable, well-reviewed listings, so a sparse online presence gets quietly skipped in favour of a competitor.",
      },
      {
        q: "Does emergency and fixed-price service help in Cannington?",
        a: "Yes. The engines repeatedly cited 24/7 emergency response and fixed-price guarantees as reasons to recommend Cannington plumbers. If you offer those, state them in plain text so AI can use them as a selling point on your behalf.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity said it couldn't verify an absolute 'best' for Cannington and listed GXR Plumbing, Willetton Plumbing & Gas, Rowsons Plumbing and Frank Britton Plumbing; Gemini led with Ausco Plumbing & Gas (5.0 from 348 reviews), Richo's Plumbing & Gas and VH Plumb & Gas; ChatGPT named Metropolitan Plumbing and Proud Plumbing & Gas. Review volume, fast response times, 24/7 cover and fixed pricing were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_OVERVIEWS],
  },

  "plumbers/midland": {
    intro:
      "Midland is a spot where AI sometimes confuses the WA suburb with Midland in Victoria, then corrects itself using local listings. A plumber who clearly states 'Midland, Perth WA' and lists licences removes that doubt and gets named.",
    whatAIChecks: [
      "A Google Business Profile that unambiguously locates you in Midland, Perth WA, near Midvale and the Swan Valley.",
      "Plain-text licence and gas-permit numbers, which AI repeated when recommending Midland plumbers.",
      "Recent reviews and clear services, so AI doesn't fall back on generic Perth-wide firms.",
    ],
    exampleQueries: [
      "Licensed plumber in Midland Perth for gas fitting?",
      "Who's a trusted local plumber near Midland and Midvale?",
      "24-hour plumber in Midland for blocked drains?",
    ],
    faqs: [
      {
        q: "Why does AI get confused about Midland plumbers?",
        a: "Because Midland also exists in Victoria, the engines sometimes hesitate before confirming the WA suburb. Stating 'Midland, Perth WA' plus nearby Midvale and the Swan Valley in plain text removes the ambiguity and helps AI confidently place and recommend you.",
      },
      {
        q: "Do licence numbers help my Midland plumbing business with AI?",
        a: "Yes. For Midland the engines actually quoted plumbing licence and gas permit numbers as trust signals. Publishing yours in plain text gives AI concrete, verifiable detail to cite, which makes you a safer recommendation.",
      },
      {
        q: "How do I outrank Perth-wide firms in AI answers for Midland?",
        a: "Prove you're genuinely local. A complete profile tied to Midland, recent local reviews and clear services beat a generic metro-wide listing, because AI prefers to name the business it can confirm actually serves the suburb.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity flagged that Midland also exists in Victoria, then recommended WA businesses Nathan's Plumbing & Gas (5 stars from 190-plus reviews), Bingham Plumbing & Gas, Plumb Bros and Same Day Trades; Gemini led with Bingham Plumbing & Gas (quoting its licence and gas permit numbers) and Dorrington Plumbing; ChatGPT named Proud Plumbing & Gas and GA Perry. Licensing, longevity and 24/7 service were the dominant themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_ASSISTANTS],
  },

  "plumbers/rockingham": {
    intro:
      "In Rockingham, AI shortlists plumbers using strong word-of-mouth reputation and high review counts across Google and Facebook. A plumber locals call their 'favourite' with hundreds of reviews becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile covering Rockingham and nearby Baldivis, Safety Bay and Warnbro in plain text.",
      "High review counts across platforms, which AI cites when naming Rockingham's 'favourite' plumbers.",
      "Plain-text warranties, fixed pricing and 24/7 emergency cover.",
    ],
    exampleQueries: [
      "Rockingham's favourite plumber for a burst pipe?",
      "Best-reviewed plumber near Rockingham for hot water systems?",
      "Emergency plumber in Rockingham available 24/7?",
    ],
    faqs: [
      {
        q: "What gets a Rockingham plumber recommended by AI?",
        a: "Reputation and review depth. The engines named plumbers described as 'Rockingham's favourite' with hundreds of Google and Facebook reviews. Building that cross-platform reputation is the most direct route into AI's shortlist for the area.",
      },
      {
        q: "Should my Rockingham plumbing profile list nearby suburbs?",
        a: "Yes. AI mentioned Baldivis, Safety Bay and Warnbro alongside Rockingham. Listing the suburbs you genuinely service in plain text widens the queries you can appear in without diluting your local relevance.",
      },
      {
        q: "Do workmanship warranties matter to AI in Rockingham?",
        a: "They do. Engines repeated guarantees, workmanship warranties and fixed-price quotes as reasons to recommend Rockingham plumbers. If you offer them, state them plainly so AI can quote them as evidence you're a safe choice.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended West Best Plumbing, Sarros Plumbing (described as 'Rockingham's favourite') and Dave Van Vugt Impressive Plumbing & Gas; Gemini led with Blu Frog Plumbing & Gas (100-plus five-star reviews) and Sarros Plumbing (citing 836 Google reviews); ChatGPT named Metropolitan Plumbing, noting fixed-price quotes and a 12-month workmanship warranty. Strong cross-platform reputation, warranties and 24/7 cover were the consistent themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  // ---------------------------------------------------------------------------
  // ELECTRICIANS
  // ---------------------------------------------------------------------------
  "electricians/subiaco": {
    intro:
      "When a Subiaco resident asks AI for an electrician, it favours businesses with clear qualifications, awards and a long local history. A sparky whose switchboard and rewiring work is spelled out in plain text gets named; one hidden behind a photo gallery doesn't.",
    whatAIChecks: [
      "A Google Business Profile listing switchboard upgrades, rewiring, LED and safety-switch work as plain text.",
      "Recent reviews and any industry awards, which AI repeats as credibility signals.",
      "A website that states your licence, service area and emergency availability clearly.",
    ],
    exampleQueries: [
      "Best electrician in Subiaco for a switchboard upgrade?",
      "Who's a reliable sparky near Subiaco for rewiring an older home?",
      "Electrician in Subiaco for safety switch and smoke alarm installation?",
    ],
    faqs: [
      {
        q: "How does AI choose an electrician to recommend in Subiaco?",
        a: "It rewards readable credentials. The engines named Subiaco electricians with strong ratings, listed services and recognised awards. Spelling out your switchboard, rewiring and safety work in plain text, alongside reviews, makes you an easy pick.",
      },
      {
        q: "Do awards really help my Subiaco electrical business with AI?",
        a: "They can. One engine highlighted a Subiaco electrician's industry award finalist status as a reason to recommend them. If you've earned recognition, state it plainly so AI can quote it as evidence of quality.",
      },
      {
        q: "Why isn't my Subiaco sparky business showing up in AI answers?",
        a: "Usually because your services or licence sit in images, your profile is thin, or reviews are sparse. AI can only recommend what it can read, so a clear, well-reviewed plain-text listing beats a polished but unreadable one.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity initially questioned whether Subiaco was a real Perth suburb before the other engines answered confidently. Gemini recommended REST Contractors (4.9 stars), Westaus Electro Services (5.0 from 85 reviews) and Steven Murphy Electrical Contractors; ChatGPT led with long-established Hiddlestone Electrics (operating since 1920) and Westside Electrical, noting awards and 24/7 emergency service. Qualifications, ratings and local heritage were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "electricians/fremantle": {
    intro:
      "Ask AI for an electrician in Fremantle and it gravitates to high review counts and lifetime-workmanship guarantees. A Freo sparky with a 4.8-star rating across hundreds of reviews becomes a name AI repeats across every engine.",
    whatAIChecks: [
      "A Google Business Profile detailing residential, commercial, rewiring and emergency electrical work in plain text.",
      "A high review count, since AI quotes totals like '600-plus Google reviews' when ranking Fremantle sparkies.",
      "Plain-text guarantees, upfront pricing and 24/7 availability.",
    ],
    exampleQueries: [
      "Best-reviewed electrician in Fremantle for a home rewire?",
      "Who's a 24/7 emergency electrician near Fremantle?",
      "Electrician in Fremantle with a workmanship guarantee?",
    ],
    faqs: [
      {
        q: "What makes AI recommend a Fremantle electrician?",
        a: "Review depth and guarantees. The engines repeatedly named Fremantle sparkies with hundreds of reviews and lifetime workmanship guarantees. Building that review volume and stating your guarantee in plain text are the most direct levers.",
      },
      {
        q: "Do awards help my Fremantle electrical business in AI answers?",
        a: "Yes. One engine cited a Fremantle electrician's 'Service Business of the Year' wins as a reason to recommend them. Publishing genuine awards in plain text gives AI concrete credibility to quote on your behalf.",
      },
      {
        q: "How do I get my Fremantle sparky business into ChatGPT?",
        a: "Complete your Google Business Profile, list your services and licence in plain text, define your service area, and keep gathering recent reviews. AI builds its answer from exactly those signals, so the clearest, best-reviewed sparky wins.",
      },
    ],
    aiSnapshot: {
      summary:
        "All three engines converged on Sarros Electrical for Fremantle, citing roughly 4.8 stars from 600-plus Google reviews, 24/7 availability and a lifetime workmanship guarantee. Perplexity added Crown Electrical Service and Hilton Electrical; Gemini named Grays Electrics; ChatGPT highlighted Response Electricians, noting its Service Business of the Year wins. Review volume, guarantees and award recognition were the dominant themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_ASSISTANTS],
  },

  "electricians/joondalup": {
    intro:
      "In Joondalup, AI shortlists electricians using a mix of personal-service reputation, years of experience and strong ratings across the northern coastal suburbs. A sparky who states their local experience and rates clearly gets named.",
    whatAIChecks: [
      "A Google Business Profile covering Joondalup and nearby Duncraig, Iluka and Burns Beach in plain text.",
      "Plain-text experience, hourly rates and services like RCD, smoke alarm, EV charger and power-point work.",
      "Recent reviews and any perfect-rating listings AI can quote.",
    ],
    exampleQueries: [
      "Local electrician in Joondalup for RCD and smoke alarm installation?",
      "Who's a good sparky near Joondalup for an EV charger install?",
      "Reliable electrician in Joondalup with transparent hourly rates?",
    ],
    faqs: [
      {
        q: "How does AI pick an electrician to recommend in Joondalup?",
        a: "It rewards clear experience and ratings. The engines named Joondalup sparkies with 20-plus years' experience, transparent pricing and perfect or near-perfect ratings. Stating your experience and rates in plain text makes you an easy recommendation.",
      },
      {
        q: "Does mentioning EV chargers and coastal estates help in Joondalup?",
        a: "It does. One engine praised a Joondalup electrician for handling both older homes and newer coastal estates with EV and pool wiring. Naming the specific local work you do makes your relevance obvious to AI and the homeowner.",
      },
      {
        q: "Why doesn't my Joondalup electrical business appear in AI answers?",
        a: "Likely a thin profile, services locked in images, or too few reviews. AI assembles answers from readable, well-reviewed listings, so spelling out your services and gathering recent reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended ARJ Electrical Services (led by Alan Shewan, 20-plus years' experience), Solaire Connect (5 stars from 40 reviews) and Hansberry Electrical; Gemini led with ARJ Electrical Services and Westaus Electro Services (5.0 from 85 ratings); ChatGPT highlighted a personal-service local sparky covering Joondalup, Duncraig, Iluka and Burns Beach, including EV-charger and pool wiring. Experience, transparent pricing and local familiarity were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "electricians/scarborough": {
    intro:
      "Scarborough electricians get shortlisted by AI on the strength of perfect ratings, fast emergency response and clear coastal-home expertise. A sparky with a 5.0 rating and stocked vehicles for same-day work becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile naming Scarborough specifically and listing your electrical services in plain text.",
      "A high or perfect rating with recent reviews, which AI quotes when ranking Scarborough sparkies.",
      "Plain-text same-day or 24/7 availability and any solar, induction or heat-pump readiness work.",
    ],
    exampleQueries: [
      "Top-rated electrician in Scarborough for fault finding?",
      "Who's a 24/7 emergency electrician near Scarborough?",
      "Electrician in Scarborough to prep an older home for solar?",
    ],
    faqs: [
      {
        q: "What gets a Scarborough electrician recommended by AI?",
        a: "Strong ratings and fast service. The engines named Scarborough sparkies with 5.0 ratings, 24/7 cover and stocked vehicles for same-day repairs. Matching those signals in your plain-text profile is the most direct route to being cited.",
      },
      {
        q: "Should my Scarborough electrical business mention solar and induction?",
        a: "Yes. One engine praised a Scarborough electrician for preparing older homes for solar, induction and heat pumps. Listing that modern work in plain text makes you the obvious answer for those increasingly common queries.",
      },
      {
        q: "Why is a competitor named in AI answers and not me?",
        a: "Usually because their profile is clearer and better reviewed. AI recommends the Scarborough sparky whose services, ratings and availability it can read. Tidy up your profile and gather recent reviews to close that gap.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named The Wire Guy (5 stars, called 'Best Electrician in Scarborough'), Voltaic Electrical and ARJ Electrical Services; Gemini led with Voltaic Electrical and ARJ Electrical Services, praising honest pricing and 24/7 cover; ChatGPT highlighted Westline Electrical (5 stars from 500-plus reviews) and Voltaic Electrical (5.0 from 93 reviews). Perfect ratings, fast emergency response and solar/induction readiness were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_OVERVIEWS],
  },

  "electricians/mount-lawley": {
    intro:
      "In Mount Lawley, AI favours electricians with award recognition, large review counts and experience on the suburb's diverse heritage and modern properties. A sparky with a $0 callout fee and 15-plus years locally gets named.",
    whatAIChecks: [
      "A Google Business Profile listing switchboard, rewiring and three-phase upgrade work for Mount Lawley in plain text.",
      "A high review count and any award recognition, which AI repeats as credibility signals.",
      "Plain-text mention of $0 callout fees, free quotes and 24/7 emergency cover if offered.",
    ],
    exampleQueries: [
      "Award-winning electrician in Mount Lawley for a switchboard upgrade?",
      "Who's a good sparky near Mount Lawley for a three-phase mains upgrade?",
      "Electrician in Mount Lawley with no callout fee?",
    ],
    faqs: [
      {
        q: "How does AI decide which Mount Lawley electrician to name?",
        a: "It rewards awards, review depth and local fit. The engines named Mount Lawley sparkies with hundreds of reviews, $0 callout fees and award wins, and praised those handling the suburb's heritage and modern homes. Make those signals readable to get cited.",
      },
      {
        q: "Do complex jobs like mains upgrades help my AI visibility?",
        a: "Yes. One engine highlighted a Mount Lawley electrician for completing a three-phase mains upgrade others had declined. Describing the demanding jobs you handle in plain text positions you as the capable, specialist choice AI recommends.",
      },
      {
        q: "Why isn't my Mount Lawley sparky business in AI answers?",
        a: "Likely a thin profile, image-locked services, or few recent reviews. AI builds answers from readable listings, so spelling out your services and credentials and gathering reviews is the way back into its shortlist.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Brillare Electrical, Jim's Electrical and award-winning Response Electricians (Electrician of the Year in 2017 and 2024), plus Ozone Electric and Coral Electrical; Gemini led with J & C Electrical Contracting (550-plus reviews) and Brillare Electrical; ChatGPT highlighted Lawley Electrical Services for a major three-phase mains upgrade and Westline Electrical. Awards, review volume, $0 callout fees and complex-job capability were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "electricians/cannington": {
    intro:
      "Cannington electricians get shortlisted by AI on local-business credibility, licence details and strong ratings. A sparky who lists their EC licence number and Cannington base in plain text becomes a name AI confidently names.",
    whatAIChecks: [
      "A Google Business Profile naming Cannington and listing your electrical services in plain text.",
      "Plain-text EC licence number and insurance, which AI quoted as a trust signal for the area.",
      "Recent reviews and clear emergency availability and pricing.",
    ],
    exampleQueries: [
      "Licensed local electrician in Cannington for power-point work?",
      "Who's a 24/7 emergency sparky near Cannington?",
      "Electrician in Cannington with no call-out fee during business hours?",
    ],
    faqs: [
      {
        q: "What gets a Cannington electrician recommended by AI?",
        a: "Local credibility and ratings. The engines named Cannington sparkies as trusted, family-owned locals and quoted licence numbers and review counts. Stating your EC licence, base and services in plain text gives AI exactly what it needs to recommend you.",
      },
      {
        q: "Does publishing my licence number help with AI?",
        a: "Yes. For Cannington an engine quoted a specific EC licence number as a trust signal. Publishing yours in plain text gives AI verifiable detail to cite, which makes you a safer, more confident recommendation.",
      },
      {
        q: "Why doesn't my Cannington electrical business appear in AI answers?",
        a: "Likely an incomplete profile, services in images, or thin reviews. AI recommends the readable, well-reviewed local sparky, so completing your profile and gathering recent reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Westside Electrical Perth, Gorey Electrical Service and Jim's Electrical, emphasising trusted, family-owned local service; Gemini led with Sarros Electrical (4.8 stars from 600-plus reviews) and Holdens Electrical Contracting; ChatGPT named Cannington-based Switched On Electrical & Communication (quoting its EC licence number) and Hilton Electrical (4.9 stars from 400-plus reviews). Local credibility, licensing, ratings and no-call-out-fee offers were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "electricians/midland": {
    intro:
      "In Midland, AI shortlists electricians using perfect ratings, family-run local credibility and fast, personal service across the Perth Hills and Swan Valley. A sparky offering same-day service and SMS quotes gets named.",
    whatAIChecks: [
      "A Google Business Profile covering Midland, the Perth Hills and Swan Valley in plain text.",
      "A high or perfect rating with recent reviews, which AI quotes when ranking Midland sparkies.",
      "Plain-text same-day availability, free quotes and any modern conveniences like SMS-photo quotes.",
    ],
    exampleQueries: [
      "Top-rated local electrician in Midland for house alterations?",
      "Who's a same-day sparky near Midland and the Swan Valley?",
      "Electrician in Midland for power points and lighting?",
    ],
    faqs: [
      {
        q: "What gets a Midland electrician recommended by AI?",
        a: "Perfect ratings and personal local service. The engines named Midland sparkies with 5.0 ratings, family-run credibility and fast response. Stating your local coverage, availability and reviews in plain text makes you an easy recommendation.",
      },
      {
        q: "Do modern conveniences like SMS quotes help with AI?",
        a: "They can. One engine praised a Midland electrician for SMS-photo quotes and same-day availability. Describing the convenient, responsive service you offer in plain text gives AI a concrete reason to single you out.",
      },
      {
        q: "Why isn't my Midland sparky business in AI answers?",
        a: "Likely a thin profile, image-locked services, or few reviews. AI builds answers from readable, well-reviewed listings, so completing your profile and gathering recent local reviews is the route in.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Pleiades Electrical Services, Voltaic Electrical and Boyan Electrical, plus No Shorts Electrical and Amco Electrical for house alterations; Gemini led with Swan Hills Electrical, Vital Power and Toptech Electrical Perth, all citing 5.0 ratings; ChatGPT highlighted a family-run local Midland electrician (since 2008, 4.9 from 120-plus reviews) offering SMS-photo quotes and same-day service. Perfect ratings, local credibility and responsiveness were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_ASSISTANTS],
  },

  "electricians/rockingham": {
    intro:
      "Rockingham electricians get shortlisted by AI on local reputation, A-grade licensing and strong ratings across the southern suburbs and Baldivis. A family-run sparky with 20-plus years locally and a 5.0 rating becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile covering Rockingham and nearby Baldivis and Golden Bay in plain text.",
      "Plain-text A-grade licensing and insurance, which AI cited as a credibility signal.",
      "A high review count and clear emergency availability.",
    ],
    exampleQueries: [
      "Best-rated local electrician in Rockingham for residential work?",
      "Who's an A-grade licensed sparky near Rockingham and Baldivis?",
      "Emergency electrician in Rockingham for a power outage?",
    ],
    faqs: [
      {
        q: "How does AI choose a Rockingham electrician to recommend?",
        a: "It rewards local reputation, licensing and ratings. The engines named Rockingham sparkies with 5.0 ratings, A-grade licences and decades of local service. Stating those clearly in plain text gives AI the credibility signals it needs to name you.",
      },
      {
        q: "Does long local experience help my Rockingham electrical business?",
        a: "Yes. One engine cited a Rockingham electrician's decades of experience and word-of-mouth references as a sign of consistent quality. Stating how long you've served the area in plain text strengthens AI's confidence in recommending you.",
      },
      {
        q: "Why doesn't my Rockingham sparky business appear in AI answers?",
        a: "Likely a thin or image-heavy profile, or too few recent reviews. AI recommends the readable, well-reviewed local electrician, so completing your profile and building reviews is the way back into its shortlist.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity said there is no single universal 'best' and recommended Sarros Electrical, Perth to Rockingham Electricians (A-grade licensed) and Gen Y Electrical (4.9 stars); Gemini led with Keegan & Son Electrical and Gen Y Electrical (5.0 from 200-plus reviews, 20-plus years' experience); ChatGPT named EMCAL Electrical and long-established Willow Electrics WA. Local reputation, A-grade licensing, ratings and word-of-mouth were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  // ---------------------------------------------------------------------------
  // AIR-CONDITIONING
  // ---------------------------------------------------------------------------
  "air-conditioning/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for an air-conditioning installer, it favours specialists with decades of experience and clear system expertise. An installer who spells out ducted, split-system and reverse-cycle work in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile listing split-system, ducted and reverse-cycle installs as plain text.",
      "Recent reviews and any brand accreditations, which AI repeats as credibility signals.",
      "Plain-text mention of workmanship warranties, fixed pricing and local technicians.",
    ],
    exampleQueries: [
      "Best air-conditioning installer in Subiaco for a ducted system?",
      "Who's a good air-con tech near Subiaco for a split-system install?",
      "Reverse-cycle air-conditioning installer in Subiaco with warranty?",
    ],
    faqs: [
      {
        q: "How does AI pick an air-conditioning installer in Subiaco?",
        a: "It rewards specialist experience and clear system detail. The engines named Subiaco installers with decades of history and listed ducted, split and reverse-cycle expertise. Spelling out your systems and warranties in plain text makes you an easy recommendation.",
      },
      {
        q: "Do brand accreditations help my Subiaco air-con business with AI?",
        a: "They can. One engine cited an installer's status as a top dealer for a major brand. Listing genuine accreditations in plain text gives AI concrete credibility to quote when it recommends you.",
      },
      {
        q: "Why isn't my Subiaco air-conditioning business in AI answers?",
        a: "Usually because your services or warranties sit in images, your profile is thin, or reviews are sparse. AI recommends what it can read, so a clear, well-reviewed plain-text listing wins over a polished but unreadable one.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Metropolitan Air Conditioning (25-plus years), David Stewart Refrigeration & Air Conditioning (based on Salvado Rd, Subiaco) and Needham Air; Gemini led with Mouritz (40-plus years, multiple #1 WA Fujitsu dealer awards) and Everest HVAC & R; ChatGPT named Needham Air and Metropolitan Air Conditioning, noting a fixed-price guarantee and 12-month workmanship warranty. Decades of experience, brand accreditation and warranties were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "air-conditioning/fremantle": {
    intro:
      "Ask AI for an air-conditioning installer in Fremantle and it leans on reputation scores, review volume and all-major-brands coverage. An installer with hundreds of reviews and clear coastal-suburb servicing becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile listing split, ducted and reverse-cycle installs plus the brands you fit, in plain text.",
      "A high review count, since AI quotes totals and reputation scores when ranking Fremantle installers.",
      "Plain-text mention of free quotes, maintenance and repairs alongside installation.",
    ],
    exampleQueries: [
      "Best-reviewed air-conditioning installer in Fremantle for a split system?",
      "Who's a good air-con tech near Fremantle for ducted reverse-cycle?",
      "Air-conditioning installer in Fremantle with free quotes?",
    ],
    faqs: [
      {
        q: "What makes AI recommend a Fremantle air-conditioning installer?",
        a: "Review volume and brand coverage. The engines named Fremantle installers with hundreds of reviews and listed the major brands they fit. Building review depth and listing your brands and systems in plain text are the most direct levers.",
      },
      {
        q: "Should my Fremantle air-con profile list the brands I install?",
        a: "Yes. AI repeatedly noted installers who cover all major brands. Listing the brands you fit in plain text widens the queries you can appear in and reassures AI you can match the homeowner's preferred system.",
      },
      {
        q: "Why doesn't my Fremantle air-conditioning business appear in AI answers?",
        a: "Likely a thin profile, services in images, or few reviews. AI assembles answers from readable, well-reviewed listings, so completing your profile and gathering recent reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity led with PremiAir Services WA as the top Fremantle-specific choice, plus Needhamair and SupaCool for wider Perth; Gemini named Mouritz (four decades of service, top Fujitsu dealer) and Dlux Air; ChatGPT ranked TOTAL AIR #1 (639 Google reviews), Aireflect (4.9 from 113 reviews) and Ford & Doonan. Review volume, reputation scores and all-major-brands coverage were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_ASSISTANTS],
  },

  "air-conditioning/joondalup": {
    intro:
      "In Joondalup, AI shortlists air-conditioning installers using award history, broad system ranges and strong northern-suburbs presence. An installer offering ducted, split and evaporative options with after-sales care gets named.",
    whatAIChecks: [
      "A Google Business Profile covering Joondalup and the northern suburbs with your system range in plain text.",
      "Recent reviews and any awards, which AI repeats when ranking Joondalup installers.",
      "Plain-text mention of the brands you fit and after-sales or solar options.",
    ],
    exampleQueries: [
      "Best air-conditioning installer in Joondalup for ducted reverse-cycle?",
      "Who's a good air-con tech near Joondalup for a split-system install?",
      "Award-winning air-conditioning company near Joondalup?",
    ],
    faqs: [
      {
        q: "How does AI choose an air-conditioning installer in Joondalup?",
        a: "It rewards awards, system range and local presence. The engines named Joondalup installers with award histories, broad system options and strong reputations. Listing your range, brands and any awards in plain text makes you an easy pick.",
      },
      {
        q: "Does offering ducted, split and evaporative options help with AI?",
        a: "Yes. AI highlighted installers covering the full range of systems. Listing every system type you fit in plain text means you appear for more queries, whether someone wants ducted, split or evaporative cooling.",
      },
      {
        q: "Why isn't my Joondalup air-con business in AI answers?",
        a: "Often because your ducted and split-system range isn't spelled out in plain text, or your northern-suburbs service area is too vague. AI picked Joondalup installers who listed every system type by name — match that level of detail and you move into contention.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity ranked Mouritz number one, followed by Ford & Doonan and Ambience Air, plus Sharp Air Conditioning and Air Conditioning HQ; Gemini led with Mouritz (40-plus years, money-back guarantee), Ford & Doonan Joondalup and AAA Air Conditioning; ChatGPT named Ambience Air Joondalup and Air HQ, both stressing broad system ranges and major brands. Awards, system breadth and after-sales care were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "air-conditioning/scarborough": {
    intro:
      "Scarborough is a case where AI distinguishes genuinely local 'cooling specialists' from wider Perth firms. An installer who states a real Scarborough or north-of-the-river presence in plain text is the one AI names with confidence.",
    whatAIChecks: [
      "A Google Business Profile tying you to Scarborough or the north-of-the-river area specifically.",
      "Plain-text system range, transparent pricing and the brands you install.",
      "Recent reviews, which AI quotes when ranking Scarborough installers.",
    ],
    exampleQueries: [
      "Local air-conditioning installer in Scarborough for a split system?",
      "Who's a good air-con tech near Scarborough with transparent pricing?",
      "Air-conditioning installer in Scarborough for reverse-cycle?",
    ],
    faqs: [
      {
        q: "Why does AI distinguish local Scarborough installers from Perth-wide ones?",
        a: "Because it prefers to name a business it can confirm serves the suburb. One engine singled out a 'local cooling specialist' for Scarborough. Stating your genuine Scarborough or north-of-river presence in plain text helps you be that confident local pick.",
      },
      {
        q: "Does transparent pricing help my Scarborough air-con business with AI?",
        a: "Yes. One engine praised an installer for publishing pricing openly on its website. Showing your 'from' pricing in plain text gives AI a concrete reason to recommend you and reassures the homeowner reading the answer.",
      },
      {
        q: "Why doesn't my Scarborough air-conditioning business appear in AI answers?",
        a: "Likely a thin profile, services in images, or few reviews. AI recommends readable, well-reviewed local listings, so completing your profile and building reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Simply Cool Air Conditioning as the top Scarborough-specific 'local cooling specialist', with Grundy Refrigeration & Air Conditioning, Dlux Air and Leading Air for wider Perth; Gemini led with ALFA AIR, Bruce Air, IC Airconditioning Services and Leading Air; ChatGPT highlighted family-run Air-Cond Installs WA (30-plus years, 1,000-plus installs) noting transparent published pricing. Local specialisation, transparent pricing and major-brand coverage were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_OVERVIEWS],
  },

  "air-conditioning/mount-lawley": {
    intro:
      "In Mount Lawley, AI favours air-conditioning installers with strong ratings, ARCtick certification and experience across the suburb's varied property types. An installer offering same-day service and a workmanship guarantee gets named.",
    whatAIChecks: [
      "A Google Business Profile listing split, ducted, evaporative and reverse-cycle work for Mount Lawley in plain text.",
      "A high rating with recent reviews and any ARCtick certification, which AI cites as a trust signal.",
      "Plain-text mention of same-day service, fixed pricing and a workmanship guarantee.",
    ],
    exampleQueries: [
      "Best air-conditioning installer in Mount Lawley for a split system?",
      "Who's an ARCtick-certified air-con tech near Mount Lawley?",
      "Same-day air-conditioning service in Mount Lawley?",
    ],
    faqs: [
      {
        q: "What gets a Mount Lawley air-conditioning installer recommended by AI?",
        a: "Ratings, certification and responsiveness. The engines named Mount Lawley installers with high ratings, ARCtick certification and same-day service. Stating those clearly in plain text gives AI the trust signals it needs to recommend you.",
      },
      {
        q: "Does ARCtick certification help my AI visibility?",
        a: "Yes. One engine cited ARCtick certification as a reason to recommend a Mount Lawley installer. Publishing yours in plain text gives AI a verifiable credential to quote, which makes you a safer recommendation.",
      },
      {
        q: "Why isn't my Mount Lawley air-con business in AI answers?",
        a: "Often because ARCtick certification, split-system brands and same-day service aren't stated in plain text. AI highlighted Mount Lawley installers who published credentials clearly — get those details out of images and into readable text and you give AI a reason to name you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity said there is no single 'best' for Mount Lawley and recommended Metropolitan Air Conditioning (25-plus years), Grundy Refrigeration & Air Conditioning and Dlux Air; Gemini led with East West Contractors and local expert Greener Race (Troy Wedgewood); ChatGPT named ARCtick-certified QuickAir (4.9 from 128-plus reviews) and Cyber Air Conditioning, noting $0 call-out fees. Ratings, certification, same-day service and guarantees were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "air-conditioning/cannington": {
    intro:
      "Cannington air-conditioning installers get shortlisted by AI on local longevity, combined electrical-and-HVAC capability and strong review counts. An installer with 20-plus years in the area and major-brand coverage becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile naming Cannington and listing your installation and servicing work in plain text.",
      "A high review count and any combined electrical licensing, which AI cited as an advantage.",
      "Plain-text mention of the brands you fit and free, no-obligation quotes.",
    ],
    exampleQueries: [
      "Local air-conditioning installer in Cannington for a split system?",
      "Who's a good air-con tech near Cannington that's also an electrician?",
      "Air-conditioning installer in Cannington with free quotes?",
    ],
    faqs: [
      {
        q: "How does AI choose an air-conditioning installer in Cannington?",
        a: "It rewards local longevity, capability and reviews. The engines named Cannington installers with 20-plus years locally, combined electrical-and-HVAC skills and major-brand coverage. Listing those in plain text makes you an easy recommendation.",
      },
      {
        q: "Does being a licensed electrician too help my Cannington air-con business?",
        a: "Yes. AI noted installers who are also qualified electricians as offering seamless installs. If you hold both, state it in plain text so AI can present it as a reason to choose you over a single-trade competitor.",
      },
      {
        q: "Why doesn't my Cannington air-conditioning business appear in AI answers?",
        a: "Often because your dual electrical-and-HVAC capability isn't visible in plain text, or your Cannington service area isn't stated. AI named installers who made both credentials readable — spell out your combined trade licence, brand range and local base to close that gap.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Gildan Air & Electrical, Metropolitan Air Conditioning (25-plus years) and SupaCool, stressing licensed expertise; Gemini led with RCD Electrical & Air Conditioning (20-plus years in Cannington, major Australian brands) and Dlux Air; ChatGPT named RCD Electrical & Air Conditioning and WA Air Group, noting combined electrical-and-HVAC capability. Local longevity, dual-trade capability and major-brand coverage were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "air-conditioning/midland": {
    intro:
      "In Midland, AI shortlists air-conditioning installers using decades of experience, top reputation scores and local branch presence across the north-east suburbs. An installer described as a market leader with a 5.0 rating gets named.",
    whatAIChecks: [
      "A Google Business Profile covering Midland, the Perth Hills and Swan Valley with your system range in plain text.",
      "A high review count and reputation score, which AI quotes when ranking Midland installers.",
      "Plain-text mention of evaporative, ducted and split-system expertise plus thorough testing.",
    ],
    exampleQueries: [
      "Best air-conditioning installer in Midland for evaporative cooling?",
      "Who's a good air-con tech near Midland for a ducted system?",
      "Top-rated air-conditioning company in Midland?",
    ],
    faqs: [
      {
        q: "What gets a Midland air-conditioning installer recommended by AI?",
        a: "Experience, reputation and system breadth. The engines named Midland installers with 45-plus years' experience and top reputation scores, and praised those strong in evaporative cooling. Listing your range and history in plain text makes you an easy pick.",
      },
      {
        q: "Does evaporative-cooling expertise help in Midland?",
        a: "Yes. AI specifically called out a Midland installer as a market leader in evaporative cooling. Naming the system types you specialise in, in plain text, makes your relevance obvious for the climate and homes in the area.",
      },
      {
        q: "Why isn't my Midland air-con business in AI answers?",
        a: "Often because evaporative-cooling expertise and Perth Hills coverage aren't stated in plain text. AI singled out Midland installers who named their system specialisms and reputation scores — document those clearly and you give AI the confidence to name you.",
      },
    ],
    aiSnapshot: {
      summary:
        "All three engines led with Mouritz for Midland, citing 45-plus years' experience and a reputation as a market leader in evaporative cooling. Perplexity added Ford & Doonan and WestOz Trades (ranked #1 HVAC in Midland 2026, 5.0 from 964 reviews); Gemini reinforced Mouritz and Ford & Doonan Midland; ChatGPT named Mouritz and Ambience Air Midland. Decades of experience, reputation scores and system breadth were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_ASSISTANTS],
  },

  "air-conditioning/rockingham": {
    intro:
      "Rockingham air-conditioning installers get shortlisted by AI on award history, local branch presence and tailored advice for coastal homes. A multi-award-winning installer servicing Baldivis, Safety Bay and Warnbro gets named.",
    whatAIChecks: [
      "A Google Business Profile covering Rockingham and nearby Baldivis, Safety Bay and Warnbro in plain text.",
      "Recent reviews and any awards, which AI repeats when ranking Rockingham installers.",
      "Plain-text mention of reverse-cycle, ducted and evaporative options plus tailored advice.",
    ],
    exampleQueries: [
      "Best air-conditioning installer in Rockingham for ducted reverse-cycle?",
      "Who's a good air-con tech near Rockingham and Baldivis?",
      "Award-winning air-conditioning company near Rockingham?",
    ],
    faqs: [
      {
        q: "How does AI choose an air-conditioning installer in Rockingham?",
        a: "It rewards awards, local presence and tailored advice. The engines named Rockingham installers with award histories, local branches and personalised consultation. Listing your range, awards and service area in plain text makes you an easy recommendation.",
      },
      {
        q: "Does tailored advice for coastal homes help my AI visibility?",
        a: "Yes. One engine praised a Rockingham installer for advice tailored to a home's orientation and insulation. Describing the consultative, coastal-specific service you offer in plain text positions you as the thoughtful local choice AI recommends.",
      },
      {
        q: "Why doesn't my Rockingham air-con business appear in AI answers?",
        a: "Often because award history, tailored coastal-home advice and Baldivis coverage aren't visible in plain text. AI favoured Rockingham installers who named those differentiators clearly — publish your awards, service area and consultation process and you become a confident local pick.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Mouritz, Total Kooling Solutions, Ambience Air and Watts On Electrical; Gemini led with multi-award-winning Ambience Air Rockingham (servicing Safety Bay, Baldivis, Waikiki and Warnbro) and AAPL Air Conditioning; ChatGPT named AAPL Air Conditioning (since 2008, tailored advice) and COYCO Electrical, Aircon & Solar. Awards, local branch presence and tailored coastal advice were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  // ---------------------------------------------------------------------------
  // BUILDERS
  // ---------------------------------------------------------------------------
  "builders/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for a builder, it favours award-winning custom and character-renovation specialists. A builder who states their luxury, heritage or extension expertise and awards in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing custom builds, character renovations and extensions in plain text.",
      "Recent reviews, awards and completed local projects, which AI repeats as credibility signals.",
      "Plain-text mention of your build process, registration and the suburbs you work in.",
    ],
    exampleQueries: [
      "Best custom home builder in Subiaco for a character renovation?",
      "Who's a good builder near Subiaco for a heritage home extension?",
      "Award-winning luxury home builder in Subiaco?",
    ],
    faqs: [
      {
        q: "How does AI pick a builder to recommend in Subiaco?",
        a: "It rewards specialism and awards. The engines named Subiaco builders known for custom luxury homes and character renovations, often citing award counts. Stating your specialty, awards and local projects in plain text makes you an easy recommendation.",
      },
      {
        q: "Do awards really help my Subiaco building business with AI?",
        a: "Yes. One engine cited a builder's 40-plus awards as a reason to recommend them. Publishing your genuine awards and recognitions in plain text gives AI concrete credibility to quote on your behalf.",
      },
      {
        q: "Why isn't my Subiaco building business in AI answers?",
        a: "Usually because your projects and credentials sit in image galleries, your profile is thin, or reviews are sparse. AI recommends what it can read, so a clear, well-documented plain-text presence wins.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Sertorio Homes, Devrite Homes of Distinction (40-plus awards) and Rubix Homes for custom builds and character renovations; Gemini led with Devrite Homes of Distinction and Sertorio Homes (40-plus years); ChatGPT named Luxus Personal Builder, Mulberry Homes (heritage specialists) and Amerex Renovations. Custom and heritage specialism, award counts and personalised, low-volume project focus were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_ASSISTANTS],
  },

  "builders/fremantle": {
    intro:
      "Ask AI for a builder in Fremantle and it leans on review scores plus expertise in the suburb's heritage limestone and Federation styles. A builder who names those styles and their local experience in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing custom homes, renovations and heritage styles in plain text.",
      "A high review count and reputation score, which AI quotes when ranking Fremantle builders.",
      "Plain-text mention of Federation, Hampton or limestone-cottage expertise and your service area.",
    ],
    exampleQueries: [
      "Best custom home builder in Fremantle for a limestone cottage?",
      "Who's a good builder near Fremantle for a Federation-style renovation?",
      "Boutique luxury home builder in Fremantle?",
    ],
    faqs: [
      {
        q: "What makes AI recommend a Fremantle builder?",
        a: "Reviews and heritage-style expertise. The engines named Fremantle builders with strong ratings and specific Federation, Hampton and limestone-cottage skills. Listing your styles and local experience in plain text makes your relevance obvious to AI.",
      },
      {
        q: "Should my Fremantle building site name the styles I build?",
        a: "Yes. AI specifically noted builders skilled in Fremantle's heritage and limestone styles. Naming the architectural styles you specialise in, in plain text, helps you appear for the exact queries Freo homeowners ask.",
      },
      {
        q: "Why doesn't my Fremantle building business appear in AI answers?",
        a: "Likely projects locked in image galleries, a thin profile, or few reviews. AI recommends readable, well-reviewed listings, so documenting your projects in plain text and gathering reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity led with ModernizeFremantle (5 stars from 22 reviews) and boutique Maughan Building, noting Federation, Hampton and limestone-cottage expertise; Gemini named DNR Opulent Homes, Maughan Building Company and ROE Builders; ChatGPT highlighted top-rated trades like Slide Master Aust and CMA Carpentry, plus boutique Sustainabuild WA. Review scores, heritage-style specialism and boutique custom focus were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_OVERVIEWS],
  },

  "builders/joondalup": {
    intro:
      "In Joondalup, AI shortlists builders using award recognition, project-builder scale and strong client testimonials across the northern suburbs. A builder with awards or large volume and clear local projects gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing new builds, custom homes and renovations for Joondalup in plain text.",
      "Recent reviews, awards and completed local projects, which AI repeats as credibility signals.",
      "Plain-text mention of your build process, registration and the northern suburbs you cover.",
    ],
    exampleQueries: [
      "Best new home builder in Joondalup?",
      "Who's a good custom home builder near Joondalup for a luxury family home?",
      "Award-winning builder in Joondalup for renovations?",
    ],
    faqs: [
      {
        q: "How does AI choose a builder to recommend in Joondalup?",
        a: "It rewards awards, scale and testimonials. The engines named Joondalup builders ranging from award-winning custom specialists to large project builders, citing client praise. Stating your awards, projects and process in plain text makes you an easy pick.",
      },
      {
        q: "Do client testimonials help my Joondalup building business with AI?",
        a: "Yes. AI quoted testimonials describing clients raving about their builder years after completion. Encouraging and publishing detailed reviews in plain text gives AI exactly the kind of evidence it repeats when recommending you.",
      },
      {
        q: "Why isn't my Joondalup building business in AI answers?",
        a: "Often because award count, client testimonials and your northern-suburbs project history are locked in a gallery rather than readable text. AI named Joondalup builders who made all three visible — move those details into plain text and you give AI what it needs to cite you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended DevCo Builders, Ventura Homes (most awarded builder in WA), Dale Alcock Homes and Devrite; Gemini led with Devrite Homes of Distinction (40-plus awards), DNR Opulent Homes and Kameleon Homes; ChatGPT named Joondalup-based Buildmark, Devrite Homes of Distinction and 383 Design Homes. Award recognition, builder scale and glowing client testimonials were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "builders/scarborough": {
    intro:
      "Scarborough builders get shortlisted by AI on a mix of top hipages ratings, award-winning custom specialists and coastal-corridor expertise. A builder who states their coastal experience and reviews in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing custom homes, coastal builds and renovations for Scarborough in plain text.",
      "A high review count and any awards, which AI quotes when ranking Scarborough builders.",
      "Plain-text mention of your build process and northern coastal service area.",
    ],
    exampleQueries: [
      "Best custom home builder in Scarborough for a coastal home?",
      "Who's a good builder near Scarborough for a new two-storey build?",
      "Award-winning home builder in Scarborough?",
    ],
    faqs: [
      {
        q: "What gets a Scarborough builder recommended by AI?",
        a: "Ratings, awards and coastal expertise. The engines named Scarborough builders from top-rated hipages firms to award-winning custom specialists and coastal-corridor experts. Listing your reviews, awards and coastal experience in plain text makes you an easy pick.",
      },
      {
        q: "Does coastal-corridor expertise help my Scarborough building business?",
        a: "Yes. One engine highlighted a builder specialising in homes along the northern coastal corridor including Scarborough. Naming the coastal conditions and locations you build in, in plain text, makes your relevance obvious to AI.",
      },
      {
        q: "Why doesn't my Scarborough building business appear in AI answers?",
        a: "Often because coastal-corridor experience, hipages ratings and two-storey build detail are sitting in a photo gallery rather than readable text. AI named Scarborough builders who put those credentials in plain text — do the same and you become the local answer AI can actually quote.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Livin Homes, NVS Construction, Devrite (40-plus awards), Pappalia Building and Design and G.J. Gardner Homes Scarborough; Gemini led with Devrite Homes of Distinction and national builder G.J. Gardner Homes; ChatGPT highlighted coastal-corridor specialist WABC (Western Australia Building Company) and Devrite Homes of Distinction. Ratings, awards, national-brand reliability and coastal expertise were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "builders/mount-lawley": {
    intro:
      "In Mount Lawley, AI strongly favours heritage and character-renovation specialists alongside award-winning custom builders. A builder who names their heritage, Federation or interwar-bungalow expertise in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing heritage renovations, extensions and second-storey additions in plain text.",
      "Recent reviews, awards and completed Mount Lawley projects, which AI repeats as credibility signals.",
      "Plain-text mention of your design-and-build process and character-home expertise.",
    ],
    exampleQueries: [
      "Best heritage renovation builder in Mount Lawley?",
      "Who's a good builder near Mount Lawley for a Federation home extension?",
      "Custom home builder in Mount Lawley for a character street?",
    ],
    faqs: [
      {
        q: "How does AI choose a builder to recommend in Mount Lawley?",
        a: "It strongly rewards heritage and character expertise. The engines led with Mount Lawley's most-awarded heritage renovation specialist and named custom builders skilled on character homes. Stating your heritage expertise and awards in plain text makes you an easy pick.",
      },
      {
        q: "Does heritage specialism help my Mount Lawley building business with AI?",
        a: "Yes, more than almost anything. AI repeatedly favoured builders who handle Mount Lawley's Federation and interwar character homes. Naming that specialism in plain text aligns you directly with how locals ask AI about renovations.",
      },
      {
        q: "Why isn't my Mount Lawley building business in AI answers?",
        a: "Likely projects in image galleries, a thin profile, or few reviews. AI recommends readable, well-reviewed listings, so documenting your heritage work in plain text and gathering reviews is the route in.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity led with Addstyle Master Builders (Perth's most awarded heritage renovation specialist, 33-plus years), plus Devrite (40-plus awards) and Colgar Homes; Gemini named Devrite Homes of Distinction, heritage specialist MJD Projects and Metro Building Services; ChatGPT highlighted Mount Lawley-based Innova Builders and Devrite Homes of Distinction for sloping-block work. Heritage and character specialism, awards and personalised service were the dominant themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_ASSISTANTS],
  },

  "builders/cannington": {
    intro:
      "Cannington builders get shortlisted by AI on high review counts, established local presence and value-for-money reputation. A builder with a strong rating across hundreds of reviews and a Cannington base becomes a name AI repeats.",
    whatAIChecks: [
      "A Google Business Profile and website naming Cannington and listing new builds, renovations and extensions in plain text.",
      "A high review count, since AI quotes totals like '361 reviews' when ranking Cannington builders.",
      "Plain-text mention of your build process, registration and the suburbs you cover.",
    ],
    exampleQueries: [
      "Best-reviewed builder in Cannington for a new home?",
      "Who's a good local builder near Cannington for a custom build?",
      "Builder in Cannington for an extension or renovation?",
    ],
    faqs: [
      {
        q: "What gets a Cannington builder recommended by AI?",
        a: "Review volume and local presence. The engines named Cannington builders with strong ratings across hundreds of reviews and established local bases. Building that review base and stating your Cannington presence in plain text are the most direct levers.",
      },
      {
        q: "Does a local Cannington base help my building business with AI?",
        a: "Yes. AI named several builders based in or near East Cannington as convenient, family-owned locals. Stating your base and how long you've worked in the area in plain text strengthens AI's confidence in recommending you.",
      },
      {
        q: "Why doesn't my Cannington building business appear in AI answers?",
        a: "Often because your East Cannington base, review count and family-owned credibility aren't stated in plain text. AI leaned on those signals when naming Cannington builders — write them out clearly on your profile and site so AI has something concrete to quote.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Western Building Pty Ltd (4.8 stars from 361 reviews), Division One Projects (5.0 from 39 reviews), JMB Coastal and Plunkett Homes; Gemini led with Western Building Pty Ltd, Division One Projects, First Homes Australia and Eco Homes Group, all citing high ratings; ChatGPT named East Cannington-based Boda Building Group and family-owned GV Constructions. Review volume, established local presence and value were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "builders/midland": {
    intro:
      "In Midland, AI shortlists builders using perfect ratings, local presence and a mix of custom-home and renovation specialists across the north-east. A builder physically based in Midland with strong reviews gets named.",
    whatAIChecks: [
      "A Google Business Profile and website naming Midland and listing custom homes, granny flats and renovations in plain text.",
      "A high rating with recent reviews, which AI quotes when ranking Midland builders.",
      "Plain-text mention of your build process, registration and local Midland and Swan Valley coverage.",
    ],
    exampleQueries: [
      "Best local builder in Midland for a custom home?",
      "Who's a good builder near Midland for a granny flat?",
      "Top-rated home builder in Midland for renovations?",
    ],
    faqs: [
      {
        q: "How does AI choose a builder to recommend in Midland?",
        a: "It rewards ratings and genuine local presence. The engines named Midland builders with 5.0 ratings and physically based in the area, useful for site visits. Stating your Midland base, services and reviews in plain text makes you an easy pick.",
      },
      {
        q: "Does being physically based in Midland help with AI?",
        a: "Yes. One engine noted a builder being located in Midland as convenient for site visits and local project management. Stating your local address and coverage in plain text strengthens AI's confidence in naming you.",
      },
      {
        q: "Why isn't my Midland building business in AI answers?",
        a: "Often because your physical Midland address, custom-home and granny-flat range, and star rating aren't visible in plain text. AI named builders who made those details readable — put your local base, project types and recent reviews front and centre so AI can place and recommend you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Midland-based Armando Guevara Acevedo (5.0 from 40 ratings), Avon Homes, Tascone Design and highly recommended Blueprint and Content Living; Gemini led with Sarandis Design, Oswald Homes, New Choice Homes and Plunkett Homes; ChatGPT highlighted Weststar Constructions (granny flats and renovations) and Aveling Homes, led by a Midland native. Perfect ratings, local presence and varied custom-and-renovation services were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "builders/rockingham": {
    intro:
      "Rockingham builders get shortlisted by AI on award recognition, local-builder credibility and large project-builder scale across the southern suburbs. A builder with awards or decades of local experience and clear reviews gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing new builds, custom homes, extensions and renovations for Rockingham in plain text.",
      "Recent reviews, awards and any HIA membership, which AI repeats as credibility signals.",
      "Plain-text mention of your build process and southern-suburbs and Baldivis coverage.",
    ],
    exampleQueries: [
      "Best custom home builder in Rockingham?",
      "Who's a good local builder near Rockingham for a new build?",
      "Builder in Rockingham for an extension or demolish-and-build?",
    ],
    faqs: [
      {
        q: "What gets a Rockingham builder recommended by AI?",
        a: "Awards, local credibility and scale. The engines named Rockingham builders from award-winning custom specialists to long-established local firms and large project builders. Listing your awards, experience and reviews in plain text makes you an easy pick.",
      },
      {
        q: "Does HIA membership help my Rockingham building business with AI?",
        a: "It can. One engine cited a builder's Housing Industry Association membership as underscoring its commitment to quality. Stating genuine memberships and accreditations in plain text gives AI verifiable credibility to quote.",
      },
      {
        q: "Why doesn't my Rockingham building business appear in AI answers?",
        a: "Often because award history, HIA membership and southern-suburbs project experience are buried in photos rather than readable text. AI cited those signals when naming Rockingham builders — document them plainly on your profile and site so AI has credible detail to repeat.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Devrite Homes of Distinction (40-plus awards), local builder Compass Homes WA, Summit Homes Group (48-plus years) and Celebration Homes; Gemini led with Compass Homes WA (28-plus years, HIA member) and Zenecon; ChatGPT named award-winning Rockingham-based Edward Brewer Homes and family-owned Shelford Quality Homes (since 1991). Awards, local credibility, builder scale and HIA membership were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  // ---------------------------------------------------------------------------
  // LANDSCAPERS
  // ---------------------------------------------------------------------------
  "landscapers/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for a landscaper, it favours those who speak to the suburb's specific climate, soil and heritage context. A landscaper who names that local expertise and their services in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, paving, retaining, reticulation and turf work in plain text.",
      "Recent reviews and any local awards, which AI repeats as credibility signals.",
      "Plain-text mention of Subiaco's climate, soil or heritage context and your service area.",
    ],
    exampleQueries: [
      "Best landscaper in Subiaco for a front garden makeover?",
      "Who's a good landscaper near Subiaco for paving and retaining walls?",
      "Landscaper in Subiaco for artificial lawn and reticulation?",
    ],
    faqs: [
      {
        q: "How does AI pick a landscaper to recommend in Subiaco?",
        a: "It rewards local relevance and clear services. The engines favoured landscapers who address Subiaco's climate, soil and heritage context and list their full service range. Naming that local expertise in plain text makes you an easy recommendation.",
      },
      {
        q: "Do local awards help my Subiaco landscaping business with AI?",
        a: "They can. One engine cited a landscaper's local business award as a sign of excellence. Publishing genuine awards in plain text gives AI concrete credibility to quote when it recommends you.",
      },
      {
        q: "Why isn't my Subiaco landscaping business in AI answers?",
        a: "Usually because your services and projects sit in image galleries, your profile is thin, or reviews are sparse. AI recommends what it can read, so a clear, well-documented plain-text presence wins.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity said there is no single definitive ranking for Subiaco and named Perth Landscape Guys (citing Subiaco-specific climate and soil expertise), Tom's Landscaping and Perth Landscapes; Gemini led with award-recognised Gusto Landscape & Garden Perth and Perth Landscape Guys; ChatGPT highlighted western-suburbs specialist AV Landscape and Subiaco-based West Coast Garden Maintenance. Local climate and soil expertise, full service ranges and awards were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_AI_ASSISTANTS],
  },

  "landscapers/fremantle": {
    intro:
      "Ask AI for a landscaper in Fremantle and it leans on local experience with heritage limestone, compact inner-city blocks and coastal conditions. A landscaper who names that Freo-specific expertise in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, limestone walls, paving and outdoor-living work in plain text.",
      "Recent reviews and completed local projects, which AI repeats as credibility signals.",
      "Plain-text mention of Fremantle's heritage, limestone or coastal context and your service area.",
    ],
    exampleQueries: [
      "Best landscaper in Fremantle for a limestone retaining wall?",
      "Who's a good landscaper near Fremantle for a compact courtyard?",
      "Landscaper in Fremantle for a coastal native garden?",
    ],
    faqs: [
      {
        q: "What makes AI recommend a Fremantle landscaper?",
        a: "Local, context-specific expertise. The engines named Fremantle landscapers who understand heritage limestone, inner-city blocks and coastal conditions. Naming that Freo-specific experience in plain text makes your relevance obvious to AI and homeowners.",
      },
      {
        q: "Should my Fremantle landscaping site mention limestone and coastal work?",
        a: "Yes. AI specifically praised landscapers skilled with Fremantle's limestone and coastal gardens. Listing the local materials and conditions you work with, in plain text, helps you appear for the exact queries Freo locals ask.",
      },
      {
        q: "Why doesn't my Fremantle landscaping business appear in AI answers?",
        a: "Often because limestone-wall work, coastal-garden experience and heritage-block credentials sit in photos rather than readable text. AI named Freo landscapers who described that local expertise plainly — put your Fremantle-specific materials and conditions into words so AI can quote them.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Luke's Landscaping Co. (a 'Top Pick' with Fremantle experience), Square One Landscapes (15 years) and See Design Studio for landscape architecture; Gemini led with LWA Landscapes, citing expertise in Fremantle's heritage limestone cottages and coastal influences, plus Luke's Landscaping Co.; ChatGPT highlighted Boobook Landscaping (limestone and native gardens) and LWA Landscapes. Heritage limestone, coastal and inner-city expertise were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "landscapers/joondalup": {
    intro:
      "In Joondalup, AI shortlists landscapers using top-10 local listings, strong reviews and water-wise credentials suited to the northern suburbs. A landscaper with a high rating and tidy, detailed reputation gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, paving, retaining, turf and reticulation work in plain text.",
      "A high review count and any Waterwise endorsement, which AI repeats as a credibility signal.",
      "Plain-text mention of your northern-suburbs service area and project process.",
    ],
    exampleQueries: [
      "Best landscaper in Joondalup for a backyard makeover?",
      "Who's a good landscaper near Joondalup for water-wise irrigation?",
      "Top-rated landscaper in Joondalup for paving and turf?",
    ],
    faqs: [
      {
        q: "How does AI choose a landscaper to recommend in Joondalup?",
        a: "It rewards ratings, tidiness reputation and water-wise credentials. The engines named Joondalup landscapers with high reviews, detailed work and Waterwise endorsements. Listing your services, reviews and credentials in plain text makes you an easy pick.",
      },
      {
        q: "Does a Waterwise endorsement help my Joondalup landscaping business?",
        a: "Yes. One engine cited a landscaper's Waterwise partner status as a credibility signal. If you hold water-wise or similar credentials, state them in plain text so AI can quote them when recommending you.",
      },
      {
        q: "Why isn't my Joondalup landscaping business in AI answers?",
        a: "Often because Waterwise credentials, reticulation expertise and your northern-suburbs service area aren't stated in plain text. AI picked out Joondalup landscapers who made those details readable — write them into your profile and site so AI has something specific to cite.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended DJC Landscapes (praised for attention to detail and tidiness), Joondalup-based Silverfern Landscaping, Gardens Australia and Luke's Landscaping; Gemini led with Kinetic Landscaping (a Waterwise partner) and MPM Perth; ChatGPT named locally owned Land & Tree Landscaping (5.0 from 90-plus reviews) and LWA Landscapes. High ratings, tidiness reputation and water-wise credentials were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "landscapers/scarborough": {
    intro:
      "Scarborough landscapers get shortlisted by AI on strong local ratings and pool, coastal and custom-design expertise. A landscaper based in or clearly servicing Scarborough with a high rating gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, paving, pool landscaping and turf work in plain text.",
      "A high review count, which AI quotes when ranking Scarborough landscapers.",
      "Plain-text mention of your coastal-suburb service area and project process.",
    ],
    exampleQueries: [
      "Best landscaper in Scarborough for a pool surround?",
      "Who's a good landscaper near Scarborough for a coastal garden?",
      "Top-rated landscaper in Scarborough for custom design?",
    ],
    faqs: [
      {
        q: "What gets a Scarborough landscaper recommended by AI?",
        a: "Strong local ratings and clear specialism. The engines named Scarborough landscapers with high reviews and pool, coastal and custom-design expertise. Listing your services, service area and reviews in plain text makes you an easy recommendation.",
      },
      {
        q: "Does pool-landscaping expertise help my Scarborough business with AI?",
        a: "Yes. AI specifically noted landscapers skilled at transforming pool areas. Naming the pool and outdoor-living work you do, in plain text, helps you appear for the queries coastal Scarborough homeowners commonly ask.",
      },
      {
        q: "Why doesn't my Scarborough landscaping business appear in AI answers?",
        a: "Often because pool-surround work, coastal-garden design and your Scarborough service area are locked in before-and-after photos rather than readable text. AI named landscapers who spelled those things out — describe the specific coastal and pool projects you do and you give AI a reason to recommend you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Principal Landscapes and Scarborough-listed PSS Landscaping, alongside Contour Landscapes and Landscape By Design; Gemini led with Landscape By Design (30-plus years, custom and pool work) and Luke's Landscaping Co.; ChatGPT highlighted Scarborough-based Mint Landscapes (4.9 from 69 reviews) and LWA Landscapes. Local ratings, custom design and pool and coastal expertise were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_OVERVIEWS],
  },

  "landscapers/mount-lawley": {
    intro:
      "In Mount Lawley, AI favours landscapers with award-winning design credentials and full design-and-construct services suited to character properties. A landscaper who names that design expertise in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, paving, retaining, artificial lawn and reticulation work in plain text.",
      "Recent reviews and any design awards, which AI repeats as credibility signals.",
      "Plain-text mention of your design-and-construct process and local service area.",
    ],
    exampleQueries: [
      "Best landscaper in Mount Lawley for a garden redesign?",
      "Who's a good landscaper near Mount Lawley for paving and retaining?",
      "Award-winning landscape designer in Mount Lawley?",
    ],
    faqs: [
      {
        q: "How does AI choose a landscaper to recommend in Mount Lawley?",
        a: "It rewards design credentials and full-service capability. The engines named Mount Lawley landscapers known for design innovation and end-to-end design-and-construct work. Stating your design expertise and services in plain text makes you an easy pick.",
      },
      {
        q: "Do design awards help my Mount Lawley landscaping business with AI?",
        a: "Yes. One engine cited an award-winning landscape contractor as a top choice. Publishing genuine design awards in plain text gives AI concrete credibility to quote when recommending you.",
      },
      {
        q: "Why isn't my Mount Lawley landscaping business in AI answers?",
        a: "Often because your design-and-construct process, award credentials and character-property experience aren't described in readable text. AI favoured Mount Lawley landscapers who named that design expertise clearly — document your end-to-end process and any awards in plain text so AI has a reason to cite you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended Tim Davies Landscaping (a leading design-and-construction practice), Perth Landscaping Pros (ranked #1 Mount Lawley) and award-winning Axis Landscape Solutions; Gemini led with Earthcreations, DJC Landscapes and Luke's Landscaping Co.; ChatGPT named Perth Landscaping Pros (full local service range) and sustainable specialist Mitch's Gardening. Design credentials, full design-and-construct services and awards were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "landscapers/cannington": {
    intro:
      "Cannington landscapers get shortlisted by AI on local community recommendations, strong reviews and clear maintenance-and-construction services. A landscaper named by locals and clearly servicing Cannington gets named.",
    whatAIChecks: [
      "A Google Business Profile and website naming Cannington and listing design, maintenance and construction work in plain text.",
      "A high review count, which AI quotes when ranking Cannington landscapers.",
      "Plain-text mention of your service range and how long you've worked in the area.",
    ],
    exampleQueries: [
      "Best landscaper in Cannington for garden maintenance?",
      "Who's a good local landscaper near Cannington for a backyard makeover?",
      "Landscaper in Cannington for paving and turf?",
    ],
    faqs: [
      {
        q: "What gets a Cannington landscaper recommended by AI?",
        a: "Local recommendations and reviews. The engines named Cannington landscapers highlighted by local community members and trusted by major builders. Stating your Cannington presence, services and reviews in plain text makes you an easy recommendation.",
      },
      {
        q: "Does being trusted by builders help my Cannington landscaping business?",
        a: "It can. One engine noted a landscaper trusted by a major local builder for years. Mentioning genuine builder relationships and long local service in plain text strengthens AI's confidence in recommending you.",
      },
      {
        q: "Why doesn't my Cannington landscaping business appear in AI answers?",
        a: "Often because local community recommendations, builder relationships and your Cannington service history aren't in readable text. AI named landscapers whose local credibility was verifiable in plain text — state how long you've worked the area and any builder partnerships so AI has something concrete to repeat.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity recommended C Polished Gardens, Namsel and Greenworks WA (citing local resident recommendations) plus Cannington-servicing Greenwest Landscaping; Gemini led with Superior LSR and LWA Landscapes (in Cannington since 2005, trusted by builders); ChatGPT named Luke's Landscaping Co. (200-plus reviews), LWA Landscapes and 30-year specialist Greenwest Landscaping. Local recommendations, reviews and builder relationships were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "landscapers/midland": {
    intro:
      "In Midland, AI shortlists landscapers using benchmark design-and-construct reputations, water-wise credentials and long local experience across the north-east. A landscaper with 30 years locally or Waterwise endorsements gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing design, paving, retaining, turf and reticulation work in plain text.",
      "Recent reviews and any Waterwise endorsement, which AI repeats as credibility signals.",
      "Plain-text mention of your local Midland experience and project process.",
    ],
    exampleQueries: [
      "Best landscaper in Midland for a full garden transformation?",
      "Who's a good landscaper near Midland for water-wise design?",
      "Landscaper in Midland for paving and retaining walls?",
    ],
    faqs: [
      {
        q: "How does AI choose a landscaper to recommend in Midland?",
        a: "It rewards reputation, water-wise credentials and local experience. The engines named Midland landscapers described as benchmarks, with Water Corporation Waterwise endorsements and decades of local work. Listing those in plain text makes you an easy pick.",
      },
      {
        q: "Do water-wise credentials help my Midland landscaping business with AI?",
        a: "Yes. One engine cited Water Corporation Waterwise endorsements as a reason to recommend a Midland landscaper. Stating genuine water-wise credentials in plain text gives AI a concrete, verifiable signal to quote.",
      },
      {
        q: "Why isn't my Midland landscaping business in AI answers?",
        a: "Often because Water Corporation Waterwise endorsements, decades of north-east experience and integrated design-and-construct capability aren't visible in plain text. AI cited those signals for Midland landscapers — state your credentials and local track record clearly so AI can present you as the benchmark choice.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named AllState Landscaping (a benchmark for integrated design and construction), Kinetic Landscaping (Water Corporation Waterwise endorsements), Landscape By Design (30 years), Luke's Landscaping and Tim Davies Landscaping; Gemini led with Greenwest Landscaping and Luke's Landscaping Co.; ChatGPT highlighted Luke's Landscaping Co. (4.8 from 200-plus reviews). Benchmark reputations, water-wise credentials and long local experience were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "landscapers/rockingham": {
    intro:
      "Rockingham landscapers get shortlisted by AI on local family-run credibility, 20-plus years' experience and pool and paving expertise across Rockingham and Baldivis. A landscaper with strong reviews and repeat-business reputation gets named.",
    whatAIChecks: [
      "A Google Business Profile and website covering Rockingham and Baldivis with design, paving, turf and reticulation in plain text.",
      "A high review count, which AI quotes when ranking Rockingham landscapers.",
      "Plain-text mention of your years of local experience and project process.",
    ],
    exampleQueries: [
      "Best landscaper in Rockingham for a pool paving project?",
      "Who's a good local landscaper near Rockingham and Baldivis?",
      "Landscaper in Rockingham for reticulation and turf?",
    ],
    faqs: [
      {
        q: "What gets a Rockingham landscaper recommended by AI?",
        a: "Family-run credibility, experience and reviews. The engines named Rockingham landscapers with 20-plus years locally, strong ratings and repeat-business reputations. Stating your local experience, services and reviews in plain text makes you an easy pick.",
      },
      {
        q: "Does repeat-business reputation help my Rockingham landscaping business?",
        a: "Yes. One engine cited frequent repeat business as evidence of a landscaper's strong reputation. Encouraging reviews that mention returning customers, in plain text, gives AI exactly the kind of signal it repeats when recommending you.",
      },
      {
        q: "Why doesn't my Rockingham landscaping business appear in AI answers?",
        a: "Often because your 20-plus years' local experience, Baldivis coverage and pool-paving work are shown in before-and-after photos rather than readable text. AI named Rockingham landscapers who put those details into words — describe your track record and service area in plain text so AI can confidently recommend you.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Looking Good Landscaping (Rockingham and Baldivis experts, 20-plus years), Luke's Landscaping Co. and family-run CK Landscaping; Gemini led with Luke's Landscaping Co. (4.8 from 200-plus reviews) and Looking Good Landscaping; ChatGPT highlighted Rockingham-based Ambajaks (140-plus reviews) and Looking Good Landscaping. Family-run credibility, 20-plus years' experience and pool and paving expertise were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  // ---------------------------------------------------------------------------
  // PAINTERS
  // ---------------------------------------------------------------------------
  "painters/subiaco": {
    intro:
      "When a Subiaco homeowner asks AI for a painter, it favours high-rated residential painters with Dulux accreditation and workmanship warranties. A painter who states their accreditation and warranty in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing interior, exterior and feature-wall work in plain text.",
      "A high review count and any Dulux accreditation, which AI repeats as credibility signals.",
      "Plain-text mention of workmanship warranties, free quotes and your service area.",
    ],
    exampleQueries: [
      "Best painter in Subiaco for a full house repaint?",
      "Who's a good painter near Subiaco with a workmanship warranty?",
      "Dulux-accredited painter in Subiaco for interior work?",
    ],
    faqs: [
      {
        q: "How does AI pick a painter to recommend in Subiaco?",
        a: "It rewards ratings, accreditation and warranties. The engines named Subiaco painters with high ratings, Dulux accreditation and multi-year workmanship warranties. Stating those clearly in plain text makes you an easy recommendation.",
      },
      {
        q: "Does Dulux accreditation help my Subiaco painting business with AI?",
        a: "Yes. One engine cited Dulux accreditation and a five-year warranty as reasons to recommend a Subiaco painter. Publishing genuine accreditations and warranties in plain text gives AI concrete credibility to quote.",
      },
      {
        q: "Why isn't my Subiaco painting business in AI answers?",
        a: "Usually because your services and credentials sit in images, your profile is thin, or reviews are sparse. AI recommends what it can read, so a clear, well-reviewed plain-text presence wins over a polished but unreadable one.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Premier Painting Group (4.6 stars, 24 reviews) and AR Painting & Decorating (5.0 from 39 reviews) as top Subiaco painters, plus locally recommended Olympus and Procraft; Gemini's answer mixed in some fine artists but led with high-rated painting services like The Painted Teapot and Perth Paints; ChatGPT highlighted Dulux-accredited Painting Solutions (4.9, five-year warranty) and Dustys Painting Service (5.0 from 34 reviews). High ratings, Dulux accreditation and warranties were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "painters/fremantle": {
    intro:
      "Ask AI for a painter in Fremantle and it sometimes mixes up fine artists with house painters, then settles on top-rated decorating firms. A house painter who clearly states 'residential and commercial painting' in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website clearly describing house painting, not art, in plain text.",
      "A high review count and reputation score, which AI quotes when ranking Fremantle painters.",
      "Plain-text mention of Dulux accreditation, interior and exterior services and your service area.",
    ],
    exampleQueries: [
      "Best house painter in Fremantle for an exterior repaint?",
      "Who's a good painter near Fremantle for interior and feature walls?",
      "Top-rated painting service in Fremantle?",
    ],
    faqs: [
      {
        q: "Why does AI sometimes return artists instead of painters in Fremantle?",
        a: "Because 'painter' is ambiguous and Fremantle has a strong art scene. One engine listed fine artists. Clearly describing yourself as a house and commercial painting service in plain text helps AI place you correctly and recommend you for the right queries.",
      },
      {
        q: "What makes AI recommend a Fremantle house painter?",
        a: "Ratings, reputation scores and clear service descriptions. The engines named Fremantle painters with perfect or near-perfect ratings and high review counts. Building reviews and describing your services plainly are the most direct levers.",
      },
      {
        q: "Why doesn't my Fremantle painting business appear in AI answers?",
        a: "Likely an ambiguous or thin profile, services in images, or few reviews. AI recommends clearly described, well-reviewed listings, so spelling out your house-painting services and gathering reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named house painters Jack Painting (Dulux-accredited), Procraft Painting Services and Premier Painting Group; Gemini's answer largely returned fine artists such as Jos Coufreur and Casey Thornton rather than house painters; ChatGPT ranked decorating firms Chroma Painting Perth (5.0 from 114 reviews), Perth Master Painting and Delicate Painting highest. Ambiguity between artists and house painters, plus high ratings and reputation scores, were the standout themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_AI_OVERVIEWS],
  },

  "painters/joondalup": {
    intro:
      "In Joondalup, AI shortlists painters using strong ratings, Dulux accreditation and clear residential-and-commercial servicing across the northern suburbs. A painter with 20-plus years and many recent reviews gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing interior, exterior and roof or fence painting in plain text.",
      "A high review count and any Dulux accreditation, which AI repeats as credibility signals.",
      "Plain-text mention of your experience, insurance and northern-suburbs service area.",
    ],
    exampleQueries: [
      "Best painter in Joondalup for a full house repaint?",
      "Who's a good painter near Joondalup for interior and wallpaper work?",
      "Dulux-accredited painter in Joondalup with strong reviews?",
    ],
    faqs: [
      {
        q: "How does AI choose a painter to recommend in Joondalup?",
        a: "It rewards ratings, accreditation and experience. The engines named Joondalup painters with perfect ratings, 20-plus years' experience and Dulux accreditation. Stating those signals in plain text makes you an easy recommendation.",
      },
      {
        q: "Does being registered and insured help my Joondalup painting business?",
        a: "Yes. One engine cited a painter's WA Building Commission registration and full insurance as trust signals. Publishing those in plain text gives AI verifiable detail to quote when it recommends you.",
      },
      {
        q: "Why isn't my Joondalup painting business in AI answers?",
        a: "Likely a thin profile, services in images, or few reviews. AI recommends readable, well-reviewed listings, so completing your profile and gathering recent reviews is the route in.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named professional house painters Joondalup Quality Painters, We Paint Perth and Proficient Painting And Decorating; Gemini led with Joondalup Quality Painters and Wayne McMaster (5 stars from 29 reviews, 20-plus years, WA Building Commission registered, Dulux paints); ChatGPT highlighted Perth Professional Painters and Joondalup Quality Painters. High ratings, Dulux accreditation, registration and long experience were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "painters/scarborough": {
    intro:
      "Scarborough painters get shortlisted by AI on strong local ratings, award recognition and clear coastal-suburb servicing. A painter clearly described as a professional house painter with good reviews gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing interior, exterior, pool and roof painting in plain text.",
      "A high review count and any awards, which AI repeats as credibility signals.",
      "Plain-text mention of your years in Scarborough and your service area.",
    ],
    exampleQueries: [
      "Best house painter in Scarborough for an exterior repaint?",
      "Who's a good painter near Scarborough for interior work?",
      "Award-winning painting service near Scarborough?",
    ],
    faqs: [
      {
        q: "What gets a Scarborough painter recommended by AI?",
        a: "Strong ratings, awards and clear local servicing. The engines named Scarborough painters with perfect ratings, award recognition and years in the suburb. Listing your reviews, awards and service area in plain text makes you an easy pick.",
      },
      {
        q: "Do painting awards help my Scarborough business with AI?",
        a: "Yes. One engine cited a painter's Master Painters and Decorators award recognition. Publishing genuine awards in plain text gives AI concrete credibility to quote when it recommends you.",
      },
      {
        q: "Why doesn't my Scarborough painting business appear in AI answers?",
        a: "Often because Master Painters award recognition, coastal-suburb experience and before-and-after job photos aren't translated into readable text. AI named Scarborough painters who put those credentials in plain words — list your awards, years in the suburb and the exterior and interior work you do so AI has a reason to single you out.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named Chroma Painting Perth (team leader Nik) and locally praised Ryan Herbert as professional house painters, noting no famous artists are specifically from Scarborough; Gemini led with award-winning Perth Paints Pty Ltd and Proficient Painting And Decorating; ChatGPT highlighted Sterling Painting Services (5.0 from 12 reviews) and Scarborough-based B.Jewkes Painting Service (8-plus years). High ratings, awards and local servicing were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },

  "painters/mount-lawley": {
    intro:
      "In Mount Lawley, AI favours painters with heritage and character-home expertise, award recognition and strong local reputations. A painter who names their heritage and lead-paint-safe craftsmanship in plain text gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing heritage, interior, exterior and decorative-finish work in plain text.",
      "Recent reviews and any awards, which AI repeats as credibility signals.",
      "Plain-text mention of heritage techniques like breathable coatings or lead-paint safety, and your service area.",
    ],
    exampleQueries: [
      "Best painter in Mount Lawley for a heritage home repaint?",
      "Who's a good painter near Mount Lawley for a Federation house?",
      "Award-winning painter in Mount Lawley for character homes?",
    ],
    faqs: [
      {
        q: "How does AI choose a painter to recommend in Mount Lawley?",
        a: "It rewards heritage expertise and awards. The engines named Mount Lawley painters with heritage and character-home craftsmanship, lead-paint-safe methods and award recognition. Stating that specialism in plain text makes you an easy pick.",
      },
      {
        q: "Does heritage specialism help my Mount Lawley painting business with AI?",
        a: "Yes. AI repeatedly favoured painters skilled with Mount Lawley's character and Federation homes, including heritage and breathable-coating techniques. Naming that specialism in plain text aligns you with how locals ask AI about painting.",
      },
      {
        q: "Why isn't my Mount Lawley painting business in AI answers?",
        a: "Likely a thin profile, services in images, or few reviews. AI recommends readable, well-reviewed listings, so documenting your heritage work in plain text and gathering reviews is the route in.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named local Mount Lawley painter Peter Mahon, heritage-and-renovation specialist Graham Kavanagh (GKHI Home Improvements, with HIA and heritage awards) and Nik of Chroma Painting Perth; Gemini led with award-winning Perth Paints Pty Ltd and family-run Popular Painting; ChatGPT highlighted heritage specialists Perth City Painters (breathable coatings, lead-paint safety) and Barker-Whittle Painters. Heritage and character expertise plus awards were the dominant themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "painters/cannington": {
    intro:
      "Cannington painters get shortlisted by AI on local servicing, strong reviews and clear interior-and-exterior capability, even though few painters are based exclusively in the suburb. A painter clearly servicing Cannington with good reviews gets named.",
    whatAIChecks: [
      "A Google Business Profile and website naming Cannington and listing interior, exterior, fence and deck painting in plain text.",
      "A high review count, which AI quotes when ranking Cannington painters.",
      "Plain-text mention of guarantees, fixed pricing and the suburbs you service.",
    ],
    exampleQueries: [
      "Best painter servicing Cannington for a house repaint?",
      "Who's a good local painter near Cannington for interior work?",
      "Painter in Cannington for fence and deck painting?",
    ],
    faqs: [
      {
        q: "Why does AI struggle to name a Cannington-based painter?",
        a: "Because few painters are based exclusively in Cannington; most service it from nearby. One engine said there's no single authoritative list. Clearly stating that you service Cannington, with reviews and a local address if you have one, helps you be the confident local answer.",
      },
      {
        q: "What gets a Cannington painter recommended by AI?",
        a: "Clear local servicing and reviews. The engines named painters who explicitly list Cannington in their service area, with strong ratings and guarantees. Stating your coverage, services and reviews in plain text makes you an easy pick.",
      },
      {
        q: "Why doesn't my Cannington painting business appear in AI answers?",
        a: "Likely an unclear service area, a thin profile, or few reviews. AI recommends readable, well-reviewed listings that clearly cover the suburb, so spelling out your Cannington servicing and gathering reviews is the fix.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity noted no single authoritative list of painters based exclusively in Cannington, then named locally servicing firms Desire Painting WA, Allure Painting (10-year guarantee) and Meticulous Painting; Gemini led with Pete The Painter Perth and Decoric Painting, stressing local property knowledge; ChatGPT highlighted East Cannington-based Town Painting Services and Cannington-servicing Blue Sky Painting WA (4.9 from 33 reviews). Local servicing, reviews and guarantees were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "painters/midland": {
    intro:
      "In Midland, AI clarifies that 'painters' means house painters, then shortlists on award history, decades of experience and Dulux accreditation. A painter with long local leadership and a clear service range gets named.",
    whatAIChecks: [
      "A Google Business Profile and website clearly describing house painting and listing interior, exterior and roof work in plain text.",
      "A high review count and any awards or Dulux accreditation, which AI repeats as credibility signals.",
      "Plain-text mention of your years in Midland and your service area.",
    ],
    exampleQueries: [
      "Best house painter in Midland for an exterior repaint?",
      "Who's a good painter near Midland for interior and roof painting?",
      "Award-winning painting service in Midland?",
    ],
    faqs: [
      {
        q: "How does AI choose a painter to recommend in Midland?",
        a: "It rewards awards, experience and accreditation. The engines named Midland house painters with decades of experience, award recognition and Dulux accreditation. Stating those signals in plain text makes you an easy recommendation.",
      },
      {
        q: "Does long local experience help my Midland painting business with AI?",
        a: "Yes. One engine cited a painter's 90-plus years in business and 11 years as Midland leaders. Stating how long you've served the area in plain text strengthens AI's confidence in recommending you over a newer competitor.",
      },
      {
        q: "Why isn't my Midland painting business in AI answers?",
        a: "Likely an ambiguous or thin profile, services in images, or few reviews. AI recommends clearly described, well-reviewed listings, so spelling out your house-painting services and gathering reviews is the route in.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity clarified that 'painters' here means house painters and named AJ Cochrane & Sons (90-plus years, 11 years as Midland leaders), Perth's Best Painter, Premier Painting Group and Tony Pace Painting; Gemini led with award-winning Perth Paints Pty Ltd, Dulux-accredited Tekin Painting & Decorating and Premier Painting Group; ChatGPT highlighted Molly Painting and award-winning A.J. Cochrane & Sons. Awards, decades of experience and Dulux accreditation were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_GBP, STAT_REVIEWS],
  },

  "painters/rockingham": {
    intro:
      "Rockingham painters get shortlisted by AI on strong cross-platform ratings, decades of local experience and clear residential-and-commercial servicing. A house painter with high reviews and a local track record gets named.",
    whatAIChecks: [
      "A Google Business Profile and website listing interior, exterior, fence and roof painting in plain text.",
      "A high review count across platforms, which AI quotes when ranking Rockingham painters.",
      "Plain-text mention of your licence, insurance and years serving Rockingham and Mandurah.",
    ],
    exampleQueries: [
      "Best house painter in Rockingham for a full repaint?",
      "Who's a good painter near Rockingham for interior and exterior work?",
      "Highly-rated painting service in Rockingham?",
    ],
    faqs: [
      {
        q: "What gets a Rockingham painter recommended by AI?",
        a: "Cross-platform ratings and local experience. The engines named Rockingham painters with high ratings across review platforms and decades of local work. Building reviews and stating your experience in plain text are the most direct levers.",
      },
      {
        q: "Does being licensed and insured help my Rockingham painting business?",
        a: "Yes. One engine cited a painter's licence number and full insurance as trust signals. Publishing those in plain text gives AI verifiable detail to quote, which makes you a safer recommendation.",
      },
      {
        q: "Why doesn't my Rockingham painting business appear in AI answers?",
        a: "Often because your licence number, decades of local experience and cross-platform review count aren't stated in plain text. AI cited those specifics when naming Rockingham painters — publish your licence, insurance and how long you've served the area so AI has verifiable detail to quote.",
      },
    ],
    aiSnapshot: {
      summary:
        "Perplexity named professional contractors Perth Paints, Success WA (4.7 from 1,000-plus reviews), Apex Painting Contractors and G.C. Painting (25-plus years); Gemini led with WA Proficient Painting Services (led by Ferooz) and Painters Rockingham; ChatGPT highlighted Dustys Painting Service (5.0 from 34 reviews, licensed and insured), JT Roach Painters (30-plus years) and Painters Rockingham. Strong cross-platform ratings, licensing and decades of local experience were the recurring themes.",
      capturedOn: CAPTURED_ON,
      source: SOURCE,
    },
    stats: [STAT_REVIEWS, STAT_GBP],
  },
};

export function getEntry(tradeSlug: string, suburbSlug: string): Entry | undefined {
  return ENTRIES[`${tradeSlug}/${suburbSlug}`];
}

// Quality gate: a page is indexable only when it has original data (aiSnapshot)
// and all core editorial fields. Prevents shipping thin pages by accident.
export function isIndexable(entry: Entry | undefined): boolean {
  return Boolean(
    entry &&
      entry.aiSnapshot &&
      entry.aiSnapshot.summary.trim().length > 0 &&
      entry.intro.trim().length > 0 &&
      entry.whatAIChecks.length > 0 &&
      entry.faqs.length > 0,
  );
}
