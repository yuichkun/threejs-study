import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, Math.PI / 2));

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    color: "#ff00ff",
    wireframe: true,
  })
);
scene.add(cube);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

let cameraAngle = 0;
const initialCameraPos = camera.position.clone();
const CAMERA_DISTANCE = initialCameraPos.length();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  const x = CAMERA_DISTANCE * Math.sin(cameraAngle);
  const z = CAMERA_DISTANCE * Math.cos(cameraAngle);
  camera.position.set(x, camera.position.y, z);
  cameraAngle += 0.01;
}

animate();
