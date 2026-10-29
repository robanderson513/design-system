# Design tokens

A platform-neutral design-token library for sharing design decisions across apps and tools. Tokens use the W3C Design Tokens Community Group (DTCG) JSON format.

## What's inside

- **Color primitives:** neutral, blue, green, red, yellow, and purple ramps, each with steps from `50` to `950`. These are foundational values, not role-specific choices or contrast guarantees.
- **Package entry point:** a CommonJS export for JavaScript consumers, plus a direct JSON export for tools that read DTCG tokens.
- **Color preview:** [`preview.html`](preview.html) displays the available ramps from the source JSON.

The source of truth for colors is [`tokens/primitives/colors.json`](tokens/primitives/colors.json). Semantic tokens for roles such as text, surfaces, links, and focus are not defined yet.

## Using the tokens

Configure npm to use the GitHub Packages registry for this package, then install it:

```sh
npm install @robanderson513/tokens
```

In CommonJS, access a color value like this:

```js
const tokens = require('@robanderson513/tokens');

const blue = tokens.color.blue['600'].$value;
```

Tools that consume DTCG JSON can use the `@robanderson513/tokens/primitives/colors` package export.

## Previewing the palette

Serve the repository root with a local HTTP server and open `preview.html`. The page loads the token JSON directly, so opening it as a `file://` URL may prevent the palette from loading.

## Accessibility

Primitive colors do not guarantee accessible combinations. Check foreground and background pairs in their intended context against applicable contrast guidance, and do not rely on color alone to convey meaning.
