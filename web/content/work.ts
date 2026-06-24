// Demo showcase data. All examples are illustrations, not real client work.
export type WebsiteExample = {
  key: string;
  business: string;
  trade: string;
  blurb: string;
  url: string; // faux URL shown in the browser frame
  image: string; // /work/site-<key>.png
  alt: string;
};

export type AgentMsg = { from: "agent" | "customer"; text: string };

export type AgentDemoData = {
  key: string;
  name: string;
  tagline: string;
  messages: AgentMsg[];
  handles: string[];
  control: string; // the "you stay in control" guarantee
};

export const WEBSITE_EXAMPLES: WebsiteExample[] = [
  {
    key: "coastal-plumbing",
    business: "Coastal Plumbing & Gas",
    trade: "Plumber",
    blurb: "Bold, trust-first, built for 24/7 emergency callouts.",
    url: "coastalplumbing.com.au",
    image: "/work/site-coastal-plumbing.png",
    alt: "Example website mockup for a Perth plumbing business",
  },
  {
    key: "brightwire",
    business: "Brightwire Electrical",
    trade: "Electrician",
    blurb: "Dark, modern and technical, with clear service tiers.",
    url: "brightwire.com.au",
    image: "/work/site-brightwire.png",
    alt: "Example website mockup for a Perth electrical business",
  },
  {
    key: "tide-co",
    business: "Tide & Co Building",
    trade: "Builder",
    blurb: "Architectural and editorial, leading with the work.",
    url: "tideandco.com.au",
    image: "/work/site-tide-co.png",
    alt: "Example website mockup for a Perth building company",
  },
  {
    key: "glow-skin",
    business: "Glow Skin & Laser",
    trade: "Skin clinic",
    blurb: "Elegant and calm, for a premium booking experience.",
    url: "glowskin.com.au",
    image: "/work/site-glow-skin.png",
    alt: "Example website mockup for a Perth skin clinic",
  },
];

export const AGENT_DEMOS: AgentDemoData[] = [
  {
    key: "reception",
    name: "Reception agent",
    tagline: "Answers every enquiry the moment it lands.",
    messages: [
      { from: "customer", text: "Hi, do you do blocked drains? Ours is backing up in Subiaco." },
      { from: "agent", text: "Yes, blocked drains are our bread and butter. Can I grab the address and a contact number so we can get someone out?" },
      { from: "customer", text: "42 Rokeby Rd, 0412 345 678. It's pretty urgent." },
      { from: "agent", text: "Got it. We've got a 1 to 3pm or a 3 to 5pm window today, which suits? I'll lock it in and text you a confirmation." },
    ],
    handles: ["Answers enquiries instantly, day or night", "Captures the address, job and urgency", "Offers real time windows and books the job"],
    control: "books only the times you've opened",
  },
  {
    key: "missed-call",
    name: "Missed-call follow-up",
    tagline: "Never lose a job to a missed call again.",
    messages: [
      { from: "agent", text: "Hi, it's Brightwire Electrical, sorry we missed your call. What can we help with?" },
      { from: "customer", text: "Switchboard keeps tripping and the lights are flickering." },
      { from: "agent", text: "Sounds like it needs a look today. I can have an electrician call you in 10 minutes to sort a time, does this number work?" },
      { from: "customer", text: "Yes please." },
    ],
    handles: ["Texts back missed calls in seconds", "Qualifies the job before you call", "Hands you a warm, ready lead"],
    control: "sends only your approved templates",
  },
  {
    key: "reviews",
    name: "Reviews agent",
    tagline: "More reviews, replied to, without you chasing.",
    messages: [
      { from: "agent", text: "Hi Sarah, thanks for choosing us yesterday. If you've got 20 seconds, a quick Google review means a lot. Here's the link." },
      { from: "customer", text: "Just left you 5 stars!" },
      { from: "agent", text: "Legend, thank you. We really appreciate it." },
    ],
    handles: ["Asks every happy customer for a review", "Drafts replies to new reviews for your OK", "Keeps your rating fresh and recent"],
    control: "you approve every public reply before it posts",
  },
  {
    key: "quoting",
    name: "Quote & booking agent",
    tagline: "Qualifies and books, so you quote less and win more.",
    messages: [
      { from: "customer", text: "Roughly what would a new switchboard cost?" },
      { from: "agent", text: "For a standard home switchboard upgrade we're usually in the $1,200 to $1,800 range, depending on the board and circuits. Want me to book a free site visit for an exact quote?" },
      { from: "customer", text: "Yeah, Thursday if possible." },
      { from: "agent", text: "Thursday 9 to 11am is open, booked. You'll get a confirmation and a reminder the day before." },
    ],
    handles: ["Qualifies the job and gives a ballpark", "Quotes only from your price list", "Books site visits to your calendar"],
    control: "ballparks come from your numbers, never made up",
  },
  {
    key: "back-office",
    name: "Back-office agent",
    tagline: "The admin you hate, handled before you're up.",
    messages: [
      { from: "agent", text: "Morning. Invoice #1042 ($680, Dave K.) is 9 days overdue. I've drafted a friendly reminder, send it?" },
      { from: "customer", text: "Yep, send it." },
      { from: "agent", text: "Sent. Also, 3 quotes are awaiting follow-up and tomorrow has 4 jobs booked. Want the run sheet?" },
      { from: "customer", text: "Please." },
    ],
    handles: ["Chases overdue invoices politely", "Preps quotes and run sheets", "Keeps your tools and schedule in sync"],
    control: "never sends payment threats, flags anything sensitive for you",
  },
];
