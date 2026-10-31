# Colors

The color system has primitive ramps and semantic roles. Use semantic roles in application UI so the active theme and palette can supply the actual values.

- `tokens/primitives/colors.json` is the source of truth for primitive color ramps.
- `tokens/semantic/colors.json` maps semantic roles such as text, surfaces, borders, actions, and interaction states to primitives.
- `dist/tokens.css` and `dist/index.js` expose the shipped CSS variables and CommonJS token object to consumers.

View the [color palette preview](preview.html) to inspect primitive ramps and resolved semantic roles for each palette and appearance. Color tokens have their own preview; component previews focus on the constructed UI elements.
