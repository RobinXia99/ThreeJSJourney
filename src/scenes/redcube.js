
import { useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../App.css';
import * as dat from 'dat.gui';

const RedCube = () => {

    useEffect(() => {


        // Sizes
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, viewport.width / viewport.height, 0.1, 100);
        // const camera = new THREE.OrthographicCamera(- 1 * (viewport.width / viewport.height), 1 * (viewport.width / viewport.height), 1, - 1, 0.1, 100);

        // camera.position.x = 2;
        // camera.position.y = 2;
        camera.position.z = 3;

        

        scene.add(camera);

        // // Red Cube 
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        // const mesh = new THREE.Mesh(geometry, material);
        // // mesh.position.x = 0.7
        // // mesh.position.y = -0.6
        // // mesh.position.z = 1
        // mesh.position.set(0.7, -0.6, 1);
        // scene.add(mesh);

        // // Scale
        // mesh.scale.set(2, 0.5, 0.5)

        // // Rotation
        // mesh.rotation.reorder("YXZ");
        // mesh.rotation.y = Math.PI * 0.25
        // mesh.rotation.x = Math.PI * 0.25

        


        // Group
        const group = new THREE.Group()
        
        const parameters = {
            color: 0xff0000,
            spin: () => {
                gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + 5})
            }
        }

        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2),
            new THREE.MeshBasicMaterial( {
                color: parameters.color
            } )
        );

        const cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        );

        const cube3 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial( { color: 0x0000ff } )
        );

        
        

        // cube2.position.x = - 2
        // cube3.position.x = 2

        scene.add(cube);
        // group.add(cube2)
        // group.add(cube3)


        // Axes Helper
        // const axesHelper = new THREE.AxesHelper()
        // scene.add(axesHelper);

        // Debug

        const gui = new dat.GUI({closed: true, width: 350})

        gui
        .add(cube.position, 'y')
        .min(-3)
        .max(3)
        .step(0.01)
        .name("elevation")

        gui
        .add(cube, 'visible')
        
        gui
        .add(cube.material, 'wireframe')

        gui
        .addColor(parameters, 'color')
        .onChange(() => {
            cube.material.color.set(parameters.color)
        })

        gui
        .add(parameters, 'spin')

        console.log('hi')

        // Renderer
        const canvas = document.querySelector('.webgl')

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });

        renderer.setSize(viewport.width, viewport.height);
        renderer.render(scene, camera);

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        // Clock

        let clock = new THREE.Clock()


        // gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })
        // gsap.to(cube.position, { duration: 1, delay: 2.5, x: 0 })
        
        window.addEventListener('resize', () => {
            viewport.width = window.innerWidth
            viewport.height = window.innerHeight

            camera.aspect = viewport.width / viewport.height
            camera.updateProjectionMatrix()

            renderer.setSize(viewport.width, viewport.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        // Animations


        const tick = () => {

            

            const elapsedTime = clock.getElapsedTime();

            // cube.rotation.y = clock.getElapsedTime();

            // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
            // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
            // camera.position.y = cursor.y * 5

            // camera.lookAt(cube.position)


            // const elapsedTime = clock.getElapsedTime();

            controls.update();

            renderer.render(scene, camera);

            window.requestAnimationFrame(tick)

            
        }

        tick()



    }, [])



    return (
        <canvas className='webgl'></canvas>
    )
}

export default RedCube;