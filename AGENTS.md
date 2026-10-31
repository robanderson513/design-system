# Design system guide for consuming agents

Use this guide when implementing UI with `@robanderson513/design-system`. Prefer the shipped semantic tokens and shared component styles over hard-coded colors, spacing, typography, or button states.

## Package entry points

- `@robanderson513/design-system`: CommonJS token object from `dist/index.js`
- `@robanderson513/design-system/css`: CSS variables and base document styles from `dist/tokens.css`
- `@robanderson513/design-system/common`: shared utility and button styles from `dist/common.css`

Install the package from GitHub Packages:

```sh
npm install @robanderson513/design-system
```

Import both CSS entry points when using shared styles:

```css
@import '@robanderson513/design-system/css';
@import '@robanderson513/design-system/common';
```

Set `data-theme="dark"` for dark appearance. Set `data-palette="earth"` to use the earth palette, independently of appearance:

```html
<html data-palette="earth" data-theme="dark">
```

For JavaScript consumers, require the package and read its semantic token object:

```js
const tokens = require('@robanderson513/design-system');
const surface = tokens.color.surface.default;
const primaryAction = tokens.color.action.primary;
```

## Documentation and source of truth

- [Documentation index](docs/README.md) organizes information by UI element or token topic.
- [Colors](docs/components/colors/README.md) covers the palette and token roles; its [palette preview](docs/components/colors/preview.html) shows primitive ramps and resolved semantic colors.
- [Buttons](docs/components/buttons/README.md) documents button selection, theme-token behavior, interaction states, and accessibility; its [preview](docs/components/buttons/preview.html) shows the constructed buttons. This preview focuses on component examples; palette swatches are in the separate Colors section.
- `tokens/primitives/` contains primitive values; `tokens/semantic/` contains the role-based token definitions.
- `dist/` contains the shipped package entry points. There is no documented token generation command, so do not assume generated files can be rebuilt.

When a needed role or component is not documented, inspect the semantic tokens and shipped CSS rather than inventing a value. Keep theme-specific decisions in semantic token mappings so consumer styles remain palette-independent.
