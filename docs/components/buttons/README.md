# Buttons

This section includes [button examples](preview.html) and usage governance.

Button styles belong in the shared CSS layer and consume semantic variables. Theme and palette selectors supply those variables; button rules must not contain palette-specific color values. This keeps the same button variants working with the default light/dark theme, the earth palette, and future themes that implement the semantic color roles.

## Structure and variants

Use the native `<button>` element for actions. `.button` is a complete baseline button; add a variant class when an action needs a distinct role:

```html
<button class="button button-primary" type="button">Save</button>
<button class="button-tonal" type="button">Add to cart</button>
<button class="button-elevated" type="button">Explore</button>
<button class="button button-secondary" type="button">Cancel</button>
<button class="button-text" type="button">Learn more</button>
<button class="button-text-neutral" type="button">Cancel</button>
<button class="button button-icon" type="button" aria-label="Open menu">
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12v2H2zm0 5h12v2H2z"/></svg>
</button>
```

Variant classes also include the shared base styles, so they can be used without `.button`. Keep the variants role-based rather than tying them to a particular product or palette:

- `.button` is the baseline neutral action, with shared spacing, typography, border, surface, hover, and pressed treatments.
- `.button-primary` is the filled, highest-emphasis action. Its default fill, hover fill, and foreground come from `color.action.primary`.
- `.button-tonal` is a contained, lower-emphasis action than primary, using dedicated tonal container and foreground roles.
- `.button-elevated` is a surface button with a subtle shadow; use it when the action needs separation from its background without primary-level emphasis.
- `.button-secondary` is the outlined, medium-emphasis alternative: a flat surface-colored button with a border, using the active theme's surface, text, border, and interaction-state roles.
- `.button-text` is the lowest-emphasis action, with no default fill or border; it uses the primary action color for its label and a state surface on hover/press.
- `.button-text-neutral` is a low-impact action for cases such as dialog cancellation; it uses the theme's primary text color, which resolves to the appropriate dark or light neutral.
- `.button-icon` is a separate icon-only action control. Give it an accessible name and mark decorative SVGs `aria-hidden="true"`.

## Choosing a variant

Choose the style by the action's importance and the surrounding surface, not by the action's wording or the theme's accent color:

- Use **filled primary** for the screen or region's main call to action, such as Save or Continue. Usually give a group of related actions one primary button so its priority is clear.
- Use **filled tonal** for an important supporting action that should remain visibly contained but not compete with the main action.
- Use **elevated** when a button needs stronger separation from a surface behind it. Prefer the primary or tonal variant when emphasis, rather than surface contrast, is the reason for adding visual weight.
- Use **outlined secondary** for a visible alternative action that should be easy to find but remain subordinate to the primary action.
- Use **text** for low-emphasis actions that do not need a filled or outlined container. In dialogs, pair a primary confirmation action with **neutral text** for a low-impact action such as Cancel; use the primary-colored text variant when the action should read as an affirmative, branded action.
- Use **icon-only** for compact, familiar supplementary actions (for example, a toolbar menu). If the action is not immediately clear from its icon, use a visible text label instead.

Do not use multiple high-emphasis buttons in the same action group unless the actions truly have equal priority. When two actions need similar prominence, prefer tonal or outlined treatments for the supporting choice rather than changing the color ad hoc.

## Theme and interaction states

Theme selection is independent of button classes. `data-theme` selects light or dark semantic variables; `data-palette="earth"` replaces the corresponding theme roles. Button CSS must reference the public semantic variables, not primitive palette colors.

Use variant-specific action tokens when they exist. `.button-primary` uses its action default, hover, and text tokens. `.button-tonal` uses its theme-defined container, hover, pressed, and text roles; do not substitute selected-state or generic neutral-state tokens. `.button`, `.button-secondary`, and text buttons use neutral interaction-state roles. These generic roles must not replace a filled action's variant-specific color. `color.action.secondary` remains available to consumers that intentionally need a second filled action, but the shared secondary button is outlined by default. Icon hover uses the subtle surface role.

Disabled styles use the shared disabled state roles and apply to both native `disabled` and `aria-disabled="true"`. `aria-disabled` only changes presentation; application code must also prevent activation. Buttons receive the shared focus ring on `:focus-visible`, so keyboard focus remains visible without requiring an extra utility class.

The baseline theme supplies usable values by default; setting `data-theme` or `data-palette` switches the same component styles to the selected theme. Future themes should provide values for the semantic roles these variants consume. If a new variant needs a different interaction treatment, define or select its semantic role explicitly and document the mapping here rather than adding theme-specific button selectors.

## Accessibility and usage

- Keep native button behavior and set an explicit `type` when the button is inside a form.
- Provide visible text or an accessible name for icon-only buttons.
- Preserve visible keyboard focus and native/ARIA disabled semantics.
- Verify contrast for the chosen theme and palette, especially for disabled controls and interactive states.

## References

- [Material Design 3 button guidelines](https://m3.material.io/components/buttons/guidelines)
- [Material Web button variants and theming](https://material-web.dev/components/button/)
- [Material Design 3 color roles](https://m3.material.io/styles/color/roles)
