const projects = {
  "value": {
    "name": "Value Indiana",
    "category": "PROPERTY DATA",
    "index": "01 / 03",
    "summary": "Live in five Indiana counties. Find a property, compare, and report.",
    "question": "How do you get from a parcel number to a property valuation?",
    "story": "The useful part is the path between finding a property and explaining its value. Value Indiana brings parcel search, comparable properties, regression analysis, and a PDF report into one workflow.",
    "role": "My part · Full-stack development",
    "contribution": "I built the data imports, search, valuation workflow, and reporting. Value Indiana is live in five Indiana counties.",
    "title": "From a property to a report.",
    "context": "A closer look at the workflow behind Value Indiana.",
    "stack": "Python · Flask · MySQL · scikit-learn · JavaScript",
    "date": "November 2025 – Present",
    "credit": "",
    "steps": [
      {
        "label": "Find",
        "title": "Start with the property.",
        "text": "Search by address or parcel number to find the property you want to analyze. Imported parcel records provide the starting point.",
        "detail": "Search is the entry point to the analysis, so the database schema and indexed queries are part of the product experience."
      },
      {
        "label": "Compare",
        "title": "Look at the properties around it.",
        "text": "Comparable-property grids can be edited, with session-based overrides available in the valuation workflow.",
        "detail": "A user can work with the comparables instead of receiving only a final number."
      },
      {
        "label": "Report",
        "title": "Take the analysis with you.",
        "text": "The workflow generates a PDF report from the property analysis and valuation.",
        "detail": "The report carries the work beyond the browser, where someone can review and share it."
      }
    ],
    "images": [
      "media/valueindiana-lookup.webp",
      "media/valueindiana-compgrid.webp",
      "media/valueindiana-report-comps.webp"
    ],
    "caption": "Product screenshots and report pages shared on SingularX’s public site; identifying fields are blurred at source.",
    "links": [
      [
        "Visit Value Indiana ↗",
        "https://valueindiana.com"
      ]
    ],
    "imageAlts": [
      "Value Indiana property lookup screen",
      "Value Indiana comparable-property grid and map",
      "Value Indiana generated sales-comparison report"
    ],
    "captions": [
      "Property lookup. Product screenshot shared by SingularX; identifying fields are blurred at source.",
      "Comparable-property grid and map. Product screenshot shared by SingularX; identifying fields are blurred at source.",
      "A page from a generated sales-comparison report, shared by SingularX with identifying fields blurred."
    ]
  },
  "citylink": {
    "name": "CityLink",
    "category": "SINGULARX · GOVTECH",
    "index": "02 / 03",
    "summary": "A launch-ready platform for permits, code enforcement, and resident requests.",
    "question": "How does a resident request become work a county can act on?",
    "story": "CityLink brings filing, screening, and review into one service. Residents can follow a request while county staff work through the applications and reports that need their attention.",
    "role": "My part · Technical Lead at SingularX",
    "contribution": "I lead CityLink development, including permit and code-enforcement workflows and the migration of legacy records into searchable data.",
    "title": "From a request to a review.",
    "context": "The public product flow at SingularX.",
    "stack": "React · Node.js · Express.js",
    "date": "SingularX: November 2025 – Present · Technical Lead since February 2026",
    "credit": "CityLink is a SingularX product. My contribution is engineering and technical leadership.",
    "steps": [
      {
        "label": "File",
        "title": "Give residents a place to start.",
        "text": "The public entry point introduces permitting and code-enforcement services, with access to the resident and staff workspaces.",
        "detail": "The image shows the public landing page; the workspaces require sign-in."
      },
      {
        "label": "Screen",
        "title": "Surface incomplete applications.",
        "text": "Screening helps identify missing information before an application moves through staff review.",
        "detail": "Incomplete submissions need to be visible before they consume review time."
      },
      {
        "label": "Review",
        "title": "Connect the request to staff work.",
        "text": "County workflows connect permit and code-enforcement requests with review and status communication.",
        "detail": "CityLink is launch-ready. Its public site introduces the service, while the workspaces require sign-in."
      }
    ],
    "images": [
      "media/citylink-public.webp",
      "media/citylink-public.webp",
      "media/citylink-public.webp"
    ],
    "imageAlt": "CityLink public landing page, as shown on the SingularX website",
    "caption": "CityLink public landing page, shared on SingularX’s product site. This is not an authenticated staff workspace.",
    "links": [
      [
        "CityLink at SingularX ↗",
        "https://thesingularx.com/products/citylink"
      ]
    ]
  },
  "jobhawk": {
    "name": "JobHawk",
    "category": "PERSONAL SOFTWARE",
    "index": "03 / 03",
    "summary": "A job search has a lot of moving parts. JobHawk keeps them connected.",
    "question": "What should happen when automation does not know the answer?",
    "story": "Finding a role is only the beginning. The listing, supporting experience, prepared résumé, and application status all need to stay connected. JobHawk tracks that path and makes the next human action visible.",
    "role": "My part · Product and engineering",
    "contribution": "I built the local pipeline, résumé preparation, application tracking, and browser assistance.",
    "title": "Watch where the workflow stops.",
    "context": "Try the last step with an unfamiliar required field.",
    "stack": "Python · SQLite · Playwright · Google APIs",
    "date": "July 2026 – Present",
    "credit": "",
    "steps": [
      {
        "label": "Discover",
        "title": "Keep the listing attached.",
        "text": "Public Greenhouse and Lever listings enter a local tracker. The job and its application move through a recorded lifecycle.",
        "detail": "A missing or failed live check remains unverified. It is not treated as proof that a job is still open."
      },
      {
        "label": "Prepare",
        "title": "Keep the evidence attached.",
        "text": "Résumé preparation selects from existing profile evidence and records which base bullets were used. The result waits for review.",
        "detail": "A keyword in a posting cannot create an accomplishment. Selection provenance lets the reviewer trace the wording back."
      },
      {
        "label": "Review",
        "title": "Make uncertainty visible.",
        "text": "Browser assistance fills verified fields and hands control back before submission. Try adding a required field it does not recognize.",
        "detail": "An unknown required field triggers a handoff without a résumé upload. Even the normal path stops for human review."
      }
    ],
    "links": [
      [
        "Ask me about JobHawk ↗",
        "mailto:peteryuk91@gmail.com?subject=JobHawk"
      ]
    ]
  }
};
let selectedProject='value', selectedStep=0, sceneController=null;
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=motionPreference.matches, explicitMotionChoice=false;
const motionButton=document.querySelector('#motion-toggle');
const announce=document.querySelector('#selection-announcement');
function setText(selector,value){document.querySelector(selector).textContent=value;}
function renderDemo(){
  const unknown=document.querySelector('#unknown-field').checked;
  const lines=selectedStep===0 ? [['SOURCE','Public job listing'],['TRACKER','Discovered → ready for screening'],['NEXT','Check role details and live status']] : selectedStep===1 ? [['EVIDENCE','Existing profile bullets selected'],['RÉSUMÉ','Draft prepared with selection references'],['NEXT','Review the wording and employer checks']] : unknown ? [['REQUIRED FIELD','Unrecognized question'],['HANDOFF','Needs action — human answer required'],['RÉSUMÉ UPLOAD','Stopped'],['SUBMISSION','Not submitted']] : [['KNOWN FIELDS','Verified profile fields filled'],['RÉSUMÉ UPLOAD','Prepared résumé attached'],['HANDOFF','Waiting for human review'],['SUBMISSION','Not submitted']];
  document.querySelector('#demo-output').replaceChildren(...lines.map(([key,value])=>{const row=document.createElement('div');const label=document.createElement('span');label.textContent=key;const content=document.createElement('strong');content.textContent=value;row.append(label,content);return row;}));
  document.querySelector('#demo-control').hidden=selectedStep!==2;
}
function selectStep(index,announceChange=true){
  selectedStep=index;const project=projects[selectedProject],step=project.steps[index];
  document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===index)));
  setText('#step-title',step.title);setText('#workflow-description',step.text);setText('#step-detail',step.detail);
  const demo=selectedProject==='jobhawk';
  document.querySelector('#jobhawk-demo').hidden=!demo;document.querySelector('#product-figure').hidden=demo;
  if(demo)renderDemo();else{
    const img=document.querySelector('#product-image');img.src=project.images[index];img.alt=project.imageAlts?.[index] || project.imageAlt || 'Product screenshot';
    document.querySelector('#product-image-link').href=img.src;setText('#product-caption',project.captions?.[index] || project.caption);
  }
  sceneController?.setStep(index);
  if(announceChange)announce.textContent=`${project.name}: ${step.label}.`;
}
function selectProject(id,announceChange=true){
  if(!projects[id])return;selectedProject=id;const p=projects[id];
  document.querySelector('.walkthrough-link').href='stories/'+id+'.html';
  for(const [selector,value] of Object.entries({'#project-title':p.name,'#project-category':p.category,'#project-index':p.index,'#project-summary':p.summary,'#project-question':p.question,'#project-story':p.story,'#project-role':p.role,'#project-contribution':p.contribution,'#walkthrough-kicker':`INSIDE ${p.name.toUpperCase()}`,'#walkthrough-title':p.title,'#walkthrough-context':p.context,'#project-stack':p.stack,'#project-date':p.date,'#team-credit':p.credit}))setText(selector,value);
  document.querySelectorAll('[data-project]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.project===id)));
  document.querySelector('#workflow-steps').replaceChildren(...p.steps.map((step,i)=>{const b=document.createElement('button');b.type='button';b.dataset.step=i;b.textContent=`${i+1}. ${step.label}`;b.addEventListener('click',()=>selectStep(i));return b;}));
  document.querySelector('#project-links').replaceChildren(...p.links.map(([label,href])=>{const a=document.createElement('a');a.textContent=label;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener';}return a;}));
  document.querySelector('#unknown-field').checked=false;
  sceneController?.select(id);selectStep(0,false);
  if(announceChange)announce.textContent=`${p.name} selected. Its story and walkthrough are below.`;
}
document.querySelector('#unknown-field').addEventListener('change',renderDemo);

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => selectProject(button.dataset.project)));
function updateMotionButton() {
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.replaceChildren();
  const icon = document.createElement('span'); icon.setAttribute('aria-hidden', 'true'); icon.textContent = motionPaused ? '▷' : 'Ⅱ';
  motionButton.append(icon, motionPaused ? ' Resume motion' : ' Pause motion');
}
motionButton.addEventListener('click', () => {
  explicitMotionChoice = true; motionPaused = !motionPaused; updateMotionButton(); sceneController?.setPaused(motionPaused);
});
motionPreference.addEventListener('change', event => {
  if (!explicitMotionChoice) { motionPaused = event.matches; updateMotionButton(); sceneController?.setPaused(motionPaused); }
});
document.querySelector('#reset-view').addEventListener('click', () => sceneController?.reset());
const credits = document.querySelector('#credits');
document.querySelector('#credits-open').addEventListener('click', () => credits.showModal());
document.querySelector('#credits-close').addEventListener('click', () => credits.close());
credits.addEventListener('click', event => { if (event.target === credits) { const b = credits.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) credits.close(); } });

selectProject('value', false);
updateMotionButton();

function sceneUnavailable() {
  document.body.classList.add('scene-unavailable');
  const status = document.querySelector('#scene-status');
  status.hidden = false; status.textContent = 'Explore the projects below.';
  document.querySelector('#hotspots').hidden = true;
  document.querySelector('#reset-view').hidden = true;
  document.querySelector('#scene-hint').textContent = 'All project details are available below';
}

import('./scene.js').then(async ({ createScene }) => {
  sceneController = await createScene(document.querySelector('#scene'), {
    onSelect: selectProject, paused: motionPaused, onFailure: sceneUnavailable
  });
  sceneController.select(selectedProject);
  sceneController.setStep(selectedStep);
  document.querySelector('#scene-status').hidden = true;
  document.querySelector('#hotspots').hidden = false;
  document.querySelector('#reset-view').hidden = false;
  document.querySelector('#scene-hint').textContent = 'Select an object · Drag to look around';
}).catch(sceneUnavailable);
