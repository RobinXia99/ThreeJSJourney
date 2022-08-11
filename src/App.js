
import './App.css';
import * as THREE from 'three'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { AmbientLight, BufferGeometry, Camera, Clock, HemisphereLightHelper, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, Vector3 } from 'three';
import { Environment, OrbitControls, Plane, Stars, Text, Text3D, useCursor, useHelper, useTexture } from '@react-three/drei';
import { folder, useControls } from 'leva';
import HauntedHouse from './hauntedHouse';



// function ThreeContent() {

//   const [sphereRef, setSphereRef] = useState();
//   const [lightRef, setLightRef] = useState();


//   const matCap = useTexture('textures/whitematcap.jpeg');


//   const { color, roughness, metalness } = useControls({
//     Material: folder({
//       color: '#fff',
//       roughness: {
//         value: 0.7,
//         min: 0,
//         max: 1,
//         step: 0.001
//       },
//       metalness: {
//         value: 0,
//         min: 0,
//         max: 1,
//         step: 0.001
//       }
//     })

//   })


//   // useFrame((state) => {

//   //   let clock = state.clock.getElapsedTime();

//   //   if(sphereRef) {
//   //     sphereRef.rotation.y = 0.1 * clock;
//   //     sphereRef.rotation.x = 0.15 * clock;
//   //   }

//   // })

//   useFrame((state) => {

//     if(sphereRef) {
//       sphereRef.position.x = Math.cos(state.clock.getElapsedTime()) * 1.5
//       sphereRef.position.z = Math.sin(state.clock.getElapsedTime()) * 1.5
//       sphereRef.position.y = Math.abs(Math.sin(state.clock.getElapsedTime() * 3))
//     }

//   })



//   return (
//     <>


//       <mesh ref={setSphereRef} castShadow>
//         <sphereBufferGeometry args={[0.5, 64, 64]} />
//         <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/>
//       </mesh>


//       <ambientLight intensity={0.3} color={0xffffff} />

//       <directionalLight
//       shadow-radius={10}
//       shadow-camera-top={3.5}
//       shadow-camera-right={2}
//       shadow-camera-left={- 2}
//       shadow-camera-bottom={ -2}
//       shadow-camera-far={8}
//       shadow-camera-near={0}
//       ref={setLightRef}
//       shadow-mapSize-height={1024}
//       shadow-mapSize-width={1024 }
//       castShadow
//       intensity={0.5}
//       color={0xffffff}
//       position={[2, 2, -1]}/>

//       {/* {lightRef && <directionalLightHelper args={[lightRef]}/>} */}
//       {lightRef && <cameraHelper args={[lightRef.shadow.camera]}/>}

//       <OrbitControls />

//     </>
//   )

// }

function Lightning() {

  return (
    <>
      <ambientLight args={["#b9d5ff", 0.12]} />
      <OrbitControls />
    </>
  )
}

// function Particles() {

//   const count = 6000;

//   const positions = new Float32Array(count);
//   const colors = new Float32Array(count);

//   const particleRef = useRef();


//   const particleTextures = useTexture({
//     map: '/textures/magic_05.png'
//   })


//   useEffect(() => {



//     for(let i = 0; i < count; i++) {
//       positions[i] = (Math.random() - 0.5) * 10
//       colors[i] = Math.random();
//     }

//     particleRef.current.setAttribute(
//       'position',
//       new THREE.BufferAttribute(positions, 3)
//     )

//     particleRef.current.setAttribute(
//       'color',
//       new THREE.BufferAttribute(colors, 3)
//     )


//   },[particleRef.current])



//   return (
//     <points>
//       <bufferGeometry ref={particleRef}/>
//       <pointsMaterial
//       size={0.1}
//       sizeAttenuation
//       alphaMap={particleTextures.map}
//       map={particleTextures.map}
//       transparent
//       depthWrite={false}
//       vertexColors/>
//     </points>
//   )

// }


function RaycasterTesting() {

  const object1 = useRef();
  const object2 = useRef();
  const object3 = useRef();
  const raycastRef = useRef();

  const racyastOrigin = new THREE.Vector3(- 3, 0, 0);
  const racyastDirection = new THREE.Vector3(10, 0, 0).normalize();

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  useCursor(hovered1 || hovered2 || hovered3);

  // const pointer = new THREE.Vector2();

  // window.addEventListener('mousemove', (event) => {

  //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  // });




  useFrame((state) => {


    
    

    if (object1.current && object2.current && object3.current && raycastRef.current) {

      // raycastRef.current.setFromCamera(pointer, state.camera)

      // //Change color depending on intersections
      // const objectArray = [object1.current, object2.current, object3.current];

      // const intersections = raycastRef.current.intersectObjects(objectArray);

      // object1.current.position.y = Math.sin(state.clock.getElapsedTime()) * 1.5;
      // object2.current.position.y = Math.sin(state.clock.getElapsedTime()) * 1;
      // object3.current.position.y = Math.sin(state.clock.getElapsedTime()) * 2;

      // for(const object of objectArray) {
      //   object.material.color.set("#ff0000")
      // }

      // for(const intersection of intersections) {
      //   intersection.object.material.color.set("#0000ff")
      // }

  



    }

  })

  useEffect(() => {

    console.log(raycastRef.current.intersectObjects([object1.current, object2.current, object3.current]))

  }, [raycastRef])

  useEffect(() => {


  }, [])


  return (
    <>

      <raycaster ref={raycastRef} args={[racyastOrigin, racyastDirection]} />

      <mesh
      position-x={-2}
      ref={object1}
      onPointerEnter={(e) => {
        setHovered1(true)
        e.stopPropagation()
      }}
      onPointerLeave={() => setHovered1(false)}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={(hovered1) ?  "#00ff00" : "#ff0000"} />
      </mesh>

      <mesh
      ref={object2}
      onPointerEnter={(e) => {
        setHovered2(true)
        e.stopPropagation()
      }}
      onPointerLeave={() => setHovered2(false)}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={(hovered2) ? "#00ff00" : "#ff0000"} />
      </mesh>

      <mesh
      position-x={2}
      ref={object3}
      onPointerEnter={(e) => {
        setHovered3(true)
        e.stopPropagation()
      }}
      onPointerLeave={() => setHovered3(false)}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={(hovered3) ? "#00ff00" : "#ff0000"} />
      </mesh>

    </>
  )

}




function App() {

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };


  return (
    <div className="App">
      {/* <RedCube></RedCube> */}

      <Canvas
        className='webgl'
        camera={{ position: [0, 1, 5], fov: 50, aspect: viewport.width / viewport.height, near: 0.1, far: 150 }}
      >

        {/* <ReactCube /> */}
        {/* <mesh rotation-x={-Math.PI / 2} position-y={-0.5} receiveShadow>
          <planeBufferGeometry args={[7, 7, 2, 2]}/>
          <meshStandardMaterial roughness={1}/>
        </mesh>
        <ThreeContent /> */}
        {/* <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} /> */}
        {/* <HauntedHouse/> */}

        <Lightning />
        <RaycasterTesting />
        {/* <fog attach={'fog'} args={['#262837', 1, 15]}/>
        <color attach="background" args={["#262837"]}/> */}

      </Canvas>



    </div>
  );
}

export default App;
