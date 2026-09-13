# Portfolio expansion — September 13, 2026

## Content and evidence

- Peter’s current instructions establish SingularX AI Lab responsibilities: technical guidance, overall architecture, product logic, and business approach. No CEO or other new official job title is assigned.
- Peter confirms AWS pitch competition participation in Indiana (no win) and ICAA attendance for a Value Indiana pitch. Exact dates, photos, and approved decks remain pending. No organizational award or unrelated team photograph is used as evidence of Peter’s participation.
- Peter corrects the product attribution: Value Indiana is live in five Indiana counties; CityLink is launch-ready. No CityLink five-county or review-time claim is included.
- Existing profile evidence supports website development at SingularX, CityLink engineering and technical leadership, Value Indiana development, JobHawk behavior, and Votify’s backend/team attribution.
- https://thesingularx.com/ supplies the public company description and public product imagery. The CityLink image was verified byte-identical to the live asset at https://thesingularx.com/assets/products/citylink-hero.webp. The SingularX homepage was captured on September 13. No authenticated workspace or private infrastructure was copied.
- Existing Value Indiana public-homepage capture and Votify team screenshots retain their original labels. The JobHawk example is fictional and sends no requests.
- Foodservice research is a separate engineering story, currently held as a private editorial draft outside the repository pending confirmation of disclosure scope. No research authorship is inferred.

## Implementation

Three 3D objects select previews for Value Indiana, CityLink, and JobHawk. Each preview links to a static case-study page. A collapsed walkthrough preserves the existing interactive demo without dominating the homepage. Votify and the SingularX website have separate pages under More work. Static stories and no-JavaScript fallback links remain usable without WebGL.

Case-study copy is static HTML. When changing featured content, update both `app.js` and the corresponding `stories/*.html`; the homepage’s default Value Indiana copy is also in `index.html`.

## Validation

Chrome 152.0.7977.83. Syntax checks passed for app.js, scene.js, and story-demo.js.

- Three featured projects select through 3D hotspot controls and link to correct full stories.
- Nine optional walkthrough steps pass.
- Value Indiana owns five-county claim; CityLink is launch-ready with no pilot-count claim.
- All five standalone case studies and their images load.
- Local case-study links and résumé return HTTP 200.
- JobHawk standalone demo works by keyboard in both directions.
- No horizontal overflow on homepage or five case studies at 390px.
- Reduced-motion, unavailable-WebGL, and JavaScript-disabled navigation checks pass.
- No normal-run page or console errors.
- Visually inspected desktop homepage and CityLink case study plus mobile pitch layout.

No physical touch-device or cross-browser testing. Votify screenshots still require network access. Pitch photos and foodservice publication scope remain pending. No deployment, commit, or publication performed.
