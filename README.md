# Design System

A platform-neutral design system foundation for sharing visual decisions across apps and tools. This package provides reusable tokens and simple utility styles that consumer applications can adopt without locking into a single framework.

## What is included

### Primitive tokens
These are the raw design values that form the base of the system.

- color ramps for neutral, blue, green, red, yellow, and purple
- spacing values for gaps, padding, and margins
- typography values for font families, sizes, weights, and line heights
- radius values for controls, cards, overlays, and pills

Primitive tokens are the underlying source values from which higher-level decisions are built.

### Semantic tokens
These are the role-based values apps should consume for common UI concepts.

Examples include:
- light and dark color roles for actions, surfaces, text, borders, and status colors
- interaction-state colors for hover, pressed, disabled, selected, and invalid controls
- spacing scales for layout and component spacing
- typography scales for standard text treatments
- radius values for common UI surfaces

This layer is designed to make app styling more consistent and easier to reason about.

### CSS variables and shared utility classes
The package also ships CSS custom properties and shared utility classes so apps can consume the design system directly in CSS.

- `@robanderson513/tokens/css` exposes CSS custom properties such as `--color-primary` and `--spacing-gap-default`, along with the base `html` and `body` foundation styles to establish typography, color inheritance, and text rendering
- `@robanderson513/tokens/common` exposes shared utility classes such as `.flex`, `.gap-default`, `.p-card`, `.font-heading`, `.text-body`, `.rounded-card`, `.border`, and `.text-center`
- Setting `data-theme="dark"` on an element switches its semantic color and focus-ring variables to dark values; the default is light
- Opt-in `.focus-ring` and `.state-*` utilities provide `:focus-visible` and common interaction-state styles

These utilities are meant to provide a lightweight baseline for layout, spacing, typography, and primitive surface styling while still allowing apps to layer in their own styling.

## Package structure

- `tokens/primitives/*` contains the low-level source values
- `tokens/semantic/*` contains the role-based token layer used by apps
- `dist/index.js` exports the JavaScript token object for consuming apps
- `dist/tokens.css` exports the CSS custom property set
- `dist/common.css` exports shared layout and typography utility classes
- `preview.html` provides a visual preview of the token values

## Installation

Configure npm to use the GitHub Packages registry for this package, then install it:

```sh
npm install @robanderson513/tokens
```

## Usage

### JavaScript usage

```js
const tokens = require('@robanderson513/tokens');

const primary = tokens.color.primary;
const primaryActionHover = tokens.color.action.primary.hover;
const successText = tokens.color.status.success.foreground;
const surface = tokens.color.surface.default;
const gap = tokens.spacing.gap.default;
const bodySize = tokens.typography.fontSize.body;
```

### CSS usage

```css
@import '@robanderson513/tokens/css';

.card {
  background: var(--color-surface-default);
  color: var(--color-text-primary);
  padding: var(--spacing-padding-card);
  border-radius: var(--radius-card);
}
```

For dark mode, add `data-theme="dark"` to the document or a containing element. The existing semantic variables (for example `--color-surface-default`) then resolve to dark values. State utilities use semantic state tokens and ARIA/native disabled attributes:

```html
<button class="focus-ring state-hover state-pressed" type="button">Action</button>
<button class="focus-ring state-disabled" type="button" disabled>Unavailable</button>
<div class="state-selected" aria-selected="true">Selected item</div>
<input class="focus-ring state-invalid" aria-invalid="true">
```

`.focus-ring` adds a visible outline only for keyboard or other `:focus-visible` interaction. Consumers remain responsible for correct semantics, accessible names, and testing color contrast in their specific UI.

### Shared utility classes

```html
<div class="flex gap-default items-center p-card">
  <span class="text-body font-weight-strong">Example</span>
</div>
```

## Previewing the tokens

Serve the repository root with a local HTTP server and open `preview.html` in the browser.

```sh
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/preview.html
```

## Design guidance

This package is a foundation for consistent application styling. The values are intended to provide a shared palette, spacing scale, and typography system that apps can build on.

Use the tokens as a starting point, then validate the final combinations in the context of each product. Accessibility depends on the specific UI combinations in the consuming application, so contrast, readability, and interaction states should be checked where the design is used.

## Goals

This library is meant to:
- centralize shared design decisions
- keep app styling consistent across surfaces
- reduce duplication of color and spacing values
- make token-based design easier to evolve over time
