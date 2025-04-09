"use client"

import './App.css'
import { Canvas } from '@react-three/fiber'
import { Sky, GizmoHelper, GizmoViewport, Bvh } from '@react-three/drei'
import { InfiniteGrid } from '@/components/three/InfiniteGrid'
import { FirstPersonController } from '@/components/three/FirstPersonController'
import { Perf } from 'r3f-perf'
import { MeshCreator } from '@/components/three/MeshCreator'
import { useAppStore } from '@/store/appStore'
import { useEffect, useRef, useState } from 'react'
import { Crosshair } from '@/components/three/Crosshair'
import * as THREE from 'three'
import { StoredObjects } from '@/components/three/StoredObjects'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { useThree } from '@react-three/fiber'
import { Ocean } from '@/components/three/Ocean'
import { useObjectStore } from '@/store/appStore'

const FocusDetector = () => {
  const { setUIFocused } = useAppStore()
  
  useEffect(() => {
    const handleFocusChange = () => {
      const activeElement = document.activeElement
      const isInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA'
      setUIFocused(isInput)
    }
    
    document.addEventListener('focusin', handleFocusChange)
    document.addEventListener('focusout', handleFocusChange)
    
    handleFocusChange()
    
    return () => {
      document.removeEventListener('focusin', handleFocusChange)
      document.removeEventListener('focusout', handleFocusChange)
    }
  }, [setUIFocused])
  
  return null
}

function OceanAndGridManager() {
  const [showOcean, setShowOcean] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // @ts-ignore - Accessing custom window property
    const settings = window.__environmentSettings
    if (settings && typeof settings.showOcean === 'boolean') {
      setShowOcean(settings.showOcean)
    }

    const intervalId = setInterval(() => {
      // @ts-ignore
      const settings = window.__environmentSettings
      if (settings && typeof settings.showOcean === 'boolean') {
        setShowOcean(settings.showOcean)
      }
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  if (showOcean === null) return null; // <- don’t render anything until client-side

  return (
    <>
      {showOcean ? <Ocean /> : <InfiniteGrid />}
    </>
  )
}


function ExampleCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData = {
        isUserCreated: true,
        name: "Example Cube"
      }
    }
  }, [])

  return (
    <mesh ref={meshRef} position={[2, 1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function ExampleGroup() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.userData = {
        isUserCreated: true,
        name: "Example Group"
      }
    }
  }, [])

  return (
    <group ref={groupRef} position={[-2, 1, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
      <mesh position={[0.7, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[0.35, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.3, 0.8]} />
        <meshStandardMaterial color="lime" />
      </mesh>
    </group>
  )
}

function SceneExporter() {
  const { scene } = useThree()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore - We're adding a custom property to window
      window.__threeScene = scene
    }
  }, [scene])

  return null
}

export default function ThreeJSCanvas({
  visible = true
}: {
  visible?: boolean
}) {
  const exportScene = () => {
    if (typeof window === 'undefined') return

    // @ts-ignore
    const scene = window.__threeScene
    if (!scene) return

    console.log('Original scene:', scene)

    const exportScene = new THREE.Scene()

    scene.traverse((object: THREE.Object3D) => {
      if (object.userData && object.userData.isUserCreated === true) {
        const clonedObject = object.clone()
        exportScene.add(clonedObject)
      }
    })

    if (exportScene.children.length === 0) {
      console.warn('No user-created objects found to export')
      alert('No user-created objects found to export. Try creating some objects first.')
      return
    }

    const exporter = new GLTFExporter()
    exporter.parse(
      exportScene,
      (gltf: any) => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'scene.gltf'
        link.click()
      },
      (error: ErrorEvent) => {
        console.error('An error happened during export:', error)
        alert('Failed to export scene: ' + error.message)
      },
      { binary: false }
    )
  }

  return (
    <>
      <Canvas
        style={{
          display: visible ? 'block' : 'none',
        }}
        gl={{
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          antialias: true,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={Math.PI * 2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, 5, -2]}
          intensity={Math.PI}
          color="#8088ff"
        />
        <hemisphereLight
          args={["#ffffff", "#8888ff", 0.7]}
          position={[0, 10, 0]}
        />
        <Sky
          distance={450000}
          sunPosition={[5, 1, 2]}
          inclination={0.1}
          azimuth={0.5}
          rayleigh={0.5}
          turbidity={10}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        {visible && <FirstPersonController />}
        {visible && <OceanAndGridManager />}
        <Bvh>
          <StoredObjects />
        </Bvh>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport labelColor="black" />
        </GizmoHelper>
        {visible && <MeshCreator />}
        {visible && <SceneExporter />}
      </Canvas>

      {visible && (
        <>
          <FocusDetector />
          <Crosshair />
          <button
            onClick={exportScene}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              padding: '8px 16px',
              background: '#4a5568',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              zIndex: 100
            }}
          >
            Export Scene
          </button>
        </>
      )}
    </>
  )
}
