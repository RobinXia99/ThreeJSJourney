import React, { Fragment, useEffect, useRef, useState } from "react";
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import { Mesh } from "three";
import * as dat from 'dat.gui';
import { Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from 'gsap';

const ReactCube = () => {

    const meshRef = useRef();

    const [data, setData] = useState({
        color: 0xff0000,
        wireframe: false,
        visible: true,
        spin: () => {
            gsap.to(meshRef.current.rotation, { duration: 1, y: meshRef.current.rotation.y + 5})
        }
    })

    useEffect(() => {

        let gui = new dat.GUI({ closed: true, width: 350 })

        gui
            .addColor(data, 'color')
            .name('Color')
            .onChange(() => {
                setData({ ...data })
            })

        gui
            .add(data, 'visible')
            .name('Visibility')
            .onChange(() => {
                setData({ ...data })
            })

        gui
            .add(data, 'wireframe')
            .name('Wireframe')
            .onChange(() => {
                setData({ ...data })
            })

        gui
            .add(meshRef.current.position, 'y')
            .min(-3)
            .max(3)
            .step(0.01)
            .name("elevation")

        
        gui
        .add(data, 'spin')


    }, [])


    return (
        <mesh ref={meshRef} visible={data.visible}>
            <boxBufferGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe={data.wireframe} />
        </mesh>

    )

}

export default ReactCube;