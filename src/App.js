
import './App.css';
import * as THREE from 'three'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { AmbientLight, BufferGeometry, Camera, Clock, HemisphereLightHelper, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, Vector3 } from 'three';
import { Environment, GradientTexture, OrbitControls, Plane, Stars, Text, Text3D, useCursor, useHelper, useTexture } from '@react-three/drei';
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
      <directionalLight args={["#ffffff", 1]} position={[1, 1, 0]} />
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




  // useFrame((state) => {

  //   if (object1.current && object2.current && object3.current && raycastRef.current) {

  //     // raycastRef.current.setFromCamera(pointer, state.camera)

  //     // //Change color depending on intersections
  //     // const objectArray = [object1.current, object2.current, object3.current];

  //     // const intersections = raycastRef.current.intersectObjects(objectArray);

  //     // object1.current.position.y = Math.sin(state.clock.getElapsedTime()) * 1.5;
  //     // object2.current.position.y = Math.sin(state.clock.getElapsedTime()) * 1;
  //     // object3.current.position.y = Math.sin(state.clock.getElapsedTime()) * 2;

  //     // for(const object of objectArray) {
  //     //   object.material.color.set("#ff0000")
  //     // }

  //     // for(const intersection of intersections) {
  //     //   intersection.object.material.color.set("#0000ff")
  //     // }





  //   }

  // })


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
        <meshBasicMaterial color={(hovered1) ? "#00ff00" : "#ff0000"} />
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

function ParticleBackground({ objectDistance, sections }) {

  const count = 600;

  const particleRef = useRef();

  const particleArray = new Float32Array(count);

  const { ParticleColor } = useControls({
    ParticleColor: "#ffffff"
  })

  useEffect(() => {

    for (let i = 0; i < count; i++) {
      particleArray[i * 3] = (Math.random() - 0.5) * 10;
      particleArray[i * 3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * sections;
      particleArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particleRef.current.setAttribute('position', new THREE.BufferAttribute(particleArray, 3))

  }, [particleRef])

  return (
    <group>
      <points>
        <bufferGeometry ref={particleRef} />
        <pointsMaterial
          sizeAttenuation
          depthWrite={false}
          size={0.03}
          color={ParticleColor} />
      </points>
    </group>
  )
}




const CustomCamera = ({ cameraRef }) => {
  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: cameraRef.current }), []);
  useFrame(() => cameraRef.current.updateMatrixWorld());

  return <perspectiveCamera ref={cameraRef} args={[35, window.innerWidth / window.innerHeight, 0.1, 100]} position={[0, 0, 6]} />;
};

function ToonMaterial() {

  const { toonColor } = useControls({
    toonColor: "#ffeded"
  })

  return (
    <meshToonMaterial color={toonColor} >
      <GradientTexture
        magFilter={THREE.NearestFilter}
        stops={[0, 0.5, 1]}
        colors={["#eeeeee", "#999999", "#5b5b5b"]} />
    </meshToonMaterial>
  )

}

function ScrollBasedContent() {




  const object1 = useRef();
  const object2 = useRef();
  const object3 = useRef();

  const cameraGroup = useRef();
  const cameraRef = useRef();

  const sectionObjects = [object1, object2, object3]

  const objectDistance = 4;

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {

    scrollY = window.scrollY

  })

  const cursor = {
    x: 0,
    y: 0
  };
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5
  })

  let previousTime = 0;
  useFrame((state) => {


    state.camera.position.y = - scrollY / window.innerHeight * objectDistance;

    const elapsedTime = state.clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5

    cameraGroup.current.position.x += (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime
    cameraGroup.current.position.y += (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime



    if (object1.current && object2.current && object3.current) {

      for (const object of sectionObjects) {
        object.current.rotation.x = state.clock.getElapsedTime() * 0.1
        object.current.rotation.y = state.clock.getElapsedTime() * 0.12
      }

    }

  })

  return (
    <>

      <group ref={cameraGroup}>
        <CustomCamera cameraRef={cameraRef} />
      </group>

      <mesh ref={object1} position-y={- objectDistance * 0} position-x={2}>
        <torusBufferGeometry args={[1, 0.4, 16, 60]} />
        <ToonMaterial/>
      </mesh>

      <mesh ref={object2} position-y={- objectDistance * 1} position-x={-2}>
        <coneBufferGeometry args={[1, 2, 32]} />
        <ToonMaterial/>
      </mesh>

      <mesh ref={object3} position-y={- objectDistance * 2} position-x={2}>
        <torusKnotBufferGeometry args={[0.8, 0.35, 100, 16]} />
        <ToonMaterial/>
      </mesh>

      <ParticleBackground objectDistance={objectDistance} sections={sectionObjects.length} />
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
      // camera={{ position: [0.0, 0.0, 4.0], fov: 50, aspect: viewport.width / viewport.height, near: 0.1, far: 150 }}
      >




        {/* <ReactCube /> */}
        {/* <mesh rotation-x={-Math.PI / 2} position-y={-0.5} receiveShadow>
          <planeBufferGeometry args={[7, 7, 2, 2]}/>
          <meshStandardMaterial roughness={1}/>
        </mesh>
        <ThreeContent /> */}
        {/* <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} /> */}
        {/* <HauntedHouse/> */}

        <ScrollBasedContent />
        <Lightning />

        {/* <fog attach={'fog'} args={['#262837', 1, 15]}/>
        <color attach="background" args={["#262837"]}/> */}

      </Canvas>

      <div className='content_container'>
        <section>
          <h1>CONTENT 1</h1>
        </section>
        <section>
          <h1>CONTENT 2</h1>
        </section>
        <section>
          <h1>CONTENT 3</h1>
        </section>
      </div>



    </div>
  );
}

export default App;
