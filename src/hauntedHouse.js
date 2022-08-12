import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function House() {


    const [lightRef, setLightRef] = useState();
    const doorRef = useRef();

    const textures = useTexture({
        map: '/textures/Door_Wood_001_basecolor.jpg',
        displacementMap: '/textures/Door_Wood_001_height.png',
        aoMap: '/textures/Door_Wood_001_ambientOcclusion.jpg',
        roughnessMap: '/textures/Door_Wood_001_roughness.jpg',
        metalnessMap: '/textures/Door_Wood_001_metallic.jpg',
        normalMap: '/textures/Door_Wood_001_normal.jpg',
        alphaMap: '/textures/Door_Wood_001_opacity.jpg'
    })

    useEffect(() => {
    doorRef.current.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(doorRef.current.geometry.attributes.uv.array, 2))

  },[doorRef])



    return (
        <>
            <group>

                <mesh position-y={2.5 + 0.5} rotation-y={Math.PI * 0.25}>
                    <coneBufferGeometry args={[3.5, 1, 4]} />
                    <meshStandardMaterial color={'#b35f45'} />
                </mesh>

                <mesh position-y={2.5 / 2}>
                    <boxBufferGeometry args={[4, 2.5, 4]} />
                    <meshStandardMaterial color={'#ac8e82'} />
                </mesh>

                <mesh position-z={2 + 0.012} position-y={1} ref={doorRef}>
                    <planeBufferGeometry args={[2.2, 2.2, 64, 64]} />
                    <meshStandardMaterial
                        {...textures}
                        transparent={true}
                        displacementScale={0.1}
                    />
                </mesh>

                <pointLight ref={setLightRef} args={['#ff7d46', 1, 7]} position={[0, 2, 2.8]} />
                {/* {lightRef && <pointLightHelper args={[lightRef, 0.5]} />} */}
            </group>
        </>
    )
}

function Bush({ position, scale }) {


    return (
        <mesh position={position} scale={scale}>
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={'#89c854'} />
        </mesh>
    )
}


function HauntedHouse() {


    const createGravestones = () => {


        let gravestones = [];

        for (let i = 0; i < 50; i++) {

            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 6 + 3
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;

            gravestones[i] = [x, 0.3, z]

        }

        return gravestones;

    }

    function Gravestone({ position, rotation }) {

        return (
            <mesh position={position} rotation={rotation}>
                <boxBufferGeometry args={[0.6, 0.8, 0.2]} />
                <meshStandardMaterial color={'#b2b6b1'} />
            </mesh>
        )
    }

    const Gravestones = createGravestones().map((pos, index) => (
        <Gravestone key={index} position={pos} rotation={[0, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4]} />
    ));


    const [ghost1, setGhost1] = useState();


    useFrame((state) => {



        if(ghost1) {

            ghost1.position.x = Math.cos(state.clock.getElapsedTime()) * 4;
            ghost1.position.z = Math.sin(state.clock.getElapsedTime()) * 4;

        }

    })

    return (
        <>
            <House />

            <group>
                <Bush position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} />
                <Bush position={[1.4, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} />
            </group>

            <mesh rotation={[- Math.PI / 2, 0, 0]}>
                <planeBufferGeometry args={[20, 20]} />
                <meshStandardMaterial color={"#a9c388"} />
            </mesh>

            <group>
                {Gravestones}
            </group>

            <group>
                <pointLight ref={setGhost1} args={['#ff00ff', 2, 3]}/>
                <pointLight args={['#00ffff', 2, 3]}/>
                <pointLight args={['#ffff00', 2, 3]}/>
            </group>

        </>
    )

}

export default HauntedHouse;