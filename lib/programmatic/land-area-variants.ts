import type { RegionKey, UnitKey } from "@/data/land-units";

export interface LandAreaUnitSection {
  unit: string;
  oneLiner: string;
  explanation: string;
}

export interface LandAreaFAQ {
  q: string;
  a: string;
}

export interface LandAreaVariant {
  slug: string;
  stateName: string;
  region: RegionKey;
  defaultFromUnit: UnitKey;
  defaultToUnit: UnitKey;
  primaryUnits: string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whyDiffers: string;
  unitSections: LandAreaUnitSection[];
  faqs: LandAreaFAQ[];
  constructionCitySlugs: string[];
}

export const landAreaVariants: LandAreaVariant[] = [
  {
    slug: "karnataka",
    stateName: "Karnataka",
    region: "standard",
    defaultFromUnit: "guntha",
    defaultToUnit: "acre",
    primaryUnits: ["Guntha", "Cent"],
    metaTitle: "Karnataka Land Area Converter — Guntha & Cent to Sq Ft, Acre",
    metaDescription:
      "Convert Guntha and Cent to Square Feet, Acre, and Square Meter for Karnataka land records (RTC/Pahani). 1 Guntha = 1,089 sq ft.",
    intro:
      "Karnataka's land revenue records — the RTC (Record of Rights, Tenancy and Crops), also called Pahani — measure agricultural and converted land in Acres and Guntha, not just Acres. A typical RTC entry reads something like \"2 Acres 15 Guntha,\" meaning 2 full acres plus an additional 15 Guntha. Getting the Guntha-to-square-feet conversion right matters when you're verifying a survey number against a sale deed or khata certificate.",
    whyDiffers:
      "Unlike Bigha or Katha, Guntha is unusually consistent: Karnataka, Maharashtra, Andhra Pradesh, and Telangana all define 1 Guntha as 1/40th of an acre — a 33 ft × 33 ft square, or 1,089 sq ft. Karnataka's real difference is Cent, which shows up far more often in coastal Karnataka (Mangaluru, Udupi) than in Bangalore or the interior, largely because of the region's proximity to Kerala, where Cent (1/100 acre = 435.6 sq ft) is the default small-plot unit.",
    unitSections: [
      {
        unit: "Guntha",
        oneLiner: "1 Guntha = 1,089 sq ft = 101.17 sq m = 1/40 acre.",
        explanation:
          "Used throughout Karnataka's RTC and Pahani land records for both agricultural and converted (non-agricultural) land. 40 Guntha make one acre exactly, so a plot recorded as \"1 Acre 20 Guntha\" is 1.5 acres.",
      },
      {
        unit: "Cent",
        oneLiner: "1 Cent = 435.6 sq ft = 40.47 sq m = 1/100 acre.",
        explanation:
          "More common in coastal Karnataka (Dakshina Kannada, Udupi) than in Bangalore, where Guntha and direct square-feet pricing dominate. Cent is popular for smaller residential plots — a \"5 Cent site\" is 2,178 sq ft.",
      },
    ],
    faqs: [
      {
        q: "How many square feet is 1 Guntha in Karnataka?",
        a: "1 Guntha in Karnataka = 1,089 sq ft = 101.17 sq m. This is exactly 1/40th of an acre and is the standard unit used in Karnataka RTC and Pahani land records.",
      },
      {
        q: "What does \"2 Acres 15 Guntha\" mean on a Karnataka RTC?",
        a: "It means 2 full acres (87,120 sq ft) plus 15 Guntha (16,335 sq ft), for a total of 103,455 sq ft — about 2.375 acres.",
      },
      {
        q: "Is Cent or Guntha more common in Bangalore?",
        a: "Bangalore real estate typically prices land directly in square feet or uses Guntha for larger converted plots. Cent is used more in coastal Karnataka districts like Dakshina Kannada and Udupi.",
      },
    ],
    constructionCitySlugs: ["bangalore", "mysuru", "mangaluru"],
  },
  {
    slug: "telangana-andhra-pradesh",
    stateName: "Telangana & Andhra Pradesh",
    region: "standard",
    defaultFromUnit: "guntha",
    defaultToUnit: "acre",
    primaryUnits: ["Guntha", "Cent", "Gajam", "Ankanam"],
    metaTitle: "Telangana & Andhra Pradesh Land Converter — Guntha, Gajam, Ankanam to Sq Ft",
    metaDescription:
      "Convert Guntha, Cent, Gajam, and Ankanam to Square Feet and Acre for Telangana and Andhra Pradesh land records (Adangal/Dharani). 1 Ankanam = 72 sq ft.",
    intro:
      "Telangana and Andhra Pradesh share the same land-record tradition — the Adangal (now digitized via Telangana's Dharani portal and AP's equivalent) — and the same set of local units. Alongside the standard Acre-Guntha system, both states use two everyday real-estate terms that outsiders often don't recognize: Gajam (the local name for a square yard) and Ankanam (a small traditional plot unit still found in older sale deeds).",
    whyDiffers:
      "Guntha in Telangana and AP is defined identically to Karnataka's — 1,089 sq ft, 1/40 acre — because all four states trace their land-measurement system back to the same colonial-era Madras and Hyderabad revenue surveys. Where AP/Telangana genuinely differs from neighboring states is Gajam and Ankanam: Gajam is simply \"Gaj\" (square yard, 9 sq ft) said with a Telugu accent and used in almost every real-estate listing (\"200 Gajam plot\"), while Ankanam (72 sq ft) is a much older unit, mostly seen in coastal Andhra Pradesh (Vizag, Vijayawada, Guntur) on decades-old registered documents rather than new sale deeds.",
    unitSections: [
      {
        unit: "Guntha",
        oneLiner: "1 Guntha = 1,089 sq ft = 101.17 sq m = 1/40 acre.",
        explanation:
          "Used in Adangal/Dharani (Telangana) and equivalent AP land records for agricultural and layout land, identical in value to Karnataka's Guntha.",
      },
      {
        unit: "Gajam (Square Yard)",
        oneLiner: "1 Gajam = 9 sq ft = 0.836 sq m — same as a Square Yard.",
        explanation:
          "The everyday unit for pricing residential plots across Hyderabad, Vijayawada, and Vizag. A \"200 Gajam\" plot is 1,800 sq ft.",
      },
      {
        unit: "Ankanam",
        oneLiner: "1 Ankanam = 72 sq ft = 6.69 sq m.",
        explanation:
          "A traditional small-plot unit, mostly found on older registered documents in coastal Andhra Pradesh. Rarely used for new transactions today but still needs conversion when verifying legacy deeds.",
      },
      {
        unit: "Cent",
        oneLiner: "1 Cent = 435.6 sq ft = 1/100 acre.",
        explanation:
          "Used in border districts closer to Tamil Nadu and Kerala more than in Hyderabad, where Guntha and Gajam dominate.",
      },
    ],
    faqs: [
      {
        q: "What is 1 Gajam in square feet?",
        a: "1 Gajam = 9 sq ft = 0.836 sq m. Gajam is simply the Telugu-region term for a square yard and is the most common unit for pricing residential plots in Telangana and Andhra Pradesh.",
      },
      {
        q: "What is 1 Ankanam in Andhra Pradesh?",
        a: "1 Ankanam = 72 sq ft = 6.69 sq m. It's a traditional unit found mainly on older registered sale deeds in coastal Andhra Pradesh (Vizag, Vijayawada, Guntur) and is rarely used for new transactions.",
      },
      {
        q: "Is Guntha the same in Telangana as in Karnataka?",
        a: "Yes. 1 Guntha = 1,089 sq ft (1/40 acre) in both states — the value is identical because both trace back to the same historical revenue survey system.",
      },
    ],
    constructionCitySlugs: ["hyderabad", "visakhapatnam"],
  },
  {
    slug: "tamil-nadu",
    stateName: "Tamil Nadu",
    region: "standard",
    defaultFromUnit: "ground",
    defaultToUnit: "sqft",
    primaryUnits: ["Cent", "Ground"],
    metaTitle: "Tamil Nadu Land Converter — Cent & Ground to Square Feet, Acre",
    metaDescription:
      "Convert Cent and Ground to Square Feet and Acre for Tamil Nadu land records (Patta/Chitta) and Chennai real estate. 1 Ground = 2,400 sq ft.",
    intro:
      "Tamil Nadu splits its land-unit usage cleanly along rural/urban lines. Patta and Chitta land records (agricultural and converted rural land) measure in Cent, the same 1/100-acre unit used in Kerala. Urban real estate — especially in Chennai — instead prices and lists land in Ground, a unit that doesn't exist in most other Indian states.",
    whyDiffers:
      "Ground is fixed at exactly 2,400 sq ft everywhere in Tamil Nadu — there's no state-to-state ambiguity the way there is with Bigha, because Ground is a Tamil Nadu-specific unit rather than one shared (and redefined) across multiple states. It maps roughly to a traditional 40 ft × 60 ft house plot, which is why Chennai real estate listings almost always quote plot size in Ground rather than square feet.",
    unitSections: [
      {
        unit: "Cent",
        oneLiner: "1 Cent = 435.6 sq ft = 40.47 sq m = 1/100 acre.",
        explanation:
          "The standard unit on Tamil Nadu Patta and Chitta documents for agricultural and semi-urban land, identical in value to Kerala's Cent.",
      },
      {
        unit: "Ground",
        oneLiner: "1 Ground = 2,400 sq ft = 223.03 sq m.",
        explanation:
          "The default unit for urban residential land across Tamil Nadu, especially Chennai. Roughly equivalent to a 40 ft × 60 ft plot. 1 Ground = 5.5 Cent (approximately).",
      },
    ],
    faqs: [
      {
        q: "How many square feet is 1 Ground in Chennai?",
        a: "1 Ground = 2,400 sq ft = 223.03 sq m. It's the standard unit for residential plots across Chennai and the rest of Tamil Nadu, roughly matching a 40 ft × 60 ft plot.",
      },
      {
        q: "How many Grounds is 1 Cent?",
        a: "1 Cent (435.6 sq ft) is about 0.18 Ground. Conversely, 1 Ground (2,400 sq ft) is approximately 5.5 Cent.",
      },
      {
        q: "Do Patta and Chitta records use Cent or Ground?",
        a: "Patta and Chitta records for agricultural and rural land use Cent. Ground is a real-estate market convention for urban residential plots, not typically the unit printed on the Patta itself.",
      },
    ],
    constructionCitySlugs: ["chennai", "coimbatore", "madurai"],
  },
  {
    slug: "west-bengal",
    stateName: "West Bengal",
    region: "west-bengal",
    defaultFromUnit: "bigha",
    defaultToUnit: "sqft",
    primaryUnits: ["Katha", "Bigha"],
    metaTitle: "West Bengal Bigha & Katha Converter — Sq Ft, Acre Conversion",
    metaDescription:
      "Convert West Bengal's Bigha and Katha to Square Feet and Acre using BLRO land-record values. 1 Bigha (Bengal) = 14,400 sq ft, 1 Katha = 720 sq ft.",
    intro:
      "West Bengal's BLRO (Block Land Reforms Office) records measure land in Bigha and Katha, with 20 Katha making one Bigha. These are the numbers that appear on Bengal's Record of Rights (RoR) and are what banks and registrars check against when you're buying land in Kolkata's suburbs or rural Bengal.",
    whyDiffers:
      "Bengal's Bigha (≈14,400 sq ft, about 0.33 acre) is roughly half the size of Uttar Pradesh's or Bihar's Pucca Bigha (≈27,225 sq ft). This is not a rounding difference — it's because each state fixed its own local Bigha independently, based on regional agricultural plot conventions, and neither the British land-settlement system nor independent India ever standardized the unit nationally. The same asymmetry carries down to Katha: Bengal's Katha is 720 sq ft, while Bihar's Katha is nearly double at about 1,361 sq ft. If you're comparing a Bengal Bigha figure against a Bihar or UP one, they are not interchangeable — always check which state's standard a document is using.",
    unitSections: [
      {
        unit: "Katha",
        oneLiner: "1 Katha (West Bengal) = 720 sq ft = 66.89 sq m.",
        explanation:
          "1/20th of a Bengal Bigha. The most commonly quoted unit for small residential plots in Kolkata's suburbs and district towns.",
      },
      {
        unit: "Bigha",
        oneLiner: "1 Bigha (West Bengal) = 14,400 sq ft = 1,337.8 sq m ≈ 0.33 acre.",
        explanation:
          "Equal to 20 Katha. This is the figure that appears on West Bengal BLRO records — roughly half of Uttar Pradesh's or Bihar's Bigha, despite sharing the same name.",
      },
    ],
    faqs: [
      {
        q: "How many square feet is 1 Bigha in West Bengal?",
        a: "1 Bigha in West Bengal = 14,400 sq ft = 1,337.8 sq m ≈ 0.33 acre, as recorded on West Bengal BLRO land records.",
      },
      {
        q: "How many square feet is 1 Katha in West Bengal?",
        a: "1 Katha in West Bengal = 720 sq ft = 66.89 sq m. Twenty Katha make one Bigha (20 × 720 = 14,400 sq ft).",
      },
      {
        q: "Is West Bengal's Bigha the same as Bihar's Bigha?",
        a: "No. West Bengal's Bigha (≈14,400 sq ft) is roughly half of Bihar's Pucca Bigha (≈27,220 sq ft). Each state fixed its own Bigha independently, so the two figures are not interchangeable.",
      },
    ],
    constructionCitySlugs: ["kolkata"],
  },
  {
    slug: "uttar-pradesh-bihar",
    stateName: "Uttar Pradesh & Bihar",
    region: "uttar-pradesh",
    defaultFromUnit: "bigha",
    defaultToUnit: "sqft",
    primaryUnits: ["Bigha", "Biswa"],
    metaTitle: "UP & Bihar Bigha & Biswa Converter — Sq Ft, Acre Conversion",
    metaDescription:
      "Convert Uttar Pradesh and Bihar's Bigha and Biswa to Square Feet and Acre using Khatauni/Jamabandi land-record values. 1 Bigha (Pucca) = 27,225 sq ft.",
    intro:
      "Uttar Pradesh's Khatauni and Bihar's Jamabandi land records both measure land in Bigha, subdivided into 20 Biswa — a completely different scale from West Bengal's Bigha, despite the identical name. This is the \"Pucca Bigha\" standard: the figure used in formal land records, as opposed to informal local variants that can still be found village to village.",
    whyDiffers:
      "Uttar Pradesh's Pucca Bigha (27,225 sq ft, ≈0.625 acre) and Bihar's Bigha (27,220 sq ft, effectively identical) are both roughly double West Bengal's Bigha (14,400 sq ft). This split exists because Bigha was never a metric or nationally standardized unit — it was fixed region by region under British-era land settlements, and Bengal's settlement produced a smaller local Bigha than the settlements used across the Gangetic plains of UP and Bihar. Within UP and Bihar themselves, some districts also use a smaller \"Kuchha Bigha,\" so the Pucca figure shown here should still be confirmed against your specific Khatauni or Jamabandi entry.",
    unitSections: [
      {
        unit: "Bigha",
        oneLiner: "1 Bigha (UP/Bihar, Pucca) = 27,225 sq ft = 2,529.3 sq m ≈ 0.625 acre.",
        explanation:
          "The standard figure on UP Khatauni and Bihar Jamabandi records. Roughly double West Bengal's Bigha, despite the shared name — always check which state's standard applies.",
      },
      {
        unit: "Biswa",
        oneLiner: "1 Biswa (UP/Bihar) = 1,361.25 sq ft = 126.5 sq m.",
        explanation:
          "1/20th of a Pucca Bigha. Used for smaller plot sizes in both UP and Bihar land records, similar in scale to Bihar's Katha (same states, two names for a closely related subdivision).",
      },
    ],
    faqs: [
      {
        q: "How many square feet is 1 Bigha in Uttar Pradesh?",
        a: "1 Bigha (Pucca, UP) = 27,225 sq ft = 2,529.3 sq m ≈ 0.625 acre, as used on UP Khatauni land records.",
      },
      {
        q: "How many square feet is 1 Biswa?",
        a: "1 Biswa = 1,361.25 sq ft = 126.5 sq m. Twenty Biswa make one Pucca Bigha (20 × 1,361.25 = 27,225 sq ft).",
      },
      {
        q: "Is UP's Bigha the same as Bihar's Bigha?",
        a: "Nearly — UP's Pucca Bigha is 27,225 sq ft and Bihar's Bigha is 27,220 sq ft, a negligible difference. Both are roughly double West Bengal's Bigha (14,400 sq ft).",
      },
    ],
    constructionCitySlugs: ["lucknow", "agra", "patna"],
  },
];
