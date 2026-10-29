# Design System

A platform-neutral design system foundation for sharing design decisions across apps and tools. DTCG primitive tokens back a semantic API for consuming apps.

## What's inside

- **Semantic tokens:** color roles, layout spacing, typography, and border radii, backed by internal primitives.
- **Package entry point:** resolved semantic values for JavaScript consumers and a CSS custom-property export.
- **Color preview:** [`preview.html`](preview.html) displays semantic color roles from the source JSON.

Primitive tokens are internal building blocks, not part of the public package API. Semantic color assignments are not accessibility guarantees; choose color pairs for their intended context and do not rely on color alone to convey meaning.

## Using the tokens

Configure npm to use the GitHub Packages registry for this package, then install it:

```sh
npm install @robanderson513/tokens
```

In CommonJS, access semantic values through the package entry point:

```js
const tokens = require('@robanderson513/tokens');

const primary = tokens.color.primary;
const primaryActionHover = tokens.color.action.primary.hover;
const successText = tokens.color.status.success.foreground;
const surface = tokens.color.surface.default;
const gap = tokens.spacing.gap.default;
const bodySize = tokens.typography.fontSize.body;
```

Token groups use nested lowercase names, so state and intent can grow without camelCase compound keys; for example, `color.action.primary.hover` maps to `--color-action-primary-hover`. CSS consumers can import `@robanderson513/tokens/css` to use the semantic custom properties, and `@robanderson513/tokens/common` for reusable layout and typography utility classes.
## Previewing the palette

Serve the repository root with a local HTTP server and open `preview.html`. The page loads the semantic and primitive source JSON directly, so opening it as a `file://` URL may prevent the preview from loading.
