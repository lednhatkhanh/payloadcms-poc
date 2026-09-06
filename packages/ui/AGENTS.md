# UI package rules

- React Aria Components are the behavior foundation. Read `.agents/skills/react-aria` before changing an interactive component.
- Import React Aria through direct component subpaths and compose its documented parts.
- Public wrappers omit `className` and `style`. Add explicit variants instead of escape hatches.
- Use CVA recipes and semantic Tailwind tokens only. Arbitrary utilities and raw palette values are forbidden.
- Keep layout primitives server-compatible; add `use client` only to interactive entry points.
- Use React Aria state attributes/render props rather than duplicating hover, press, focus, selection or validation state.
- Every field has a visible label, description when useful, and `FieldError`.
- Query tests by role/label and use `user-event`; use `@react-aria/test-utils` for supported composite ARIA patterns.
