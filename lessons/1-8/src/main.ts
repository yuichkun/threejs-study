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

const arr: number[] = [];

const NUM_OF_TRIANGLES = 100;
for (let i = 0; i < NUM_OF_TRIANGLES; i++) {
  // origin
  arr.push(0);
  arr.push(0);
  arr.push(0);

  // other 2 points
  for (let _ = 0; _ < 2; _++) {
    const x = (Math.random() - 0.5) * 5;
    const y = (Math.random() - 0.5) * 5;
    const z = (Math.random() - 0.5) * 5;
    arr.push(x);
    arr.push(y);
    arr.push(z);
  }
}
console.log(arr);

const positionsArray = new Float32Array(arr);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

const cube = new THREE.Mesh(
  geometry,
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
