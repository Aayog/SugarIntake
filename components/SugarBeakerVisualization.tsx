'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BeakerProps {
  fillPercentage: number;
}

function Beaker({ fillPercentage }: BeakerProps) {
  const beakerRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  // Beaker dimensions
  const beakerHeight = 4;
  const beakerRadius = 1;
  const glassThickness = 0.05;

  // Calculate liquid height based on fill percentage
  const liquidHeight = (fillPercentage / 100) * beakerHeight;
  const liquidYPosition = -beakerHeight / 2 + liquidHeight / 2;

  return (
    <group>
      {/* Outer beaker glass (transparent) */}
      <mesh ref={beakerRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[beakerRadius, beakerRadius, beakerHeight, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner beaker glass for thickness */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry
          args={[beakerRadius - glassThickness, beakerRadius - glassThickness, beakerHeight, 32, 1, true]}
        />
        <meshPhysicalMaterial
          color="#bae6fd"
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom of beaker */}
      <mesh position={[0, -beakerHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, beakerRadius, 32]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Liquid inside beaker */}
      {fillPercentage > 0 && (
        <mesh ref={liquidRef} position={[0, liquidYPosition, 0]}>
          <cylinderGeometry args={[beakerRadius - glassThickness * 2, beakerRadius - glassThickness * 2, liquidHeight, 32]} />
          <meshPhysicalMaterial
            color={fillPercentage > 100 ? '#ef4444' : '#fbbf24'}
            transparent
            opacity={0.7}
            roughness={0.2}
            metalness={0.3}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
      )}

      {/* Measurement marks on the beaker */}
      {[0.25, 0.5, 0.75, 1.0].map((mark, index) => (
        <mesh
          key={index}
          position={[beakerRadius + 0.01, -beakerHeight / 2 + mark * beakerHeight, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
      ))}
    </group>
  );
}

interface SugarBeakerVisualizationProps {
  fillPercentage: number;
}

export default function SugarBeakerVisualization({ fillPercentage }: SugarBeakerVisualizationProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <Beaker fillPercentage={fillPercentage} />
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        <gridHelper args={[10, 10, '#64748b', '#94a3b8']} position={[0, -2.5, 0]} />
      </Canvas>
    </div>
  );
}
