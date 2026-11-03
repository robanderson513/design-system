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

## Repeatable sections

For a list of values, group the controls in a `<fieldset>`, give each input its own visible label, and use the same array-style `name` for every row. Use buttons with explicit `type="button"` so adding or removing a row does not submit the form:

```html
<fieldset class="repeatable-list" data-repeatable-list data-id-prefix="items">
  <legend>Items</legend>
  <div class="repeatable-rows" data-repeatable-rows>
    <div class="repeatable-row" data-repeatable-row>
      <div class="field">
        <div class="repeatable-field-header">
          <label for="item-1">Item 1</label>
          <button class="button-text-neutral" type="button" data-remove-row aria-label="Remove item 1">Remove</button>
        </div>
        <input class="form-control focus-ring" id="item-1" name="items[]" type="text">
      </div>
    </div>
  </div>
  <template data-row-template>
    <div class="repeatable-row" data-repeatable-row>
      <div class="field">
        <div class="repeatable-field-header">
          <label>Item</label>
          <button class="button-text-neutral" type="button" data-remove-row>Remove</button>
        </div>
        <input class="form-control focus-ring" name="items[]" type="text">
      </div>
    </div>
  </template>
  <button class="button-text-neutral" type="button" data-add-row>
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12m-6-6h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.75"/></svg>
    <span>Add item</span>
  </button>
</fieldset>
```

For the preview's inline label/action alignment and compact add control, use a small consumer-owned layout rule:

```css
.repeatable-field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-scale-2);
}

.repeatable-field-header > [data-remove-row] {
  font-size: var(--typography-font-size-label);
  font-weight: var(--typography-font-weight-emphasis);
}

.repeatable-list > [data-add-row] svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.repeatable-list > [data-add-row] {
  justify-self: start;
}
```

When adding or removing rows, keep each label associated with its input and update the remove button's accessible name to match the row. The add control is a compact, flat text action with a decorative plus icon; hide the icon from assistive technology while keeping the action text visible. Keep it below the rows. Move focus to the new input after adding, or to a neighboring input (the add button if no rows remain) after removing. The [form preview](preview.html) demonstrates the JavaScript wiring, including restoring the initial row on form reset; its repeatable-section styles and behavior are examples, not package APIs.

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
