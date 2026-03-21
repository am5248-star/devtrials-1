"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, OrbitControls, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

function GeometricShield({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { size } = useThree();
  const responsiveScale = Math.min(Math.max(size.width / 1200, 0.7), 1.2);

  useFrame((state, delta) => {
    // Smoothly interpolate rotation based on mouse position
    const targetRotationX = mouse.current[1] * 0.2;
    const targetRotationY = mouse.current[0] * 0.2;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
    
    // Constant slow drift
    meshRef.current.rotation.z += delta * 0.2;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, responsiveScale, 0.1));
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Shield Sphere */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 2]} />
          <MeshWobbleMaterial 
            color="#ff4625" 
            factor={0.4} 
            speed={2} 
            roughness={0} 
            metalness={0.8}
            emissive="#ff4625"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Wireframe Shell */}
        <mesh>
          <octahedronGeometry args={[2.2, 3]} />
          <meshBasicMaterial 
            color="#00d8ff" 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>

        {/* Moving Light Point */}
        <pointLight position={[5, 5, 5]} intensity={50} color="#00d8ff" />
      </Float>
    </group>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <GeometricShield mouse={mouse} />
    </>
  );
}

export default function HeroShield() {
  const mouse = useRef<[number, number]>([0, 0]);

  const onMouseMove = (e: React.MouseEvent) => {
    // Map mouse position to -1 to 1 range
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    ];
  };

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      onMouseMove={onMouseMove}
    >
      <Canvas shadows camera={{ position: [0, 0, 11], fov: 35 }} resize={{ debounce: 0 }}>
        <Scene mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
