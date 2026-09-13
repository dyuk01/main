# Peter Yuk — personal website

An interactive portfolio with an original Three.js workbench and product walkthroughs for Value Indiana, CityLink, and JobHawk. The new landing page is `index.html`.

## Run locally

From the repository root:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open http://127.0.0.1:8767/. No build or package installation is needed. Serve over HTTP because the scene uses JavaScript modules.

## Files

- `index.html`: landing page, experience, résumé, and contact links.
- `app.js`: featured story previews, optional walkthrough controls, and motion preference.
- `stories/`: five static case studies, readable without JavaScript.
- `story-demo.js`: the illustrative JobHawk case-study interaction.
- `scene.js`: original procedural models and optional 3D interaction.
- `style.css`: desktop and mobile layouts.
- `portrait.jpeg`: Peter's supplied photograph, copied unchanged.
- `Peter_Yuk_Resume.pdf`: corrected, one-page website résumé; editable HTML is in `resume/source.html`.
- `media/social-card.jpg` and `favicon.svg`: sharing preview and site icon.
- `media/value-home.png`: public Value Indiana homepage capture, clearly labeled as such.
- `vendor/`: local Three.js 0.180.0 modules and MIT license.
- `docs/prototype-notes.md`: original design provenance and earlier validation record.

The old `us.html` and `kr.html` URLs redirect to the current English homepage, including without JavaScript. `thanks.html` provides contact and navigation links without claiming that a message was sent. Legacy assets remain available.

## Accessibility and evidence

Project buttons provide the same selection as the 3D objects. Motion can be paused and respects the system's reduced-motion preference. Résumé and email stay within reach on mobile. Core project information is available without WebGL; a text fallback is provided when JavaScript is disabled.

Value Indiana uses product screenshots and generated-report pages already shared on SingularX’s public site. Existing redactions are preserved. Votify screenshots load from its public team repository and require network access; Peter's backend contribution and the other team roles are credited. The JobHawk example uses a fictional job and performs no real application actions. Personal decisions and lessons remain pending Peter's input.

The models and interface are original. Reference sites supplied design inspiration only; their code and models were not copied. Three.js attribution is in `vendor/THREE-LICENSE.txt`; the legacy template license remains in `main/LICENSE`.

## Local integration status

This integration has not been published. No deployment or GitHub configuration changes are included. Current integration checks are recorded in `docs/integration-checks.md`; earlier prototype checks are separately recorded in `docs/prototype-notes.md`.

## Broader portfolio — September 13, 2026

Homepage order: introduction, three featured work previews, leadership/collaboration, pitches/presentations, more work, and background. The 3D objects select story previews with links to full case studies; a collapsed quick walkthrough is optional. Votify and the SingularX website are in More work.

Peter clarified that Value Indiana is live in five Indiana counties and CityLink is launch-ready. The five-county claim is not attributed to CityLink. SingularX AI Lab work is described through actual responsibilities without asserting a CEO title. Pitch entries record participation; they do not claim awards. ICAA and AWS photos supplied by Peter appear in the presentation section. Foodservice research remains a separate private draft pending sharing scope.

See `docs/portfolio-expansion.md` for evidence and validation scope. No publication or deployment was performed.

## Product and event photos — September 13, 2026

The Value Indiana walkthrough pairs lookup, comparable-grid, and report images with their corresponding steps. Its case study also includes expandable regression and report-cover images. All five images come from SingularX’s published product assets. The three user-supplied event photos are copied unchanged into `media/`; the first is ICAA and the other two are AWS. The AWS group caption explicitly records participation without an award. Full-size images open from regular links. See `docs/media-update.md` for provenance and checks.

## Release preparation — September 13, 2026

The downloadable résumé now attributes the five live Indiana counties to Value Indiana and describes CityLink as launch-ready. The unsupported weeks-to-days claim was removed. Its original layout and remaining content are preserved. Only this website's copy was changed; the separate JobHawk profile and résumé were not modified.

To regenerate the PDF, serve the site locally, open `resume/source.html` in Chromium, and print to PDF using the stylesheet's page size, background graphics on, and browser headers/footers off. The checked-in PDF was generated with Playwright's `page.pdf({preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true})`. Recheck page count and extracted text after editing.

All six content pages include canonical URLs and Open Graph/Twitter metadata using the verified existing GitHub Pages base URL, `https://dyuk01.github.io/main/`. If the deployment address changes, update those URLs and the absolute social image URL together. The sharing image is 1200 × 630 pixels and uses Peter's original portrait.

Visitor-facing local-prototype wording has been removed. Chrome desktop and WebKit with iPhone 13 emulation passed the release checks. Installed Safari could not be automated because Allow remote automation is disabled; no physical iPhone was tested. See `docs/release-checks.md` for the exact scope. These changes have not been published.
