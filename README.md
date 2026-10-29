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
- color roles such as primary actions, surfaces, text, borders, and status colors
- spacing scales for layout and component spacing
- typography scales for standard text treatments
- radius values for common UI surfaces

This layer is designed to make app styling more consistent and easier to reason about.

### CSS variables and shared utility classes
The package also ships generated CSS output so apps can consume the design system directly in CSS.

- `@robanderson513/tokens/css` exposes CSS custom properties such as `--color-primary` and `--spacing-gap-default`
- `@robanderson513/tokens/common` exposes shared utility classes such as `.flex`, `.gap-default`, `.p-card`, `.font-heading`, and `.text-body`

These utilities are meant to provide a lightweight baseline for layout and typography, while still allowing apps to layer in their own styling.

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
.card {
  background: var(--color-surface-default);
  color: var(--color-text-primary);
  padding: var(--spacing-padding-card);
  border-radius: var(--radius-card);
}
```

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
