import { Canvas } from '@react-three/fiber';
import RoomMesh from './RoomMesh';
import CameraRig from './CameraRig';
import FurnitureLayer from './FurnitureLayer';

export default function RoomScene() {
  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-950">
      <Canvas shadows gl={{ alpha: true }} camera={{ position: [8, 8, 8], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <RoomMesh />
        <FurnitureLayer />
        <CameraRig />
      </Canvas>
    </div>
  );
}
