import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useUIStore } from '../../store/uiStore';
import { useRoomsStore, selectActiveRoom } from '../../store/roomsStore';

const CAMERA_PRESETS = {
  '3d': { pos: [8, 8, 8], target: [0, 0, 0] },
  top: { pos: [0, 12, 0], target: [0, 0, 0] },
  front: { pos: [0, 2, 10], target: [0, 1.5, 0] },
  side: { pos: [10, 2, 0], target: [0, 1.5, 0] },
};

export default function CameraRig() {
  const { camera } = useThree();
  const cameraView = useUIStore((s) => s.cameraView);
  const room = useRoomsStore(selectActiveRoom);
  const transforming = useRoomsStore((s) => s.transforming);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !transforming;
    }
  }, [transforming]);

  useEffect(() => {
    const preset = CAMERA_PRESETS[cameraView];
    if (!preset) return;

    // Scale positions based on room size
    const scale = Math.max(room.width, room.length) / 5;
    const pos = preset.pos.map((v, i) => (i === 1 ? v : v * scale));

    camera.position.set(pos[0], pos[1], pos[2]);
    if (controlsRef.current) {
      controlsRef.current.target.set(...(preset.target as [number, number, number]));
      controlsRef.current.update();
    }
  }, [cameraView, room, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={2}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
