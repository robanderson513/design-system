const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const tokens = require(path.join(root, 'dist/index.js'));
const colors = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/colors.json'), 'utf8'));
const radii = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/radius.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/spacing.json'), 'utf8'));
const primitives = JSON.parse(fs.readFileSync(path.join(root, 'tokens/primitives/colors.json'), 'utf8'));
const radiusPrimitives = JSON.parse(fs.readFileSync(path.join(root, 'tokens/primitives/radii.json'), 'utf8'));
const primitiveShadows = JSON.parse(fs.readFileSync(path.join(root, 'tokens/primitives/shadows.json'), 'utf8'));
const semanticShadows = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/shadows.json'), 'utf8'));
const accessibility = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/accessibility.json'), 'utf8'));
const css = fs.readFileSync(path.join(root, 'dist/tokens.css'), 'utf8');
const commonCss = fs.readFileSync(path.join(root, 'dist/common.css'), 'utf8');

const resolveReference = (reference, seen = new Set()) => {
  const path = reference.slice(1, -1);
  assert.ok(!seen.has(path), `Circular token reference: ${path}`);
  seen.add(path);
  const keys = path.split('.');
  let token;
  for (const source of [colors, primitives]) {
    token = keys.reduce((current, key) => current && current[key], source);
    if (token) break;
  }
  assert.ok(token && Object.hasOwn(token, '$value'), `Unresolved token reference: ${reference}`);
  const value = token.$value;
  return typeof value === 'string' && value.startsWith('{')
    ? resolveReference(value, seen)
    : value;
};

const contrastRatio = (foreground, background) => {
  const luminance = (hex) => {
    const channels = hex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255)
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

const resolveTree = (token) => {
  if (Object.hasOwn(token, '$value')) {
    return typeof token.$value === 'string' && token.$value.startsWith('{')
      ? resolveReference(token.$value)
      : token.$value;
  }
  return Object.fromEntries(Object.entries(token).map(([key, value]) => [key, resolveTree(value)]));
};

test('earth palette primitive ramps contain all requested shades', () => {
  const expected = {
    sage: ['#F2F5F0', '#E5EBE1', '#CCD9C8', '#B0C3AB', '#91A98D', '#78947A', '#617B63', '#4D674F', '#3B503D', '#2B3B2D', '#1B291D'],
    terracotta: ['#FBF3EF', '#F5E5DC', '#EACDBD', '#DDB09A', '#D29477', '#C77F61', '#AE694D', '#92563F', '#754432', '#573326', '#3B241B'],
    harvest: ['#FAF7EC', '#F3EDD7', '#E9DDB6', '#DDCB91', '#D5BC7B', '#C8AC62', '#A98E4D', '#89723D', '#6B5831', '#504226', '#342B1A'],
    stone: ['#FAF9F5', '#F2F0E9', '#E6E3D9', '#D5D1C5', '#BEB9AA', '#A29D8F', '#827D70', '#656156', '#48463F', '#30312C', '#1C1D19'],
    clay: ['#F7EDE6', '#F0E1D6', '#E5CFC0', '#D5B6A3', '#C19B83', '#A47C65', '#87644F', '#694D3F', '#49372F', '#302620', '#1D1713']
  };
  for (const [family, values] of Object.entries(expected)) {
    assert.deepEqual(Object.keys(primitives.color[family]), ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']);
    assert.deepEqual(Object.values(primitives.color[family]).map((token) => token.$value), values);
  }
});

test('semantic color references resolve and earth palette overrides are sparse', () => {
  const visit = (token) => {
    if (!token || typeof token !== 'object') return;
    if (Object.hasOwn(token, '$value')) {
      if (typeof token.$value === 'string' && token.$value.startsWith('{')) resolveReference(token.$value);
      return;
    }
    Object.values(token).forEach(visit);
  };
  visit(colors);
  for (const appearance of ['light', 'dark']) {
    const earth = colors.color.palette.earth[appearance];
    assert.equal(earth.status, undefined);
    assert.ok(earth.primary.$value);
    assert.ok(earth.action.primary.text.$value);
    assert.ok(colors.color.theme[appearance].action.primary.text.$value);
  }
});

test('semantic colors define light and dark theme state tokens', () => {
  for (const theme of ['light', 'dark']) {
    assert.ok(colors.color.theme[theme].primary.$value);
    assert.ok(colors.color.theme[theme].surface.default.$value);
    for (const state of ['hover', 'pressed', 'disabled', 'selected', 'invalid']) {
      assert.ok(colors.color.theme[theme].state[state].foreground.$value);
      assert.ok(colors.color.theme[theme].state[state].surface.$value);
      assert.ok(colors.color.theme[theme].state[state].border.$value);
    }
  }
});

test('CommonJS exports themes and accessibility focus tokens compatibly', () => {
  assert.equal(tokens.color.primary, tokens.color.theme.light.action.primary.default);
  assert.notEqual(tokens.color.theme.light.primary, tokens.color.theme.dark.primary);
  assert.equal(tokens.color.surface.default, tokens.color.theme.light.surface.default);
  assert.notEqual(tokens.color.theme.light.surface.default, tokens.color.theme.dark.surface.default);
  assert.equal(tokens.accessibility.focus.ring.width, accessibility.accessibility.focus.ring.width.$value);
  assert.equal(tokens.accessibility.focus.ring.color.dark, '#75adff');
  assert.equal(tokens.color.palette.earth.light.primary, '#78947A');
  assert.equal(tokens.color.palette.earth.light.surface.default, '#F7EDE6');
  assert.equal(tokens.color.palette.earth.light.text.primary, '#302620');
  assert.equal(tokens.color.palette.earth.dark.surface.default, '#1D1713');
  assert.equal(tokens.color.palette.earth.light.action.primary.text, '#fafafa');
});

test('earth palette semantic values match CommonJS exports and CSS variables', () => {
  for (const appearance of ['light', 'dark']) {
    const source = colors.color.palette.earth[appearance];
    assert.deepEqual(tokens.color.palette.earth[appearance], resolveTree(source));
    const checkCss = (token, path = []) => {
      if (Object.hasOwn(token, '$value')) {
        const property = `--color-palette-earth-${appearance}-${path.join('-')}`;
        assert.ok(css.includes(`${property}: ${resolveReference(token.$value)};`), `Missing or stale ${property}`);
        return;
      }
      for (const [key, value] of Object.entries(token)) checkCss(value, [...path, key]);
    };
    checkCss(source);
  }
});

test('earth neutral button hover and pressed states use warm neutral tokens', () => {
  const states = tokens.color.palette.earth.light.state;
  assert.equal(states.hover.foreground, '#302620');
  assert.equal(states.hover.surface, '#F0E1D6');
  assert.equal(states.hover.border, '#E5CFC0');
  assert.equal(states.pressed.foreground, '#302620');
  assert.equal(states.pressed.surface, '#E5CFC0');
  assert.equal(states.pressed.border, '#D5B6A3');
  assert.match(commonCss, /\.button\s*\{[^}]*background: var\(--color-surface-default\);/s);
});

test('tonal and neutral text button roles resolve across all themes', () => {
  const themes = [
    colors.color.theme.light,
    colors.color.theme.dark,
    colors.color.palette.earth.light,
    colors.color.palette.earth.dark
  ];
  const exports = [
    tokens.color.theme.light,
    tokens.color.theme.dark,
    tokens.color.palette.earth.light,
    tokens.color.palette.earth.dark
  ];
  for (let index = 0; index < themes.length; index += 1) {
    const theme = themes[index];
    const exported = exports[index];
    const tonalForeground = resolveReference(theme.action.tonal.text.$value);
    for (const state of ['container', 'hover', 'pressed']) {
      const tonalBackground = resolveReference(theme.action.tonal[state].$value);
      assert.equal(exported.action.tonal[state], tonalBackground);
      assert.ok(contrastRatio(tonalForeground, tonalBackground) >= 4.5, `${state} tonal contrast`);
    }
    assert.equal(exported.action.tonal.text, tonalForeground);
    assert.ok(contrastRatio(exported.text.primary, exported.surface.default) >= 4.5);
    assert.ok(contrastRatio(exported.action.primary.default, exported.surface.default) >= 4.5);
  }
  assert.match(commonCss, /\.button-tonal\s*\{[^}]*background: var\(--color-action-tonal-container\);[^}]*color: var\(--color-action-tonal-text\);/s);
  assert.match(commonCss, /\.button-tonal:hover[^}]*background: var\(--color-action-tonal-hover\);/);
  assert.match(commonCss, /\.button-tonal:active[^}]*background: var\(--color-action-tonal-pressed\);/);
  assert.match(commonCss, /\.button-text-neutral\s*\{[^}]*color: var\(--color-text-primary\);/s);
  for (const token of ['--color-action-tonal-container:', '--color-action-tonal-hover:', '--color-action-tonal-pressed:', '--color-action-tonal-text:']) {
    assert.ok(css.includes(token), `Expected CSS custom property ${token}`);
  }
});

test('earth palette action text and body text meet WCAG AA contrast in both appearances', () => {
  for (const appearance of ['light', 'dark']) {
    const theme = tokens.color.palette.earth[appearance];
    assert.ok(contrastRatio(theme.action.primary.text, theme.action.primary.default) >= 4.5);
    assert.ok(contrastRatio(theme.action.secondary.text, theme.action.secondary.default) >= 4.5);
    for (const role of ['primary', 'secondary', 'muted']) {
      assert.ok(contrastRatio(theme.text[role], theme.surface.default) >= 4.5, `${appearance} ${role} text contrast`);
    }
  }
});

test('CSS exports theme variables and opt-in accessible state utilities', () => {
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /\[data-palette="earth"\]/);
  assert.match(css, /--color-palette-earth-dark-surface-default:/);
  assert.match(css, /--color-action-primary-text:/);
  assert.match(css, /--color-theme-dark-state-invalid-surface:/);
  assert.match(css, /--focus-ring-color:/);
  for (const utility of ['.focus-ring:focus-visible', '.state-hover:hover', '.state-pressed:active', '.state-disabled:disabled', '.state-selected[aria-selected="true"]', '.state-invalid[aria-invalid="true"]']) {
    assert.ok(commonCss.includes(utility), `Expected CSS utility ${utility}`);
  }
});

test('button variants use theme-aware semantic tokens for their interaction states', () => {
  for (const selector of [
    '.button-primary:hover:not(:disabled):not([aria-disabled="true"])',
    '.button:hover:not(:disabled):not([aria-disabled="true"])',
    '.button:active:not(:disabled):not([aria-disabled="true"])',
    '.button-secondary:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-secondary:active:not(:disabled):not([aria-disabled="true"])',
    '.button-icon:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-text:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-text:active:not(:disabled):not([aria-disabled="true"])',
    '.button-tonal:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-tonal:active:not(:disabled):not([aria-disabled="true"])',
    '.button-elevated:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-elevated:active:not(:disabled):not([aria-disabled="true"])',
    '.button-text-neutral:hover:not(:disabled):not([aria-disabled="true"])',
    '.button-text-neutral:active:not(:disabled):not([aria-disabled="true"])'
  ]) {
    assert.ok(commonCss.includes(selector), `Expected button state selector ${selector}`);
  }
  for (const token of [
    'background: var(--color-action-primary-default);',
    'background: var(--color-action-primary-hover);',
    'color: var(--color-action-primary-text);',
    'background: var(--color-surface-default);',
    'color: var(--color-text-primary);',
    'border: 1px solid var(--color-border-default);',
    'background: var(--color-state-hover-surface);',
    'background: var(--color-state-pressed-surface);',
    'var(--color-state-disabled-surface)',
    'var(--focus-ring-color)',
    'color: var(--color-action-primary-default);',
    'background: var(--color-action-tonal-container);',
    'background: var(--color-action-tonal-hover);',
    'background: var(--color-action-tonal-pressed);',
    'color: var(--color-action-tonal-text);',
    'background: var(--color-surface-default);',
    'box-shadow: var(--shadow-sm);'
  ]) {
    assert.ok(commonCss.includes(token), `Expected button token usage ${token}`);
  }
  assert.match(commonCss, /\.button-icon > svg\s*\{\s*width: 20px;\s*height: 20px;/);
  for (const variant of ['.button-primary', '.button-tonal', '.button-elevated', '.button-secondary', '.button-text', '.button-text-neutral', '.button-icon']) {
    assert.ok(commonCss.includes(`${variant}:focus-visible`), `Expected focus style for ${variant}`);
    assert.ok(commonCss.includes(`${variant}:disabled`), `Expected disabled style for ${variant}`);
  }
});

test('buttons use the rounded control radius and keep disabled variants visually distinct', () => {
  assert.equal(radii.radius.control.$value, '{borderRadius.lg}');
  assert.equal(radiusPrimitives.borderRadius.lg.$value, '8px');
  assert.match(css, /--radius-control:\s*8px;/);
  assert.match(commonCss, /\.button,\s*\.button-primary,[\s\S]*?border-radius: var\(--radius-control\);/);

  const variants = [
    '.button',
    '.button-primary',
    '.button-secondary',
    '.button-icon',
    '.button-text',
    '.button-tonal',
    '.button-elevated',
    '.button-text-neutral'
  ];
  for (const variant of variants) {
    assert.ok(commonCss.includes(`${variant}:disabled`), `Expected native disabled style for ${variant}`);
    assert.ok(commonCss.includes(`${variant}[aria-disabled="true"]`), `Expected ARIA disabled style for ${variant}`);
  }
  assert.match(commonCss, /\.button-icon:disabled,[\s\S]*?background-color: transparent;/);
  assert.match(commonCss, /\.button-text:disabled,[\s\S]*?background-color: transparent;/);
  assert.match(commonCss, /\.button-text-neutral:disabled,[\s\S]*?background-color: transparent;/);
  assert.match(commonCss, /\.button-elevated:disabled,[\s\S]*?box-shadow: none;/);
});

test('numeric gap, padding, and margin utilities share the same spacing scale', () => {
  const expected = {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px'
  };
  for (const [step, value] of Object.entries(expected)) {
    assert.equal(spacing.spacing.scale[step].$value, `{spacing.${step}}`);
    assert.equal(tokens.spacing.scale[step], value);
    assert.ok(css.includes(`--spacing-scale-${step}: ${value};`));
    assert.ok(commonCss.includes(`.gap-${step}, .g-${step} { gap: var(--spacing-scale-${step}); }`));
    assert.ok(commonCss.includes(`.p-${step} { padding: var(--spacing-scale-${step}); }`));
    assert.ok(commonCss.includes(`.px-${step} { padding-left: var(--spacing-scale-${step}); padding-right: var(--spacing-scale-${step}); }`));
    assert.ok(commonCss.includes(`.m-${step} { margin: var(--spacing-scale-${step}); }`));
    for (const [utility, property] of [['mt', 'top'], ['mr', 'right'], ['mb', 'bottom'], ['ml', 'left']]) {
      assert.ok(commonCss.includes(`.${utility}-${step} { margin-${property}: var(--spacing-scale-${step}); }`));
    }
    assert.ok(commonCss.includes(`.mx-${step} { margin-left: var(--spacing-scale-${step}); margin-right: var(--spacing-scale-${step}); }`));
    assert.ok(commonCss.includes(`.my-${step} { margin-top: var(--spacing-scale-${step}); margin-bottom: var(--spacing-scale-${step}); }`));
  }
  assert.deepEqual(Object.keys(spacing.spacing).filter((key) => key !== '$type'), ['scale']);
  assert.deepEqual(Object.keys(tokens.spacing), ['scale']);
  assert.doesNotMatch(css, /--spacing-(?:gap|padding|margin)-/);
  assert.doesNotMatch(commonCss, /\.(?:gap|g|p|pt|pr|pb|pl|px|py|m|mt|mr|mb|ml|mx|my)-(?:tight|compact|default|relaxed|section|control|card|element|page)\b/);
});

test('shadow tokens resolve through CSS utilities and CommonJS exports', () => {
  const expected = {
    sm: '0 1px 2px 0 rgba(23, 23, 23, 0.08)',
    md: '0 4px 12px 0 rgba(23, 23, 23, 0.12)',
    lg: '0 12px 24px 0 rgba(23, 23, 23, 0.16)'
  };
  for (const [size, value] of Object.entries(expected)) {
    assert.equal(semanticShadows.shadow[size].$value, `{shadow.${size}}`);
    assert.deepEqual(primitiveShadows.shadow[size].$value, {
      color: `rgba(23, 23, 23, ${size === 'sm' ? '0.08' : size === 'md' ? '0.12' : '0.16'})`,
      offsetX: '0px',
      offsetY: size === 'sm' ? '1px' : size === 'md' ? '4px' : '12px',
      blur: size === 'sm' ? '2px' : size === 'md' ? '12px' : '24px',
      spread: '0px'
    });
    assert.equal(tokens.shadow[size], value);
    assert.ok(css.includes(`--shadow-${size}: ${value};`), `Expected CSS token --shadow-${size}`);
    assert.match(commonCss, new RegExp(`\\.shadow-${size}\\s*\\{\\s*box-shadow: var\\(--shadow-${size}\\);\\s*\\}`));
  }
});

test('CSS provides base foundation styles and reusable primitive utilities', () => {
  for (const rule of [
    'box-sizing: border-box;',
    'font-family: var(--typography-font-family-body);',
    'line-height: var(--typography-line-height-body);',
    'color: var(--color-text-primary);',
    'text-rendering: optimizeLegibility;'
  ]) {
    assert.ok(css.includes(rule), `Expected foundation rule ${rule}`);
  }
  for (const utility of [
    '.flex {',
    '.gap-4',
    '.p-6',
    '.m-4',
    '.mt-4',
    '.mx-4',
    '.my-4',
    '.text-center',
    '.border {',
    '.rounded-card',
    '.shadow-md',
    '.hidden {',
    '.invisible {'
  ]) {
    assert.ok(commonCss.includes(utility), `Expected common utility ${utility}`);
  }
});
