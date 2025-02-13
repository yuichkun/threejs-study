import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LoopSubdivision } from "three-subdivide";

function SubdividedCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Start with an octahedron for a more crystal-like base shape
    const baseGeometry = new THREE.OctahedronGeometry(1, 0);
    return LoopSubdivision.modify(baseGeometry, 3, {
      split: true,
      preserveEdges: true,
      flatOnly: false,
    });
  }, []);

  // Animate the crystal
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.2}
        roughness={0.1}
        transmission={0.9}
        thickness={0.5}
        envMapIntensity={1}
      />
      <meshStandardMaterial wireframe color="purple" side={THREE.DoubleSide} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 3, 3], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <color attach="background" args={["#111"]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment map for realistic reflections */}
      <Environment preset="sunset" />

      <SubdividedCrystal />
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export default App;
