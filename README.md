# Design tokens

A platform-neutral source of design tokens, starting with color primitives that can be shared by apps and design tools. Token source files use the W3C Design Tokens Community Group format.

## Color primitives

The initial palette contains six named ramps—neutral, blue, green, red, yellow, and purple—with steps `50` through `950`. Lighter steps are generally tints and darker steps are generally shades; the numbers are scale labels, not guaranteed contrast levels. The ramps do not include pure white or pure black.

The source of truth is [`tokens/primitives/colors.json`](tokens/primitives/colors.json). The CommonJS package entry point exposes these values in JavaScript. For compatibility, `color.primary` remains an alias for `color.blue.600`; new code should refer to a named primitive instead.

## Using the package

```js
const tokens = require('@robanderson513/tokens');

const blue = tokens.color.blue['600'].$value;
const neutral = tokens.color.neutral['50'].$value;
```

Tools that consume DTCG JSON can import the source file directly:

```js
import colors from '@robanderson513/tokens/primitives/colors' with { type: 'json' };
```

## Preview

[`preview.html`](preview.html) displays every color ramp and its hex values, reading directly from the token JSON. Serve the repository root over a local HTTP server and open `preview.html`; opening it directly as a `file://` URL may prevent the browser from loading the JSON.

## Accessibility

Primitive colors are not accessibility guarantees by themselves. Check foreground and background colors as pairs in their intended context. WCAG AA contrast guidance calls for at least `4.5:1` for normal text and `3:1` for large text; meaningful non-text UI indicators generally need `3:1` against adjacent colors. Do not rely on color alone to communicate meaning.

For example, blue `500` (`#1474df`) has a contrast ratio of `4.38:1` on neutral `50` (`#fafafa`), just below the normal-text AA threshold; blue `600` (`#0066cc`) is `5.33:1` on that background. These are example pair checks, not a complete accessibility certification of the palette.

Semantic tokens for roles such as text, surfaces, links, and focus indicators can be introduced as a separate layer and checked against their intended pairings.
