/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react'
import { useGLTF, useAnimations, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function FoxModel({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Fox.gltf')
  const { actions } = useAnimations(animations, group)
  const [hovered, setHovered] = useState();
  
  useCursor(hovered, 'Pointer', 'Auto');


  // Run, Survey, Walk - Animations

  const foxAction = useRef(false);

  const playAction = () => {
    foxAction.current = !foxAction.current;
  }

  console.log(actions)


  useFrame(() => {
    if(foxAction.current) {
      actions.Survey.play()
    } else if(!foxAction.current){
      actions.Survey.stop()
    }
  })


  return (
    <group
    ref={group}
    {...props}
    dispose={null}
    onClick={() => playAction()}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}>
      <group>
        <group name="root">
          <primitive object={nodes._rootJoint} />
        </group>
        <skinnedMesh name="fox" geometry={nodes.fox.geometry} material={materials.fox_material} skeleton={nodes.fox.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Fox.gltf')
