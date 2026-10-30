const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const tokens = require(path.join(root, 'dist/index.js'));
const colors = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/colors.json'), 'utf8'));
const primitives = JSON.parse(fs.readFileSync(path.join(root, 'tokens/primitives/colors.json'), 'utf8'));
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
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2);
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

test('recipe primitive ramps contain all requested shades', () => {
  const expected = {
    sage: ['#F2F5F0', '#E5EBE1', '#CCD9C8', '#B0C3AB', '#91A98D', '#78947A', '#617B63', '#4D674F', '#3B503D', '#2B3B2D', '#1B291D'],
    terracotta: ['#FBF3EF', '#F5E5DC', '#EACDBD', '#DDB09A', '#D29477', '#C77F61', '#AE694D', '#92563F', '#754432', '#573326', '#3B241B'],
    harvest: ['#FAF7EC', '#F3EDD7', '#E9DDB6', '#DDCB91', '#D5BC7B', '#C8AC62', '#A98E4D', '#89723D', '#6B5831', '#504226', '#342B1A'],
    stone: ['#FAF9F5', '#F2F0E9', '#E6E3D9', '#D5D1C5', '#BEB9AA', '#A29D8F', '#827D70', '#656156', '#48463F', '#30312C', '#1C1D19']
  };
  for (const [family, values] of Object.entries(expected)) {
    assert.deepEqual(Object.keys(primitives.color[family]), ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']);
    assert.deepEqual(Object.values(primitives.color[family]).map((token) => token.$value), values);
  }
});

test('semantic color references resolve and recipe overrides are sparse', () => {
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
    const recipe = colors.color.brand.recipe[appearance];
    assert.equal(recipe.status, undefined);
    assert.ok(recipe.primary.$value);
    assert.ok(recipe.action.primary.text.$value);
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
  assert.equal(tokens.color.brand.recipe.light.primary, '#78947A');
  assert.equal(tokens.color.brand.recipe.dark.surface.default, '#1C1D19');
  assert.equal(tokens.color.brand.recipe.light.action.primary.text, '#fafafa');
});

test('recipe semantic values match CommonJS exports and CSS variables', () => {
  for (const appearance of ['light', 'dark']) {
    const source = colors.color.brand.recipe[appearance];
    assert.deepEqual(tokens.color.brand.recipe[appearance], resolveTree(source));
    const checkCss = (token, path = []) => {
      if (Object.hasOwn(token, '$value')) {
        const property = `--color-theme-recipe-${appearance}-${path.join('-')}`;
        assert.ok(css.includes(`${property}: ${resolveReference(token.$value)};`), `Missing or stale ${property}`);
        return;
      }
      for (const [key, value] of Object.entries(token)) checkCss(value, [...path, key]);
    };
    checkCss(source);
  }
});

test('recipe action text and body text meet WCAG AA contrast in both appearances', () => {
  for (const appearance of ['light', 'dark']) {
    const theme = tokens.color.brand.recipe[appearance];
    assert.ok(contrastRatio(theme.action.primary.text, theme.action.primary.default) >= 4.5);
    assert.ok(contrastRatio(theme.action.secondary.text, theme.action.secondary.default) >= 4.5);
    for (const role of ['primary', 'secondary', 'muted']) {
      assert.ok(contrastRatio(theme.text[role], theme.surface.default) >= 4.5, `${appearance} ${role} text contrast`);
    }
  }
});

test('CSS exports theme variables and opt-in accessible state utilities', () => {
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /\[data-brand="recipe"\]/);
  assert.match(css, /--color-theme-recipe-dark-surface-default:/);
  assert.match(css, /--color-action-primary-text:/);
  assert.match(css, /--color-theme-dark-state-invalid-surface:/);
  assert.match(css, /--focus-ring-color:/);
  for (const utility of ['.focus-ring:focus-visible', '.state-hover:hover', '.state-pressed:active', '.state-disabled:disabled', '.state-selected[aria-selected="true"]', '.state-invalid[aria-invalid="true"]']) {
    assert.ok(commonCss.includes(utility), `Expected CSS utility ${utility}`);
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
    '.gap-default',
    '.p-card',
    '.m-element',
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
