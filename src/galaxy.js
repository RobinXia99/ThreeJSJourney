import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from 'three'

function Galaxy() {

    const galaxyRef = useRef();
  
    const { 
      ParticleCount,
      ParticleSize,
      GalaxyRadius,
      GalaxyBranches,
      Spin,
      Randomness,
      RandomnessPower,
      InsideColor,
      OutsideColor } = useControls({
  
      ParticleCount: {
  
        value: 8000,
        min: 1000,
        max: 100000,
        step: 100,
      },
      ParticleSize: {
  
        value: 0.02,
        min: 0.001,
        max: 0.1,
        step: 0.001
      },
      GalaxyRadius: {
  
        value: 5,
        min: 1,
        max: 10,
        step: 1
      },
      GalaxyBranches: {
  
        value: 3,
        min: 2,
        max: 20,
        step: 1
      },
      Spin: {
  
        value: 1,
        min: -5,
        max: 5,
        step: 0.01
      },
      Randomness: {
  
        value: 0.2,
        min: 0,
        max: 2,
        step: 0.001
      },
      RandomnessPower: {
        
        value: 3,
        min: 1,
        max: 10,
        step: 0.001
      },
      InsideColor: "#ff6030",
      OutsideColor: "#1b3984"
  
    })
  
    // const positions = useMemo(
  
    //   () => new Float32Array(generateParticles(count))
  
    // ,[])
  
    const positions = new Float32Array(ParticleCount * 3)
    const colors = new Float32Array(ParticleCount * 3)
  
  
  
    useEffect(() => {
  
      const colorInside = new THREE.Color(InsideColor);
      const colorOutside = new THREE.Color(OutsideColor);
  
      for (let i = 0; i < ParticleCount; i++) {
  
        const i3 = i * 3;
  
        const radius = Math.random() * GalaxyRadius;
        const branchAngle = (i % GalaxyBranches) / GalaxyBranches * Math.PI * 2;
        const spinAngle = radius * Spin
  
        const randomX = Math.pow(Math.random(), RandomnessPower) * (Math.random() < 0.5 ? 1 : - 1) 
        const randomY = Math.pow(Math.random(), RandomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
        const randomZ = Math.pow(Math.random(), RandomnessPower) * (Math.random() < 0.5 ? 1 : - 1)
  
  
        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
  
        const mixedColor = colorInside.clone();
  
        mixedColor.lerp(colorOutside, radius / GalaxyRadius)
  
        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
  
      }
  
      galaxyRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      galaxyRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
      console.log('attributes set')
  
  
  
    }, [galaxyRef.current, ParticleCount, GalaxyBranches, GalaxyRadius, Spin, Randomness, RandomnessPower, InsideColor, OutsideColor])
  
    return (
      <>
  
        <points ref={galaxyRef}>
  
          <bufferGeometry>
  
            {/* <bufferAttribute
              attachObject={['attributes', 'position']}
              count={count}
              array={positions}
              itemSize={3}
            /> */}
  
          </bufferGeometry>
  
          <pointsMaterial
            size={ParticleSize}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors/>
        </points>
  
      </>
  
    )
  
  }

  export default Galaxy;