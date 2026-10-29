# Design tokens

A platform-neutral design-token library for sharing design decisions across apps and tools. Tokens use the W3C Design Tokens Community Group (DTCG) JSON format.

## What's inside

- **Color primitives:** named color ramps for foundational UI values.
- **Utility primitives:** spacing, font families, font sizes, font weights, line heights, and border radii.
- **Package entry point:** a CommonJS export for JavaScript consumers, plus direct JSON exports for tools that read DTCG tokens.
- **Color preview:** [`preview.html`](preview.html) displays the available ramps from the source JSON.

Primitive tokens are building blocks, not semantic role assignments or accessibility guarantees. Choose color pairs for their intended context and do not rely on color alone to convey meaning.

## Using the tokens

Configure npm to use the GitHub Packages registry for this package, then install it:

```sh
npm install @robanderson513/tokens
```

In CommonJS, access token values through the package entry point:

```js
const tokens = require('@robanderson513/tokens');

const blue = tokens.color.blue['600'].$value;
const gap = tokens.spacing['4'].$value;
const bodySize = tokens.fontSize.base.$value;
```

Tools that consume DTCG JSON can use exports such as `@robanderson513/tokens/primitives/colors` and `@robanderson513/tokens/primitives/typography`.

## Previewing the palette

Serve the repository root with a local HTTP server and open `preview.html`. The page loads the token JSON directly, so opening it as a `file://` URL may prevent the palette from loading.
