import { useEffect, useMemo, useState } from "react"
import {
  DATA_VERSION,
  baseRegions,
  blessingPassives,
  blessingDescriptions,
  blessingPaths,
  blessingReveals,
  blessingTiers,
  godBlessingDescriptions,
  godBlessingReveals,
  gearMilestones,
  gearStages,
  leagueFacts,
  navItems,
  pvmPhases,
  pvmRegions,
  regionOptions,
  relicTiers,
  relicPassives,
  revealedRelics,
  sourceStatus,
  sources,
  starterGoals,
  tierOneRelics,
} from "./data/equilibrium.js"

const STORAGE_KEY = "equilibrium-planner-v2"
const REGION_IDS = new Set(regionOptions.map((region) => region.id))
const PATH_IDS = new Set(blessingPaths.map((path) => path.id))
const BLESSING_TIER_IDS = new Set(blessingTiers.map(String))
const TIER_ONE_RELIC_IDS = new Set(tierOneRelics.map((relic) => relic.id))
const PVM_TARGET_IDS = new Set(pvmRegions.flatMap((region) => region.targets.map((target) => target.id)))
const GEAR_MILESTONE_IDS = new Set(gearMilestones.map((item) => item.id))
const ACCOUNT_MODES = new Set(["Member", "Free-to-play"])
const COMBAT_STYLE_OPTIONS = ["Undecided", "Melee", "Ranged", "Magic", "Necromancy", "Hybrid"]
const COMBAT_STYLES = new Set(COMBAT_STYLE_OPTIONS)
const OBJECTIVES = new Set(["Balanced progression", "Boss progression", "Task completion", "Skilling route", "Collection goals"])
const GOAL_PHASES = new Set(["Opening", "Early", "Mid", "Late"])

const emptyPlan = {
  name: "My equilibrium build",
  accountMode: "Member",
  combatStyle: "Undecided",
  objective: "Balanced progression",
  regions: [],
  relics: {},
  relicNotes: {},
  blessings: {},
  pvmDone: [],
  gearDone: [],
  goals: starterGoals,
  notes: "",
  updatedAt: null,
}

const icons = { overview: "◈", regions: "⌖", relics: "✦", pvm: "⚔", gear: "◫", route: "↗" }

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function textOr(value, fallback = "") {
  return typeof value === "string" ? value : fallback
}

function normaliseGoals(value) {
  if (!Array.isArray(value)) return starterGoals.map((goal) => ({ ...goal }))
  const seen = new Set()
  return value.flatMap((goal, index) => {
    if (!isRecord(goal)) return []
    const label = textOr(goal.label).trim()
    if (!label) return []
    const requestedId = textOr(goal.id).trim()
    let id = requestedId || `imported-goal-${index + 1}`
    while (seen.has(id)) id = `${id}-${index + 1}`
    seen.add(id)
    return [{
      id,
      label,
      phase: GOAL_PHASES.has(goal.phase) ? goal.phase : "Mid",
      done: goal.done === true,
      certainty: textOr(goal.certainty, "Your plan"),
    }]
  })
}

function normalisePlan(value) {
  const candidate = isRecord(value) ? value : {}
  const regions = Array.isArray(candidate.regions)
    ? [...new Set(candidate.regions.filter((id) => typeof id === "string" && REGION_IDS.has(id)))].slice(0, 3)
    : []
  const relics = isRecord(candidate.relics)
    ? Object.fromEntries(Object.entries(candidate.relics).filter(([key, relic]) => typeof key === "string" && typeof relic === "string"))
    : {}
  if (relics["tier-1"] && !TIER_ONE_RELIC_IDS.has(relics["tier-1"])) delete relics["tier-1"]
  const relicNotes = isRecord(candidate.relicNotes)
    ? Object.fromEntries(Object.entries(candidate.relicNotes).filter(([key, note]) => typeof key === "string" && typeof note === "string"))
    : {}
  const blessings = isRecord(candidate.blessings)
    ? Object.fromEntries(Object.entries(candidate.blessings).filter(([tier, path]) => BLESSING_TIER_IDS.has(tier) && PATH_IDS.has(path)))
    : {}
  const pvmDone = Array.isArray(candidate.pvmDone)
    ? [...new Set(candidate.pvmDone.filter((id) => typeof id === "string" && PVM_TARGET_IDS.has(id)))]
    : []
  const gearDone = Array.isArray(candidate.gearDone)
    ? [...new Set(candidate.gearDone.filter((id) => typeof id === "string" && GEAR_MILESTONE_IDS.has(id)))]
    : []
  return {
    ...emptyPlan,
    name: textOr(candidate.name, emptyPlan.name),
    accountMode: ACCOUNT_MODES.has(candidate.accountMode) ? candidate.accountMode : emptyPlan.accountMode,
    combatStyle: COMBAT_STYLES.has(candidate.combatStyle) ? candidate.combatStyle : emptyPlan.combatStyle,
    objective: OBJECTIVES.has(candidate.objective) ? candidate.objective : emptyPlan.objective,
    regions,
    relics,
    relicNotes,
    blessings,
    pvmDone,
    gearDone,
    goals: normaliseGoals(candidate.goals),
    notes: textOr(candidate.notes),
    updatedAt: textOr(candidate.updatedAt) || null,
  }
}

function decodeSharePayload(payload) {
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")
  const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function encodeSharePayload(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  let binary = ""
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000))
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function consumeSharedQuery(params) {
  params.delete("plan")
  const query = params.toString()
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`)
}

function loadPlan() {
  const params = new URLSearchParams(window.location.search)
  const shared = params.get("plan")
  if (shared) {
    try {
      return normalisePlan(JSON.parse(decodeSharePayload(shared)))
    } catch {
      // Fall back to the local plan if a shared payload is malformed.
    }
  }
  try {
    return normalisePlan(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"))
  } catch {
    return emptyPlan
  }
}

function makeShareUrl(plan) {
  const payload = encodeSharePayload(plan)
  const url = new URL(window.location.href)
  url.search = ""
  url.searchParams.set("plan", payload)
  return url.toString()
}

function godFor(picks) {
  if (picks.length < 3) return null
  const counts = picks.reduce((all, pick) => ({ ...all, [pick]: (all[pick] || 0) + 1 }), {})
  if ((counts.order || 0) >= 2) return blessingPaths.find((path) => path.id === "order")
  if ((counts.chaos || 0) >= 2) return blessingPaths.find((path) => path.id === "chaos")
  return blessingPaths.find((path) => path.id === "balance")
}

function App() {
  const [plan, setPlan] = useState(loadPlan)
  const [activeView, setActiveView] = useState("overview")
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState("")
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has("plan")) consumeSharedQuery(params)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...plan, updatedAt: new Date().toISOString() }))
    } catch {
      setToast("Local autosave is unavailable in this browser")
    }
  }, [plan])

  useEffect(() => {
    const overlayOpen = mobileNav || Boolean(modal)
    if (!overlayOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return
      setMobileNav(false)
      setModal(null)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [mobileNav, modal])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(""), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const readiness = useMemo(() => {
    const selectedBlessings = blessingTiers.filter((tier) => plan.blessings[tier]).length
    const decisions = plan.regions.length + (plan.relics["tier-1"] ? 1 : 0) + selectedBlessings
    const state = decisions === 10 ? "Core choices mapped" : "Draft route"
    return { decisions, total: 10, state, selectedBlessings }
  }, [plan])

  const updatePlan = (patch) => setPlan((current) => ({ ...current, ...patch }))
  const go = (view) => {
    setActiveView(view)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleRegion = (id) => {
    setPlan((current) => {
      if (current.regions.includes(id)) return { ...current, regions: current.regions.filter((item) => item !== id) }
      if (current.regions.length >= 3) {
        setToast("All three optional region slots are filled")
        return current
      }
      return { ...current, regions: [...current.regions, id] }
    })
  }

  const copyShareLink = async () => {
    const url = makeShareUrl(plan)
    try {
      await navigator.clipboard.writeText(url)
      setToast("Share link copied")
    } catch {
      setModal({ type: "share", value: url })
    }
  }

  const exportPlan = () => {
    const blob = new Blob([JSON.stringify({ schema: 4, dataVersion: DATA_VERSION, plan }, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "equilibrium-plan"}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(link.href), 0)
    setToast("Plan exported")
  }

  const importPlan = (value) => {
    try {
      const parsed = JSON.parse(value)
      const imported = isRecord(parsed) && isRecord(parsed.plan) ? parsed.plan : parsed
      const recognisedFields = ["name", "accountMode", "combatStyle", "objective", "regions", "relics", "blessings", "pvmDone", "gearDone", "goals", "notes"]
      if (!isRecord(imported) || !recognisedFields.some((field) => Object.hasOwn(imported, field))) throw new Error("invalid")
      setPlan(normalisePlan(imported))
      setModal(null)
      setToast("Plan imported")
    } catch {
      setToast("That file does not look like an Equilibrium plan")
    }
  }

  return (
    <div className="app-shell">
      <aside id="planner-navigation" className={`sidebar ${mobileNav ? "is-open" : ""}`}>
        <button className="brand" onClick={() => go("overview")}>
          <span className="brand-rune" aria-hidden="true"><i>EQ</i></span>
          <span><strong>Equilibrium</strong><small>League planner</small></span>
        </button>
        <nav className="main-nav" aria-label="Planner sections">
          <p className="eyebrow">Build dossier</p>
          {navItems.map(([id, label]) => (
            <button key={id} className={activeView === id ? "active" : ""} onClick={() => go(id)} aria-current={activeView === id ? "page" : undefined}>
              <span>{icons[id]}</span>{label}
              {id === "regions" && <em>{plan.regions.length}/3</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sync-card"><span className="pulse-dot" /><div><strong>Autosaved locally</strong><small>No account or sign-in needed</small></div></div>
          <div className="mobile-data-actions">
            <button onClick={() => { setModal({ type: "import" }); setMobileNav(false) }}>Import build</button>
            <button onClick={() => { exportPlan(); setMobileNav(false) }}>Export build</button>
          </div>
          <button className="sidebar-action" onClick={() => setModal({ type: "data" })}>◇ Intel & sources <span>→</span></button>
        </div>
      </aside>
      {mobileNav && <button className="nav-scrim" aria-label="Close menu" onClick={() => setMobileNav(false)} />}

      <main>
        <header className="topbar">
          <button className="menu-button" aria-label="Open menu" aria-expanded={mobileNav} aria-controls="planner-navigation" onClick={() => setMobileNav(true)}>☰</button>
          <div className="league-status"><span>RS3</span><strong>Leagues II: Equilibrium</strong><small>10 Aug — 21 Sep 2026</small></div>
          <div className="top-actions">
            <button className="quiet-button" onClick={() => setModal({ type: "import" })}>Import</button>
            <button className="quiet-button" onClick={exportPlan}>Export</button>
            <button className="gold-button" onClick={copyShareLink}><span>↗</span> Share build</button>
          </div>
        </header>
        <div className="content">
          {activeView === "overview" && <Overview plan={plan} updatePlan={updatePlan} go={go} readiness={readiness} />}
          {activeView === "regions" && <Regions plan={plan} updatePlan={updatePlan} toggleRegion={toggleRegion} />}
          {activeView === "relics" && <Relics plan={plan} updatePlan={updatePlan} />}
          {activeView === "pvm" && <PvmProgression plan={plan} updatePlan={updatePlan} go={go} />}
          {activeView === "gear" && <GearProgression plan={plan} updatePlan={updatePlan} go={go} />}
          {activeView === "route" && <Route plan={plan} updatePlan={updatePlan} />}
        </div>
      </main>

      {modal && <Modal modal={modal} close={() => setModal(null)} importPlan={importPlan} />}
      {toast && <div className="toast" role="status"><span>✓</span>{toast}</div>}
    </div>
  )
}

function PageIntro({ kicker, title, copy, children }) {
  return <section className="page-intro"><div><p className="kicker">{kicker}</p><h1>{title}</h1><p>{copy}</p></div>{children}</section>
}

function Overview({ plan, updatePlan, go, readiness }) {
  const selectedRegions = plan.regions.map((id) => regionOptions.find((region) => region.id === id)).filter(Boolean)
  const nextGoal = plan.goals.find((goal) => !goal.done)
  return (
    <>
      <PageIntro
        kicker="Astral command table"
        title={<>Forge a route in <span>perfect balance.</span></>}
        copy="Plan the permanent calls now: three regions, seven relic tiers and a branching combat path. Confirmed facts stay distinct from choices that are still hidden in the fog."
      >
        <div className="updated-chip"><span>✦</span><div><small>Verified dataset</small><strong>{DATA_VERSION}</strong></div></div>
      </PageIntro>

      <section className="notice official-notice"><span>✓</span><div><strong>{sourceStatus.label}</strong><p>{sourceStatus.note}</p></div><button onClick={() => go("relics")}>Review reveals</button></section>

      <section className="fact-grid" aria-label="Confirmed League facts">
        {leagueFacts.map((fact) => <article className="fact-card" key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span><small>{fact.detail}</small></article>)}
      </section>

      <section className="dashboard-grid">
        <article className="panel build-card">
          <div className="panel-heading"><div><p className="eyebrow">Current build</p><h2>Account blueprint</h2></div><span className="draft-pill">{readiness.state}</span></div>
          <label className="field-label" htmlFor="build-name">Build name</label>
          <input id="build-name" className="hero-input" value={plan.name} onChange={(event) => updatePlan({ name: event.target.value })} />
          <div className="three-fields">
            <label><span>Access</span><select value={plan.accountMode} onChange={(event) => updatePlan({ accountMode: event.target.value })}><option>Member</option><option>Free-to-play</option></select></label>
            <label><span>Combat focus</span><select value={plan.combatStyle} onChange={(event) => updatePlan({ combatStyle: event.target.value })}>{COMBAT_STYLE_OPTIONS.map((style) => <option key={style}>{style}</option>)}</select></label>
            <label><span>Main objective</span><select value={plan.objective} onChange={(event) => updatePlan({ objective: event.target.value })}><option>Balanced progression</option><option>Boss progression</option><option>Task completion</option><option>Skilling route</option><option>Collection goals</option></select></label>
          </div>
          <div className="readiness-block">
            <div><span>Known decisions mapped</span><strong>{readiness.decisions}/{readiness.total}</strong></div>
            <div className="progress-track"><i style={{ width: `${(readiness.decisions / readiness.total) * 100}%` }} /></div>
            <small>3 region picks · 1 revealed relic choice · 6 blessing path steps</small>
          </div>
        </article>

        <article className="panel regions-summary">
          <div className="panel-heading"><div><p className="eyebrow">Unlock map</p><h2>{plan.accountMode === "Free-to-play" ? "F2P start · members route" : "Your six-region world"}</h2></div><button className="text-button" onClick={() => go("regions")}>Edit choices →</button></div>
          <div className="base-route"><span>Start</span>{baseRegions.map((region) => <div key={region.id}><i>{region.mark}</i><small>{region.name}</small></div>)}</div>
          <div className="region-slots">
            {[0, 1, 2].map((index) => {
              const region = selectedRegions[index]
              return region ? (
                <button className="region-slot filled" key={region.id} onClick={() => go("regions")}>
                  <span className="region-seal" style={{ "--region-color": region.color }}>{region.mark}</span>
                  <span><small>Choice {index + 1}</small><strong>{region.name}</strong><em>{region.tags.slice(0, 2).join(" · ")}</em></span>
                </button>
              ) : <button className="region-slot empty" key={index} onClick={() => go("regions")}><span>+</span><div><small>Choice {index + 1}</small><strong>Select optional region</strong></div></button>
            })}
          </div>
        </article>

        <article className="panel next-card">
          <div className="next-icon">↗</div>
          <div><p className="eyebrow">Next route step</p><h2>{nextGoal?.label || "Launch route complete"}</h2><p>{nextGoal ? `${nextGoal.phase} · ${nextGoal.certainty || "Your plan"}` : "Add another milestone to keep planning."}</p></div>
          <button className="round-button" onClick={() => go("route")} aria-label="Open route">→</button>
        </article>

        <article className="panel choices-card">
          <div className="panel-heading"><div><p className="eyebrow">Power architecture</p><h2>Relics & blessings</h2></div><button className="text-button" onClick={() => go("relics")}>Open planner →</button></div>
          <div className="choice-summary">
            <div><span className="choice-symbol">✦</span><span><strong>{plan.relics["tier-1"] ? "Tier I chosen" : "Tier I open"}</strong><small>6 tier assignments pending</small></span></div>
            <div><span className="choice-symbol blessing">◇</span><span><strong>{readiness.selectedBlessings} / 6</strong><small>Order · Balance · Chaos path</small></span></div>
          </div>
          <div className="unknown-strip"><span>?</span><p><strong>Task thresholds still unpublished</strong><br />Keep your unlock route flexible until the full list reaches the Wiki.</p></div>
        </article>
      </section>
    </>
  )
}

function Regions({ plan, updatePlan, toggleRegion }) {
  const freeMode = plan.accountMode === "Free-to-play"
  const focusIsSet = plan.combatStyle !== "Undecided"
  return (
    <>
      <PageIntro kicker="Region constellation" title={<>Choose the shape of <span>your Gielinor.</span></>} copy={freeMode ? "Dedicated free-to-play worlds include the available F2P regions and Relic tiers I–III. Use the optional picker below to preserve a route for a seamless membership upgrade." : "Misthalin and Havenhythe are available at the start; Karamja arrives at milestone one. Choose exactly three more from the eight confirmed regions."} />
      <section className="base-region-grid">
        {baseRegions.map((region, index) => {
          const combatRegion = pvmRegions.find((item) => item.id === region.id)
          return <article key={region.id} className="base-region-card"><span>{region.mark}</span><div><small>{index < 2 ? "Starting region" : "First milestone"}</small><strong>{region.name}</strong><p>{region.detail}</p><p className="base-region-pvm"><b>Included combat:</b> {combatRegion?.targets.map((target) => target.name).join(" · ")}</p></div><em>Official</em></article>
        })}
      </section>
      <div className="selection-bar">
        <div><span className="selection-number">{plan.regions.length}</span><p><strong>of 3 optional regions chosen</strong><small>{freeMode ? "Membership-upgrade plan" : "Selections are permanent in the League"}</small></p></div>
        <div className="selection-tools">
          <label className="region-focus"><span>Combat lens</span><select value={plan.combatStyle} onChange={(event) => updatePlan({ combatStyle: event.target.value })}>{COMBAT_STYLE_OPTIONS.map((style) => <option key={style}>{style}</option>)}</select></label>
          <div className="mini-slots" role="img" aria-label={`${plan.regions.length} of 3 region choices filled`}>{[0, 1, 2].map((index) => <i key={index} className={index < plan.regions.length ? "filled" : ""} />)}</div>
        </div>
      </div>
      <section className="region-grid">
        {regionOptions.map((region) => {
          const selected = plan.regions.includes(region.id)
          const order = plan.regions.indexOf(region.id) + 1
          const combatRegion = pvmRegions.find((item) => item.id === region.id)
          const combatMatch = focusIsSet && region.combat.styles.includes(plan.combatStyle)
          const objectiveMatch = region.fit.includes(plan.objective)
          const matchLabel = combatMatch ? `${plan.combatStyle} synergy` : objectiveMatch ? "Matches objective" : region.status
          return (
            <article key={region.id} className={`panel region-card ${selected ? "selected" : ""}`} style={{ "--region-color": region.color }}>
              <div className="region-card-top"><span className="large-seal">{region.mark}</span><span className={`status-pill ${combatMatch || objectiveMatch ? "match" : ""}`}>{matchLabel}</span></div>
              <h2>{region.name}</h2><p>{region.summary}</p>
              <div className="tags">{region.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <section className="region-combat-read" aria-label={`${region.name} combat details`}>
                <div className="region-intel-heading"><small>Combat read</small><em>{combatRegion?.targets.length || 0} reward highlights</em></div>
                <div className="region-style-tags">
                  {region.combat.styles.map((style) => <span className={style === plan.combatStyle ? "active" : ""} key={style}>{style}</span>)}
                </div>
                <p>{region.combat.note}</p>
                <div className="region-loot-list">
                  {combatRegion?.targets.map((target) => <article className="region-loot-row" key={target.id}>
                    <div><strong>{target.name}</strong><small>{target.difficulty}</small></div>
                    <p><span aria-hidden="true">◆</span>{target.loot}</p>
                  </article>)}
                </div>
              </section>
              <button className={selected ? "selected-button" : "select-button"} onClick={() => toggleRegion(region.id)}>{selected ? `✓ Choice ${order} · remove` : "+ Add to build"}</button>
            </article>
          )
        })}
      </section>
      <p className="region-caveat">Boss and loot callouts are planning guidance based on known region boundaries. Exact League tasks are still pending; League-specific drop changes are called out where confirmed.</p>
      <p className="source-line">Region scope and examples: <a href={sources[0].url} target="_blank" rel="noreferrer">official Equilibrium overview ↗</a> · <a href={sources[1].url} target="_blank" rel="noreferrer">official drop FAQ ↗</a></p>
    </>
  )
}

function Relics({ plan, updatePlan }) {
  const chooseRelic = (id) => updatePlan({ relics: { ...plan.relics, "tier-1": id } })
  const setRelicNote = (id, value) => updatePlan({ relicNotes: { ...plan.relicNotes, [id]: value } })
  const chooseBlessing = (tier, id) => {
    const blessings = { ...plan.blessings }
    if (blessings[tier] === id) delete blessings[tier]
    else blessings[tier] = id
    updatePlan({ blessings })
  }
  const firstGod = godFor([1, 2, 3].map((tier) => plan.blessings[tier]).filter(Boolean))
  const secondGod = godFor([5, 6, 7].map((tier) => plan.blessings[tier]).filter(Boolean))
  return (
    <>
      <PageIntro kicker="Power architecture" title={<>Design your <span>league engine.</span></>} copy="Tier I is fully confirmed. The other revealed relics are kept unassigned until Jagex publishes the final tier board, so this planner never presents community guesses as fact." />
      <section className="tier-one-section">
        <div className="section-heading"><div><p className="eyebrow">Relic tier I · confirmed</p><h2>Your opening engine</h2></div><span className="official-pill">Official reveal</span></div>
        <div className="relic-choice-grid">
          {tierOneRelics.map((relic) => {
            const chosen = plan.relics["tier-1"] === relic.id
            return <button key={relic.id} className={`relic-choice-card ${chosen ? "chosen" : ""}`} onClick={() => chooseRelic(relic.id)} aria-pressed={chosen}><span className="relic-glyph">{relic.glyph}</span><small>{relic.pitch}</small><strong>{relic.name}</strong><p>{relic.summary}</p><span className="mini-tag-row">{relic.strengths.map((strength) => <i key={strength}>{strength}</i>)}</span><em>{chosen ? "✓ Selected" : "Choose relic"}</em></button>
          })}
        </div>
      </section>

      <section className="relic-layout advanced-relics">
        <div className="tier-stack">
          {relicTiers.slice(1).map((relic) => (
            <article className="panel relic-row" key={relic.id}>
              <span className="tier-medallion">{relic.tier}</span>
              <div className="relic-copy"><div><p className="eyebrow">Relic tier {relic.tier}</p><h2>{relic.status}</h2></div><span className="tbc-pill">Awaiting board</span><p>{relic.summary}</p><input value={plan.relicNotes[relic.id] || ""} onChange={(event) => setRelicNote(relic.id, event.target.value)} placeholder="Plan the effect or synergy you want at this tier…" aria-label={`Notes for relic tier ${relic.tier}`} /></div>
            </article>
          ))}
        </div>
        <aside className="panel reveal-panel">
          <p className="eyebrow">Reveal index</p><h2>Known names, tiers pending</h2><p>These relics are official reveals, but their final tier placement was not published in the source text as of this dataset.</p>
          <div className="reveal-list">{revealedRelics.map((relic) => <div className={relic.latest ? "latest-reveal" : undefined} key={relic.name}><span>✦</span><p><strong>{relic.name}</strong><small>{relic.summary}</small></p><em>{relic.latest ? "Latest · " : ""}{relic.revealed}</em></div>)}</div>
          <a className="source-button" href={sources[1].url} target="_blank" rel="noreferrer">Open daily reveal hub ↗</a>
        </aside>
      </section>

      <section className="blessing-section">
        <div className="section-heading"><div><p className="eyebrow">Eight blessing tiers · confirmed structure</p><h2>Walk the line between Order, Balance & Chaos</h2></div><span className="reset-chip">↻ 3 resets during the League</span></div>
        <p className="section-copy">Choose a path at tiers 1–3 and 5–7. Your majority within each three-choice group determines its God Blessing at tiers 4 and 8; one of each path resolves to Balance.</p>
        <div className="blessing-path-board">
          {[1, 2, 3].map((tier) => <BlessingTier key={tier} tier={tier} selected={plan.blessings[tier]} choose={chooseBlessing} />)}
          <GodTier tier={4} god={firstGod} />
          {[5, 6, 7].map((tier) => <BlessingTier key={tier} tier={tier} selected={plan.blessings[tier]} choose={chooseBlessing} />)}
          <GodTier tier={8} god={secondGod} />
        </div>
      </section>

      <section className="passive-intel">
        <div className="passive-column"><div className="section-heading"><div><p className="eyebrow">Confirmed scaling</p><h2>Relic tier passives</h2></div></div>{relicPassives.map((item) => <div className="passive-row" key={item.tier}><span>{item.tier}</span><div><strong>{item.headline}</strong><p>{item.detail}</p></div></div>)}</div>
        <div className="passive-column"><div className="section-heading"><div><p className="eyebrow">Confirmed combat scaling</p><h2>Blessing tier passives</h2></div></div>{blessingPassives.map((item) => <div className="passive-row blessing-passive" key={item.tier}><span>{item.tier}</span><div><strong>Tier {item.tier}</strong><p>{item.detail}</p></div></div>)}</div>
      </section>
    </>
  )
}

function BlessingTier({ tier, selected, choose }) {
  return <article className="blessing-tier"><div><span>{tier}</span><small>Tier {tier}</small></div><div className="path-choices">{blessingPaths.map((path) => {
    const name = blessingReveals[tier]?.[path.id] || "Name awaiting reveal"
    const description = blessingDescriptions[tier]?.[path.id] || "The name and exact effect have not been officially revealed yet. This description will update when new information is published."
    const tooltipId = `blessing-tooltip-${tier}-${path.id}`
    return <button key={path.id} className={selected === path.id ? "active" : ""} style={{ "--path-color": path.color }} onClick={() => choose(tier, path.id)} aria-pressed={selected === path.id} aria-describedby={tooltipId}><i>{path.glyph}</i><span><small>{path.name} · {path.god}</small><strong>{name}</strong></span><b className="blessing-info" aria-hidden="true">i</b><span className="blessing-tooltip" id={tooltipId} role="tooltip"><small>{name}</small><span>{description}</span></span></button>
  })}</div></article>
}

function GodTier({ tier, god }) {
  const name = god ? godBlessingReveals[tier]?.[god.id] || `${god.god} God Blessing · name awaiting reveal` : null
  const description = god ? godBlessingDescriptions[tier]?.[god.id] || "This God Blessing's exact effect has not been officially revealed yet. It will update when new information is published." : null
  const tooltipId = `god-blessing-tooltip-${tier}`
  return <article className={`god-tier ${god ? "resolved" : ""}`} style={{ "--path-color": god?.color }} tabIndex={god ? 0 : undefined} aria-describedby={god ? tooltipId : undefined}><span>{tier}</span><div><small>God tier {tier}{god ? ` · ${god.name} · ${god.god}` : ""}</small><strong>{name || "Complete the previous three choices"}</strong></div><i>{god?.glyph || "?"}</i>{god && <><b className="blessing-info" aria-hidden="true">i</b><span className="blessing-tooltip" id={tooltipId} role="tooltip"><small>{name}</small><span>{description}</span></span></>}</article>
}

function PvmProgression({ plan, updatePlan, go }) {
  const activeRegionIds = [...baseRegions.map((region) => region.id), ...plan.regions]
  const activeRegions = activeRegionIds.map((id) => pvmRegions.find((region) => region.id === id)).filter(Boolean)
  const activeTargets = activeRegions.flatMap((region) => region.targets.map((target) => ({ ...target, region })))
  const completed = new Set(plan.pvmDone)
  const completedCount = activeTargets.filter((target) => completed.has(target.id)).length
  const openSlots = 3 - plan.regions.length
  const progress = activeTargets.length ? (completedCount / activeTargets.length) * 100 : 0
  const focusIsSet = !["Undecided", "Hybrid"].includes(plan.combatStyle)
  const toggleTarget = (id) => {
    const next = completed.has(id) ? plan.pvmDone.filter((targetId) => targetId !== id) : [...plan.pvmDone, id]
    updatePlan({ pvmDone: next })
  }
  const unlockLabel = (region) => {
    const optionalIndex = plan.regions.indexOf(region.id)
    if (optionalIndex >= 0) return `${plan.accountMode === "Free-to-play" ? "Membership plan · " : ""}Choice ${optionalIndex + 1}`
    return region.availability
  }

  return (
    <>
      <PageIntro kicker="Regional combat dossier" title={<>Chart your <span>PvM ascent.</span></>} copy="This ladder combines the combat targets in your starting regions with the optional regions in your build. Check off farms as you complete them; progress is saved and shared with the rest of your plan.">
        <div className="pvm-score"><span>⚔</span><div><small>Available route</small><strong>{completedCount} / {activeTargets.length} complete</strong></div></div>
      </PageIntro>

      <section className="pvm-scope panel">
        <div className="pvm-scope-heading">
          <div><p className="eyebrow">Active region pool</p><h2>Your {activeRegions.length}-region combat map</h2></div>
          <button className="text-button" onClick={() => go("regions")}>Edit region choices →</button>
        </div>
        <div className="pvm-region-strip">
          {activeRegions.map((region) => <div key={region.id} style={{ "--region-color": region.color }}><span>{region.name.slice(0, 1)}</span><p><strong>{region.name}</strong><small>{unlockLabel(region)}</small></p></div>)}
          {Array.from({ length: openSlots }, (_, index) => <button key={index} onClick={() => go("regions")}><span>+</span><p><strong>Open choice</strong><small>Select a region</small></p></button>)}
        </div>
        <div className="pvm-progress"><div><span>Route completion</span><strong>{Math.round(progress)}%</strong></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div></div>
      </section>

      {openSlots > 0 && <section className="notice pvm-notice"><span>!</span><div><strong>{openSlots} optional region {openSlots === 1 ? "slot is" : "slots are"} still open</strong><p>The ladder will expand automatically when you finish choosing regions.</p></div><button onClick={() => go("regions")}>Choose regions</button></section>}

      <section className="pvm-ladder" aria-label="PvM progression ladder">
        {pvmPhases.map((phase) => {
          const targets = activeTargets.filter((target) => target.phase === phase.id)
          return <section className="pvm-phase" key={phase.id}>
            <header><span>{phase.step}</span><div><small>Progression stage</small><h2>{phase.name}</h2><p>{phase.detail}</p></div><em>{targets.filter((target) => completed.has(target.id)).length}/{targets.length}</em></header>
            <div className="pvm-target-list">
              {targets.map((target) => {
                const done = completed.has(target.id)
                const focusMatch = focusIsSet && target.styles.includes(plan.combatStyle)
                const shownStyles = target.styles.filter((style) => style !== "All styles")
                return <article className={`pvm-target ${done ? "done" : ""} ${focusMatch ? "focus-match" : ""}`} style={{ "--region-color": target.region.color }} key={target.id}>
                  <div className="pvm-target-top"><span>{target.region.name}</span><button onClick={() => toggleTarget(target.id)} aria-pressed={done} aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${target.name}`}><i>{done ? "✓" : ""}</i>{done ? "Complete" : "Mark done"}</button></div>
                  <small>{target.difficulty}</small><h3>{target.name}</h3><p>{target.payoff}</p>
                  <div className="pvm-style-tags">{shownStyles.length ? shownStyles.map((style) => <span className={style === plan.combatStyle ? "active" : ""} key={style}>{style}</span>) : <span>All styles</span>}{target.styles.includes("All styles") && shownStyles.length > 0 && <span>Flexible</span>}</div>
                </article>
              })}
              {!targets.length && <div className="pvm-empty"><span>◇</span><p><strong>No target in this stage yet</strong><small>Choose another optional region to expand the ladder.</small></p></div>}
            </div>
          </section>
        })}
      </section>

      <section className="pvm-intel-grid">
        <article><span>↻</span><div><small>Confirmed League rule</small><strong>Faster boss spawns</strong><p>Every boss spawn setting is accelerated, so your farming order may be much faster than the main game.</p></div></article>
        <article><span>⌖</span><div><small>Region-aware assignments</small><strong>No inaccessible Reaper targets</strong><p>Reaper and Slayer assignments are adjusted to respect the regions you have unlocked.</p></div></article>
        <article><span>?</span><div><small>Planning caveat</small><strong>Sequence is advisory</strong><p>Boss access follows known region boundaries; exact Blessing Tasks and milestone requirements remain pending.</p></div></article>
      </section>
      <p className="source-line">Rules and boundaries: <a href={sources[0].url} target="_blank" rel="noreferrer">official overview ↗</a> · <a href={sources[1].url} target="_blank" rel="noreferrer">reveal FAQ ↗</a></p>
    </>
  )
}

function GearProgression({ plan, updatePlan, go }) {
  const combatStyles = ["Melee", "Ranged", "Magic", "Necromancy"]
  const initialStyle = combatStyles.includes(plan.combatStyle) ? plan.combatStyle : "Melee"
  const [previewStyle, setPreviewStyle] = useState(initialStyle)
  const [showLocked, setShowLocked] = useState(false)
  const activeRegionIds = new Set([...baseRegions.map((region) => region.id), ...plan.regions])
  const completed = new Set(plan.gearDone)
  const styleItems = gearMilestones.filter((item) => item.style === previewStyle || item.style === "All")
  const isAvailable = (item) => item.regionSets.some((set) => set.every((id) => activeRegionIds.has(id)))
  const closestRegionSet = (item) => [...item.regionSets].sort((left, right) => left.filter((id) => !activeRegionIds.has(id)).length - right.filter((id) => !activeRegionIds.has(id)).length)[0]
  const availableItems = styleItems.filter(isAvailable)
  const lockedItems = styleItems.filter((item) => !isAvailable(item))
  const completeCount = availableItems.filter((item) => completed.has(item.id)).length
  const progress = availableItems.length ? (completeCount / availableItems.length) * 100 : 0
  const styleColors = { Melee: "#d78d74", Ranged: "#83bd91", Magic: "#8faed9", Necromancy: "#b69ad2" }
  const styleGlyphs = { Melee: "⚔", Ranged: "➶", Magic: "✦", Necromancy: "◇" }
  const regionName = (id) => pvmRegions.find((region) => region.id === id)?.name || id
  const chooseStyle = (style) => {
    setPreviewStyle(style)
    updatePlan({ combatStyle: style })
  }
  const toggleItem = (id) => {
    const next = completed.has(id) ? plan.gearDone.filter((itemId) => itemId !== id) : [...plan.gearDone, id]
    updatePlan({ gearDone: next })
  }

  return (
    <>
      <PageIntro kicker="Equipment architecture" title={<>Build your <span>gear ladder.</span></>} copy="Follow an obtainable equipment route for your combat style and region choices. Shared cape, glove and ring targets are included alongside weapons and armour.">
        <div className="gear-score" style={{ "--style-color": styleColors[previewStyle] }}><span>{styleGlyphs[previewStyle]}</span><div><small>{previewStyle} route</small><strong>{completeCount} / {availableItems.length} obtained</strong></div></div>
      </PageIntro>

      <section className="gear-console panel" style={{ "--style-color": styleColors[previewStyle] }}>
        <div className="gear-console-heading"><div><p className="eyebrow">Combat focus</p><h2>Preview a style route</h2><p>Selecting a style also updates the combat focus saved in your build.</p></div><button className={`locked-toggle ${showLocked ? "active" : ""}`} onClick={() => setShowLocked((shown) => !shown)} aria-pressed={showLocked}><span>{showLocked ? "◉" : "○"}</span>{showLocked ? "Hide locked alternatives" : `Show ${lockedItems.length} locked alternatives`}</button></div>
        <div className="gear-style-tabs" role="group" aria-label="Combat style">
          {combatStyles.map((style) => <button key={style} className={previewStyle === style ? "active" : ""} style={{ "--tab-color": styleColors[style] }} onClick={() => chooseStyle(style)} aria-pressed={previewStyle === style}><span>{styleGlyphs[style]}</span><strong>{style}</strong></button>)}
        </div>
        <div className="gear-route-meta"><div><span>Region coverage</span><strong>{activeRegionIds.size} regions active</strong></div><div><span>Available milestones</span><strong>{availableItems.length}</strong></div><div><span>Route gaps</span><strong>{lockedItems.length}</strong></div></div>
        <div className="gear-progress"><div><span>Equipment route completion</span><strong>{Math.round(progress)}%</strong></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div></div>
      </section>

      <section className="gear-stage-grid" aria-label={`${previewStyle} gear progression`} style={{ "--style-color": styleColors[previewStyle] }}>
        {gearStages.map((stage) => {
          const items = styleItems.filter((item) => item.stage === stage.id && (showLocked || isAvailable(item)))
          const availableInStage = styleItems.filter((item) => item.stage === stage.id && isAvailable(item))
          return <section className="gear-stage" key={stage.id}>
            <header><span>{stage.step}</span><div><small>{stage.range}</small><h2>{stage.name}</h2><p>{stage.detail}</p></div><em>{availableInStage.filter((item) => completed.has(item.id)).length}/{availableInStage.length}</em></header>
            <div className="gear-item-list">
              {items.map((item) => {
                const available = isAvailable(item)
                const done = completed.has(item.id)
                const requirements = closestRegionSet(item)
                const missing = requirements.filter((id) => !activeRegionIds.has(id))
                return <article className={`gear-item ${available ? "available" : "locked"} ${done ? "done" : ""}`} key={item.id}>
                  <div className="gear-item-top"><span className="gear-tier">{item.tier}</span><span className="gear-slot">{item.slot}</span></div>
                  <h3>{item.name}</h3><small>{item.source}</small><p>{item.note}</p>
                  <div className="gear-region-reqs">{requirements.map((id) => <span className={activeRegionIds.has(id) ? "active" : "missing"} key={id}>{activeRegionIds.has(id) ? "✓" : "×"} {regionName(id)}</span>)}</div>
                  {available ? <button className="gear-obtained" onClick={() => toggleItem(item.id)} aria-pressed={done}><i>{done ? "✓" : ""}</i>{done ? "Obtained" : "Mark obtained"}</button> : <button className="gear-unlock" onClick={() => go("regions")}><span>Locked</span> Add {missing.map(regionName).join(" + ")} →</button>}
                </article>
              })}
              {!items.length && <div className="gear-empty"><span>◇</span><p><strong>No obtainable milestone here yet</strong><small>Show locked alternatives or revise your region choices.</small></p></div>}
            </div>
          </section>
        })}
      </section>

      <section className="gear-footnote notice"><span>i</span><div><strong>Curated route, not a strict best-in-slot ranking</strong><p>Relics and Blessings may make unusual equipment competitive. Multi-region materials and announced drop conversions are noted where they change the route.</p></div><a href={sources.find((source) => source.id === "wiki-pvm-equipment")?.url} target="_blank" rel="noreferrer">Wiki equipment guide ↗</a></section>
    </>
  )
}

function Route({ plan, updatePlan }) {
  const [newGoal, setNewGoal] = useState("")
  const toggleGoal = (id) => updatePlan({ goals: plan.goals.map((goal) => goal.id === id ? { ...goal, done: !goal.done } : goal) })
  const removeGoal = (id) => updatePlan({ goals: plan.goals.filter((goal) => goal.id !== id) })
  const moveGoal = (index, direction) => {
    const next = [...plan.goals]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    updatePlan({ goals: next })
  }
  const setPhase = (id, phase) => updatePlan({ goals: plan.goals.map((goal) => goal.id === id ? { ...goal, phase } : goal) })
  const addGoal = (event) => {
    event.preventDefault()
    if (!newGoal.trim()) return
    updatePlan({ goals: [...plan.goals, { id: `goal-${Date.now()}`, label: newGoal.trim(), phase: "Mid", done: false, certainty: "Your plan" }] })
    setNewGoal("")
  }
  return (
    <>
      <PageIntro kicker="Launch route" title={<>Turn the build into a <span>playable opening.</span></>} copy="Start with confirmed onboarding, then order your power spikes, unlocks, gear targets and questions. Unknown thresholds stay labelled until the task list lands." />
      <section className="route-layout">
        <article className="panel goals-panel">
          <div className="panel-heading"><div><p className="eyebrow">Milestone queue</p><h2>Route goals</h2></div><span className="counter-pill">{plan.goals.filter((goal) => goal.done).length}/{plan.goals.length} done</span></div>
          <div className="goal-list">
            {plan.goals.map((goal, index) => <div className={`goal-row ${goal.done ? "done" : ""}`} key={goal.id}>
              <button className="check-button" onClick={() => toggleGoal(goal.id)} aria-label={goal.done ? "Mark incomplete" : "Mark complete"}>{goal.done ? "✓" : ""}</button>
              <span className="goal-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="goal-content"><strong>{goal.label}</strong><span><select value={goal.phase} onChange={(event) => setPhase(goal.id, event.target.value)}><option>Opening</option><option>Early</option><option>Mid</option><option>Late</option></select><small>{goal.certainty || "Your plan"}</small></span></div>
              <div className="goal-actions"><button onClick={() => moveGoal(index, -1)} disabled={index === 0} aria-label="Move goal up">↑</button><button onClick={() => moveGoal(index, 1)} disabled={index === plan.goals.length - 1} aria-label="Move goal down">↓</button><button onClick={() => removeGoal(goal.id)} aria-label="Remove goal">×</button></div>
            </div>)}
          </div>
          <form className="add-goal" onSubmit={addGoal}><input value={newGoal} onChange={(event) => setNewGoal(event.target.value)} placeholder="Add gear, boss, XP or trophy milestone…" /><button>Add goal</button></form>
        </article>
        <aside className="panel notes-panel">
          <p className="eyebrow">Assumption ledger</p><h2>Questions & dependencies</h2><p>Capture materials, gear chains, thresholds or reveal questions that could change your three permanent region calls.</p>
          <textarea value={plan.notes} onChange={(event) => updatePlan({ notes: event.target.value })} placeholder="Example: Can a revealed relic replace the region-locked material for my target gear?" />
          <div className="note-footer"><span>Saved automatically</span><small>{plan.notes.length} characters</small></div>
          <div className="wiki-sync-note"><span>W</span><p><strong>WikiSync confirmed for launch</strong><small>Task syncing belongs to the RuneScape Wiki; this pre-release route stays local.</small></p></div>
        </aside>
      </section>
    </>
  )
}

function Modal({ modal, close, importPlan }) {
  const [value, setValue] = useState(modal.value || "")
  const readFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setValue(String(reader.result || ""))
    reader.readAsText(file)
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}><div className="modal" role="dialog" aria-modal="true">
    <button className="modal-close" onClick={close} aria-label="Close">×</button>
    {modal.type === "import" && <><p className="kicker">Portable plans</p><h2>Import a build</h2><p>Choose an exported JSON file or paste its contents. Your current local plan will be replaced after validation.</p><label className="file-button">Choose JSON file<input type="file" accept="application/json,.json" onChange={readFile} /></label><textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Paste plan JSON…" /><button className="gold-button full" onClick={() => importPlan(value)}>Import plan</button></>}
    {modal.type === "share" && <><p className="kicker">Share build</p><h2>Copy this link</h2><p>Your current plan is encoded in the URL. Anyone opening it receives a separate local copy.</p><textarea className="short" readOnly value={value} /><button className="gold-button full" onClick={() => navigator.clipboard?.writeText(value).then(close)}>Copy link</button></>}
    {modal.type === "data" && <><p className="kicker">Intel ledger</p><h2>{sourceStatus.label}</h2><p>{sourceStatus.note}</p><div className="data-version"><span>Dataset version</span><strong>{DATA_VERSION}</strong></div><div className="source-list">{sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.id}><span>✓</span><div><strong>{source.label}</strong><small>{source.publisher} · {source.published}</small></div><em>↗</em></a>)}</div><p className="fine-print">League content is isolated in <code>src/data/equilibrium.js</code>. Future reveals can be added without changing saved plan files; exports include the dataset version for stale-data checks.</p></>}
  </div></div>
}

export default App
