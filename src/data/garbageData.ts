import { GarbageCategory, CategoryInfo, SampleGarbageItem } from '../types/garbage';

export const CATEGORIES: Record<GarbageCategory, CategoryInfo> = {
  'Plastic': {
    id: 'Plastic',
    name: 'Plastic',
    binColor: 'Yellow / Orange Bin',
    binHex: '#f59e0b',
    icon: 'Package',
    description: 'Synthetic polymers derived from petrochemicals, including PET (water bottles), HDPE (milk jugs), PP, and PVC.',
    disposalMethod: 'Empty, rinse clean with water, crush to save volume, replace the cap tightly, and place into the dry recyclable plastic bin.',
    recyclingSteps: [
      'Check the resin identification code (1 to 7 on the bottom).',
      'Empty all liquid or food residue completely.',
      'Rinse lightly to prevent mold and bacterial odor.',
      'Crush the bottle or container to maximize bin volume.',
      'Leave plastic screw caps screwed on (modern optical sorters process them).'
    ],
    degradationTime: '450 to 1,000 years in landfill',
    recyclability: 'High',
    commonItems: ['PET mineral water bottles', 'Milk containers', 'Shampoo bottles', 'Food tubs', 'Bottle caps'],
    contaminationWarning: 'Do not mix dirty plastic wraps with food grease (e.g., oily chip bags) or cling wrap, as they clog industrial sorting machines.'
  },
  'Paper': {
    id: 'Paper',
    name: 'Paper',
    binColor: 'Blue Bin',
    binHex: '#3b82f6',
    icon: 'FileText',
    description: 'Cellulose fiber products including newspapers, office printing paper, envelopes, notebooks, and magazines.',
    disposalMethod: 'Keep dry, remove plastic covers or metal binder clips if possible, stack flatly, and place in the dry paper bin.',
    recyclingSteps: [
      'Ensure the paper is 100% dry; wet paper fibers break down and cannot be pulped.',
      'Remove metallic spiral bindings and plastic windows if feasible.',
      'Flatten folded papers and shred confidential documents.',
      'Deposit in dedicated blue dry waste bin.'
    ],
    degradationTime: '2 to 6 weeks (biodegradable when clean)',
    recyclability: 'High',
    commonItems: ['Newspapers & flyers', 'Office copy paper', 'Spiral notebook sheets', 'Magazines', 'Envelopes'],
    contaminationWarning: 'Paper soiled with grease or food oils (e.g., pizza boxes) CANNOT be recycled via traditional pulping; compost or discard as general waste.'
  },
  'Cardboard': {
    id: 'Cardboard',
    name: 'Cardboard',
    binColor: 'Blue / Brown Bin',
    binHex: '#8b5cf6',
    icon: 'Box',
    description: 'Heavy-duty corrugated cardboard boxes, packaging cartons, shoe boxes, and cereal boxes.',
    disposalMethod: 'Remove plastic tape and shipping labels if feasible, flatten completely to save space, keep dry, and bundle for collection.',
    recyclingSteps: [
      'Remove packing tape, plastic bubble wrap, and styrofoam inserts.',
      'Break down and collapse boxes completely flat.',
      'Protect from rain and grease contamination.',
      'Stack inside the largest carton or tie with natural twine.'
    ],
    degradationTime: '2 to 3 months',
    recyclability: 'High',
    commonItems: ['E-commerce shipping cartons', 'Shoe boxes', 'Cereal and snack boxes', 'Egg cartons', 'Paperboard packaging'],
    contaminationWarning: 'Wax-coated cartons or grease-soaked cardboard cannot be recycled with regular paperboard.'
  },
  'Glass': {
    id: 'Glass',
    name: 'Glass',
    binColor: 'Green / Teal Bin',
    binHex: '#10b981',
    icon: 'Wine',
    description: 'Soda-lime silica container glass including soda bottles, condiment jars, and beverage glassware (100% infinitely recyclable).',
    disposalMethod: 'Rinse out remaining contents, remove metal or plastic caps, sort by color if requested locally, and place in glass bin.',
    recyclingSteps: [
      'Rinse thoroughly to remove food liquids or oils.',
      'Remove metal lids (lid goes in metal bin, bottle goes in glass bin).',
      'Do not break deliberately; intact glass is safer for human sanitation workers.',
      'Keep separate from ceramics, lightbulbs, or Pyrex glassware.'
    ],
    degradationTime: 'Over 1,000,000 years (infinitely recyclable without quality loss)',
    recyclability: 'High',
    commonItems: ['Glass soda/beverage bottles', 'Jam and pasta sauce jars', 'Perfume flacons', 'Medicine bottles'],
    contaminationWarning: 'Heat-resistant Pyrex, porcelain cups, mirrors, and window glass have different melting points and will ruin a batch of recycled container glass.'
  },
  'Metal': {
    id: 'Metal',
    name: 'Metal',
    binColor: 'Grey / Silver Bin',
    binHex: '#64748b',
    icon: 'Shield',
    description: 'Ferrous and non-ferrous metals, primarily aluminum beverage cans, tinplate food cans, and clean aluminum foil.',
    disposalMethod: 'Rinse out food residues, gently crush aluminum cans to save storage space, and place into the metal recycling receptacle.',
    recyclingSteps: [
      'Rinse out food or sugary beverage residues.',
      'Leave pop-tabs attached to beverage cans.',
      'Roll aluminum foil into a small ball (at least 5cm in diameter so sorters can catch it).',
      'Deposit in the dry recyclable metal bin.'
    ],
    degradationTime: '80 to 200 years (aluminum cans)',
    recyclability: 'High',
    commonItems: ['Aluminum beverage cans', 'Tin food cans', 'Metal bottle caps', 'Clean aluminum foil trays', 'Metal lids'],
    contaminationWarning: 'Aerosol spray cans containing pressurized chemicals or paint cans require hazardous waste drop-off, not standard curbside metal bins.'
  },
  'Organic Waste': {
    id: 'Organic Waste',
    name: 'Organic Waste',
    binColor: 'Green Bin (Compost)',
    binHex: '#22c55e',
    icon: 'Leaf',
    description: 'Biodegradable organic matter such as fruit and vegetable peels, food leftovers, coffee grounds, eggshells, and garden clippings.',
    disposalMethod: 'Dispose directly into compost bins, vermicomposting pits, or municipal green wet-waste organic collectors.',
    recyclingSteps: [
      'Separate from any non-biodegradable packaging or plastic produce stickers.',
      'Chop large fruit rinds or stalks to accelerate decomposition.',
      'Deposit into aerated home compost bin or municipal organic waste collection.',
      'Layer with dry leaves/sawdust ("browns") to eliminate odor.'
    ],
    degradationTime: '1 to 6 months in composting conditions',
    recyclability: 'Compostable',
    commonItems: ['Banana & citrus peels', 'Vegetable cutoffs', 'Apple cores', 'Coffee grounds & tea bags', 'Eggshells', 'Fallen leaves'],
    contaminationWarning: 'Never include plastic stickers, plastic produce bags, animal bones, or pet feces in municipal compost bins unless certified.'
  },
  'General / Other Waste': {
    id: 'General / Other Waste',
    name: 'General / Other Waste',
    binColor: 'Black / Red Bin',
    binHex: '#ef4444',
    icon: 'Trash2',
    description: 'Non-recyclable municipal solid waste, multi-laminated snack wrappers, sanitary items, dirty textiles, and hazardous e-waste.',
    disposalMethod: 'Wrap safely in domestic waste bags for municipal landfill / waste-to-energy incineration; take electronic batteries to certified e-waste drop-offs.',
    recyclingSteps: [
      'Identify whether the item has specialized collection (e.g., battery drop-off boxes).',
      'Bag securely to prevent vector and pest attraction.',
      'Do not contaminate clean dry recycling streams with these items.',
      'Dispose into black/red general landfill bin.'
    ],
    degradationTime: 'Indefinite / Varies (e.g., styrofoam 500+ yrs, batteries leak heavy metals)',
    recyclability: 'Low',
    commonItems: ['Chip & crisp multi-layer foil pouches', 'Sanitary napkins & diapers', 'Alkaline batteries (hazardous)', 'Broken ceramics', 'Styrofoam packaging'],
    contaminationWarning: 'Alkaline or lithium batteries must NEVER go to general incineration or crushing due to fire and chemical toxicity risks; use dedicated e-waste kiosks.'
  }
};

// SVG visual generation helper
function createSvgDataUrl(svgContent: string): string {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">${svgContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

export const SAMPLE_GARBAGE_ITEMS: SampleGarbageItem[] = [
  {
    id: 'sample-plastic-bottle',
    name: 'Transparent PET Mineral Water Bottle',
    category: 'Plastic',
    description: 'Clear polyethylene terephthalate (PET) water bottle with blue screw cap and paper-plastic label.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f1f5f9"/>
      <ellipse cx="200" cy="350" rx="90" ry="18" fill="#cbd5e1"/>
      <!-- Bottle Body -->
      <path d="M165,110 L235,110 L245,150 L250,220 L248,330 C248,342 238,348 200,348 C162,348 152,342 152,330 L150,220 L155,150 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="3" opacity="0.85"/>
      <!-- Water Reflection & Highlights -->
      <path d="M165,160 L180,160 L178,320 L165,320 Z" fill="#ffffff" opacity="0.6"/>
      <path d="M225,160 L232,160 L230,320 L223,320 Z" fill="#ffffff" opacity="0.4"/>
      <!-- Bottle Label -->
      <rect x="150" y="210" width="100" height="65" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
      <text x="200" y="238" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">AQUA PURE</text>
      <text x="200" y="254" font-family="sans-serif" font-size="9" fill="#bae6fd" text-anchor="middle">500ml • PET-1</text>
      <!-- Cap & Neck Rings -->
      <rect x="175" y="85" width="50" height="25" rx="3" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
      <line x1="175" y1="92" x2="225" y2="92" stroke="#1d4ed8" stroke-width="1.5"/>
      <line x1="175" y1="99" x2="225" y2="99" stroke="#1d4ed8" stroke-width="1.5"/>
      <rect x="170" y="108" width="60" height="4" fill="#93c5fd"/>
      <!-- Recycling Symbol -->
      <circle cx="200" cy="295" r="14" fill="#ffffff" opacity="0.8"/>
      <text x="200" y="300" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0284c7" text-anchor="middle">♳ 1</text>
    `)
  },
  {
    id: 'sample-cardboard-box',
    name: 'Corrugated Shipping Box',
    category: 'Cardboard',
    description: 'Brown fluted corrugated cardboard box with brown packing tape and barcode shipping tag.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f8fafc"/>
      <ellipse cx="200" cy="340" rx="130" ry="20" fill="#e2e8f0"/>
      <!-- 3D Box Perspective -->
      <!-- Top Face -->
      <polygon points="200,100 320,150 200,195 80,150" fill="#d97706" stroke="#b45309" stroke-width="3"/>
      <!-- Left Face -->
      <polygon points="80,150 200,195 200,320 80,265" fill="#b45309" stroke="#92400e" stroke-width="3"/>
      <!-- Right Face -->
      <polygon points="200,195 320,150 320,265 200,320" fill="#92400e" stroke="#78350f" stroke-width="3"/>
      <!-- Flap Seam Tape -->
      <line x1="140" y1="125" x2="260" y2="172" stroke="#78350f" stroke-width="5" stroke-dasharray="8,3"/>
      <!-- Shipping Label on Left Face -->
      <polygon points="105,190 165,212 165,270 105,245" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <line x1="115" y1="205" x2="155" y2="220" stroke="#0f172a" stroke-width="2"/>
      <line x1="115" y1="215" x2="155" y2="230" stroke="#0f172a" stroke-width="2"/>
      <line x1="115" y1="225" x2="145" y2="236" stroke="#0f172a" stroke-width="2"/>
      <!-- Fragile Umbrella Symbol on Right Face -->
      <polygon points="230,225 280,205 280,270 230,290" fill="none"/>
      <text x="250" y="240" font-family="sans-serif" font-size="16" fill="#fde68a" font-weight="bold">↑↑ RECYCLE</text>
      <!-- Recycled box mark -->
      <circle cx="200" cy="270" r="16" fill="#f59e0b" opacity="0.8"/>
      <text x="200" y="276" font-family="sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">♻</text>
    `)
  },
  {
    id: 'sample-paper-newspaper',
    name: 'Printed Newspaper & Office Document',
    category: 'Paper',
    description: 'Folded daily newsprint sheet with visible monochrome headlines, columns, and folded edge.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f1f5f9"/>
      <ellipse cx="200" cy="330" rx="140" ry="18" fill="#cbd5e1"/>
      <!-- Folded Newspaper Back Layer -->
      <polygon points="90,130 310,100 325,310 105,335" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
      <!-- Front Page Sheet -->
      <polygon points="75,120 295,90 310,300 90,325" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
      <!-- Newspaper Header Banner -->
      <rect x="95" y="125" width="185" height="28" fill="#0f172a"/>
      <text x="187" y="144" font-family="serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">THE DAILY HERALD</text>
      <!-- Headlines -->
      <rect x="95" y="162" width="120" height="10" fill="#334155"/>
      <rect x="95" y="177" width="90" height="8" fill="#475569"/>
      <!-- Image box in paper -->
      <rect x="225" y="162" width="65" height="50" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
      <text x="257" y="190" font-family="sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">📰</text>
      <!-- Multi-column text lines -->
      <g fill="#94a3b8">
        <rect x="95" y="195" width="55" height="4"/>
        <rect x="95" y="203" width="55" height="4"/>
        <rect x="95" y="211" width="50" height="4"/>
        <rect x="95" y="219" width="55" height="4"/>
        <rect x="95" y="227" width="52" height="4"/>
        <rect x="95" y="235" width="55" height="4"/>
        <rect x="158" y="195" width="55" height="4"/>
        <rect x="158" y="203" width="55" height="4"/>
        <rect x="158" y="211" width="52" height="4"/>
        <rect x="158" y="219" width="55" height="4"/>
        <rect x="158" y="227" width="50" height="4"/>
        <rect x="158" y="235" width="55" height="4"/>
        <!-- Bottom section -->
        <rect x="95" y="250" width="195" height="4"/>
        <rect x="95" y="258" width="195" height="4"/>
        <rect x="95" y="266" width="180" height="4"/>
        <rect x="95" y="274" width="190" height="4"/>
      </g>
      <!-- Dog-eared corner fold -->
      <polygon points="75,120 100,120 75,145" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
    `)
  },
  {
    id: 'sample-glass-bottle',
    name: 'Green Glass Beverage Bottle',
    category: 'Glass',
    description: 'Emerald green glass soda/olive oil bottle showing transparent cylindrical body and light refractions.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f8fafc"/>
      <ellipse cx="200" cy="350" rx="75" ry="16" fill="#cbd5e1"/>
      <!-- Glass Bottle Body -->
      <path d="M175,115 L225,115 L232,160 L245,200 L242,335 C242,345 230,350 200,350 C170,350 158,345 158,335 L155,200 L168,160 Z" fill="#059669" stroke="#047857" stroke-width="3" opacity="0.82"/>
      <!-- Bottle Highlights -->
      <path d="M168,170 Q162,250 166,330" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.75"/>
      <path d="M232,175 Q235,250 232,325" stroke="#a7f3d0" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5"/>
      <!-- Glass Base Rim -->
      <ellipse cx="200" cy="336" rx="40" ry="6" fill="#065f46" opacity="0.6"/>
      <!-- Crown Cap Neck Finish -->
      <rect x="182" y="80" width="36" height="35" rx="3" fill="#10b981" stroke="#047857" stroke-width="2"/>
      <ellipse cx="200" cy="80" rx="18" ry="4" fill="#a7f3d0"/>
      <!-- Minimalist Vintage Label -->
      <rect x="166" y="215" width="68" height="60" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <text x="200" y="240" font-family="serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">PURE CIDER</text>
      <text x="200" y="255" font-family="sans-serif" font-size="8" fill="#92400e" text-anchor="middle">100% GLASS</text>
      <text x="200" y="267" font-family="sans-serif" font-size="8" fill="#059669" text-anchor="middle">RECYCLE ♻</text>
    `)
  },
  {
    id: 'sample-metal-can',
    name: 'Aluminum Soda Beverage Can',
    category: 'Metal',
    description: 'Silver metallic aluminum cylindrical can with red graphic print and silver pull-tab rim.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f1f5f9"/>
      <ellipse cx="200" cy="340" rx="80" ry="18" fill="#cbd5e1"/>
      <!-- Cylindrical Can Body -->
      <path d="M145,120 L255,120 L255,320 C255,335 240,342 200,342 C160,342 145,335 145,320 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <!-- Top Metal Dome and Rim -->
      <ellipse cx="200" cy="120" rx="55" ry="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
      <ellipse cx="200" cy="120" rx="46" ry="12" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
      <!-- Pull Tab -->
      <path d="M190,118 L210,118 L206,128 L194,128 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
      <circle cx="200" cy="123" r="3" fill="#475569"/>
      <!-- Metallic Highlights & Reflections -->
      <rect x="155" y="125" width="18" height="195" fill="#ffffff" opacity="0.35"/>
      <rect x="235" y="125" width="10" height="195" fill="#ffffff" opacity="0.2"/>
      <rect x="145" y="125" width="110" height="15" fill="#dc2626"/>
      <!-- Can Brand Artwork -->
      <path d="M160,190 Q200,165 240,195 Q200,225 160,190 Z" fill="#ffffff" opacity="0.9"/>
      <text x="200" y="245" font-family="sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle" font-style="italic">COLA</text>
      <text x="200" y="265" font-family="sans-serif" font-size="10" font-weight="bold" fill="#fecaca" text-anchor="middle">ALUMINUM CAN 330ml</text>
      <!-- Bottom Rim -->
      <path d="M145,315 C145,330 165,336 200,336 C235,336 255,330 255,315" fill="none" stroke="#94a3b8" stroke-width="3"/>
    `)
  },
  {
    id: 'sample-organic-banana',
    name: 'Banana Peel & Apple Core',
    category: 'Organic Waste',
    description: 'Yellow organic banana peel with natural brown ripening spots, rich in nitrogen for composting.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f8fafc"/>
      <ellipse cx="200" cy="330" rx="110" ry="18" fill="#e2e8f0"/>
      <!-- Banana Peel Curves -->
      <path d="M120,290 Q150,220 200,210 Q250,220 280,290 Q200,270 120,290 Z" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <!-- Flap 1 -->
      <path d="M200,210 Q140,160 110,230 Q140,250 200,210 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
      <!-- Flap 2 -->
      <path d="M200,210 Q260,160 290,230 Q260,250 200,210 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
      <!-- Stem Tip -->
      <path d="M195,210 L192,175 L208,175 L205,210 Z" fill="#713f12" stroke="#451a03" stroke-width="2"/>
      <!-- Brown Ripening Flecks (Characteristics of organic fruit) -->
      <circle cx="150" cy="245" r="3" fill="#713f12"/>
      <circle cx="165" cy="235" r="4" fill="#713f12"/>
      <circle cx="240" cy="240" r="3" fill="#713f12"/>
      <circle cx="225" cy="250" r="5" fill="#713f12"/>
      <circle cx="185" cy="265" r="4" fill="#713f12"/>
      <circle cx="215" cy="268" r="3" fill="#713f12"/>
      <circle cx="125" cy="265" r="3.5" fill="#713f12"/>
      <!-- Apple Core in Background -->
      <path d="M75,280 C70,250 90,235 95,220 C100,235 120,250 115,280 C110,295 80,295 75,280 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      <path d="M95,220 L96,205" stroke="#713f12" stroke-width="3" stroke-linecap="round"/>
      <circle cx="95" cy="255" r="3" fill="#451a03"/>
      <!-- Compost icon tag -->
      <rect x="140" y="325" width="120" height="24" rx="12" fill="#22c55e"/>
      <text x="200" y="341" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">🌱 100% COMPOSTABLE</text>
    `)
  },
  {
    id: 'sample-battery-ewaste',
    name: 'Alkaline Battery & E-Waste Component',
    category: 'General / Other Waste',
    description: 'Cylindrical 1.5V AA battery with warning stripes, representing hazardous e-waste that cannot go to standard recycling.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f1f5f9"/>
      <ellipse cx="200" cy="335" rx="90" ry="16" fill="#cbd5e1"/>
      <!-- Battery Body Angle -->
      <g transform="rotate(-30 200 200)">
        <rect x="155" y="100" width="90" height="200" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
        <!-- Copper/Gold Top -->
        <rect x="155" y="100" width="90" height="60" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <!-- Positive Terminal Nub -->
        <rect x="185" y="86" width="30" height="14" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
        <!-- Label & Warning -->
        <text x="200" y="200" font-family="sans-serif" font-size="16" font-weight="900" fill="#f59e0b" text-anchor="middle">1.5V AA</text>
        <text x="200" y="225" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="middle">⚡ HAZARDOUS</text>
        <text x="200" y="245" font-family="sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">DO NOT INCINERATE</text>
        <!-- Negative base rim -->
        <rect x="155" y="290" width="90" height="10" fill="#94a3b8"/>
        <!-- Warning Cross on Trashcan -->
        <circle cx="200" cy="270" r="12" fill="#ef4444"/>
        <text x="200" y="275" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">✖</text>
      </g>
      <!-- Caution Callout -->
      <rect x="120" y="325" width="160" height="26" rx="13" fill="#ef4444"/>
      <text x="200" y="342" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">⚠ SPECIAL HAZARDOUS BIN</text>
    `)
  },
  {
    id: 'sample-paper-cup',
    name: 'Disposable Takeaway Coffee Cup',
    category: 'General / Other Waste',
    description: 'Composite paper cup lined with polyethene plastic barrier film, preventing standard paper pulping.',
    imageUrl: createSvgDataUrl(`
      <rect width="400" height="400" fill="#f8fafc"/>
      <ellipse cx="200" cy="340" rx="70" ry="15" fill="#cbd5e1"/>
      <!-- Cup Body -->
      <polygon points="145,130 255,130 235,320 165,320" fill="#f5ebe0" stroke="#d5bdaf" stroke-width="3"/>
      <!-- Heat Sleeve Sleeve -->
      <polygon points="152,190 248,190 242,260 158,260" fill="#b08968" stroke="#7f5539" stroke-width="2"/>
      <text x="200" y="230" font-family="serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">ESPRESSO</text>
      <!-- Plastic Lid on Top -->
      <ellipse cx="200" cy="130" rx="60" ry="16" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      <ellipse cx="200" cy="126" rx="48" ry="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="195" y="112" width="10" height="6" rx="2" fill="#334155"/>
      <!-- Plastic Lining Warning -->
      <text x="200" y="295" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7f5539" text-anchor="middle">POLYETHYLENE LINED</text>
      <text x="200" y="307" font-family="sans-serif" font-size="8" fill="#a8a29e" text-anchor="middle">Non-recyclable paper composite</text>
    `)
  }
];

export interface EpochMetric {
  epoch: number;
  trainAcc: number;
  valAcc: number;
  trainLoss: number;
  valLoss: number;
}

// 25-epoch realistic training curve
export const TRAINING_HISTORY: EpochMetric[] = [
  { epoch: 1, trainAcc: 0.542, valAcc: 0.528, trainLoss: 1.58, valLoss: 1.62 },
  { epoch: 2, trainAcc: 0.635, valAcc: 0.614, trainLoss: 1.25, valLoss: 1.34 },
  { epoch: 3, trainAcc: 0.702, valAcc: 0.695, trainLoss: 1.02, valLoss: 1.12 },
  { epoch: 4, trainAcc: 0.748, valAcc: 0.732, trainLoss: 0.88, valLoss: 0.96 },
  { epoch: 5, trainAcc: 0.784, valAcc: 0.768, trainLoss: 0.76, valLoss: 0.85 },
  { epoch: 6, trainAcc: 0.812, valAcc: 0.795, trainLoss: 0.67, valLoss: 0.78 },
  { epoch: 7, trainAcc: 0.835, valAcc: 0.815, trainLoss: 0.59, valLoss: 0.71 },
  { epoch: 8, trainAcc: 0.852, valAcc: 0.830, trainLoss: 0.53, valLoss: 0.66 },
  { epoch: 9, trainAcc: 0.867, valAcc: 0.842, trainLoss: 0.48, valLoss: 0.62 },
  { epoch: 10, trainAcc: 0.881, valAcc: 0.855, trainLoss: 0.44, valLoss: 0.58 },
  { epoch: 11, trainAcc: 0.892, valAcc: 0.864, trainLoss: 0.41, valLoss: 0.55 },
  { epoch: 12, trainAcc: 0.901, valAcc: 0.873, trainLoss: 0.38, valLoss: 0.52 },
  { epoch: 13, trainAcc: 0.909, valAcc: 0.881, trainLoss: 0.35, valLoss: 0.49 },
  { epoch: 14, trainAcc: 0.916, valAcc: 0.888, trainLoss: 0.33, valLoss: 0.47 },
  { epoch: 15, trainAcc: 0.923, valAcc: 0.894, trainLoss: 0.31, valLoss: 0.45 },
  { epoch: 16, trainAcc: 0.928, valAcc: 0.898, trainLoss: 0.29, valLoss: 0.44 },
  { epoch: 17, trainAcc: 0.933, valAcc: 0.902, trainLoss: 0.27, valLoss: 0.42 },
  { epoch: 18, trainAcc: 0.937, valAcc: 0.905, trainLoss: 0.26, valLoss: 0.41 },
  { epoch: 19, trainAcc: 0.941, valAcc: 0.909, trainLoss: 0.25, valLoss: 0.40 },
  { epoch: 20, trainAcc: 0.944, valAcc: 0.912, trainLoss: 0.23, valLoss: 0.39 },
  { epoch: 21, trainAcc: 0.948, valAcc: 0.914, trainLoss: 0.22, valLoss: 0.38 },
  { epoch: 22, trainAcc: 0.951, valAcc: 0.916, trainLoss: 0.21, valLoss: 0.37 },
  { epoch: 23, trainAcc: 0.953, valAcc: 0.917, trainLoss: 0.20, valLoss: 0.37 },
  { epoch: 24, trainAcc: 0.956, valAcc: 0.918, trainLoss: 0.19, valLoss: 0.36 },
  { epoch: 25, trainAcc: 0.958, valAcc: 0.921, trainLoss: 0.18, valLoss: 0.36 }
];

// 7x7 Confusion Matrix on 700 Test Images (100 per category)
export const CONFUSION_MATRIX: {
  categories: GarbageCategory[];
  matrix: number[][]; // rows: Actual, columns: Predicted
} = {
  categories: ['Plastic', 'Paper', 'Cardboard', 'Glass', 'Metal', 'Organic Waste', 'General / Other Waste'],
  matrix: [
    // Actual Plastic: 91 Plastic, 2 Paper, 1 Cardboard, 3 Glass, 1 Metal, 0 Organic, 2 Other
    [91, 2, 1, 3, 1, 0, 2],
    // Actual Paper: 1 Plastic, 92 Paper, 5 Cardboard, 0 Glass, 0 Metal, 1 Organic, 1 Other
    [1, 92, 5, 0, 0, 1, 1],
    // Actual Cardboard: 0 Plastic, 6 Paper, 90 Cardboard, 0 Glass, 1 Metal, 1 Organic, 2 Other
    [0, 6, 90, 0, 1, 1, 2],
    // Actual Glass: 4 Plastic, 0 Paper, 0 Cardboard, 93 Glass, 2 Metal, 0 Organic, 1 Other
    [4, 0, 0, 93, 2, 0, 1],
    // Actual Metal: 3 Plastic, 0 Paper, 1 Cardboard, 2 Glass, 92 Metal, 0 Organic, 2 Other
    [3, 0, 1, 2, 92, 0, 2],
    // Actual Organic: 0 Plastic, 1 Paper, 1 Cardboard, 0 Glass, 0 Metal, 96 Organic, 2 Other
    [0, 1, 1, 0, 0, 96, 2],
    // Actual General: 2 Plastic, 2 Paper, 2 Cardboard, 1 Glass, 2 Metal, 2 Organic, 89 Other
    [2, 2, 2, 1, 2, 2, 89]
  ]
};

export const CLASSIFICATION_REPORT = [
  { category: 'Plastic', precision: 0.90, recall: 0.91, f1: 0.90, support: 100 },
  { category: 'Paper', precision: 0.91, recall: 0.92, f1: 0.91, support: 100 },
  { category: 'Cardboard', precision: 0.90, recall: 0.90, f1: 0.90, support: 100 },
  { category: 'Glass', precision: 0.94, recall: 0.93, f1: 0.93, support: 100 },
  { category: 'Metal', precision: 0.94, recall: 0.92, f1: 0.93, support: 100 },
  { category: 'Organic Waste', precision: 0.96, recall: 0.96, f1: 0.96, support: 100 },
  { category: 'General / Other Waste', precision: 0.90, recall: 0.89, f1: 0.89, support: 100 },
  { category: 'Accuracy', precision: 0.92, recall: 0.92, f1: 0.92, support: 700 },
  { category: 'Macro Average', precision: 0.92, recall: 0.92, f1: 0.92, support: 700 },
  { category: 'Weighted Average', precision: 0.92, recall: 0.92, f1: 0.92, support: 700 }
];
