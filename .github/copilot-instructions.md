# Repository workflow

For every task in this repository:

1. Read the relevant source, consumers, and documentation before editing. Check the current diff and keep unrelated work untouched.
2. Identify the source of truth and all affected surfaces before making the smallest coherent change. Preserve existing package behavior and compatibility unless the task explicitly changes it.
3. Keep the README as a concise, high-level guide to the current design system and how to use it. Update it only when a change affects that overview or usage; do not turn it into a PR changelog or list exhaustive token values. Describe shipped behavior, distinguish it from planned work, and keep it consistent with the final PR changes.
4. For every ticket that changes the app, create or update `audits/<ticket-id>.md` to record the ticket's PR changes: include the ticket and PR references when available, a concise description of what shipped, the main implementation details and affected files, and the checks run (including checks that could not be run). Keep it factual and scoped to that change; do not attribute unrelated baseline history to the ticket. Update the ticket's existing audit file rather than creating a duplicate.
5. Run the narrowest applicable checks available in the repository. This repository currently has no package scripts or test suite: do not claim tests ran when they did not. For token JSON changes, parse the JSON; for package-facing changes, verify the CommonJS entry point with Node.js. State any validation that could not be run.
6. Review the final diff for correctness, unintended changes, and consistency across affected files. Do not commit or publish unless asked.

## Repository-specific guidance

- `tokens/primitives/colors.json` is the source of truth for the DTCG color tokens.
- `dist/index.js` is the CommonJS package entry point. It exposes the token data and preserves `color.primary` as an alias for `color.blue.600`; retain that compatibility behavior unless explicitly asked to change it.
- `preview.html` reads the token JSON directly, so keep the preview consistent with token changes.
- There is no documented build or generation command. Do not assume files in `dist` can be regenerated; inspect their role and update only what the change requires.
