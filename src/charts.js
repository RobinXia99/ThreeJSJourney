import './styles/chart.css'
import { ContactShadows, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'
import gsap from 'gsap'

export const Charts = ({ values, setIsShowingPopup }) => {
  const positions = [-3, -1.5, 0, 1.5, 3]

  const [box1, setBox1Ref] = useState()
  const [box2, setBox2Ref] = useState()
  const [box3, setBox3Ref] = useState()
  const [box4, setBox4Ref] = useState()
  const [box5, setBox5Ref] = useState()

  const arrOfRefs = [setBox1Ref, setBox2Ref, setBox3Ref, setBox4Ref, setBox5Ref]
  const arrOfBoxes = [box1, box2, box3, box4, box5]

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useEffect(() => {
    if ((box1 && box2 && box3 && box4, box5)) {
      arrOfBoxes.forEach((box) => {
        gsap.timeline().from(box.scale, {
          y: 0,
          duration: 0.7,
        })
      })
    }
  }, [box1, box2, box3, box4, box5])

  return (
    <group position={[0, -1, 0]}>
      {values.map((value, i) => (
        <mesh
          key={i}
          position={[positions[i], value / 2, 0]}
          ref={arrOfRefs[i]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => setIsShowingPopup(true)}
        >
          <meshStandardMaterial color={'pink'} />
          <boxBufferGeometry args={[1, value]} />
          <Label percent={value} ypos={value / 2 + 1} />
        </mesh>
      ))}
      {/* <ContactShadows frames={1} scale={10} position={[0, 0, 0]} far={1} blur={5} opacity={0.5} color="#204080" /> */}
      <gridHelper args={[15, 15, 'white']} />
    </group>
  )
}

export const Label = ({ percent, ypos }) => {
  const [visible, setVisible] = useState()

  return (
    <group>
      <Html
        position={[0, ypos, 0]}
        center
        transform
        occlude
        onOcclude={setVisible}
        style={{ transition: 'all 0.3s', opacity: visible ? 0 : 1, transform: `scale(${visible ? 0.25 : 1})` }}
      >
        <span className="chart_label">{percent}0%</span>
      </Html>
    </group>
  )
}
