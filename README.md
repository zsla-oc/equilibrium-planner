# Equilibrium Planner

A local-first build and launch-route planner for **RuneScape 3 Leagues II: EQUILIBRIUM**.

The app deliberately separates official facts from unrevealed information. It currently includes confirmed information available through 5 August 2026 and labels unpublished task thresholds, the task list, later relic tier assignments, and remaining daily reveals as pending.

## Run it

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Updating for future reveals

League content lives in [`src/data/equilibrium.js`](src/data/equilibrium.js). UI and saved plans refer to stable IDs, so new relic names, task thresholds, passive details, or source links can be added there without invalidating a player's build.

When updating the dataset:

1. Prefer the official RuneScape overview/reveal hub and the RuneScape Wiki.
2. Advance `DATA_VERSION` using `YYYY-MM-DD.description`.
3. Keep unpublished values explicitly labelled `TBC`; do not reuse Catalyst thresholds.
4. Add new official sources to `sources` and preserve stable IDs for existing regions/relics.
5. Run `npm run build` before shipping.

Exports include both the plan schema and `DATA_VERSION`, making it possible to identify plans created against older information. Plans autosave in the browser and can also be shared by URL or exported as JSON.

## Current primary sources

- [Official Equilibrium overview](https://secure.runescape.com/m=news/countdown-to-leagues-ii-equilibrium)
- [Official daily reveal hub and FAQ](https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th)
- [Official Reveal 9: Blessing tiers IV–VI and God Tier II](https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th#latest)
- [Official Reveal 8: Naragi Edict, Production Master and Antiquarian](https://www.youtube.com/watch?v=IHcGKOB70E0)

This is a fan planning tool and is not affiliated with Jagex.
