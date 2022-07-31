
import './App.css';
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { AmbientLight, Camera, Clock, HemisphereLightHelper, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, Vector3 } from 'three';
import { Environment, OrbitControls, Plane, Text, Text3D, useHelper, useTexture } from '@react-three/drei';
import { folder, useControls } from 'leva';

// function Text() {

//   // const config = useMemo(() => {
//   //   (
//   //     {
//   //       size: 0.5,
//   //       height: 0.2,
//   //       curveSegments: 12,
//   //       bevelEnabled: true,
//   //       bevelThickness: 0.03,
//   //       bevelSize: 0.02,
//   //       bevelOffset: 0,
//   //       bevelSegments: 5
//   //     }

//   //   )
//   // }, [])

//   const matCap = useTexture('textures/whitematcap.jpeg');

//   const textRef = useRef();

//   const config = {
//     size: 0.5,
//     height: 0.2,
//     curveSegments: 5,
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 4
//   }

//   useEffect(() => {
//     textRef.current.geometry.center()
    
//     // textRef.current.geometry.translate(
//     //   - (textRef.current.geometry.boundingBox.max.x - 0.02) * 0.5,
//     //   - (textRef.current.geometry.boundingBox.max.y - 0.02) * 0.5,
//     //   - (textRef.current.geometry.boundingBox.max.z -0.03) * 0.5,

//     // )
//   }, [textRef.current])

  

//   return (
//     <>
//       {/* <mesh>
//         <boxBufferGeometry args={[1, 1, 1, 2, 2, 2]} />
//         <meshBasicMaterial />
//       </mesh> */}
//       <Text3D ref={textRef} font={'fonts/helvetiker_regular.typeface.json'} {...config}>
//         Hello Three.js
//         <meshMatcapMaterial matcap={matCap}/>
//       </Text3D>

//     </>

//   )

// }






// function LimestoneTexture() {


//   // const textures = useTexture({
//   //   map: '/textures/limestone-cliffs_albedo.png',
//   //   displacementMap: '/textures/limestone-cliffs_height.png',
//   //   aoMap: '/textures/limestone-cliffs_ao.png',
//   //   roughnessMap: '/textures/limestone-cliffs_roughness.png',
//   //   metalnessMap: '/textures/limestone-cliffs_metallic.png',
//   //   normalMap: '/textures/limestone-cliffs_normal-ogl.png'
//   // })

//   // const { metalness, roughness, wireframe, aoMapIntensity, displacementScale } = useControls("Material", {
//   //   metalness: {
//   //     value: 0.7,
//   //     min: 0,
//   //     max: 1,
//   //     step: 0.0001
//   //   },
//   //   roughness: {
//   //     value: 0.2,
//   //     min: 0,
//   //     max: 1,
//   //     step: 0.0001
//   //   },
//   //   wireframe: false,
//   //   texture: folder({
//   //     aoMapIntensity: {
//   //       value: 0.5,
//   //       min: 0,
//   //       max: 10,
//   //       step: 0.0001
//   //     },
//   //     displacementScale: {
//   //       value: 0.3,
//   //       min: 0,
//   //       max: 10,
//   //       step: 0.0001
//   //     }
//   //   })

//   // })



//   // {...textures} displacementScale={displacementScale} aoMapIntensity={aoMapIntensity}

//   return (
//     <>
//     <meshStandardMaterial metalness={metalness} roughness={roughness} wireframe={wireframe}  />
//     </>

//   )

// }

function ThreeContent() {

  const [lightRef, setLightRef] = useState();

  const rectLightRef = useRef();

  const matCap = useTexture('textures/whitematcap.jpeg');

  const sphereRef = useRef();
  const boxRef = useRef();
  const torusRef = useRef();

  const { color, roughness, metalness } = useControls({
    Material: folder({
      color: '#fff',
      roughness: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.001
      },
      metalness: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.001
      }
    })
    
  })


  useFrame((state) => {

    let clock = state.clock.getElapsedTime();

    if(sphereRef.current) {
      sphereRef.current.rotation.y = 0.1 * clock;
      sphereRef.current.rotation.x = 0.15 * clock;
    }
    if(boxRef.current) {
      boxRef.current.rotation.y = 0.1 * clock;
      boxRef.current.rotation.x = 0.15 * clock;
    }
    if(torusRef.current) {
      torusRef.current.rotation.y = 0.1 * clock;
      torusRef.current.rotation.x = 0.15 * clock;
    }

  })

  // useEffect(() => {
  //   sphereRef.current.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphereRef.current.geometry.attributes.uv.array, 2))

  //   console.log("hi")
  // },[sphereRef])

  // useEffect(() => {
  //   planeRef.current.geometry.setAttribute('uv2', new THREE.BufferAttribute(planeRef.current.geometry.attributes.uv.array, 2))

  // },[planeRef])

  // useEffect(() => {
  //   torusRef.current.geometry.setAttribute('uv2', new THREE.BufferAttribute(torusRef.current.geometry.attributes.uv.array, 2))

  // },[torusRef])

  // function createParticles() {
  //   let particles = [];

  //   for(let i = 0; i < 250; i++) {
  //     let x = (Math.random() - 0.5) * 10;
  //     let y = (Math.random() - 0.5) * 10;
  //     let z = (Math.random() - 0.5) * 10;
  //     particles[i] = [x, y ,z]; 
  //   }
  //   return particles;
  // }

  // const particles = createParticles().map((pos, i) => (
    
  //     <mesh key={i}  position={pos} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} scale={Math.random() - 0.5} >
  //       <octahedronBufferGeometry args={[0.5]} />
  //       <meshMatcapMaterial matcap={matCap}/>
  //     </mesh>
    
    
  // ));

  useEffect(() => {
    rectLightRef.current.lookAt(new THREE.Vector3())
  },[rectLightRef.current])



  return (
    <>

      <mesh ref={sphereRef} position={[-1.5, 0, 0]}>
        <sphereBufferGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      <mesh ref={boxRef}>
        <boxBufferGeometry args={[0.65, 0.65, 0.65, 2, 2, 2]} do />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/>
      </mesh>

      <mesh ref={torusRef} position={[1.5, 0, 0]}>
        <torusBufferGeometry args={[0.3, 0.2, 64,  128]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/>
      </mesh>

      <ambientLight intensity={0.3} color={0xffffff} />
      <hemisphereLight intensity={0.3} color={0xff0000} groundColor={0x0000ff}/>
      
      <directionalLight ref={setLightRef} intensity={0.3} color={0x00fffc} position={[1, 0.25, 0]}/>
      {lightRef && <directionalLightHelper args={[lightRef, 0.3]}/>}

      <pointLight intensity={0.5} color={0xff9000} position={[1, - 0.5, 1]} distance={3}/>

      <rectAreaLight ref={rectLightRef} intensity={5} color={0x4e00ff} width={1} height={1} position={[- 1.5, 0, 1.5]}/>
      
      <spotLight position={[0, 2, 3]} intensity={1} distance={6} color={0x78ff00} angle={Math.PI * 0.1} penumbra={0.25} decay={1}/>

      {/* <pointLight ref={lightRef} position={[2, 3, 4]} intensity={0.5} /> */}
      <OrbitControls />
      {/* <Environment files={'/chinese_garden_4k.hdr'} background={true}/> */}
      {/* {particles} */}

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

      <Canvas className='webgl' camera={{ position: [0, 0, 3], fov: 75, aspect: viewport.width / viewport.height, near: 0.1, far: 150 }}>
        {/* <ReactCube /> */}
        <mesh rotation-x={-Math.PI / 2} position-y={-1}>
          <planeBufferGeometry args={[10, 10, 2, 2]}/>
          <meshStandardMaterial roughness={0.45} metalness={0.7}/>
        </mesh>
        <ThreeContent />
      </Canvas>



    </div>
  );
}

export default App;
