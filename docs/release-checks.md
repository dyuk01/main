# Release preparation checks — September 13, 2026

## Changes

- Corrected the downloadable website résumé: Value Indiana is live in five Indiana counties; CityLink is launch-ready. Removed the unsupported weeks-to-days claim.
- Preserved the one-page résumé layout and added editable HTML in `resume/source.html`. The separate JobHawk project was not modified.
- Removed visitor-facing local-prototype wording from the design notes.
- Replaced legacy English/Korean pages with redirects and the old thank-you page with an honest contact fallback.
- Added a favicon, canonical links, and Open Graph/Twitter metadata to all six content pages, with a 1200 × 630 sharing card.

## Observed validation

- Chrome desktop and Playwright WebKit with iPhone 13 emulation: 3D scene loaded; all three project selections and nine walkthrough steps passed.
- Design notes opened and closed; the JobHawk handoff checkbox worked in both states.
- Legacy redirects reached the homepage in both engines and also in a separate Chrome context with JavaScript disabled.
- All six content pages had the expected canonical and sharing metadata, with no horizontal overflow at tested viewport sizes.
- The sharing image and corrected résumé returned HTTP 200.
- All 126 local file and fragment references across the ten current/legacy/source HTML pages resolved.
- iPhone emulation with reduced motion started paused. No uncaught page errors were recorded.
- Visually inspected the rendered WebKit mobile homepage and Value Indiana story screenshots, the sharing card, and a raster of the final résumé PDF.
- The PDF contains one page and passes the existing résumé renderer's expected-text/ATS extraction verification, including the corrected company and project claims.

## Limits

WebKit iPhone emulation is not a physical iPhone test. Installed Safari's driver was retried, but Safari reported that Allow remote automation must be enabled. Browser settings were not changed. This is an unperformed installed-Safari check, not a successful Safari test.

Canonical URLs target the existing GitHub Pages address, verified to return HTTP 200. The new sharing card and content have not been deployed; live social preview services will see the previous deployment until publication. No Git staging, commits, pushes, or deployment configuration changes were made.
