export type Sector = "Rail" | "Road" | "Bus";
export type CapabilityId = "transaction" | "strategic" | "programme" | "commercial";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export const company = {
  name: "DM Infrastructure Advisory",
  legal: "DM Infrastructure Advisory Ltd",
  number: "16525793",
  address: "124 City Road, London, EC1V 2NX, United Kingdom",
  official: "https://dminfrastructureadvisory.com",
};

export const sectors: { id: Sector; code: string; blurb: string }[] = [
  {
    id: "Rail",
    code: "R",
    blurb: "Rolling stock procurement, financing and delivery, from new fleets to market studies across Europe.",
  },
  {
    id: "Road",
    code: "H",
    blurb: "Highway PPP and DBFO concessions, from procurement strategy to lender's technical advice.",
  },
  {
    id: "Bus",
    code: "B",
    blurb: "Fleet transition and financing for operators moving to zero-emission buses.",
  },
];

export const capabilities: {
  id: CapabilityId;
  n: string;
  title: string;
  lede: string;
  items: string[];
}[] = [
  {
    id: "transaction",
    n: "01",
    title: "Transaction Advisory",
    lede: "Diligence that holds up when the money moves.",
    items: [
      "Commercial and technical due diligence",
      "PPP / PFI project development",
      "Lender's technical advisor",
    ],
  },
  {
    id: "strategic",
    n: "02",
    title: "Strategic Advisory",
    lede: "Clear answers before the big commitments.",
    items: [
      "Feasibility studies",
      "Business case development",
      "Transformation advisory",
      "Contract review",
    ],
  },
  {
    id: "programme",
    n: "03",
    title: "Programme Management",
    lede: "Keeping major programmes on the line.",
    items: [
      "New rolling stock delivery",
      "PPP / PFI delivery and handback",
      "Asset management",
    ],
  },
  {
    id: "commercial",
    n: "04",
    title: "Commercial & Procurement",
    lede: "Contracts that work for the people who run them.",
    items: ["Procurement support", "Contract review and negotiation"],
  },
];

export type CaseStudy = {
  slug: string;
  ref: string;
  title: string;
  short: string;
  sector: Sector;
  capability: CapabilityId;
  role: string;
  summary: string;
  scope: string[];
  facts?: { k: string; v: string }[];
  partner?: string;
};

export const work: CaseStudy[] = [
  {
    slug: "a-train-acquisition",
    ref: "R-07",
    title: "A-Train Acquisition",
    short: "A-TRAIN ACQ",
    sector: "Rail",
    capability: "transaction",
    role: "Supporting IPEX Consulting as Technical Advisor to EQT",
    partner: "IPEX Consulting",
    summary:
      "Supporting IPEX Consulting in its Technical Advisor role to EQT Group on the agreement to acquire 100% of Arlanda Express / A-Train AB, the operator of the high-speed link between Greater Stockholm and Arlanda Airport.",
    scope: [
      "Buy-side technical due diligence",
      "Review of the fleet replacement plan",
      "Integrated commercial and technical view across tight transaction timelines",
    ],
    facts: [
      { k: "Stake", v: "100%" },
      { k: "Journey", v: "18 min" },
      { k: "Concession", v: "to 2050" },
      { k: "Investment plan", v: "SEK 3bn" },
    ],
  },
  {
    slug: "mdsb-rolling-stock-financing",
    ref: "R-01",
    title: "MDSB 2025+ New Rolling Stock Financing",
    short: "MDSB 2025+",
    sector: "Rail",
    capability: "transaction",
    role: "Transaction advisory",
    summary:
      "Advisory on the financing of a new rolling stock fleet under the MDSB 2025+ programme, bringing commercial, technical and financial perspectives into one view for decision makers.",
    scope: ["Financing structure review", "Technical and commercial due diligence", "Transaction support"],
  },
  {
    slug: "london-general-electric-bus-financing",
    ref: "B-01",
    title: "London General Electric Bus Financing",
    short: "LDN E-BUS",
    sector: "Bus",
    capability: "transaction",
    role: "Transaction advisory",
    summary:
      "Supporting the financing of an electric bus fleet for London General, part of the capital's move to a zero-emission bus network.",
    scope: ["Fleet financing support", "Technical review of the electric fleet", "Commercial advice"],
  },
  {
    slug: "european-rail-freight-market-study",
    ref: "R-02",
    title: "European Rail Freight Market Study",
    short: "EU FREIGHT",
    sector: "Rail",
    capability: "strategic",
    role: "Strategic advisory",
    summary:
      "A market study of the European rail freight sector, giving the client a clear read on the market before making strategic decisions.",
    scope: ["Market and competitor analysis", "Demand and trend review", "Strategic recommendations"],
  },
  {
    slug: "caledonian-sleeper-rolling-stock",
    ref: "R-03",
    title: "Caledonian Sleeper Rolling Stock Delivery Management",
    short: "CAL SLEEPER",
    sector: "Rail",
    capability: "programme",
    role: "Programme management",
    summary:
      "Delivery management for the new Caledonian Sleeper rolling stock, keeping a complex fleet introduction on track.",
    scope: ["Rolling stock delivery management", "Supplier and programme oversight", "Acceptance and introduction support"],
  },
  {
    slug: "canadian-highways-ppp",
    ref: "H-01",
    title: "Canadian Highways PPP, Technical Adviser",
    short: "CA HWY PPP",
    sector: "Road",
    capability: "transaction",
    role: "Technical adviser",
    summary: "Technical advisory on a Canadian highways public-private partnership.",
    scope: ["Technical adviser role", "PPP project review", "Lifecycle and risk review"],
  },
  {
    slug: "m25-dbfo-procurement",
    ref: "H-02",
    title: "M25 DBFO Procurement Advice",
    short: "M25 DBFO",
    sector: "Road",
    capability: "commercial",
    role: "Commercial & procurement",
    summary:
      "Procurement advice on the M25 Design, Build, Finance and Operate contract, one of the UK's largest road PPPs.",
    scope: ["Procurement strategy and support", "Contract review", "Commercial advice"],
  },
];

export const glossary: Record<string, string> = {
  PPP: "Public–Private Partnership: a long-term contract where a private party builds, finances or runs a public asset.",
  PFI: "Private Finance Initiative: the UK's earlier model of PPP procurement.",
  DBFO: "Design, Build, Finance and Operate: the private partner takes on the whole life of the asset.",
  LTA: "Lender's Technical Advisor: independent technical due diligence on behalf of the banks funding a project.",
  "M&A": "Mergers and acquisitions: buying, selling or combining companies and assets.",
};

export const capabilityTitle = (id: CapabilityId) => capabilities.find((c) => c.id === id)!.title;
