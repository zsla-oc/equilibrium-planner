export const DATA_VERSION = "2026-08-04.official-4"

export const sources = [
  {
    id: "official-overview",
    label: "Official Equilibrium overview",
    publisher: "RuneScape",
    published: "23 Jul 2026",
    url: "https://secure.runescape.com/m=news/countdown-to-leagues-ii-equilibrium",
  },
  {
    id: "official-reveals",
    label: "Official daily reveal hub & FAQ",
    publisher: "RuneScape",
    published: "Updated daily",
    url: "https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th",
  },
  {
    id: "official-relic-passives",
    label: "Official Relic passives infographic",
    publisher: "RuneScape",
    published: "1 Aug 2026",
    url: "https://cdn.runescape.com/assets/img/external/news/2026/07/aaiyawe/RelicPassiveb12.jpg",
  },
  {
    id: "official-blessing-passives",
    label: "Official Blessing passives infographic",
    publisher: "RuneScape",
    published: "1 Aug 2026",
    url: "https://cdn.runescape.com/assets/img/external/news/2026/07/aaiyawe/BlessingPassivec8.jpg",
  },
  {
    id: "wiki-pvm-equipment",
    label: "Recommended equipment for PvM",
    publisher: "RuneScape Wiki",
    published: "Living guide",
    url: "https://runescape.wiki/w/Recommended_equipment_for_PvM",
  },
]

export const sourceStatus = {
  label: "Official information through 4 August",
  note: "Core rules, regions and progression are confirmed. Relic tier placement, most exact effects, task thresholds and the task list are still being revealed.",
}

export const leagueFacts = [
  { value: "10 Aug", label: "League opens", detail: "Runs until 21 September 2026", status: "official" },
  { value: "3 of 8", label: "Regions you choose", detail: "Misthalin + Havenhythe start; Karamja at milestone one", status: "official" },
  { value: "7", label: "Relic tiers", detail: "Unlocked with League Points", status: "official" },
  { value: "8", label: "Blessing tiers", detail: "Combat path with God tiers at 4 and 8", status: "official" },
  { value: "10–400", label: "Points per task", detail: "Easy through Master difficulty", status: "official" },
  { value: "3", label: "Blessing resets", detail: "One at Tier 1, two more while progressing", status: "official" },
]

export const baseRegions = [
  { id: "misthalin", name: "Misthalin", detail: "Starting region · includes Lumbridge and the City of Um", mark: "M" },
  { id: "havenhythe", name: "Havenhythe", detail: "Available from the start", mark: "H" },
  { id: "karamja", name: "Karamja", detail: "Automatically unlocked at the first task milestone", mark: "K" },
]

export const regionOptions = [
  {
    id: "asgarnia",
    name: "Asgarnia",
    mark: "A",
    color: "#d8bd77",
    status: "Official choice",
    summary: "A combat-and-crafting route featuring Falador and the God Wars Dungeon.",
    tags: ["God Wars Dungeon", "Falador", "Bossing"],
    fit: ["Melee", "Ranged", "Magic", "Boss progression"],
  },
  {
    id: "kandarin",
    name: "Kandarin",
    mark: "K",
    color: "#7ead84",
    status: "Official choice",
    summary: "A deep skilling region with Player-Owned Farm, Hall of Memories and Deep Sea Fishing.",
    tags: ["Player-Owned Farm", "Divination", "Fishing"],
    fit: ["Skilling route", "Balanced progression", "Collection goals"],
  },
  {
    id: "fremennik",
    name: "Fremennik Province",
    mark: "F",
    color: "#88b8bc",
    status: "Official choice",
    summary: "The northern province and its islands, including Neitiznot, Jatizso and Lunar Isle.",
    tags: ["Northern islands", "Lunar Isle", "Exploration"],
    fit: ["Task completion", "Balanced progression"],
  },
  {
    id: "forinthry",
    name: "Forinthry",
    mark: "W",
    color: "#b86c62",
    status: "Official choice",
    summary: "The Wilderness route: dangerous Slayer enemies plus access to Daemonheim and its shop.",
    tags: ["Wilderness", "Daemonheim", "Slayer"],
    fit: ["Boss progression", "Task completion", "Melee"],
  },
  {
    id: "desert",
    name: "Desert",
    mark: "D",
    color: "#cf9464",
    status: "Official choice",
    summary: "A broad route through Menaphos, Het's Oasis and the Kharidian Desert.",
    tags: ["Menaphos", "Het's Oasis", "Exploration"],
    fit: ["Boss progression", "Skilling route", "Task completion"],
  },
  {
    id: "morytania",
    name: "Morytania",
    mark: "M",
    color: "#a28ab5",
    status: "Official choice",
    summary: "An eastern PvM and Archaeology route with Araxxor and the Everlight dig site.",
    tags: ["Araxxor", "Everlight", "Slayer"],
    fit: ["Boss progression", "Collection goals", "Melee"],
  },
  {
    id: "tirannwn",
    name: "Tirannwn",
    mark: "T",
    color: "#75b890",
    status: "Official choice",
    summary: "The elven lands, with Prifddinas immediately accessible and the Lost Grove.",
    tags: ["Prifddinas", "Lost Grove", "Skilling"],
    fit: ["Skilling route", "Boss progression", "Collection goals"],
  },
  {
    id: "anachronia",
    name: "Anachronia",
    mark: "N",
    color: "#d08166",
    status: "Official choice",
    summary: "Dinosaurs across combat, hunting and farming, including the Anachronia Dinosaur Farm.",
    tags: ["Dinosaurs", "Hunter", "Farming"],
    fit: ["Skilling route", "Boss progression", "Collection goals"],
  },
]

export const pvmPhases = [
  { id: "foundation", step: "01", name: "Foundation", detail: "Learner encounters, capes and the first reliable combat upgrades." },
  { id: "upgrade", step: "02", name: "Upgrade farms", detail: "Build the weapons, armour and abilities that carry your chosen style." },
  { id: "capstone", step: "03", name: "Capstones", detail: "Use your completed Blessing build against aspirational encounters." },
]

export const pvmRegions = [
  {
    id: "misthalin",
    name: "Misthalin",
    color: "#9ab39b",
    availability: "Starting region",
    targets: [
      { id: "misthalin-hermod", phase: "foundation", name: "Hermod", difficulty: "Learner", styles: ["Necromancy"], payoff: "Start the Necromancy armour upgrade path and practise clean, repeatable kills." },
      { id: "misthalin-arch-glacor", phase: "foundation", name: "Arch-Glacor", difficulty: "Scalable", styles: ["All styles"], payoff: "Add mechanics at your own pace; build toward Scripture of Wen and Dark ice upgrades." },
      { id: "misthalin-kerapac", phase: "upgrade", name: "Kerapac", difficulty: "Mid → hard", styles: ["Magic", "All styles"], payoff: "Chase Greater Concentrated Blast, Scripture of Jas and hard-mode staff pieces." },
      { id: "misthalin-rasial", phase: "capstone", name: "Rasial", difficulty: "Endgame", styles: ["Necromancy"], payoff: "The direct T95 Necromancy weapon and First Necromancer armour chase." },
      { id: "misthalin-zamorak", phase: "capstone", name: "Zamorak", difficulty: "Enrage", styles: ["All styles"], payoff: "Scale enrage for an endgame all-style test and high-tier weapon, armour and ability rewards." },
    ],
  },
  {
    id: "havenhythe",
    name: "Havenhythe",
    color: "#91a5bd",
    availability: "Starting region",
    targets: [
      { id: "havenhythe-ivar", phase: "foundation", name: "Ivar, King of Bones", difficulty: "Learner · F2P", styles: ["All styles"], payoff: "A low-risk first boss for prayer switching, movement and early supplies." },
      { id: "havenhythe-silverquill", phase: "foundation", name: "Silverquill", difficulty: "Early game", styles: ["Ranged", "All styles"], payoff: "Practise telegraphed attacks and gather spines used for Havenhythe ammunition." },
    ],
  },
  {
    id: "karamja",
    name: "Karamja",
    color: "#c99566",
    availability: "First milestone",
    targets: [
      { id: "karamja-jad", phase: "foundation", name: "TzTok-Jad", difficulty: "Wave challenge", styles: ["All styles"], payoff: "Secure a Fire cape and prove your prayer-switching setup." },
      { id: "karamja-har-aken", phase: "upgrade", name: "Har-Aken", difficulty: "Long-form", styles: ["All styles"], payoff: "Complete the Fight Kiln for a style-specific kiln cape before capstone PvM." },
    ],
  },
  {
    id: "asgarnia",
    name: "Asgarnia",
    color: "#d8bd77",
    availability: "Optional unlock",
    targets: [
      { id: "asgarnia-gwd1", phase: "foundation", name: "God Wars Dungeon", difficulty: "Early farm", styles: ["All styles"], payoff: "Build a T70 power-armour base, including Subjugation for Necromancy upgrades." },
      { id: "asgarnia-nex", phase: "upgrade", name: "Nex", difficulty: "Group or solo", styles: ["All styles"], payoff: "Farm T80 power armour and the components that underpin several later upgrades." },
      { id: "asgarnia-aod", phase: "capstone", name: "Nex: Angel of Death", difficulty: "Group endgame", styles: ["Magic", "All styles"], payoff: "A high-end group target for T92 dual-wield Magic weapons and Praesul codices." },
    ],
  },
  {
    id: "kandarin",
    name: "Kandarin",
    color: "#7ead84",
    availability: "Optional unlock",
    targets: [
      { id: "kandarin-ancient-invention", phase: "foundation", name: "Ancient Invention", difficulty: "Support unlock", styles: ["All styles"], payoff: "Use Stormguard Citadel access to prepare stronger gizmos and perks for later farms." },
      { id: "kandarin-legiones", phase: "upgrade", name: "Legiones", difficulty: "95 Slayer", styles: ["Ranged"], payoff: "Turn keystones and signets into the Ascension crossbow progression path." },
    ],
  },
  {
    id: "fremennik",
    name: "Fremennik Province",
    color: "#88b8bc",
    availability: "Optional unlock",
    targets: [
      { id: "fremennik-dks", phase: "foundation", name: "Dagannoth Kings", difficulty: "Early trio", styles: ["Hybrid", "All styles"], payoff: "Collect the classic combat rings while building confidence switching styles." },
      { id: "fremennik-lunar-support", phase: "upgrade", name: "Lunar combat support", difficulty: "Support unlock", styles: ["Magic", "All styles"], payoff: "Prepare Lunar spellbook utility and island supplies for sustained bossing." },
    ],
  },
  {
    id: "forinthry",
    name: "Forinthry",
    color: "#b86c62",
    availability: "Optional unlock",
    targets: [
      { id: "forinthry-kbd", phase: "foundation", name: "King Black Dragon", difficulty: "Early boss", styles: ["All styles"], payoff: "A quick early kill target with simple positioning and dragonfire preparation." },
      { id: "forinthry-daemonheim", phase: "upgrade", name: "Daemonheim arsenal", difficulty: "Support farm", styles: ["All styles"], payoff: "Unlock Dungeoneering and its shop, including a broad T80–90 weapon progression spine." },
      { id: "forinthry-ed2", phase: "upgrade", name: "Dragonkin Laboratory", difficulty: "Elite Dungeon", styles: ["Magic", "All styles"], payoff: "Farm ability codices and draconic energy; League drops also supply tectonic energy." },
      { id: "forinthry-ed3", phase: "capstone", name: "The Shadow Reef", difficulty: "Elite Dungeon", styles: ["Ranged", "All styles"], payoff: "Push through Ambassador for the Eldritch crossbow chase." },
    ],
  },
  {
    id: "desert",
    name: "Desert",
    color: "#cf9464",
    availability: "Optional unlock",
    targets: [
      { id: "desert-kalphites", phase: "foundation", name: "Kalphite Queen", difficulty: "Early boss", styles: ["Hybrid", "All styles"], payoff: "Open a straightforward desert boss ladder before moving into group encounters." },
      { id: "desert-gwd2", phase: "upgrade", name: "Heart of Gielinor", difficulty: "Mid-game hub", styles: ["All styles"], payoff: "Farm T80–85 weapons, armour and components across four scalable generals." },
      { id: "desert-kalphite-king", phase: "upgrade", name: "Kalphite King", difficulty: "Mechanics check", styles: ["Melee", "All styles"], payoff: "Chase T90 drygore weapons and practise defensive timing." },
      { id: "desert-telos", phase: "capstone", name: "Telos", difficulty: "Enrage", styles: ["All styles"], payoff: "Scale an endgame solo encounter for T92 weapons and dormant Seren armour." },
      { id: "desert-amascut", phase: "capstone", name: "Amascut", difficulty: "Endgame", styles: ["Magic", "Melee"], payoff: "Target the Desert's newest aspirational encounter and its high-tier Magic and Melee rewards." },
    ],
  },
  {
    id: "morytania",
    name: "Morytania",
    color: "#a28ab5",
    availability: "Optional unlock",
    targets: [
      { id: "morytania-barrows", phase: "foundation", name: "Barrows", difficulty: "Early farm", styles: ["All styles"], payoff: "Build hybrid armour options and begin the defender upgrade chain." },
      { id: "morytania-rots", phase: "upgrade", name: "Barrows: Rise of the Six", difficulty: "Group or solo", styles: ["All styles"], payoff: "Farm malevolent energy and the shields used for T90 defenders." },
      { id: "morytania-araxxor", phase: "capstone", name: "Araxxor", difficulty: "Enrage", styles: ["Melee", "Ranged", "Magic"], payoff: "Assemble a Noxious T90 weapon while scaling a repeatable solo challenge." },
    ],
  },
  {
    id: "tirannwn",
    name: "Tirannwn",
    color: "#75b890",
    availability: "Optional unlock",
    targets: [
      { id: "tirannwn-prif", phase: "foundation", name: "Prifddinas preparation", difficulty: "Support unlock", styles: ["All styles"], payoff: "Activate elven combat services, crystal equipment and combination-potion support." },
      { id: "tirannwn-lost-grove", phase: "upgrade", name: "Lost Grove creatures", difficulty: "High Slayer", styles: ["Melee", "Ranged", "Magic"], payoff: "Hunt Cinderbane gloves and build supplies for the region's capstone." },
      { id: "tirannwn-solak", phase: "capstone", name: "Solak", difficulty: "Group endgame", styles: ["All styles"], payoff: "Take on the Lost Grove's main boss for Blightbound crossbows and Erethdor's grimoire." },
    ],
  },
  {
    id: "anachronia",
    name: "Anachronia",
    color: "#d08166",
    availability: "Optional unlock",
    targets: [
      { id: "anachronia-matriarchs", phase: "foundation", name: "Rex Matriarchs", difficulty: "Style trio", styles: ["Hybrid", "All styles"], payoff: "Farm complete upgraded rings directly under the confirmed League drop adjustment." },
      { id: "anachronia-raksha", phase: "upgrade", name: "Raksha", difficulty: "High mechanics", styles: ["Ranged", "Magic", "All styles"], payoff: "Chase Greater Ricochet, Greater Chain and the Fleeting boots upgrade." },
      { id: "anachronia-osseous", phase: "capstone", name: "Osseous", difficulty: "Endgame", styles: ["Necromancy", "All styles"], payoff: "Push the fourth Matriarch for Necromancy-focused rewards and ring upgrades." },
    ],
  },
]

export const gearStages = [
  { id: "foundation", step: "01", name: "Foundation", range: "Up to T70", detail: "Reliable equipment that gets the build boss-ready." },
  { id: "midgame", step: "02", name: "Mid-game", range: "T80–85", detail: "Your first augmentable sets and style-defining weapons." },
  { id: "lategame", step: "03", name: "Late game", range: "T87–92", detail: "Serious boss farms and near-best-in-slot equipment." },
  { id: "aspirational", step: "04", name: "Aspirational", range: "T95+", detail: "Endgame chase items enabled by your final route." },
]

export const gearMilestones = [
  {
    id: "shared-kiln-cape", style: "All", stage: "midgame", tier: "T70", slot: "Cape", name: "TokHaar-Kal cape", source: "Fight Kiln · Karamja",
    regionSets: [["karamja"]], note: "Choose the cape matching the style used for most of the Kiln; it is also the base for an Igneous cape.",
  },
  {
    id: "shared-cinderbanes", style: "All", stage: "lategame", tier: "T70*", slot: "Gloves", name: "Cinderbane gloves", source: "Lost Grove creatures · Tirannwn",
    regionSets: [["tirannwn"]], note: "A high-value hybrid glove target whenever the enemy can be poisoned.",
  },
  {
    id: "shared-rex-rings", style: "All", stage: "lategame", tier: "T85", slot: "Ring", name: "Rex Matriarch rings", source: "Rex Matriarchs · Anachronia",
    regionSets: [["anachronia"]], note: "The League-adjusted table drops complete upgraded rings rather than only the hearts.",
  },
  {
    id: "shared-zuk-cape", style: "All", stage: "aspirational", tier: "T99", slot: "Cape", name: "Igneous cape", source: "TzKal-Zuk · Misthalin",
    regionSets: [["misthalin", "karamja"]], note: "Upgrade the matching Kiln cape with an igneous stone; Karamja is automatically part of every full route.",
  },

  {
    id: "melee-smithable", style: "Melee", stage: "foundation", tier: "T50–60", slot: "Weapon + armour", name: "Rune → Orikalkum set", source: "Mining & Smithing · starting regions",
    regionSets: [["misthalin", "havenhythe"]], note: "A deterministic opening set while accelerated XP carries you toward boss drops.",
  },
  {
    id: "melee-bandos", style: "Melee", stage: "foundation", tier: "T70", slot: "Power armour", name: "Bandos armour", source: "General Graardor · Asgarnia",
    regionSets: [["asgarnia"]], note: "Straightforward, non-degrading power armour for the first boss ladder.",
  },
  {
    id: "melee-anima-zaros", style: "Melee", stage: "midgame", tier: "T80", slot: "Power armour", name: "Anima Core of Zaros", source: "Vindicta · Desert",
    regionSets: [["desert"]], note: "A clean T80 power set with no charge cost, fed by the Heart of Gielinor grind.",
  },
  {
    id: "melee-dragon-rider-lance", style: "Melee", stage: "midgame", tier: "T85", slot: "2H weapon", name: "Dragon Rider lance", source: "Vindicta · Desert",
    regionSets: [["desert"]], note: "Halberd range makes this a strong bridge weapon for Slayer and multi-target encounters.",
  },
  {
    id: "melee-chaotic", style: "Melee", stage: "midgame", tier: "T80", slot: "Weapon", name: "Chaotic weaponry", source: "Daemonheim shop · Forinthry",
    regionSets: [["forinthry"]], note: "A deterministic Dungeoneering-token route when boss weapon drops do not cooperate.",
  },
  {
    id: "melee-drygores", style: "Melee", stage: "lategame", tier: "T90", slot: "Dual wield", name: "Drygore weaponry", source: "Kalphite King · Desert",
    regionSets: [["desert"]], note: "A direct T90 dual-wield target with multiple attack-type variants.",
  },
  {
    id: "melee-noxious-scythe", style: "Melee", stage: "lategame", tier: "T90", slot: "2H weapon", name: "Noxious scythe", source: "Araxxor · Morytania",
    regionSets: [["morytania"]], note: "T90 damage plus halberd range for a broadly useful late-game weapon.",
  },
  {
    id: "melee-lengs", style: "Melee", stage: "aspirational", tier: "T95", slot: "Dual wield", name: "Dark Shard & Sliver of Leng", source: "Arch-Glacor · Misthalin",
    regionSets: [["misthalin"]], note: "The main dual-wield endgame chase from hard-mode Arch-Glacor.",
  },
  {
    id: "melee-ek-zekkil", style: "Melee", stage: "aspirational", tier: "T95", slot: "2H weapon", name: "Ek-ZekKil", source: "TzKal-Zuk · Misthalin",
    regionSets: [["misthalin", "karamja"]], note: "A powerful two-handed special-attack weapon assembled from Zuk's sword pieces.",
  },
  {
    id: "melee-vestments", style: "Melee", stage: "aspirational", tier: "T95", slot: "Power armour", name: "Vestments of havoc", source: "Zamorak · Misthalin",
    regionSets: [["misthalin"]], note: "Endgame Melee power armour with adrenaline-focused set effects.",
  },
  {
    id: "melee-tumekens-light", style: "Melee", stage: "aspirational", tier: "T95", slot: "2H halberd", name: "Tumeken's Light", source: "Amascut · Desert",
    regionSets: [["desert"]], note: "The Desert's endgame two-handed halberd alternative.",
  },

  {
    id: "ranged-armadyl", style: "Ranged", stage: "foundation", tier: "T70", slot: "Power armour", name: "Armadyl armour", source: "Kree'arra · Asgarnia",
    regionSets: [["asgarnia"]], note: "The standard non-degrading foundation for Ranged power armour.",
  },
  {
    id: "ranged-crystal-bow", style: "Ranged", stage: "foundation", tier: "T70", slot: "2H weapon", name: "Crystal bow", source: "Prifddinas · Tirannwn",
    regionSets: [["tirannwn"]], note: "A deterministic bow option with a later attuned T80 upgrade path.",
  },
  {
    id: "ranged-royal-crossbow", style: "Ranged", stage: "midgame", tier: "T80", slot: "2H weapon", name: "Royal crossbow", source: "Queen Black Dragon · Asgarnia",
    regionSets: [["asgarnia"]], note: "A practical T80 crossbow assembled through Queen Black Dragon progression.",
  },
  {
    id: "ranged-pernix", style: "Ranged", stage: "midgame", tier: "T80", slot: "Power armour", name: "Pernix armour", source: "Nex · Asgarnia",
    regionSets: [["asgarnia"]], note: "T80 power armour and a strong base for crossbow-focused progression.",
  },
  {
    id: "ranged-anima-zamorak", style: "Ranged", stage: "midgame", tier: "T80", slot: "Power armour", name: "Anima Core of Zamorak", source: "Twin Furies · Desert",
    regionSets: [["desert"]], note: "A non-degrading T80 alternative from the Heart of Gielinor.",
  },
  {
    id: "ranged-shadow-glaives", style: "Ranged", stage: "midgame", tier: "T85", slot: "Dual wield", name: "Shadow glaives", source: "Gregorovic · Desert",
    regionSets: [["desert"]], note: "A convenient T85-accuracy bridge into higher-end Ranged farms.",
  },
  {
    id: "ranged-decimation", style: "Ranged", stage: "lategame", tier: "T87", slot: "2H weapon", name: "Decimation", source: "Wilderness Slayer · Forinthry",
    regionSets: [["forinthry"]], note: "A T87 bow route outside traditional boss drops.",
  },
  {
    id: "ranged-ascensions", style: "Ranged", stage: "lategame", tier: "T90", slot: "Dual wield", name: "Ascension crossbows", source: "Legiones · Kandarin",
    regionSets: [["kandarin"]], note: "Collect six signets for a classic T90 crossbow path.",
  },
  {
    id: "ranged-noxious-bow", style: "Ranged", stage: "lategame", tier: "T90", slot: "2H weapon", name: "Noxious longbow", source: "Araxxor · Morytania",
    regionSets: [["morytania"]], note: "A durable T90 bow that bridges cleanly into endgame arrow builds.",
  },
  {
    id: "ranged-ecb", style: "Ranged", stage: "lategame", tier: "T92", slot: "2H weapon", name: "Eldritch crossbow", source: "The Ambassador · Forinthry",
    regionSets: [["forinthry"]], note: "The Shadow Reef's T92 crossbow chase and a valuable special-attack unlock.",
  },
  {
    id: "ranged-elite-dracolich", style: "Ranged", stage: "lategame", tier: "T92", slot: "Power armour", name: "Elite Dracolich armour", source: "Vorkath progression · Misthalin",
    regionSets: [["misthalin"]], note: "High-end bow armour with critical-hit and ultimate-synergy set effects.",
  },
  {
    id: "ranged-bolg", style: "Ranged", stage: "aspirational", tier: "T95", slot: "2H weapon", name: "Bow of the Last Guardian", source: "Zamorak · Misthalin",
    regionSets: [["misthalin"]], note: "The principal T95 bow chase for an endgame Ranged build.",
  },

  {
    id: "magic-mystic", style: "Magic", stage: "foundation", tier: "T50", slot: "Armour", name: "Mystic robes", source: "Champions' Guild shop · Misthalin",
    regionSets: [["misthalin"]], note: "A purchasable opening set while you prepare the first boss-powered upgrade.",
  },
  {
    id: "magic-subjugation", style: "Magic", stage: "foundation", tier: "T70", slot: "Power armour", name: "Subjugation robes", source: "K'ril Tsutsaroth · Asgarnia",
    regionSets: [["asgarnia"]], note: "A strong T70 power set and an important material source for Necromancy upgrades.",
  },
  {
    id: "magic-virtus", style: "Magic", stage: "midgame", tier: "T80", slot: "Power armour", name: "Virtus armour", source: "Nex · Asgarnia",
    regionSets: [["asgarnia"]], note: "T80 Magic power armour with a life-point bonus.",
  },
  {
    id: "magic-anima-seren", style: "Magic", stage: "midgame", tier: "T80", slot: "Power armour", name: "Anima Core of Seren", source: "Helwyr · Desert",
    regionSets: [["desert"]], note: "A non-degrading T80 alternative from the Heart of Gielinor.",
  },
  {
    id: "magic-cywir", style: "Magic", stage: "midgame", tier: "T85", slot: "Dual wield", name: "Wand & orb of the Cywir elders", source: "Helwyr · Desert",
    regionSets: [["desert"]], note: "T85 accuracy makes this a dependable dual-wield bridge.",
  },
  {
    id: "magic-chaotic", style: "Magic", stage: "midgame", tier: "T80", slot: "Weapon", name: "Chaotic staff or wand", source: "Daemonheim shop · Forinthry",
    regionSets: [["forinthry"]], note: "A deterministic token-bought weapon option for the middle of the route.",
  },
  {
    id: "magic-obliteration", style: "Magic", stage: "lategame", tier: "T87", slot: "2H weapon", name: "Obliteration", source: "Wilderness Slayer · Forinthry",
    regionSets: [["forinthry"]], note: "A T87 staff route that does not rely on a high-end boss unique.",
  },
  {
    id: "magic-noxious-staff", style: "Magic", stage: "lategame", tier: "T90", slot: "2H weapon", name: "Noxious staff", source: "Araxxor · Morytania",
    regionSets: [["morytania"]], note: "A general-purpose T90 staff assembled through repeatable solo progression.",
  },
  {
    id: "magic-seismic", style: "Magic", stage: "lategame", tier: "T90", slot: "Dual wield", name: "Seismic wand & singularity", source: "Vorago · Asgarnia",
    regionSets: [["asgarnia"]], note: "A T90 dual-wield target for players choosing the Asgarnian group-boss route.",
  },
  {
    id: "magic-elite-tectonic", style: "Magic", stage: "lategame", tier: "T92", slot: "Power armour", name: "Elite tectonic armour", source: "Dragonkin Laboratory · Forinthry",
    regionSets: [["forinthry"]], note: "League ED2 drops pair draconic energy with tectonic energy, easing this armour route.",
  },
  {
    id: "magic-fsoa", style: "Magic", stage: "aspirational", tier: "T95", slot: "2H weapon", name: "Fractured Staff of Armadyl", source: "Hard-mode Kerapac · Misthalin",
    regionSets: [["misthalin"]], note: "The major T95 two-handed Magic chase from Kerapac.",
  },
  {
    id: "magic-sanctum-weapons", style: "Magic", stage: "aspirational", tier: "T95", slot: "Dual wield", name: "Roar & Ode", source: "Sanctum of Rebirth · Misthalin",
    regionSets: [["misthalin"]], note: "T95 dual-wield Magic weapons from Sanctum progression.",
  },
  {
    id: "magic-tumekens-resplendence", style: "Magic", stage: "aspirational", tier: "T95", slot: "Power armour", name: "Tumeken's resplendence", source: "Amascut · Desert",
    regionSets: [["desert"]], note: "The Desert's T95 Magic power-armour end point.",
  },

  {
    id: "necro-starter-ladder", style: "Necromancy", stage: "foundation", tier: "T10–60", slot: "Weapon + armour", name: "Death guard equipment", source: "City of Um · Misthalin",
    regionSets: [["misthalin"]], note: "Upgrade the starter guard, lantern and Deathwarden robes every ten levels.",
  },
  {
    id: "necro-t70", style: "Necromancy", stage: "foundation", tier: "T70", slot: "Weapon + armour", name: "T70 Deathwarden / Deathdealer", source: "City of Um · Misthalin",
    regionSets: [["misthalin"]], note: "Kili's Knowledge combat tasks are skipped in the League, but you must still source the crafting materials.",
  },
  {
    id: "necro-t80-90", style: "Necromancy", stage: "midgame", tier: "T80–90", slot: "Weapon + armour", name: "Greater ensouled upgrades", source: "Um + regional materials",
    regionSets: [["misthalin", "asgarnia", "kandarin"], ["misthalin", "asgarnia", "forinthry"]], note: "Subjugation supplies the cloth; Kandarin or Forinthry can complete the thread route unless a Relic substitutes materials.",
  },
  {
    id: "necro-zemouregal-nexus", style: "Necromancy", stage: "midgame", tier: "T80", slot: "Nexus", name: "Zemouregal's nexus", source: "Zemouregal & Vorkath · Misthalin",
    regionSets: [["misthalin"]], note: "A Bone Shield-focused ammunition-slot upgrade earned through repeated Vorkath kills.",
  },
  {
    id: "necro-first-necromancer", style: "Necromancy", stage: "aspirational", tier: "T95", slot: "Weapon + armour", name: "First Necromancer equipment", source: "Rasial · Misthalin",
    regionSets: [["misthalin"]], note: "Rasial drops the Omni guard, Soulbound lantern and T95 Necromancy power armour directly.",
  },
  {
    id: "necro-devourer", style: "Necromancy", stage: "aspirational", tier: "T95", slot: "Guard + nexus", name: "Devourer's Guard & Nexus", source: "Amascut · Desert",
    regionSets: [["desert"]], note: "An alternate endgame main-hand and nexus pairing focused on soul and ghost interactions.",
  },
]

export const relicTiers = [
  { id: "tier-1", tier: "I", points: "Threshold not published", status: "Revealed", summary: "Choose one of three confirmed opening relics." },
  { id: "tier-2", tier: "II", points: "Threshold not published", status: "Tier map pending", summary: "Use this slot to record your preferred effect until the final tier board lands." },
  { id: "tier-3", tier: "III", points: "Threshold not published", status: "Tier map pending", summary: "Available to free-to-play players; exact choices are still being assigned." },
  { id: "tier-4", tier: "IV", points: "Threshold not published", status: "Tier map pending", summary: "Members progression slot awaiting the official tier board." },
  { id: "tier-5", tier: "V", points: "Threshold not published", status: "Tier map pending", summary: "Members progression slot awaiting the official tier board." },
  { id: "tier-6", tier: "VI", points: "Threshold not published", status: "Tier map pending", summary: "Members progression slot awaiting the official tier board." },
  { id: "tier-7", tier: "VII", points: "Threshold not published", status: "Tier map pending", summary: "Final relic tier; choices and threshold are not yet published." },
]

export const tierOneRelics = [
  {
    id: "survivalist",
    name: "Survivalist",
    glyph: "▲",
    pitch: "Active gathering",
    summary: "Double resources from Mining, Fishing, Woodcutting and Archaeology, powerful gathering tools, plus a three-category resource bag.",
    strengths: ["Resource volume", "Early tools", "150-slot bag"],
  },
  {
    id: "endless-harvest",
    name: "Endless Harvest",
    glyph: "∞",
    pitch: "Low-friction gathering",
    summary: "Auto-bank gathered resources, gain gathering quality upgrades, and remove many interruptions across gathering skills.",
    strengths: ["Auto-banking", "AFK uptime", "Always-active boosts"],
  },
  {
    id: "golden-touch",
    name: "Golden Touch",
    glyph: "✦",
    pitch: "Agility & Thieving",
    summary: "Guaranteed and automated Thieving, huge coin scaling, doubled Agility course XP, Goldenhawk Boots and extra ingredient bundles.",
    strengths: ["Guaranteed Thieving", "Coins & supplies", "Agility XP"],
  },
]

export const revealedRelics = [
  { name: "Superheated", revealed: "28 Jul", summary: "Auto-burn logs, auto-cook fish and heavily accelerate bar smelting." },
  { name: "Crystal Grace", revealed: "28 Jul", summary: "Rune and ritual utility with altar travel and broad spell access." },
  { name: "Divine Druid", revealed: "29 Jul", summary: "Herblore, Summoning and Divination processing utility." },
  { name: "Transmutation", revealed: "29 Jul", summary: "Upgrade or downgrade resources through alchemical conversion." },
  { name: "Assassin's Insight", revealed: "31 Jul", summary: "Slayer and Reaper travel plus assignment control." },
  { name: "Nature's Network", revealed: "31 Jul", summary: "Travel between unlocked fairy rings, spirit trees and farming patches." },
  { name: "Voidwalker", revealed: "31 Jul", summary: "Jewellery travel and bonus skilling reward shards." },
  { name: "Icyenic Faith", revealed: "2 Aug", summary: "Prayer-scaled defence, critical chance and ability damage." },
  { name: "Animal Wrangler", revealed: "2 Aug", summary: "Hunter, Big Game Hunter and Fishing automation and yield." },
  { name: "Devout", revealed: "3 Aug", summary: "Portable banking plus dramatically empowered familiars." },
  { name: "Rejuvenated", revealed: "3 Aug", summary: "Choose one additional relic from a previous tier." },
  { name: "Perkfection", revealed: "3 Aug", summary: "Extra gizmo slots and accelerated Invention systems." },
]

export const blessingTiers = [1, 2, 3, 5, 6, 7]
export const blessingPaths = [
  { id: "order", name: "Order", god: "Saradomin", color: "#8fc1d6", glyph: "△" },
  { id: "balance", name: "Balance", god: "Guthix", color: "#6dc49a", glyph: "◇" },
  { id: "chaos", name: "Chaos", god: "Zamorak", color: "#e18670", glyph: "▽" },
]

export const blessingReveals = {
  1: { chaos: "Adrenaline Junkie", balance: "Big Boned", order: "Teragard's Aegis" },
  2: { chaos: "Abyssal Cinders", balance: "Barkscales", order: "Striking Light" },
  3: { chaos: "Avernic Rampage", balance: "Eternal Sustenance", order: "Steadfast Will" },
}

export const blessingDescriptions = {
  1: {
    chaos: "Increases adrenaline gained and maximum adrenaline by 50%.",
    balance: "Player-sourced hits gain bonus damage equal to 5% of your maximum life points. This includes conjures, but not familiars or dreadnips.",
    order: "Adds 25% of your armour rating as bonus damage, doubled with a defender and tripled with a shield, while greatly improving natural life-point regeneration.",
  },
  2: {
    chaos: "Attacks deal an additional hit worth 15% ability damage.",
    balance: "After every fifth hit taken, unleash Grasp of Guthix as a 3×3 poison burst against poisonable enemies.",
    order: "Basic abilities deal 40% more damage. Every 9 seconds, your next basic gains further bonus damage based on armour rating.",
  },
  3: {
    chaos: "Each attack has a 5% chance to make abilities cost no adrenaline for 7.2 seconds.",
    balance: "Food is not consumed when eaten, and eating no longer drains adrenaline.",
    order: "Empowers defensive abilities: Reflect returns full damage, Revenge reaches 20 stacks for twice as long, and Preparation reduces cooldowns by 12 seconds.",
  },
}

export const godBlessingReveals = {
  4: { chaos: "Demon's Mark", balance: "Splash Zone", order: "Sacred Fervor" },
}

export const godBlessingDescriptions = {
  4: {
    chaos: "Your accuracy is calculated as though you are always using the target's weakness.",
    balance: "Increases area-of-effect damage by 30%, with extra damage against large targets based on their configured size.",
    order: "Reduces the cooldown of all offensive abilities by 30%.",
  },
}

export const relicPassives = [
  { tier: "I", headline: "5× XP", detail: "5× crop growth, rapid run restore, major Archaeology/Necromancy onboarding boosts and faster boss respawns." },
  { tier: "II", headline: "8× XP · 2× rares", detail: "Boosted Thaler, Slayer/Reaper points and key reputation gains." },
  { tier: "III", headline: "Passive capes", detail: "Skillcape perks activate at 99/120; combat begins yielding common/uncommon Invention materials." },
  { tier: "IV", headline: "12× XP · 4× rares", detail: "Full toolbelt, larger material drops and several boss/key entry costs removed." },
  { tier: "V", headline: "6× rares", detail: "Spell/prayer swaps at the Sage, chosen Reaper tasks and 4× augmented item XP." },
  { tier: "VI", headline: "16× XP · 8× rares", detail: "All Seren spells and prayers become available." },
  { tier: "VII", headline: "10× rares", detail: "Unlimited Advance Time." },
]

export const blessingPassives = [
  { tier: "I", detail: "50% save chance for runes, ammunition, ectoplasm and necromancy runes · reset 1." },
  { tier: "II", detail: "Unlock Dive and gain +1 attack range, capped at 10." },
  { tier: "III", detail: "75% save chance, 4.2s movement cooldowns and Nature's rune pouch." },
  { tier: "IV", detail: "First God Blessing · reset 2." },
  { tier: "V", detail: "All War's Wares and +25% maximum adrenaline." },
  { tier: "VI", detail: "No charges for god books/scriptures/grimoires/scrimshaws; no equipment degradation." },
  { tier: "VII", detail: "95% save chance for combat consumables." },
  { tier: "VIII", detail: "Second God Blessing · reset 3." },
]

export const starterGoals = [
  { id: "goal-1", label: "Meet the Leagues Sage in Lumbridge and complete onboarding", phase: "Opening", done: false, certainty: "Official" },
  { id: "goal-2", label: "Choose a Tier I relic and clear quick Easy tasks", phase: "Opening", done: false, certainty: "Partially revealed" },
  { id: "goal-3", label: "Reach the first task milestone to unlock Karamja", phase: "Early", done: false, certainty: "Threshold TBC" },
  { id: "goal-4", label: "Unlock the first chosen region and activate its lodestones", phase: "Early", done: false, certainty: "Threshold TBC" },
  { id: "goal-5", label: "Complete regional Blessing Tasks toward the first God tier", phase: "Mid", done: false, certainty: "Task list TBC" },
]

export const navItems = [
  ["overview", "Command table"],
  ["regions", "Regions"],
  ["relics", "Relics & blessings"],
  ["pvm", "PvM progression"],
  ["gear", "Gear progression"],
  ["route", "Launch route"],
]
