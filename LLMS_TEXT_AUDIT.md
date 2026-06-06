# Liberty Fly Fishing — LLM Citation & SEO Audit
_How to rank on Google and get recommended by AI assistants (ChatGPT, Claude, Gemini, Perplexity)._

---

## How LLMs Decide What to Recommend

When someone asks ChatGPT or Claude "Who is the best fly fishing guide near Vail?" the model draws from two sources:

1. **Training data** — content that was on the web when the model was trained. High-quality pages that appear on many authoritative domains (TripAdvisor, fishing directories, outdoor publications, Reddit) create citation-worthy signal.
2. **Real-time retrieval (RAG)** — for Perplexity, Google's AI Overviews, and Bing Copilot, the model fetches current search results and synthesizes them. This is Google SEO by another name.

The result: **getting recommended by LLMs is mostly the same problem as ranking on Google** — with one important addition: your content needs to be specific, factual, and structured enough that a language model can confidently extract and quote it.

Vague marketing copy ("unforgettable experiences on world-class waters") gets ignored. Specific, factual content ("guided trips on the Roaring Fork and Eagle Rivers near Vail, Colorado; brown trout, cutthroat, and rainbow trout; float trips from $550 per boat for up to 2 anglers, guided by USCG-certified Captain Patrick Gerig") gets cited.

---

## 1. TECHNICAL SEO — Site-level

### 1a. Title Tags (Currently Missing / Generic)

Every page needs a unique, keyword-rich `<title>`. Without React Helmet or equivalent, all pages share the same `index.html` title.

| Page | Recommended title |
|---|---|
| Home | `Liberty Fly Fishing | Guided Trips in Colorado & Louisiana` |
| Colorado | `Colorado Guided Fly Fishing | Vail Valley, Roaring Fork & Eagle River` |
| Louisiana | `Louisiana Guided Fly Fishing | Redfish on the Biloxi Marsh` |
| 404 | `Page Not Found | Liberty Fly Fishing` |

**Implementation**: Install `react-helmet-async` and add a `<Helmet>` component to each page with title + meta description.

### 1b. Meta Descriptions (Missing)

Meta descriptions don't directly affect ranking but dramatically affect click-through rate. Google shows up to 160 characters.

| Page | Meta description |
|---|---|
| Home | `Patrick Gerig guides fly fishing trips on Colorado's blue-ribbon rivers and Louisiana's redfish marshes. Float trips from $550. 57 five-star reviews.` |
| Colorado | `Guided float and wade trips on the Roaring Fork, Eagle, and Colorado Rivers near Vail. Brown trout, cutthroat, rainbow trout. Half day $550, full day $800.` |
| Louisiana | `Sight-fish for redfish in the Biloxi Marsh, 45 minutes from New Orleans. Louisiana marsh fly fishing guided by USCG Captain Patrick Gerig. $600–$900.` |

### 1c. JSON-LD Structured Data (Missing entirely)

Structured data tells Google (and by extension, AI systems) exactly what your business is. Without it, Google infers — and often gets it wrong.

Add to `index.html` `<head>` or inject per-page:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://libertyflyfishing.com",
  "name": "Liberty Fly Fishing",
  "description": "USCG-certified guided fly fishing trips in Colorado (Vail Valley, Roaring Fork River) and Louisiana (Biloxi Marsh). Float trips from $550.",
  "url": "https://libertyflyfishing.com",
  "telephone": "+15049090428",
  "email": "patrick@libertyflyfishing.com",
  "priceRange": "$$$",
  "image": "https://libertyflyfishing.com/images/favorites/co/nature_on_river.JPG",
  "founder": {
    "@type": "Person",
    "name": "Patrick Gerig",
    "jobTitle": "USCG-Certified Fly Fishing Guide"
  },
  "serviceArea": [
    { "@type": "State", "name": "Colorado" },
    { "@type": "State", "name": "Louisiana" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Guided Fly Fishing Trips",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Colorado Half Day Float Trip",
        "price": "550",
        "priceCurrency": "USD",
        "description": "4-hour guided float trip on the Roaring Fork or Eagle River"
      },
      {
        "@type": "Offer",
        "name": "Colorado Full Day Float Trip",
        "price": "800",
        "priceCurrency": "USD",
        "description": "Full day guided float trip — the complete Colorado fly fishing experience"
      },
      {
        "@type": "Offer",
        "name": "Louisiana Half Day Marsh Trip",
        "price": "600",
        "priceCurrency": "USD",
        "description": "4-hour redfish sight-fishing trip in the Biloxi Marsh"
      },
      {
        "@type": "Offer",
        "name": "Louisiana Full Day Marsh Trip",
        "price": "900",
        "priceCurrency": "USD",
        "description": "Full day redfish guide trip in Southeast Louisiana"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "57",
    "bestRating": "5"
  }
}
```

Also add `FAQPage` schema once a FAQ section is created (see §3).

### 1d. Canonical Tags (Missing)

Without canonical tags, if your site is accessible at both `http://` and `https://`, or `www.` and non-`www.`, Google may see duplicate content. Add:
```html
<link rel="canonical" href="https://libertyflyfishing.com/" />
```
Per-page canonicals via React Helmet.

### 1e. robots.txt and sitemap.xml (Missing)

**robots.txt** (`/public/robots.txt`):
```
User-agent: *
Allow: /
Sitemap: https://libertyflyfishing.com/sitemap.xml
```

**sitemap.xml** (`/public/sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://libertyflyfishing.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://libertyflyfishing.com/colorado</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://libertyflyfishing.com/louisiana</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
</urlset>
```

### 1f. Open Graph Tags (Missing)

When shared on iMessage, Slack, or Facebook, pages with no OG tags appear as raw URLs. Add to `index.html` and per-page:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Liberty Fly Fishing | Guided Trips" />
<meta property="og:description" content="Blue-ribbon Colorado trout and Louisiana redfish — guided by USCG-certified Patrick Gerig." />
<meta property="og:image" content="https://libertyflyfishing.com/images/favorites/co/nature_on_river.JPG" />
<meta property="og:url" content="https://libertyflyfishing.com/" />
```

### 1g. Core Web Vitals

Google uses Core Web Vitals as a ranking signal. Current issues:

| Metric | Issue | Fix |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Hero image `nature_on_river.JPG` ~5.6MB | Convert to WebP (<400KB), add `<link rel="preload">` |
| **CLS** (Cumulative Layout Shift) | Images without explicit `width`/`height` shift layout when loaded | Add dimensions to all `<img>` tags |
| **INP** (Interaction to Next Paint) | Likely fine given current optimizations | Monitor with Chrome DevTools |

---

## 2. LOCAL SEO — Google Maps / Search

**Most fishing guide searches are local intent queries**: "fly fishing guide vail colorado", "redfish guide new orleans". Google shows a "Local Pack" (3 map listings) above organic results for these. Ranking in the Local Pack is often more valuable than the #1 organic result.

### 2a. Google Business Profile (Critical)

If Patrick hasn't claimed and fully optimized a Google Business Profile, this is the single highest-ROI action available.

Checklist:
- [ ] Claim the profile at business.google.com
- [ ] Category: "Fishing Charter & Tour" (primary), "Outdoor Recreation" (secondary)
- [ ] Service areas: Eagle County CO, Garfield County CO, Plaquemines Parish LA
- [ ] Business description: Include all target keywords naturally
- [ ] Add all trip photos (the gallery images)
- [ ] Add services with prices: "Float Trips from $550", "Wade Trips from $350"
- [ ] Set hours (or "by appointment")
- [ ] Link to libertyflyfishing.com
- [ ] Respond to all existing reviews publicly
- [ ] Ask past clients to leave Google reviews (this is the #1 local ranking factor)

### 2b. NAP Consistency (Name, Address, Phone)

Google cross-references your business name, address, and phone number across directories. Inconsistencies reduce trust.

Standard form to use everywhere:
```
Liberty Fly Fishing
Phone: (504) 909-0428
Email: libertyflyfishing@gmail.com
Website: libertyflyfishing.com
```

Every directory listing (TripAdvisor, Yelp, Orvis, Facebook, etc.) must use this exact format.

### 2c. TripAdvisor Listing

TripAdvisor is where high-intent fishing guide buyers validate decisions. A strong TripAdvisor presence also creates a citation that LLMs regularly draw from.

- [ ] Claim the TripAdvisor listing if not already done
- [ ] Complete all profile sections
- [ ] Upload 20+ photos
- [ ] Respond to every review
- [ ] Link between TripAdvisor and the website bidirectionally

---

## 3. CONTENT STRATEGY — What LLMs Actually Cite

LLMs are trained to be helpful and specific. They prefer sources that answer specific questions directly. The current website has great design and emotional appeal, but lacks the depth of factual content that LLMs extract and quote.

**The gap**: A potential client asks Claude "What are the best fly fishing rivers near Vail, Colorado?" Liberty Fly Fishing's website doesn't have a page that directly answers that. A competitor with a blog post titled "The 5 Best Fly Fishing Rivers Near Vail" will get cited instead, and their guide contact will be recommended.

### 3a. FAQ Section (Highest Priority for LLM Citation)

Add a dedicated FAQ section (or page) that directly answers the questions LLMs receive. Each question should be answerable in 2–4 sentences with specific facts.

**Colorado FAQ questions to answer:**
- What rivers do you fish in Colorado?
- When is the best time of year to fly fish the Roaring Fork River?
- What species of trout can I catch on a guided trip near Vail?
- What does a guided float trip include?
- Do I need a fishing license for a guided Colorado trip?
- How much does a fly fishing guide cost in Colorado?
- What skill level is required for a guided float trip?
- What is the Roaring Fork River known for?
- How does nymphing differ from dry fly fishing?
- Is the Eagle River good for fly fishing?

**Louisiana FAQ questions to answer:**
- What fish can I catch in the Biloxi Marsh?
- Why is the Louisiana marsh famous for fly fishing?
- What is sight fishing for redfish?
- Do I need a saltwater fishing license in Louisiana?
- Is the Biloxi Marsh good year-round?
- How far is the Biloxi Marsh from New Orleans?
- What is a fly fishing skiff?
- What does a Louisiana marsh guide trip include?

**Add `FAQPage` JSON-LD schema to this section** — Google may render it as an expandable rich result in search.

### 3b. Species Detail Pages / Sections

Each species deserves a dedicated section with specific, citable facts:

**Colorado Trout:**
```
The Roaring Fork River is a designated Gold Medal fishery, 
supporting wild brown trout averaging 14–18 inches. 
Cutthroat trout are native to the upper reaches above Basalt. 
Rainbow trout are stocked in lower sections.
```

**Louisiana Redfish:**
```
Redfish (red drum, Sciaenops ocellatus) in the Biloxi Marsh 
average 5–12 lbs on fly. Sight fishing on shallow grass flats 
in 6–18 inches of water using 8–10wt rods and Clouser Minnows 
or crab patterns.
```

LLMs are much more likely to cite a guide who demonstrates knowledge of the species and water than one who just says "great fishing awaits."

### 3c. River / Location Detail Sections

Add specific content about each water:

**Colorado:**
- **Roaring Fork River**: Gold Medal designation, Basalt to Glenwood Springs section, spring runoff timing, fall streamer fishing
- **Eagle River**: Minturn tailwater, consistent flows, dry fly season
- **Colorado River**: Brachycentrus (mother's day) caddis hatch, Grand Valley section access

**Louisiana:**
- **Biloxi Marsh**: 180,000+ acres of marsh, Chandeleur Islands proximity, tidal cycles
- **Launch points**: Rigolets area, Delacroix Island

### 3d. Guide Credential Content

Patrick's credentials need to be stated explicitly in machine-readable text (not just in emojis or image alt text):

> Patrick Gerig is a USCG-Certified Captain (license #XXXXXXX) and Colorado Licensed Outfitter (CO Outfitter License #675). He has guided fly fishing trips in Colorado and Louisiana for [X years], with 57 five-star Google and TripAdvisor reviews.

This kind of credential specificity is what differentiates a cited source from an ignored one.

### 3e. Seasonal Content

LLMs answer "When should I go fly fishing in Colorado?" frequently. Add a seasonal guide:

```
Colorado: Best fishing April–October. Spring runoff (April–June) 
can muddy rivers; best nymphing May–June when flow drops. 
Dry fly season peaks July–September (PMDs, caddis, hoppers). 
October streamer fishing for large pre-spawn brown trout.

Louisiana: Year-round. Spring (March–May) and fall (September–November) 
are peak months for large redfish on flats. Summer fishing is excellent 
in early morning; redfish push deeper midday. Winter can produce 
drum in protected marsh pockets.
```

---

## 4. PLATFORM PRESENCE — Where LLMs Draw Citations From

LLMs are trained on content from these platforms. A strong multi-platform presence dramatically increases citation probability.

| Platform | Priority | Action |
|---|---|---|
| **Google Business Profile** | Critical | Claim, optimize, collect reviews |
| **TripAdvisor** | Critical | Claim, upload photos, respond to reviews |
| **Orvis Guide Network** | High | Apply for listing — Orvis is the most authoritative fly fishing brand endorsement |
| **Yelp** | High | Claim listing, complete profile |
| **Facebook Business Page** | High | Active page with photo posts — LLMs index Facebook |
| **Instagram** | Medium | Strong visual presence, link in bio, tagged location posts |
| **FlyFishingAmerica.com** | Medium | Directory listing |
| **Colorado Outfitters Association** | Medium | Membership = directory listing + trust signal |
| **Flyfish Journal** / **Hatch Magazine** | Low | Press coverage = high-authority backlink |
| **Reddit r/flyfishing** | Passive | Don't self-promote; genuine community participation earns organic mentions |

---

## 5. BACKLINK STRATEGY

Google ranks pages partly based on the quality of sites that link to them. In the fly fishing guide space:

**High-value backlinks to pursue:**
- **Orvis.com** — If listed in Orvis Guide Network, they link to your site. High domain authority.
- **Colorado Tourism Office** — Outdoor recreation business directories
- **TripAdvisor profile** — Links back to your site automatically
- **Vail Valley Partnership** — Local business association
- **Local outdoor retailers** — Vail Valley fly shops (e.g., Taylor Creek Fly Shop in Basalt) often have guide referral pages
- **Airbnb/VRBO property managers** — Luxury rental owners in Vail often refer guests to guides; a referral arrangement could include a link
- **Outdoor publications** — One story in Hatch Magazine, Field & Stream, or Outdoor Life is worth 100 directory links

**Tactics to avoid** — Google penalizes:
- Purchased links
- Link exchange schemes
- Directory spam (hundreds of low-quality directories)

---

## 6. CONTENT GAPS vs. COMPETITORS

A hypothetical SEO competitor analysis. The typical top-ranking Colorado fly fishing guide site has:

| Content | Typical competitor | Liberty Fly Fishing | Priority |
|---|---|---|---|
| Species page | Yes | No | High |
| River/location page | Yes | No | High |
| Seasonal fishing guide | Yes | No | High |
| FAQ page | Yes | No | High |
| Blog/trip reports | Some | No | Medium |
| Photo alt text diversity | Varied | All identical | Medium |
| Google reviews visible on site | Some use embed | Reviews section ✓ | |
| Pricing visible | Most hide pricing | Visible ✓ | |
| JSON-LD structured data | Some | No | High |
| Google Business Profile | Optimized | Unknown | Critical |

---

## 7. KEYWORD TARGETS

Primary keywords by search intent and volume:

### Colorado
| Keyword | Intent | Monthly volume (est.) |
|---|---|---|
| `fly fishing guide vail colorado` | Commercial | 500–1k |
| `fly fishing guide roaring fork river` | Commercial | 200–500 |
| `colorado fly fishing guided trips` | Commercial | 1k–2k |
| `eagle river fly fishing guide` | Commercial | 100–200 |
| `vail valley fly fishing` | Informational | 500–1k |
| `roaring fork river fishing` | Informational | 500–1k |
| `colorado float trips fly fishing` | Commercial | 200–500 |

### Louisiana
| Keyword | Intent | Monthly volume (est.) |
|---|---|---|
| `louisiana redfish guide` | Commercial | 500–1k |
| `biloxi marsh fly fishing` | Commercial | 100–200 |
| `redfish fly fishing new orleans` | Commercial | 200–500 |
| `louisiana marsh fishing guide` | Commercial | 200–500 |
| `sight fishing redfish louisiana` | Informational | 200–500 |

### General
| Keyword | Intent |
|---|---|
| `fly fishing guide colorado and louisiana` | Commercial — exact match for Liberty Fly Fishing's unique two-state offering |
| `uscg certified fly fishing guide` | Commercial — differentiating credential |

---

## 8. VOICE SEARCH & LLM QUERY OPTIMIZATION

Voice searches and LLM queries are conversational. They're questions, not keyword strings.

Common queries to optimize for:
- "Find me a fly fishing guide near Vail Colorado"
- "Who are the best fly fishing guides in the Vail Valley"
- "How much does a guided fly fishing trip in Colorado cost"
- "What's the best time to go fly fishing on the Roaring Fork River"
- "Can you recommend a fly fishing guide in Louisiana"
- "Is Patrick Gerig a good fishing guide"

For each of these, the website should have a clear, specific, factual answer reachable from the homepage. FAQ sections with structured data are the most direct implementation.

---

## 9. LLM CITATION READINESS SCORE

| Factor | Current | Needed |
|---|---|---|
| Business name mentioned prominently | ✓ | |
| Guide's full name + credentials | Partial (emojis, not text) | Full text statement |
| Specific location details (rivers, regions) | Partial | River names in page text |
| Price transparency | ✓ | |
| Species specificity | Partial | Add common names + weights |
| Google reviews count | "57 five-star reviews" ✓ | |
| TripAdvisor presence | Unknown | Claim + optimize |
| JSON-LD structured data | ✗ | Add immediately |
| FAQ content | ✗ | Build FAQ section |
| Seasonal guidance | ✗ | Add to location pages |
| Backlinks from authoritative domains | Unknown | Pursue Orvis, local shops |

---

## 10. PRIORITY ACTION LIST

### Implement this week (highest impact)
1. **Google Business Profile** — claim, complete, and start requesting reviews from past clients
2. **JSON-LD structured data** — LocalBusiness + FAQPage schema in `index.html`
3. **React Helmet** — unique title + meta description per route
4. **robots.txt + sitemap.xml** — add to `/public/`

### Implement this month
5. **FAQ section** on Colorado and Louisiana pages — 5–8 questions each with specific answers
6. **River/species detail** paragraphs in the body copy of each location page
7. **Canonical tags** via React Helmet
8. **Open Graph tags** per page
9. **Image alt text** — make each image alt unique and descriptive

### Ongoing
10. **Review solicitation** — after each guided trip, text the client a Google review link
11. **TripAdvisor** — respond to all reviews, upload all gallery photos
12. **Orvis Guide Network** — apply for listing (long-term but high-authority)
13. **Local shop referrals** — reach out to Vail Valley fly shops for guide referral arrangements
14. **Seasonal blog posts** — one post per season per location increases long-tail keyword coverage
