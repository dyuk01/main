import * as THREE from './vendor/three.module.js';

// Original procedural models. Coordinates are scene units, not project data.
export async function createScene(container, { onSelect, paused = false, onFailure }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6, 6, 5, -5, .1, 80);
  const center = new THREE.Vector3(0, .5, .2);
  const materials = new Map();
  function material(color, extra = {}) {
    const key = color + JSON.stringify(extra);
    if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: .76, metalness: .02, ...extra }));
    return materials.get(key);
  }
  function mesh(geometry, color, parent, x = 0, y = 0, z = 0, extra = {}) {
    const object = new THREE.Mesh(geometry, material(color, extra));
    object.position.set(x, y, z); object.castShadow = true; object.receiveShadow = true;
    parent.add(object); return object;
  }
  function roundedGeometry(w, h, d, radius = .04) {
    const r = Math.min(radius, w / 3, h / 3);
    const x = -w / 2, y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y); shape.lineTo(x + w - r, y); shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r); shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h); shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y);
    const bevel = Math.min(.025, d / 5, h / 5, w / 5);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: Math.max(.002, d - bevel * 2), bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 5 });
    geometry.translate(0, 0, -d / 2 + bevel);
    return geometry;
  }
  function box(w, h, d, color, parent, x = 0, y = 0, z = 0, radius = .04) {
    return mesh(roundedGeometry(w, h, d, radius), color, parent, x, y, z);
  }
  function cylinder(rTop, rBottom, h, color, parent, x = 0, y = 0, z = 0) {
    return mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 32), color, parent, x, y, z);
  }
  function sphere(r, color, parent, x = 0, y = 0, z = 0) {
    return mesh(new THREE.SphereGeometry(r, 18, 12), color, parent, x, y, z);
  }
  function lineBetween(a, b, color, radius, parent) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const line = mesh(new THREE.CylinderGeometry(radius, radius, start.distanceTo(end), 10), color, parent);
    line.position.copy(start.add(end).multiplyScalar(.5));
    line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...b).sub(new THREE.Vector3(...a)).normalize());
    return line;
  }

  scene.add(new THREE.HemisphereLight(0xfffff5, 0xb5bea5, 2.7));
  const sunlight = new THREE.DirectionalLight(0xfff5df, 3.1);
  sunlight.position.set(-4, 10, 5); sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1536, 1536);
  sunlight.shadow.camera.left = -7; sunlight.shadow.camera.right = 7;
  sunlight.shadow.camera.top = 7; sunlight.shadow.camera.bottom = -7;
  sunlight.shadow.camera.near = 1; sunlight.shadow.camera.far = 25;
  sunlight.shadow.normalBias = .045; sunlight.shadow.bias = -.0002;
  sunlight.shadow.radius = 5; scene.add(sunlight);
  const fill = new THREE.DirectionalLight(0xd7e7ff, .6); fill.position.set(4, 4, -5); scene.add(fill);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: 0x50663c, opacity: .15 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.15; ground.receiveShadow = true; scene.add(ground);

  const world = new THREE.Group(); scene.add(world);
  const table = box(7.5, .17, 5.7, '#d5cfb7', world, 0, -.02, .25, .075);
  // A thin top and feet keep the scene looking like a small physical workbench.
  box(7.35, .05, 5.55, '#e3decb', world, 0, .09, .25, .024);
  for (const x of [-3.05, 3.05]) for (const z of [-1.9, 2.3]) cylinder(.11, .12, .16, '#a6a48d', world, x, -.1, z);

  const objects = {};
  const hitTargets = [];
  const hotspotButtons = {};
  for (const [id, pos, angle, color] of [
    ['value', [-1.95, .17, -.85], -.08, '#c6d5af'],
    ['jobhawk', [1.75, .17, -.9], .10, '#e2c7aa'],
    ['citylink', [.25, .17, 1.65], -.09, '#d3cbde']
  ]) {
    const group = new THREE.Group(); group.position.set(...pos); group.rotation.y = angle; group.userData.project = id; world.add(group);
    box(2.55, .13, 1.95, color, group, 0, .07, 0, .055);
    box(2.42, .03, 1.82, '#f0eee2', group, 0, .15, 0, .014);
    const trim = box(2.34, .035, .04, color, group, 0, .17, .89, .012);
    objects[id] = { group, trim, color, baseY: pos[1], anchor: new THREE.Vector3(0, -.07, 1.08) };
    const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 2.05), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.set(0, .8, 0); proxy.userData.project = id; group.add(proxy); hitTargets.push(proxy);
    hotspotButtons[id] = document.querySelector(`.hotspot[data-project="${id}"]`);
  }

  // Value Indiana: a miniature parcel map with three buildings.
  const value = objects.value.group;
  box(2.25, .015, 1.62, '#bdcba2', value, 0, .18, 0, .006);
  box(2.26, .022, .18, '#e9e3cd', value, 0, .205, .38, .008);
  box(.16, .026, 1.6, '#e9e3cd', value, .48, .209, 0, .008);
  const houses = [];
  function house(x, z, scale, roofColor) {
    const group = new THREE.Group(); group.position.set(x, .22, z); group.scale.setScalar(scale); value.add(group);
    box(.53, .52, .54, '#f6ead1', group, 0, .26, 0, .025);
    const roofShape = new THREE.Shape(); roofShape.moveTo(-.34, 0); roofShape.lineTo(.34, 0); roofShape.lineTo(0, .30); roofShape.closePath();
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: .64, bevelEnabled: true, bevelSize: .01, bevelThickness: .01, bevelSegments: 1, steps: 1 });
    roofGeo.translate(0, 0, -.32); mesh(roofGeo, roofColor, group, 0, .51, 0);
    box(.12, .24, .025, '#927a58', group, .1, .12, .28, .012);
    box(.13, .14, .022, '#8bb4b6', group, -.13, .33, .28, .01);
    box(.022, .14, .15, '#8bb4b6', group, .28, .33, .02, .01);
    box(.095, .21, .10, '#be9875', group, .16, .65, -.15, .012);
    houses.push(group); return group;
  }
  house(-.66, -.33, 1.05, '#b57751'); house(.03, -.37, .83, '#879e72'); house(.88, -.30, .74, '#9b8e79');
  function tree(x, z, size = 1) {
    cylinder(.024, .034, .28 * size, '#988663', value, x, .34, z);
    sphere(.17 * size, '#6e8b53', value, x, .55 * size, z);
    sphere(.13 * size, '#87a268', value, x + .07, .63 * size, z + .01);
  }
  tree(-.95, .68, .75); tree(.91, .63, .75);
  const parcelRing = mesh(new THREE.TorusGeometry(.37, .022, 8, 44), '#c99445', value, -.66, .25, -.33);
  parcelRing.rotation.x = Math.PI / 2;
  const report = new THREE.Group(); report.position.set(-.2, .24, .62); report.rotation.x = -Math.PI / 2; report.rotation.z = -.13; value.add(report);
  box(.48, .55, .022, '#fffdf0', report, 0, 0, 0, .018);
  for (let i = 0; i < 3; i++) box(.32 - i * .035, .022, .007, '#a2ad8c', report, -.015, .14 - i * .065, .018, .003);
  const compareBars = [];
  for (let i = 0; i < 3; i++) compareBars.push(box(.06, [.1, .17, .13][i], .013, '#819b69', report, -.12 + i * .12, -.13, .024, .009));

  // JobHawk: a small orange terminal and a physical three-stage card track.
  const job = objects.jobhawk.group;
  cylinder(.35, .40, .08, '#b18d6f', job, .1, .23, -.28);
  box(.20, .35, .20, '#d5a377', job, .1, .43, -.28, .025);
  const monitor = new THREE.Group(); monitor.position.set(.1, .92, -.35); job.add(monitor);
  box(1.5, 1.06, .55, '#ca8656', monitor, 0, 0, 0, .10);
  box(1.22, .75, .035, '#465947', monitor, -.03, .065, .30, .05);
  const screenCanvas = document.createElement('canvas'); screenCanvas.width = 512; screenCanvas.height = 320;
  const screenTexture = new THREE.CanvasTexture(screenCanvas); screenTexture.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.11, .65), new THREE.MeshBasicMaterial({ map: screenTexture }));
  screen.position.set(-.03, .065, .324); monitor.add(screen);
  const screenContext = screenCanvas.getContext('2d');
  function updateScreen(stage) {
    screenContext.fillStyle = '#253d35'; screenContext.fillRect(0, 0, 512, 320);
    screenContext.fillStyle = '#f0e9cf'; screenContext.font = 'bold 29px monospace'; screenContext.fillText('JobHawk', 28, 48);
    screenContext.font = '17px monospace'; screenContext.fillStyle = '#acbd9b'; screenContext.fillText(['DISCOVER', 'PREPARE', 'HUMAN REVIEW'][stage], 28, 84);
    for (let i = 0; i < 3; i++) {
      screenContext.fillStyle = i === stage ? '#638167' : '#3d5748'; screenContext.fillRect(25, 110 + i * 59, 461, 45);
      screenContext.fillStyle = i === stage ? '#eeeac9' : '#9daf97'; screenContext.fillRect(41, 124 + i * 59, 14, 14);
      screenContext.fillRect(72, 128 + i * 59, 290 - i * 42, 7);
    }
    screenTexture.needsUpdate = true;
  }
  updateScreen(0);
  sphere(.044, '#b8df94', monitor, .55, -.43, .28);
  box(.15, .02, .02, '#98623e', monitor, -.48, -.43, .28, .008);
  box(1.30, .085, .48, '#dbcdb7', job, .10, .25, .4, .04);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 8; col++) box(.105, .025, .075, row === 2 && col === 7 ? '#aa825e' : '#f1ebda', job, -.42 + col * .14, .31, .25 + row * .11, .01);
  const cards = [];
  for (let i = 0; i < 3; i++) {
    const card = new THREE.Group(); card.position.set(-.83 + i * .26, .3 + i * .03, .68); card.rotation.y = -.08 + i * .06; job.add(card);
    box(.35, .025, .35, ['#f1e8d1', '#dce5cf', '#c9dbb7'][i], card);
    box(.20, .009, .025, '#aaad93', card, 0, .023, -.07, .004);
    box(.15, .009, .025, '#aaad93', card, -.025, .023, .01, .004);
    cards.push(card);
  }
  const knob = cylinder(.09, .09, .14, '#446449', job, .96, .33, .60); knob.rotation.x = .10;

  // CityLink: conceptual request documents, a review lens, and workflow markers.
  const vote = objects.citylink.group;
  const documents = [];
  for (let i = 0; i < 3; i++) {
    const documentGroup = new THREE.Group(); documentGroup.position.set(-.48 + i * .38, .3 + i * .035, -.08 + i * .07);
    documentGroup.rotation.x = -Math.PI / 2 + .09; documentGroup.rotation.z = -.19 + i * .14; vote.add(documentGroup);
    box(.70, .98, .04, ['#e9e5f1', '#f3ede1', '#fffaf1'][i], documentGroup, 0, 0, 0, .03);
    box(.43, .05, .009, '#a995b5', documentGroup, -.02, .31, .03, .01);
    for (let row = 0; row < 5; row++) box(.46 - (row % 2) * .09, .025, .008, '#bcb8bc', documentGroup, -.03, .17 - row * .105, .03, .004);
    documents.push(documentGroup);
  }
  const magnifier = new THREE.Group(); magnifier.position.set(.30, .83, .12); magnifier.rotation.set(-.63, -.3, -.42); vote.add(magnifier);
  mesh(new THREE.TorusGeometry(.33, .055, 10, 40), '#8a749b', magnifier);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(.29, 40), new THREE.MeshStandardMaterial({ color: '#dbeaf0', transparent: true, opacity: .34, roughness: .10, side: THREE.DoubleSide, metalness: .12 }));
  magnifier.add(lens);
  const handle = cylinder(.065, .055, .48, '#6b597c', magnifier, 0, -.54, 0);
  const citationNodes = [];
  for (let i = 0; i < 3; i++) {
    const x = -.8 + i * .72;
    cylinder(.10, .10, .05, '#baa6cc', vote, x, .24, .68);
    const node = sphere(.055, '#f9f0d4', vote, x, .28, .68); citationNodes.push(node);
    if (i < 2) lineBetween([x + .11, .24, .68], [x + .61, .24, .68], '#ac9aba', .015, vote);
  }

  // Small neutral tools make the arrangement read as a personal work surface.
  const cup = cylinder(.16, .13, .30, '#ebddbd', world, -2.8, .29, 1.52);
  cylinder(.128, .128, .015, '#a18b6c', world, -2.8, .45, 1.52);
  const cupHandle = mesh(new THREE.TorusGeometry(.105, .03, 8, 20), '#ebddbd', world, -2.98, .32, 1.52); cupHandle.rotation.y = Math.PI / 2;
  lineBetween([-2.75, .2, 2.15], [-1.65, .2, 2.35], '#738359', .035, world);
  lineBetween([-1.65, .2, 2.35], [-1.54, .2, 2.37], '#d7b57d', .035, world);

  let selected = 'value', step = 0, hovered = null, motionTime = 0;
  let targetYaw = .10, yaw = .10, targetPitch = .76, pitch = .76;
  let disposed = false, visible = true, frameId = 0, lastFrame = performance.now();
  const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
  let pointerDown = null, dragged = false;
  let width = 1, height = 1;

  function pick(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(hitTargets, false)[0]?.object.userData.project ?? null;
  }
  renderer.domElement.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    pointerDown = { x: event.clientX, y: event.clientY, yaw: targetYaw, pitch: targetPitch, id: event.pointerId, type: event.pointerType };
    dragged = false;
  });
  renderer.domElement.addEventListener('pointermove', event => {
    if (pointerDown) {
      const dx = event.clientX - pointerDown.x, dy = event.clientY - pointerDown.y;
      if (Math.abs(dx) > 7 || (pointerDown.type !== 'touch' && Math.abs(dy) > 7)) dragged = true;
      if (dragged) {
        if (!renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.setPointerCapture(event.pointerId);
        targetYaw = THREE.MathUtils.clamp(pointerDown.yaw + dx * .004, -.6, .7);
        if (pointerDown.type !== 'touch') targetPitch = THREE.MathUtils.clamp(pointerDown.pitch + dy * .002, .58, .98);
      }
    } else {
      hovered = pick(event); renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';
    }
    requestRender();
  });
  renderer.domElement.addEventListener('pointerup', event => {
    if (pointerDown && !dragged) { const id = pick(event); if (id) onSelect(id); }
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
    pointerDown = null; dragged = false; requestRender();
  });
  renderer.domElement.addEventListener('pointercancel', () => { pointerDown = null; dragged = false; });
  renderer.domElement.addEventListener('pointerleave', () => { hovered = null; if (!dragged) pointerDown = null; requestRender(); });
  for (const [id, button] of Object.entries(hotspotButtons)) {
    button.addEventListener('mouseenter', () => { hovered = id; requestRender(); });
    button.addEventListener('mouseleave', () => { hovered = null; requestRender(); });
  }

  function resize() {
    width = container.clientWidth; height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const span = Math.max(7.5, (aspect < 1.1 ? 10.5 : 9.2) / aspect);
    camera.left = -span * aspect / 2; camera.right = span * aspect / 2;
    camera.top = span / 2; camera.bottom = -span / 2;
    camera.updateProjectionMatrix(); requestRender();
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);
  const intersectionObserver = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { lastFrame = performance.now(); requestRender(); }
    else { cancelAnimationFrame(frameId); frameId = 0; }
  });
  intersectionObserver.observe(container);
  const visibilityListener = () => { if (!document.hidden) { lastFrame = performance.now(); requestRender(); } };
  document.addEventListener('visibilitychange', visibilityListener);

  function requestRender() {
    if (!disposed && visible && !document.hidden && !frameId) frameId = requestAnimationFrame(render);
  }

  function render(now) {
    frameId = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - lastFrame) / 1000, .05); lastFrame = now;
    if (!paused) motionTime += dt;
    const lerp = paused ? 1 : 1 - Math.exp(-dt * 8);
    yaw += (targetYaw - yaw) * lerp; pitch += (targetPitch - pitch) * lerp;
    const azimuth = .59 + yaw;
    const cameraRadius = 13;
    camera.position.set(Math.sin(azimuth) * Math.cos(pitch) * cameraRadius, Math.sin(pitch) * cameraRadius, Math.cos(azimuth) * Math.cos(pitch) * cameraRadius);
    camera.lookAt(center);
    let unsettled = Math.abs(targetYaw - yaw) > .001 || Math.abs(targetPitch - pitch) > .001;
    for (const [id, object] of Object.entries(objects)) {
      const targetY = object.baseY + (id === selected ? .16 : id === hovered ? .10 : 0);
      object.group.position.y += (targetY - object.group.position.y) * lerp;
      unsettled ||= Math.abs(targetY - object.group.position.y) > .001;
      object.trim.material = material(id === selected ? '#506d42' : object.color);
    }
    parcelRing.visible = selected === 'value';
    parcelRing.position.x = step === 0 ? -.66 : step === 1 ? .03 : -.2;
    parcelRing.position.z = step === 2 ? .62 : -.33;
    parcelRing.scale.setScalar(selected === 'value' && !paused ? 1 + Math.sin(motionTime * 1.9) * .05 : 1);
    houses.forEach((house, i) => { house.position.y = .22 + (selected === 'value' && step === 1 ? [.05, .15, .09][i] : 0); });
    report.position.y = selected === 'value' && step === 2 ? .62 : .24;
    report.rotation.x = selected === 'value' && step === 2 ? -.68 : -Math.PI / 2;
    cards.forEach((card, i) => {
      const active = selected === 'jobhawk' && i === step;
      card.position.y = .3 + i * .03 + (active ? .12 : 0);
      card.rotation.y = -.08 + i * .06 + (active && !paused ? Math.sin(motionTime * 1.6) * .045 : 0);
    });
    magnifier.position.x = selected === 'citylink' ? [-.28, .13, .49][step] : .30;
    magnifier.position.y = .83 + (selected === 'citylink' && !paused ? Math.sin(motionTime * 1.4) * .035 : 0);
    documents.forEach((doc, i) => { doc.position.y = .3 + i * .035 + (selected === 'citylink' && i === step ? .06 : 0); });
    citationNodes.forEach((node, i) => { node.material = material(selected === 'citylink' && step >= i ? '#728e58' : '#f9f0d4'); });
    scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
    for (const [id, object] of Object.entries(objects)) {
      const anchor = object.group.localToWorld(object.anchor.clone()).project(camera);
      hotspotButtons[id].style.left = `${(anchor.x * .5 + .5) * width}px`;
      hotspotButtons[id].style.top = `${(-anchor.y * .5 + .5) * height}px`;
    }
    renderer.render(scene, camera);
    if (!paused || unsettled || pointerDown) requestRender();
  }

  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); disposed = true; cancelAnimationFrame(frameId); frameId = 0;
    resizeObserver.disconnect(); intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', visibilityListener);
    onFailure?.();
  });
  resize(); requestRender();

  return {
    select(id) { selected = id; step = 0; updateScreen(0); requestRender(); },
    setStep(index) { step = index; if (selected === 'jobhawk') updateScreen(index); requestRender(); },
    setPaused(value) { paused = value; lastFrame = performance.now(); requestRender(); },
    reset() { targetYaw = .10; targetPitch = .76; requestRender(); }
  };
}
