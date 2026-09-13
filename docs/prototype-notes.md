# Peter Yuk: interactive portfolio prototype

Serve this directory over HTTP and open `index.html`. It is also served at
`http://127.0.0.1:8766/interactive/` by the existing local preview server.

The prototype uses plain HTML, CSS, JavaScript, and locally vendored Three.js
0.180.0. It requires no build step, external fonts, remote model downloads,
tracking, or accounts. The WebGL scene progressively enhances the regular
project buttons and readable HTML. Motion respects the OS preference and can
be paused. Touch visitors can scroll normally; drag horizontally to rotate.

All three models were built procedurally for this prototype. They illustrate
project concepts and are not screenshots or representations of actual data.
References: https://room.bokoko33.me/ and https://bruno-simon.com/.
Neither reference's source code or assets were copied.

The portrait is the original user-provided JPEG. The résumé is copied unchanged
from JobHawk's `profile/Peter_Yuk_Resume.pdf`. Professional claims are drawn from
JobHawk's current master profile and general résumé. CityLink appears only under
SingularX experience. No private CityLink integration details are included.

This is a reviewable local prototype. It has not been integrated into the website
repository or deployed. The existing website and GitHub profile remain unchanged.

## Observed validation

- JavaScript syntax checks passed for app.js and scene.js.
- The WebGL scene rendered in the Codex browser without observed errors or warnings.
- Clicking the 3D terminal selected JobHawk.
- Keyboard activation selected all three projects; all nine workflow steps updated their text and pressed states.
- Dragging changed the view without changing the selected project; reset restored the original projected label position.
- Pause and resume controls switched state and remained operable during project selection.
- Desktop and 390-pixel mobile layouts were visually inspected. Mobile DOM checks found no horizontal overflow; portrait images loaded.
- Résumé and email controls remained visible at the top while scrolling on mobile.
- All local HTML asset/link targets exist. The portrait and résumé copies match their originals byte-for-byte.
- The existing PDF contains one page and its extracted text matches the current general profile. It was not modified or newly rendered.

Not tested on physical touch hardware or across multiple browsers. The OS reduced-motion initialization and WebGL-unavailable fallback are implemented, but those environment states were not independently simulated in this review.

## Product-story revision — September 12, 2026

Replaced the résumé-style project metadata and result blocks with product questions, brief stories, clear ownership, and a separate walkthrough. Reduced employer descriptions to compact context. Kept the existing 3D navigation and persistent résumé/contact actions.

Evidence used:
- Peter's master profile for ownership, dates, and documented capabilities.
- https://valueindiana.com/ public homepage, captured in `media/value-home.png`. The analysis route opened a login panel; no authenticated workspace was accessed. The walkthrough does not claim the homepage is an analysis screenshot.
- https://github.com/dylandrozario/Votify README and its `src/img/dashboard_overview.png` and `src/img/promise_details.png`. These screenshots load directly from the public repository, require network access, and depict team work in demo mode. Team roles are credited.
- JobHawk README and `tests/test_supervised.py`, especially the known-fields and unknown-required-field handoff cases. The interactive panel is an explicitly labeled fictional example, not a live application or a screenshot of JobHawk.

No personal motivation, difficult decision, or lesson was invented. A personal anecdote is pending Peter's answer.

Observed checks for this revision:
- `node --check app.js` passed.
- All three project selections and all nine walkthrough steps updated correctly with exactly one selected step.
- JobHawk checkbox worked by keyboard in both directions: unfamiliar required field showed a handoff with upload stopped; normal path showed a prepared résumé attached and pending human review. Neither state showed a submitted application.
- Inspected desktop story/walkthrough and 390px mobile layouts. No horizontal overflow at 390px; résumé and email remained visible in the header.
- Product image loading verified in the browser; actual Votify detail screenshot and local Value Indiana capture inspected.
- No browser warning/error logs observed during the check.

This is still a local prototype. Nothing was published and no repository git state was changed. Existing 3D interaction checks above predate this content revision; the scene implementation was unchanged.
