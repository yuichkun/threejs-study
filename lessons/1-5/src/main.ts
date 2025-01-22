import * as THREE from "three";
import gsap from "gsap";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

gsap.to(mesh.position, {
  duration: 1,
  delay: 1,
  x: 2,
});
gsap.to(mesh.position, {
  duration: 1,
  delay: 2,
  x: 0,
});

const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
