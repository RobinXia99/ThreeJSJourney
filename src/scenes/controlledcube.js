import { useEffect } from "react";
import * as THREE from 'three';
import gsap from "gsap";

const ControlledCube = ({ isAnimated }) => {

    useEffect(() => {

        const scene = new THREE.Scene();

        let clock = new THREE.Clock()

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x0000ff })
        );

        scene.add(mesh);

        const viewport = {
            width: 800,
            height: 600
        };

        const camera = new THREE.PerspectiveCamera(75, viewport.width / viewport.height);
        camera.position.z = 3;



        scene.add(camera);

        const canvas = document.querySelector('.webgl2')

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });

        renderer.setSize(viewport.width, viewport.height);
        renderer.render(scene, camera);


        const animationStart = () => {



            const elapsedTime = clock.getElapsedTime();
    
            mesh.position.y = Math.sin(elapsedTime)
            mesh.rotation.y = Math.cos(elapsedTime)
    
            renderer.render(scene, camera);
    
            window.requestAnimationFrame(animationStart)
    
    
        }

        if (isAnimated) {
            animationStart()
        } else if (isAnimated != null) {
            window.cancelAnimationFrame(animationStart);
        }
        

    }, [isAnimated])


    

    







    return (
        <canvas className="webgl2"></canvas>
    )

}

export default ControlledCube;