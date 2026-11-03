# Forms

This section documents accessible form patterns built from native HTML controls and the design system's semantic tokens. See the [form preview](preview.html) for a visual example across the default and earth themes.

The package does not currently ship dedicated form-control component classes. The styles in the preview and examples are consumer-authored recipes using public CSS variables and shared utilities; they are not package APIs. Prefer native controls and use your application's component layer for reusable form styles.

## Field structure

Use the native element that matches the data being collected. Give every control a visible, programmatically associated label, and connect optional help or validation text with `aria-describedby`:

```html
<div class="field">
  <label for="email">Email address <span>(required)</span></label>
  <p id="email-hint">We'll use this for account updates.</p>
  <input
    class="form-control focus-ring"
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    required
    aria-describedby="email-hint">
</div>
```

The `.form-control` class above is defined by the consumer, not by this package. A token-based starting point is:

```css
.form-control {
  width: 100%;
  min-height: 40px;
  padding: var(--spacing-scale-2) var(--spacing-scale-3);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-control);
  background: var(--color-surface-default);
  color: var(--color-text-primary);
  font: inherit;
}

.form-control:hover:not(:disabled):not([type="checkbox"]):not([type="radio"]):not([aria-invalid="true"]) {
  border-color: var(--color-border-strong);
}

.form-control:disabled {
  color: var(--color-state-disabled-foreground);
  background: var(--color-state-disabled-surface);
  border-color: var(--color-state-disabled-border);
}
```

Load the package's CSS entry points to use its tokens and shared focus utility:

```css
@import '@robanderson513/design-system/css';
@import '@robanderson513/design-system/common';
```

Use `type="email"`, `type="number"`, `type="date"`, and other input types where their native behavior is appropriate. For related choices, use a `<fieldset>` with a `<legend>` and native checkbox or radio controls. Keep the target large enough to interact with comfortably and associate a clickable label with each choice.

## Validation and states

- Identify required fields in text as well as with the native `required` attribute. Do not rely on color or an asterisk alone to communicate requirements.
- Use native constraint validation where it fits the product's needs. If custom validation is used, explain what is wrong in text, associate that message with the control, and set `aria-invalid="true"` while the error is present.
- Use `.state-invalid[aria-invalid="true"]` for the shared invalid treatment. Pair it with a textual message, for example `<p id="email-error">Enter a valid email address.</p>`, and include both help and error IDs in `aria-describedby` when both apply.
- On hover, change the border of enabled, non-invalid text fields and selects using `--color-border-strong`; keep the surface unchanged so hover does not compete with validation feedback. This role stays visibly distinct from the default border across the supported themes.
- Use native `disabled` only when a control cannot currently be used. Prefer `readonly` when a value should remain focusable and readable but not editable.
- Keep keyboard focus visible with `.focus-ring` or an equally visible application focus style. The utility applies its outline on `:focus-visible`.
- On submission, preserve entered values when validation fails and move focus or announce errors so users can find and correct them.

Use semantic roles rather than hard-coded palette colors for control borders, surfaces, text, disabled appearance, invalid states, and focus. This lets `data-theme` and `data-palette` update the same form styles. Check contrast and native-control rendering in each supported browser, theme, and palette.

## References

- [Material Design 3 text fields](https://m3.material.io/components/text-fields/guidelines)
- [Material Design 3 selection controls](https://m3.material.io/components/checkbox/guidelines)
- [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [WAI Form Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
