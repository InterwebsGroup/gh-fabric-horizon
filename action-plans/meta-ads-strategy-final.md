# Giant Hoodies — Meta Ads Strategy
### One document. Everything you need.
*Built from your actual account data + 2026 best practices. Last updated: February 16, 2026.*

---

# THE DIAGNOSIS

Your Meta account has one problem masquerading as several: **creative starvation inside a structurally sound setup.**

**Your targeting is already correct.** Both ad sets run broad (US, 18-65, no interests) with Advantage+ audience enabled. This aligns with every credible 2026 recommendation. You don't have a targeting problem.

**Your structure is mostly correct.** One CBO campaign, broad targeting, letting Meta's algorithm allocate. The "Sales" campaign was rightfully killed. You're 80% of the way to best-practice structure.

**Your creative is exhausted and lopsided.** In February, one ad — Kallie 003 Unboxing — is eating 48% of Ad Set 1's entire budget ($6,351 of $13,200) at an $81 CPA with below-average conversion ranking. Meanwhile, your best-performing ads (Shekinah 003 at $23 CPA, Danielle 003 at $25 CPA) are getting almost zero spend because the algorithm has no room to test them against the incumbent inside the same CBO. Kallie may be serving an "assist" role — her 472 add-to-carts warm up audiences that convert elsewhere — but the real problem is there's no new creative entering the system to find out if something can do better. You're running 100% video. Zero static. Zero format diversity. Meta's Andromeda algorithm specifically rewards creative *portfolios* — diverse formats, angles, and hooks — not a single format running until it dies.

**The ROAS decline tells the story:**

| Period | ROAS | CPA | What Happened |
|--------|------|-----|---------------|
| Nov 18–30 | 2.4x | $35 | Holiday demand + fresh creative |
| December | 2.0x | $52 | Natural holiday competition spike |
| January | 1.5x | $70 | Post-holiday + creative fatigue setting in |
| Feb 1–16 | 1.3x | $67 | Creative fully fatigued, algorithm stuck |

At $67 CPA with a $94 AOV and 63% contribution margin, you're spending $67 to generate ~$59 in contribution. **You are losing roughly $8 per Meta-acquired customer before fixed costs.** The account is underwater.

---

# THE BROAD VS. TARGETED QUESTION — SETTLED

You were told broad is the only way. That's *mostly* true.

**What's changed:** Meta's Andromeda algorithm (rolled out late 2024, now dominant) uses your ad creative as the primary targeting signal. When you select interests, Meta treats them as suggestions, not restrictions — the algorithm goes beyond them anyway when optimizing for conversions. Interest targeting as a hard filter is dead. Meta has been consolidating interest categories and removing exclusion options since June 2025.

**What this means practically:** Your creative IS your targeting. A video of a mom putting on a hoodie targets moms. A lifestyle image of a woman on a couch with coffee targets comfort seekers. The algorithm reads the visual, matches it to user behavior patterns, and finds buyers. This is why creative diversity matters more than ever — each creative concept effectively targets a different pocket of your total addressable market.

**The nuance people skip:** Broad works best when:

1. You have enough daily spend per ad set to exit the learning phase (~50 conversions/week)
2. Your conversion tracking is clean (Pixel + Conversions API)
3. You feed the algorithm diverse creative that speaks to different buyer types
4. You don't fragment your budget across too many ad sets

Your account hits #1 and #2. It fails on #3 (limited creative, all video, fatigued) and partially on #4 (inconsistent exclusions across ad sets).

**Your exclusion strategy needs cleanup:** Ad Set 1 excludes 180-day purchasers + Klaviyo purchasers + 90-day pixel purchasers. Ad Set 2 only excludes 90-day pixel purchasers. In February, Ad Set 2's lighter exclusions delivered $55 CPA vs. Ad Set 1's $82 CPA — but 65% of Ad Set 2's purchases were returning customers. You need consistent exclusions across ad sets.

**Bottom line:** Keep broad. Stop worrying about targeting. Pour all that energy into creative.

---

# DO THIS NOW

Everything in this section is actionable this week. In priority order.

---

## 1. New Account Structure

### Current State

```
Campaign: Hoodies | Manual Sales Broad CBO (~$850/day)
├── Ad Set 1 — Broad, heavy exclusions (58 NC / 21 RC in Feb) — $82 CPA
├── Ad Set 2 — Broad, light exclusions (46 NC / 74 RC in Feb) — $56 CPA
└── Ad Set 3 — Dead ($693 total spend, $99 CPA)
```

### Target State

```
EXISTING: Hoodies | Manual Sales Broad CBO (keep running, don't touch)
├── Leave Kallie and current ads running
├── Kill Ad Set 3 (dead weight)
└── This campaign stays as-is while you build alongside it

NEW: GH | Test — CBO ($200/day)
└── Ad Set: Creative Testing — Broad, 18-65, US
    ├── Exclusion: 90-day pixel purchasers
    ├── 3-6 new ads per test batch
    ├── Run 5-7 days or until $30-50 spend per ad
    ├── Advantage+ Audience ON
    └── Graduate winners to Scale campaign

NEW: GH | Scale — CBO ($600-800/day, built over weeks 2-4)
└── Ad Set: Scale Winners — Broad, 18-65, US
    ├── Exclusion: 90-day pixel purchasers
    ├── 4-8 proven winning ads graduated from Test
    └── Advantage+ Audience ON

NEW: GH | Retargeting — CBO ($50-100/day, launch week 2)
└── Ad Set: Past Purchasers 90-365 days
    ├── Repeat purchase messaging
    ├── Volume pricing hooks
    └── 2-3 dedicated retargeting ads
```

**Why separate Test from Scale:** This is the single most important structural change. Your current setup mixes untested and proven creative in the same ad sets, which means the algorithm locks onto whatever has the most historical data (Kallie) and starves new creative of budget. A dedicated Test campaign gives new ads clean budget to prove themselves.

---

## 2. This Week's Creative — 5 Static Ads

You're running 100% video. These are your first static images, producible today with Higgsfield + Canva.

### Static 1: "Cozy Couch" — Comfort Seeker Cold Prospecting

**Ad Name:** CS-CozyCouchCold

**Visual:** Woman in her 30s curled up on a deep beige couch in a solid dusty rose hoodie, holding a steaming coffee mug. Warm lamp light, earth-toned living room. She looks content — half smile, relaxed eyes. Shot from slightly above to emphasize how enveloped she is. Hoodie sleeves cover her hands.

**Higgsfield prompt (test both Nano Banana Pro and SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her early 30s curled up on a deep beige sectional couch, wearing the hoodie from the attached photo. The hoodie covers her hands and reaches mid-thigh, hood large and slouchy resting on her shoulders. She is holding a white ceramic coffee mug with both hands, fingers wrapped around it. Her expression is relaxed and content, slight natural smile, eyes soft. Warm golden lamp light from the left side, cozy modern living room background with earth-toned throw pillows and a cream knit blanket draped on the couch arm. Shallow depth of field, shot from slightly above at a 30-degree angle. Warm color grading, soft shadows, natural skin tones. Editorial lifestyle photography style, Canon 85mm f/1.4 lens look.
```

**Canva post-production:**
- Top-left: Semi-transparent Espresso (#3d3028) rounded pill, Cream (#faf7f4) text, DM Sans 600: "It's like wearing a hug."
- Bottom-right: Terracotta (#c4704b) pill badge, white text, DM Sans 700: "Save $20 Today"
- Aspect ratio: 4:5

**Primary text:** You know that feeling when you're freezing on the couch and no blanket is enough? That's exactly why Giant Hoodies exist. It's an oversized, wearable blanket — and 225,000+ customers agree it's the comfiest hoodie they've ever owned. Starting at $55 (save $20). Free shipping on 2+.
**Headline:** The Comfiest Hoodie You'll Ever Own
**Description:** One size fits most. Made in the USA. 30-day guarantee.
**CTA:** Shop Now

**Why this works:** Leads with the exact pain point (being cold) that defines your #1 persona, positions the product as the fix, and stacks social proof + savings. The cozy scene creates "I want to be there" desire.

---

### Static 2: "Review Card" — Social Proof Cold Prospecting

**Ad Name:** CS-ReviewCardCold

**Visual:** Woman in her late 30s in a solid heather gray hoodie in a window seat with a book. Morning light, peaceful expression. Bottom third is a cream review card overlay.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her late 30s sitting in a window seat nook, wearing the hoodie from the attached photo. The hoodie is very large on her, sleeves past her wrists, hem at mid-thigh. She is reading a paperback book, looking down at it with a peaceful absorbed expression. She wears cozy cream knit socks, one leg tucked under her. Soft natural morning light streaming through the window from the right side, creating gentle highlights. Simple white walls, a few throw pillows. Clean composition, warm but slightly desaturated color grading. Shallow depth of field. Editorial lifestyle photography style, natural skin tones, shot at eye level from 6 feet away. Canon 50mm f/1.8 lens look.
```

**Canva post-production:**
- Bottom 35%: Cream (#faf7f4) opaque bar full width
- Inside bar, left-aligned: ★★★★★ in Gold (#c9a962), then "It's so big and comfy, I LIVE in it!" in Espresso (#3d3028), DM Sans 500
- Top-right corner: Small Terracotta (#c4704b) circle badge, white text: "$55"
- Aspect ratio: 4:5

**Primary text:** "It's so big and comfy, I LIVE in it!" — that's not us talking, that's one of our 225,000+ customers. The Giant Hoodie is an intentionally oversized wearable blanket. One size fits most. Made in the USA. Save $20 when you grab yours today.
**Headline:** 225,000+ Customers Can't Be Wrong
**Description:** 4.9 stars. Less than 1% returns. Free shipping on $75+.
**CTA:** Shop Now

**Why this works:** Social proof as the primary hook — the review quote does the selling. Tests whether proof-stacking stops the scroll better than lifestyle alone.

---

### Static 3: "Deal Stack" — Treat-Yourself Buyer Cold Prospecting

**Ad Name:** TY-DealStackCold

**Visual:** Woman in her early 30s in a solid black hoodie, walking through apartment carrying a takeout coffee. Casual, effortless, "errand day" energy. Pricing breakdown card on right side.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her early 30s walking through a modern apartment hallway, wearing the hoodie from the attached photo. The hoodie reaches mid-thigh, sleeves long and relaxed. She carries a takeout coffee cup in one hand. Her expression is casual and confident, slight natural smile. Natural daylight from windows, clean modern apartment with white walls and minimal decor. Candid walking pose, mid-stride, natural and unposed. Warm color grading, bright and clean. Shot from slightly in front at a natural angle. Canon 35mm f/1.4 lens look, street lifestyle photography style.
```

**Canva post-production:**
- Right side: Stacked pricing in Sand (#e8d5c4) rounded card:
  - "1 for $55" in Espresso
  - "2 for $45/ea — save $60" in Terracotta, bold
  - "3+ for $39/ea — save $108+" in Terracotta, bold
- Bottom strip: Espresso bar with Cream text: "Free Shipping on 2+"
- Aspect ratio: 4:5

**Primary text:** One hoodie: $55 (save $20). Two hoodies: $45 each (save $60). Three: $39 each (save $108). The math does itself. Giant Hoodies are oversized wearable blankets, printed by hand in the USA. Grab one. Or three. We won't judge.
**Headline:** The More You Buy, The More You Save
**Description:** Compare at $75 each. Free shipping at $75+.
**CTA:** Shop Now

**Why this works:** Treat-yourself buyers need the math to justify the purchase. Stacking savings visually creates "why wouldn't I buy 2?" The playful tone removes guilt.

---

### Static 4: "Gift Angle" — Gifter Cold Prospecting

**Ad Name:** GF-SizingSolvedCold

**Visual:** Woman in a solid burgundy hoodie sitting on the floor next to a couch, delighted expression, gift box nearby. Candid joy.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her early 30s sitting on the floor next to a couch, wearing the hoodie from the attached photo. The hoodie is very large on her. She has a genuinely delighted expression, wide natural smile, hands touching the hoodie fabric as if she just put it on for the first time. Warm living room with earth-toned decor, a gift box with tissue paper visible nearby on the floor. Warm golden lamp light, cozy domestic setting. Authentic candid joy, not posed. Shallow depth of field. Canon 85mm f/1.4 lens look, editorial lifestyle photography.
```

**Canva post-production:**
- Top-left: Cream (#faf7f4) text on semi-transparent Espresso pill: "One size fits most = zero guessing."
- Bottom: Warm Gray on Cream bar: ★★★★★ "This is my third Giant Hoodie and I couldn't be more in love." — Grace
- Aspect ratio: 4:5

**Primary text:** No more guessing sizes. No more gift receipts. Giant Hoodies are one size fits most — that's the whole point. It's a wearable blanket, not a fitted shirt. The perfect gift for anyone who loves being cozy (so... everyone). 7,000+ designs to match their personality.
**Headline:** The No-Guessing-Required Gift
**Description:** One size fits most. 7,000+ designs. 30-day guarantee.
**CTA:** Shop Now

**Why this works:** "One Size Fits Most" is the single most powerful gifting message. Eliminates the #1 reason people hesitate on gifting apparel.

---

### Static 5: "Movie Night" — Practical Parent Cold Prospecting

**Ad Name:** PP-MovieNightCold

**Visual:** Woman in her late 30s in a solid charcoal gray hoodie on a large sectional with a bowl of popcorn. Movie night vibe — dim lamp light, blankets, cozy evening.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her late 30s curled up on a large beige sectional couch, wearing the hoodie from the attached photo. The hoodie is very large on her. She holds a bowl of popcorn in her lap, looking relaxed and happy with a slight smile. The scene is cozy with dim warm lamp light, a few throw blankets on the couch, soft evening ambiance suggesting movie night. Natural, authentic, unposed domestic scene. Warm color grading with rich shadows. Shallow depth of field. Shot from a natural angle as if sitting across the room. Canon 35mm f/2.0 lens look, candid lifestyle photography.
```

**Canva post-production:**
- Top: Espresso text, DM Sans 600: "Movie night upgrade."
- Bottom: Sand card with stacked pricing:
  - "Family pack: 3+ hoodies at $39 each"
  - "Kids hoodies count too!"
- Terracotta badge: "Save $108+"
- Aspect ratio: 4:5

**Primary text:** No more fighting over the one good blanket. Giant Hoodies are wearable blankets for the whole family — oversized, impossibly soft, and starting at $39 each when you grab 3+. Kids sizes available. Printed by hand in the USA with a 30-day guarantee.
**Headline:** Hoodies for the Whole Family — $39 Each
**Description:** Kids + adults. 3+ for $39/ea. Free shipping. Made in the USA.
**CTA:** Shop Now

**Why this works:** "Fighting over the blanket" is a universal family pain point. Per-unit pricing and "whole family" message hits the practical parent's value lens. Your Fraggell "Why Moms Love" video already proves this angle works — this tests it in static.

---

## 3. Testing Framework

### Launch Protocol

**Budget:** $200/day CBO in the Test campaign, one ad set
**Targeting:** Broad, US, 18-65, exclude 90-day pixel purchasers, Advantage+ ON
**Optimization:** Purchase conversions
**Duration:** 5-7 days per batch before making decisions

### Decision Criteria

| Metric | After $30-50/ad spend | Action |
|--------|----------------------|--------|
| CTR > 1.5% AND CPA < $55 | Winner | Graduate to Scale campaign |
| CTR > 1.5% BUT CPA $55-75 | Promising | Run another 3-4 days |
| CTR < 1.0% | Weak hook | Kill and iterate on the angle |
| CPA > $80 after $50 spend | Loser | Kill immediately |
| CTR > 2.5% AND CPA < $40 | Home run | Graduate + create variations |

**Why $55 CPA as the target:** $94 AOV × 63% contribution margin = $59.22 contribution per order. A $55 CPA leaves $4.22 profit per order before fixed costs. Not great alone, but with 3-month LTV of $122 and 29.79% repeat rate, the customer becomes profitable fast. $55 is the first-purchase breakeven threshold.

### Scaling Winners

When an ad graduates to Scale:
1. Duplicate into Scale campaign ad set
2. Don't touch budget — let CBO redistribute naturally
3. Monitor 3-5 days to confirm CPA holds
4. If CPA holds < $55, create 2-3 variations (same concept, different hoodie color, different overlay copy)
5. Increase Scale campaign budget 15-20% every 3-4 days if blended CPA stays in range

---

## 4. Week-by-Week Transition Plan

**Week 1:**
- Kill Ad Set 3 in existing campaign (dead weight)
- Leave Kallie and all other existing ads running untouched
- Generate Statics 1-5 in Higgsfield, finish in Canva
- Launch Test campaign with all 5 statics at $200/day

**Week 2:**
- Launch Retargeting campaign ($50-75/day) with repeat-purchase creative (see Long Term section)
- Evaluate Test results — graduate any winners

**Week 3:**
- Build Scale campaign with graduated winners
- Existing campaign continues in parallel — you now have a clean comparison point

**Week 4+:**
- If Scale is spending consistently at target CPA, begin reducing budget on old campaign
- Watch what happens to Scale performance — if Kallie was truly assisting, you'll see it
- Phase old campaign down gradually, not off a cliff
- Standardize all prospecting exclusions to 90-day pixel purchasers

---

## 5. Key Metrics to Track Weekly

| Metric | Current (Feb) | Target | Why |
|--------|--------------|--------|-----|
| Blended CPA | $67 | < $55 | First-purchase breakeven |
| New Customer CPA | ~$85 (est.) | < $65 | Profitable with LTV factored |
| Blended ROAS | 1.3x | > 1.7x | Minimum account health |
| CTR (link) | 2.5% (varies) | > 2.0% | Creative resonance signal |
| Cost per Add to Cart | ~$10 | < $8 | Early creative quality signal |
| Creative kill rate | Unknown | 60-70% | Most ads should fail — normal |
| New ads launched/week | ~0 | 3-5 | The creative velocity target |

---

# DO THIS LONG TERM

Everything below is the ongoing creative engine and strategic foundation. Reference it weekly as you produce new creative batches.

---

## Buyer Persona Deep-Dives

These are your five buyer profiles, expanded with targeting signals, objections, and hook angles. In 2026, these don't drive audience targeting (the algorithm handles that) — they drive **creative strategy.** Each persona gets its own creative concepts so the algorithm can match the right message to the right user.

### 1. Comfort Seeker (Primary Persona)

**Demographics:** Women 28–55, skews 35–50. Income $40k–$80k. Mix of single and partnered. Cold-weather or transitional climates. Works from home or desk job.

**Psychographics:** Comfort is a baseline requirement, not a luxury. Hates being cold more than anything. Clothing is functional armor against discomfort. Values reliability over novelty. Watches cozy-core content (hygge, ASMR, comfort food). Identifies with "I'm always the cold one in the room."

**Purchase trigger:** A specific moment of being cold and miserable — shivering on the couch under a blanket that keeps slipping, freezing in an over-AC'd office. The purchase happens when discomfort meets a solution in the feed.

**Objections and busters:**

| Objection | Buster |
|-----------|--------|
| "Is it actually that soft/warm?" | 225,000+ customers, 4.9 stars, <1% return rate, "It's like wearing a hug" |
| "Will it fit me? I'm not a 3XL." | "One Size Fits Most — it's a wearable blanket, not a fitted shirt." |
| "$55 for a hoodie seems like a lot." | Compare-at $75, save $20. Buy 2 save $60. 30-day guarantee = zero risk. |

**Creative targeting signals:** This persona is reached through creative featuring cozy home environments, coffee/tea moments, couch scenes, cold weather references, evening/nighttime comfort.

**Best hook angles:**
1. Pain point → solution: "You're freezing on the couch again. We fixed that."
2. Sensory promise: "The softest thing you'll ever put on your body."
3. Social proof avalanche: "225,000+ people can't stop wearing theirs."

---

### 2. Nester

**Demographics:** Women 30–50, income $60k–$100k. Homeowner or invested renter. Often partnered with kids or pets. Design-conscious but not trend-obsessed.

**Psychographics:** Home is a sanctuary. Curates comfort — matching pillows, the right candle, a good robe. Will pay more for elevated comfort. Values "quality over quantity." Follows home decor accounts and "cozy vibes" content. Purchases are investments in daily happiness.

**Purchase trigger:** Scrolling a cozy lifestyle scene and thinking "I want my life to look and feel like that." Or replacing worn-out loungewear with an upgrade.

**Objections and busters:**

| Objection | Buster |
|-----------|--------|
| "Does it look cheap?" | Oprah, GMA, Forbes features signal legitimacy. 7,000+ designs. |
| "Is it well-made?" | Made in the USA, printed by hand. <1% return rate. 30-day guarantee. |
| "I already have loungewear." | "This replaces your robe, your throw blanket, AND your hoodie." |

**Creative targeting signals:** Aspirational home settings, styled kitchens, reading nooks, elevated-but-cozy lifestyle imagery, press mention callouts.

**Best hook angles:**
1. Aspirational lifestyle: "This is what staying in looks like."
2. Quality/provenance: "Handmade in the USA. Featured on Oprah's Favorite Things."
3. Multi-use value: "Your new robe, blanket, and hoodie — in one."

---

### 3. Treat-Yourself Buyer

**Demographics:** Women 22–40, skews younger. Income $35k–$70k. Impulse-driven. Heavy social media user.

**Psychographics:** Shopping is self-care. Buying something for herself is the reward. Responds to deals because "saving money while treating myself" removes guilt. Doesn't need a practical reason — "I deserve this" is enough. Low decision friction when the price feels right.

**Purchase trigger:** Emotional moment — bad day, payday, "retail therapy" mood, seeing something cute at the right time. The easier you make the decision, the faster she buys.

**Objections and busters:**

| Objection | Buster |
|-----------|--------|
| "Do I really need this?" (guilt) | "You deserve to be comfortable." Frame as self-care. |
| "I should save my money." | Save $20 today. 2 for $45 each. Stack the value. |
| "What if I don't wear it?" | 30-day guarantee. <1% return rate — people come back for more. |

**Creative targeting signals:** Relatable self-care moments, casual errand-running scenes, deal/pricing visuals, "treat yourself" energy, relatable humor.

**Best hook angles:**
1. Permission to indulge: "You've been adding things to cart all week. This one's worth it."
2. Deal justification: "Save $20 today. Your couch is waiting."
3. Bandwagon: "225,000+ people already own one. Your turn."

---

### 4. Gifter

**Demographics:** Women 30–55 (buying for partners, kids, parents, friends). Income $50k–$100k. Shops early for gifts. Often buys multiples.

**Psychographics:** Gifting is her love language. More joy in giving than receiving. Wants gifts that feel thoughtful AND useful. Needs confidence the recipient will love it — terrified of a gift that gets returned or sits in a drawer.

**Purchase trigger:** An upcoming occasion (birthday, holiday, "just because") combined with seeing a product that screams "they would LOVE this." Volume pricing triggers the gifter instinct hard.

**Objections and busters:**

| Objection | Buster |
|-----------|--------|
| "Will the recipient actually like it?" | 4.9 stars, 225,000+ happy customers, <1% returns. |
| "What size do I get?" | One Size Fits Most — zero guessing required. |
| "Buying for multiple people gets expensive." | 3+ at $39/ea. Save $108+. Volume pricing designed for gifters. |

**Creative targeting signals:** Gift-wrapping scenes, delighted unwrapping reactions, multi-unit imagery, "no guessing" sizing messaging, family/friend moments.

**Best hook angles:**
1. Reaction shot: "The gift they'll actually wear every single day."
2. Sizing solved: "One size fits most = zero guessing. The perfect gift."
3. Volume value: "3 hoodies for $117. That's $39 each — save $108."

---

### 5. Practical Parent

**Demographics:** Women 30–50 with kids. Income $50k–$90k. Time-poor, decision-fatigued. Values easy, durable, good value. Not interested in trends — interested in solutions.

**Psychographics:** Every purchase evaluated through a utilitarian lens: Will it last? Will they use it? Worth the money? Hates returns (no time). Loves anything for the whole family. Skeptical of hype — wants proof, not promises.

**Purchase trigger:** A practical need (kid needs a warm layer, family movie night, matching outfits) combined with a strong value proposition. Seeing other families use the product is the green light.

**Objections and busters:**

| Objection | Buster |
|-----------|--------|
| "My kids will ruin it." | Machine washable. Sponge fleece is durable. Kids sizes available. |
| "Is it a gimmick?" | 225,000+ customers. Oprah's Favorite Things. <1% returns. |
| "One for each kid plus me is expensive." | 3+ at $39/ea. Kids count toward tiers. Family of 4 under $160. |

**Creative targeting signals:** Family scenes, movie night imagery, practical/domestic settings, work-from-home-with-kids energy, proof-heavy copy with stats.

**Best hook angles:**
1. Family value: "Hoodies for the whole family. $39 each when you buy 3+."
2. Parent empathy: "No one fights over the blanket when everyone has a Giant Hoodie."
3. Proof over promises: "225,000+ families. 4.9 stars. Less than 1% returns."

---

## Full Creative Library — By Persona

This is your ongoing creative bank. Each concept is a complete brief. Work through these in batches of 3-5 per week, prioritizing whichever persona's angles haven't been tested yet.

### Comfort Seeker Ads

#### CS-01: Cozy Couch *(included in Week 1 batch above as Static 1)*

#### CS-02: Review Card *(included in Week 1 batch above as Static 2)*

#### CS-03: Retargeting Nudge — Warm Retargeting

**Ad Name:** CS-RetargetNudge

**Visual:** Close-up — woman's hands wrapped around a mug, wearing a solid sage green hoodie, sleeves pulled over hands. Only torso, hands, and mug visible. Warm, intimate, textural. Fabric softness is the star.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic close-up lifestyle photograph showing a woman's torso and hands. She wears the hoodie from the attached photo, the sleeves are very long and pulled over her hands creating cozy sweater paws. She is holding a warm ceramic mug with both covered hands. Only her torso from chest to lap is visible, no face shown. The hoodie fabric looks soft and plush. Warm golden side lighting, shallow depth of field, blurred cozy background suggesting a living room. Intimate close-up composition, warm color grading, rich textures. Product photography meets lifestyle, Canon 100mm f/2.8 macro lens look.
```

**Canva post-production:**
- Center: Large Cream (#faf7f4) text, DM Sans 700: "Still thinking about it?"
- Below: Smaller DM Sans 400: "30-day guarantee. You'll love it."
- Bottom: Terracotta pill CTA: "Shop Now — Save $20"
- Aspect ratio: 1:1

**Primary text:** Still thinking about it? Here's what you should know: 225,000+ customers, 4.9 stars, and less than 1% of people return theirs. Our 30-day "Best Hoodie Ever" Guarantee means zero risk. Your couch is waiting.
**Headline:** Your Giant Hoodie Is Waiting
**Description:** 30-day guarantee. Free shipping on $75+.
**CTA:** Shop Now

**Why this works:** Acknowledges the browse without being creepy. Close-up texture re-triggers tactile desire. Short, confident copy removes hesitation.

---

#### CS-04: Cart Abandonment — Hot Retargeting

**Ad Name:** CS-CartAbandonHot

**Visual:** Extreme close-up of soft plush fleece in solid dusty blue. Pure texture filling the frame. Minimal and sensory.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's color and fabric texture identically to the attached photo with no modification. Photorealistic extreme close-up photograph of the hoodie fabric from the attached photo, filling the entire frame. The fabric has a rich, soft texture with gentle folds and creases catching warm side lighting. Shallow depth of field with the closest fold in sharp focus and the rest softly blurred. Warm golden light from the left side creating highlights and soft shadows on the fabric surface. Textural, sensory, intimate. Product detail photography style, Canon 100mm f/2.8 macro lens look.
```

**Canva post-production:**
- Center: Large Cream text, DM Sans 700: "You left something cozy behind."
- Below: Smaller DM Sans 400: "It's still in your cart."
- Bottom: Terracotta pill CTA: "Complete Your Order"
- Aspect ratio: 1:1

**Primary text:** Your Giant Hoodie is still waiting. 30-day "Best Hoodie Ever" Guarantee — if you don't love it, we'll make it right. But with 225,000+ happy customers and less than 1% returns? You're going to love it.
**Headline:** Your Cart Misses You
**Description:** 30-day guarantee. Free shipping on $75+.
**CTA:** Shop Now

**Why this works:** Direct cart recovery with sensory reinforcement. Texture shot re-triggers tactile desire. Short, confident, no desperation.

---

### Nester Ads

#### NS-01: Elevated Kitchen — Cold Prospecting

**Ad Name:** NS-ElevatedHomeCold

**Visual:** Woman in her early 40s in a solid cream hoodie, standing in a styled kitchen holding a mug. Morning light. Aspirational but attainable — white counters, wood accents, a plant. Hair loosely pulled back. The hoodie looks intentional, not sloppy.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her early 40s standing in a modern farmhouse kitchen, wearing the hoodie from the attached photo. The hoodie reaches mid-thigh with long sleeves. She holds a ceramic mug in one hand, leaning casually against a white marble countertop. Her hair is loosely pulled back in a low bun. Relaxed confident expression, slight smile. The kitchen has white cabinets, light wood cutting boards, a small potted herb plant, and warm morning sunlight streaming through a window. Clean, bright, editorial home lifestyle feel. Warm color grading, soft natural light, shallow depth of field. Shot at eye level from 8 feet away. Canon 35mm f/1.4 lens look, editorial interiors photography style.
```

**Canva post-production:**
- Top-center: Small Warm Gray (#5a4a3d), DM Sans 400, italic: "As Seen on Oprah's Favorite Things"
- Bottom: Sand (#e8d5c4) bar with Espresso (#3d3028) text, DM Sans 600: "Handmade in the USA · 7,000+ designs"
- No aggressive price badge — let the lifestyle sell
- Aspect ratio: 4:5

**Primary text:** Your new morning uniform. The Giant Hoodie is an oversized wearable blanket, printed and packed by hand in the USA. 7,000+ designs to match your vibe. Featured on Oprah's Favorite Things, Good Morning America, and Forbes. Starting at $55 (compare at $75).
**Headline:** Your Home Deserves This Hoodie
**Description:** Handmade in the USA. 30-day guarantee. Free shipping on $75+.
**CTA:** Shop Now

**Why this works:** The Nester buys into lifestyle, not products. Press mentions do the heavy lifting on credibility without screaming "BUY NOW."

---

#### NS-02: Multi-Use Value — Cold Prospecting

**Ad Name:** NS-MultiUseCold

**Visual:** Woman in a solid navy hoodie on a stylish reading chair, book in hand, throw blanket on lap. Afternoon light, magazine-quality feel.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her mid-30s sitting in a mid-century modern accent chair in a living room, wearing the hoodie from the attached photo. The hoodie is very large on her. A cream knit throw blanket is draped across her lap. She holds an open hardcover book in one hand, looking at it with a relaxed expression. The living room has a floor lamp with warm light, a small side table with a candle, and earth-toned decor. Warm afternoon light from a window on the left. Editorial home lifestyle photography, warm color grading, shallow depth of field, natural skin tones. Shot from a 45-degree angle at seated eye level. Canon 85mm f/1.4 lens look.
```

**Canva post-production:**
- Left side vertical text in Cream on semi-transparent Espresso bar: "Your robe. Your blanket. Your hoodie."
- Bottom-right: Terracotta badge: "From $55"
- Aspect ratio: 4:5

**Primary text:** It replaced her robe. Her throw blanket. Her ratty old hoodie. The Giant Hoodie is the one piece that does it all — oversized, impossibly soft, and made by hand in the USA. 7,000+ designs. Starting at $55 (save $20 from $75). Buy 2 and save $60.
**Headline:** One Hoodie to Replace Everything
**Description:** Made in the USA. 4.9 stars. 30-day guarantee.
**CTA:** Shop Now

**Why this works:** Nesters hate clutter and love multi-functional quality pieces. Framing the hoodie as a replacement for multiple inferior items hits their "curated comfort" instinct.

---

#### NS-03: Press Credibility — Warm Retargeting

**Ad Name:** NS-PressRetarget

**Visual:** Clean, minimal. A solid oatmeal hoodie draped over a styled wooden stool. No person — pure product photography with lifestyle context. Warm, editorial.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic product lifestyle photograph of the hoodie from the attached photo draped artfully over a light wooden stool. The hoodie is large and slouchy with a big hood, long sleeves hanging down. Clean minimal background, white wall with warm light. A small potted succulent and a ceramic candle on the floor nearby for styling. Soft natural side lighting, warm color grading. Clean editorial product photography style, shallow depth of field. Shot straight on at table height. Canon 50mm f/1.8 lens look. Simple, elevated, magazine-quality.
```

**Canva post-production:**
- Top: Row of press logos in Warm Gray — small: "As seen on: Oprah · GMA · Forbes · Cosmo"
- Center: Large Fraunces 600 heading in Espresso: "Your New Favorite Hoodie"
- Bottom: Terracotta pill CTA: "Shop Now — Save $20"
- Aspect ratio: 1:1

**Primary text:** You were looking. We get it — it's hard to commit. Here's what convinced 225,000+ other people: Featured on Oprah's Favorite Things. 4.9 stars. Made by hand in the USA. And our 30-day guarantee means you've got nothing to lose.
**Headline:** Featured on Oprah's Favorite Things
**Description:** 225,000+ happy customers. Less than 1% returns.
**CTA:** Shop Now

**Why this works:** Nesters need credibility before purchasing. Press logos are trust accelerators. Clean product styling appeals to their aesthetic sense.

---

### Treat-Yourself Buyer Ads

#### TY-01: Permission to Indulge — Cold Prospecting

**Ad Name:** TY-PermissionCold

**Visual:** Woman in her late 20s in a solid mauve hoodie, sinking into a couch with eyes closed, blissful expression. Hair messy, no makeup — pure "just for me" energy. Warm tungsten evening lighting.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her late 20s sinking into a deep couch, wearing the hoodie from the attached photo. The hoodie is very large on her, hood up and slouchy. Her eyes are closed with a blissful content expression, slight smile. Her hair is messy and natural, no makeup visible. She is leaning back into couch cushions looking completely relaxed. Warm tungsten evening lighting from a lamp, cozy living room with soft warm tones. Casual, authentic, unposed feeling. Warm rich color grading, shallow depth of field. Shot from slightly below at a natural candid angle. Canon 35mm f/2.0 lens look, lifestyle photography style.
```

**Canva post-production:**
- Top: Large Cream text, DM Sans 700: "You deserve this."
- Bottom: Terracotta bar full-width with white text: "Save $20 Today · Free Shipping on 2+"
- Aspect ratio: 4:5

**Primary text:** You've been adding things to cart all week. This one's actually worth it. The Giant Hoodie is the comfiest oversized hoodie you'll ever own — like wearing a hug. 225,000+ customers can't stop buying them. Save $20 today. Treat yourself. Seriously.
**Headline:** Go Ahead — You Deserve It
**Description:** $55 (save $20). 30-day guarantee. Free shipping on $75+.
**CTA:** Shop Now

**Why this works:** Gives explicit permission to buy. "You've been adding things to cart" is meta and relatable for impulse shoppers. The blissful image sells the emotional payoff.

---

#### TY-02: Deal Stack *(included in Week 1 batch above as Static 3)*

---

### Gifter Ads

#### GF-01: Family Stack — Cold Prospecting

**Ad Name:** GF-FamilyStackCold

**Visual:** Woman in her 40s in a solid forest green hoodie, wrapping a gift box on a kitchen counter. Warm kitchen lighting. A few wrapped boxes nearby. Holiday-adjacent but not Christmas-specific.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her early 40s standing at a kitchen counter wrapping a gift box, wearing the hoodie from the attached photo. The hoodie is very large on her. She is smiling warmly, looking down at the gift she is wrapping with a white ribbon. On the counter are two other neatly wrapped gift boxes in neutral paper. Warm kitchen with white cabinets and warm pendant lighting. Happy, genuine expression. Warm golden lighting, cozy domestic scene. Shallow depth of field. Shot from across the counter at eye level. Canon 50mm f/1.8 lens look, editorial lifestyle photography.
```

**Canva post-production:**
- Top: Cream text, DM Sans 600: "The gift they'll actually wear every day."
- Bottom: Sand pricing card: "3 hoodies = $117 (just $39 each)" / "Save $108 from $75 each"
- Small terracotta badge: "Free Shipping"
- Aspect ratio: 4:5

**Primary text:** Stop buying gifts that end up in a drawer. Giant Hoodies are the gift people actually wear — every single day. One size fits most means zero guessing on size. Buy 3+ and pay just $39 each (save $108). 225,000+ happy customers and a 30-day guarantee.
**Headline:** The Gift They'll Wear Every Single Day
**Description:** One size fits most. $39 each when you buy 3+. Made in the USA.
**CTA:** Shop Now

**Why this works:** Directly addresses gifter anxiety ("gifts that end up in a drawer"). Volume pricing positioned as the gifter's reward.

---

#### GF-02: Sizing Solved *(included in Week 1 batch above as Static 4)*

---

### Practical Parent Ads

#### PP-01: Movie Night *(included in Week 1 batch above as Static 5)*

#### PP-02: Value Proof — Cold Prospecting

**Ad Name:** PP-ValueProofCold

**Visual:** Woman in a solid light blue hoodie at a kitchen table with a laptop and coffee. Work-from-home parent energy — comfortable but functional. Bright morning light.

**Higgsfield prompt (SeedSeam 4.5):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of a woman in her mid-30s sitting at a light wood kitchen table, wearing the hoodie from the attached photo. The hoodie is very large on her. She has a laptop open in front of her and a ceramic coffee mug to the side. She is looking at the laptop with a relaxed focused expression, one hand on the keyboard. Bright natural morning light from a window, clean modern kitchen background. Work from home scene, authentic and natural. Warm color grading, bright and clean. Shallow depth of field. Canon 50mm f/1.8 lens look, editorial lifestyle photography.
```

**Canva post-production:**
- Bottom third: White card overlay:
  - "★★★★★ 4.9 stars · 225,000+ customers"
  - "Less than 1% returns (industry avg: 21%)"
  - Terracotta text: "Starting at $55 · Save $20"
- Top-right: Small Espresso badge: "Made in USA"
- Aspect ratio: 4:5

**Primary text:** Here's what convinced 225,000+ people: 4.9 stars. Less than 1% of orders get returned (the average apparel brand? 21%). Made by hand in the USA. 30-day guarantee. And at $55 (save $20 from $75), it's the most comfortable hoodie you'll ever own. The numbers don't lie.
**Headline:** 225,000+ Customers. Less Than 1% Returns.
**Description:** $55 (save $20). Made in the USA. 30-day guarantee.
**CTA:** Shop Now

**Why this works:** Practical parents need proof, not promises. The <1% return stat vs. 21% industry average is a powerful "this isn't hype" signal.

---

#### PP-03: Repeat Buyer — Warm Retargeting (Past Purchasers)

**Ad Name:** PP-RepeatBuyerWarm

**Visual:** Close-up of someone pulling on an oversized hoodie — fabric billowing mid-pull. Solid oatmeal color. Action shot, sense of ritual and comfort.

**Higgsfield prompt (Nano Banana Pro):**
```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph capturing the moment of a person pulling the hoodie from the attached photo over their head, the large fabric billowing and flowing as they put it on. Shot from the front, capturing the hoodie mid-pull with the person's face partially obscured by fabric. Arms raised, the hoodie is clearly very oversized and large. Warm natural side lighting, clean neutral background suggesting a bedroom. Dynamic action moment frozen in time. Warm color grading. Canon 85mm f/1.4 lens look, editorial fashion photography, slight motion captured.
```

**Canva post-production:**
- Center: DM Sans 700, Espresso: "Time for another one?"
- Below: Terracotta text: "Your 2nd hoodie = $45 (save $60 total)"
- Bottom: Cream bar: "Your 3rd = just $39 (save $108+)"
- Aspect ratio: 1:1

**Primary text:** You already know how good your first one is. Now imagine having one for the couch AND one for running errands. Your 2nd Giant Hoodie is just $45 — that's $60 saved total. Add a 3rd for $39 each and save $108+.
**Headline:** Your Second Giant Hoodie Is Calling
**Description:** Buy 2 at $45/ea. Buy 3+ at $39/ea. Free shipping.
**CTA:** Shop Now

**Why this works:** Past purchasers don't need product convincing — they need a reason to buy again. Volume pricing gives the logical justification.

---

## Video Concepts to Produce (Weeks 2-4)

Your existing video creative is fatigued but the format works. New concepts:

**Video 1: "Transformation" hook** — Camera starts on someone cold/uncomfortable, cut to putting on the hoodie, instant relief/happiness. 15 seconds max. Hook: "I was freezing until I found this."

**Video 2: "Closet tour" UGC** — Creator opens closet, shows 3+ Giant Hoodies, talks about why she keeps buying more. Targets repeat psychology. "This is my third one and I'm already eyeing my fourth."

**Video 3: "Side by side"** — Giant Hoodie vs. regular hoodie vs. blanket. Visual comparison showing it's the best of both worlds. Direct, benefit-focused, 20 seconds.

**Video 4: "Errand run"** — Creator wears the hoodie out — coffee shop, grocery store, school pickup. Proves it's not just a home-only product. "I wear mine everywhere."

**Video 5: "Gift reaction"** — Film someone opening a Giant Hoodie as a gift. Genuine reaction. Gifters eat this up. Works for any season.

---

## Retargeting Creative (for Campaign 3)

**Retarget Static 1: "Time for another one?"** — Fabric texture close-up (Higgsfield) with overlay: "Time for another one?" + volume pricing breakdown. (Full brief in PP-03 above.)

**Retarget Static 2: "New designs just dropped"** — Catalog/collection style showing 4-6 real product thumbnails from the site in a grid. Drives design discovery for people who already love the product. Build in Canva using actual product images.

**Retarget Static 3: "Still thinking about it?"** — Sage green texture close-up with warm copy addressing hesitation. (Full brief in CS-03 above.)

---

## Ongoing Creative Velocity

**Target: 3-5 new ads per week into the Test campaign.**

This is the single most important operational habit. The accounts that win on Meta in 2026 are the ones with the highest creative testing velocity.

Weekly rhythm:
- **Monday:** Pick 2-3 concepts from the Creative Library above (or develop new ones following the persona framework)
- **Monday-Tuesday:** Generate in Higgsfield, finish in Canva
- **Wednesday:** Load into Test campaign
- **Following Wednesday:** Evaluate results. Graduate winners. Kill losers. Load next batch.

Over time you'll build pattern recognition: which personas convert best, which visual styles stop the scroll, which copy hooks drive clicks. Feed those learnings back into new creative concepts. The library above isn't a finite list — it's a starting framework that should evolve based on what the data tells you.

---

## Higgsfield AI Prompting Reference

### Standard Hoodie Reference Instruction

Every prompt must start with this line, then attach the product photo:

```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification.
```

Then describe the scene with the hoodie referenced as "the hoodie from the attached photo":

```
...wearing the hoodie from the attached photo. The hoodie is very large on her, sleeves past her wrists extending over her hands, hem reaching mid-thigh. The hood is large and slouchy, resting on her shoulders. The fabric looks soft and plush like fleece...
```

**Why this matters:** Instead of describing the hoodie's color/size/details in text (which AI interprets loosely), you attach a real product photo and tell the AI to match it exactly. This eliminates color drift, wrong string details, and sizing inaccuracies.

Key descriptors to still include alongside the photo reference:
- "very large on her" — reinforces the oversized silhouette
- "sleeves past wrists" or "covering hands"
- "hem reaching mid-thigh"
- "hood large and slouchy"

### Template Prompt Structure

```
The attached image shows the exact Giant Hoodie product. Match the hoodie's size, color, string color, and string size identically to the attached photo with no modification. Photorealistic lifestyle photograph of [SUBJECT: age, gender, action, expression] wearing the hoodie from the attached photo. The hoodie is very large on her, [POSE/ACTION]. [SETTING: specific room with 2-3 details]. [LIGHTING: direction, quality, warmth]. [MOOD]. [CAMERA: depth of field, angle, distance, lens]. [COLOR GRADING].
```

### Hoodie Color Selection by Scene Type

Pick the right product photo to attach based on the scene you're building:

| Scene Type | Best Hoodie Colors | Why |
|-----------|-------------|-----|
| Evening/couch | Dusty rose, mauve, heather gray | Warm tones blend with lamp light |
| Morning/bright | Cream, oatmeal, light blue | Light colors match natural light |
| Editorial/elevated | Navy, cream, sage green | Sophisticated palette |
| Outdoors/errands | Black, charcoal, forest green | Practical, "wear anywhere" |
| Gift/celebration | Burgundy, forest green, dusty rose | Rich, gift-worthy |
| Close-up/texture | Dusty blue, sage, oatmeal | Shows fabric texture well |

**Workflow:** Choose the color from this table → find that product on gianthoodies.com → screenshot or download the product image → attach it to your Higgsfield prompt.

### Always Include in Prompts

- Photo reference instruction as the first line
- Attach the real product photo showing the exact hoodie
- "the hoodie from the attached photo" — never describe color/details in text
- "Photorealistic lifestyle photograph"
- Specific subject (age, gender, action, expression)
- Sizing reinforcement ("very large on her," "mid-thigh," "past hands")
- Lighting direction and quality
- Simple background (2-3 details max)
- Camera lens reference (Canon 85mm f/1.4 or 50mm f/1.8)
- "Warm color grading, shallow depth of field"

### Never Include in Prompts

- Text, logos, brand names, or typography
- Hoodie color/detail descriptions in text (the attached photo handles this)
- Multiple people in complex interactions
- Specific brand-name products
- Overly complex scenes
- Contradicting mood instructions

### Quality Checks Before Publishing

| Check | Look For | Fix |
|-------|----------|-----|
| Hands | Extra fingers, fused, unnatural | Regenerate or crop below wrist |
| Face | Uncanny expression, waxy skin | Regenerate or use face-obscured shot |
| Fabric | Unrealistic draping, wrong texture | Regenerate with clearer product photo |
| Hoodie match | Color, strings, or size don't match attached photo | Regenerate — the photo reference should be the source of truth |
| Hoodie size | Looks fitted instead of oversized | Add more sizing emphasis ("extremely large, mid-thigh, past hands") |
| Lighting | Flat or inconsistent shadows | Specify light direction more precisely |
| Background | Artifacts, floating objects | Simplify to 2-3 details |
| Text | Any AI-generated text/logos | Regenerate — never try to fix AI text |

**Rule of thumb:** If anything looks "off" at a glance, regenerate. The image needs to pass the 1-second scroll test.

---

## What This Strategy Does NOT Include

Things you don't need to worry about:

- **Advantage+ Shopping Campaigns.** Testing shows they're no longer a guaranteed improvement over manual CBO. Your CBO structure is fine. Test ASC later as a separate campaign if you want — not a replacement.

- **Interest targeting.** Dead. Meta consolidated interest categories and removed exclusion options in mid-2025. Even selected interests are just suggestions. Broad is correct.

- **Audience segmentation across ad sets.** The old playbook of one ad set per interest/lookalike fragments budget and starves data. Consolidate.

- **Lookalike audiences.** Meta builds lookalike-style expansions automatically within broad targeting. Explicit lookalikes are a relic unless entering a new market.

- **Demographic restrictions.** Your data shows 85% female, 45-65 skewing highest spend. But 25-34 is your most *efficient* group ($42 CPA, 2.3x ROAS). Don't restrict. Let creative target.

---

## The One Thing That Matters

Every piece of this strategy ladders up to one insight: **in 2026, creative volume and diversity is the only lever that moves performance on Meta.**

Your targeting is correct. Your structure will be correct once you separate test from scale. Your product-market fit is proven. Your economics work at a $55 CPA.

The only thing between where you are ($67 CPA, declining ROAS) and where you need to be is feeding the algorithm more creative, faster, in more formats, testing more angles.

That's it. Everything else is noise.
