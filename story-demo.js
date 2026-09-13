const control = document.querySelector('#unknown-field');
const output = document.querySelector('#demo-output');
function renderHandoff() {
  const rows = control.checked
    ? [['REQUIRED FIELD', 'Unrecognized question'], ['HANDOFF', 'Needs action — human answer required'], ['RÉSUMÉ UPLOAD', 'Stopped'], ['SUBMISSION', 'Not submitted']]
    : [['KNOWN FIELDS', 'Verified profile fields filled'], ['RÉSUMÉ UPLOAD', 'Prepared résumé attached'], ['HANDOFF', 'Waiting for human review'], ['SUBMISSION', 'Not submitted']];
  output.replaceChildren(...rows.map(([label, value]) => {
    const row = document.createElement('div');
    const key = document.createElement('span'); key.textContent = label;
    const text = document.createElement('strong'); text.textContent = value;
    row.append(key, text); return row;
  }));
}
control.addEventListener('change', renderHandoff);
renderHandoff();
