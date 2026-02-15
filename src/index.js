import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

const container = document.getElementById('container');
const canvas = document.getElementById('view');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
camera.position.set(1, 1, 1);

// HDR IBL
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
new HDRLoader().load(
  'https://threejs.org/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr',
  (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    scene.background = envMap;
    texture.dispose();
    pmremGenerator.dispose();
  },
);

// GLTF with Draco
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader().setDRACOLoader(dracoLoader);
loader.load(
  '/data/GoldenAxe/scene.gltf',
  (gltf) => {
    const model = gltf.scene;

    // PBR: Assume model uses MeshStandardMaterial

    // LOD
    const lod = new THREE.LOD();
    lod.addLevel(model.clone(), 0); // High detail close
    const lowDetail = model.clone(); // Simplify lowDetail as needed
    lod.addLevel(lowDetail, 10); // Low detail far
    scene.add(lod);
  },
  null,
  null,
);

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  }
});

resizeObserver.observe(container);

// window.addEventListener('resize', onResize);

let lastTime = 0;
const requiredElapsed = 1000 / 60; // 60 FPS

function animate(now) {
  requestAnimationFrame(animate);

  const elapsedTime = now - lastTime;

  if (elapsedTime >= requiredElapsed) {
    lastTime = now - (elapsedTime % requiredElapsed);

    controls.update();

    renderer.render(scene, camera);
  }
}
animate();
