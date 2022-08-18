import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon"

const PhysicSphere = (props) => {

    const [ref] = useSphere(() => ({
      mass: 10,
      angularDamping: 0.5,
      sleepSpeedLimit: 0.2,
      args: [1],
      ...props
    }))
  
    return (
      <mesh ref={ref} castShadow>
        <sphereBufferGeometry args={[1]} />
        <meshStandardMaterial />
      </mesh>
    )
  
  }
  
  const PhysicBox = (props) => {
  
    const [ref] = useBox(() => ({
      mass: 11,
      args: [1,1,1],
      ...props
    }))
  
    return (
      <mesh ref={ref} castShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#ff0000"} />
      </mesh>
    )
  
  }
  
  const PhysicPlane = (props) => {
  
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
      ...props
    }))
  
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry args={[25, 25, 2, 2]} />
        <meshStandardMaterial color={"#999999"} />
      </mesh>
    )
  }
  
  const PhysicsContent = () => {
  
    return (
      <Physics allowSleep gravity={[0,-9.8, 0]}>
        <PhysicSphere position={[0, 10, 0]} />
        <PhysicBox position={[0, -1, 0]} />
        <PhysicPlane position={[0, -1, 0]} />
      </Physics>
    )
  
  }

  export default PhysicsContent;