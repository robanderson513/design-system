const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const tokens = require(path.join(root, 'dist/index.js'));
const colors = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/colors.json'), 'utf8'));
const accessibility = JSON.parse(fs.readFileSync(path.join(root, 'tokens/semantic/accessibility.json'), 'utf8'));
const css = fs.readFileSync(path.join(root, 'dist/tokens.css'), 'utf8');
const commonCss = fs.readFileSync(path.join(root, 'dist/common.css'), 'utf8');

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
});

test('CSS exports theme variables and opt-in accessible state utilities', () => {
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /--color-theme-dark-state-invalid-surface:/);
  assert.match(css, /--focus-ring-color:/);
  for (const utility of ['.focus-ring:focus-visible', '.state-hover:hover', '.state-pressed:active', '.state-disabled:disabled', '.state-selected[aria-selected="true"]', '.state-invalid[aria-invalid="true"]']) {
    assert.ok(commonCss.includes(utility), `Expected CSS utility ${utility}`);
  }
});
