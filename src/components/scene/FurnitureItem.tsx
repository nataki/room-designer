import { useCallback, useRef, useState } from 'react';
import * as THREE from 'three';
import { TransformControls } from '@react-three/drei';
import { useRoomsStore, selectActiveRoom } from '../../store/roomsStore';
import { FURNITURE_TYPES } from '../../constants/furniture';
import { clampFurniturePosition } from '../../utils/clampFurniture';
import type { IFurnitureInstance } from '../../types';

interface IProps {
  item: IFurnitureInstance;
  isSelected: boolean;
  onClick: () => void;
  onMoveEnd: (pos: [number, number, number]) => void;
}

export default function FurnitureItem({ item, isSelected, onClick, onMoveEnd }: IProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);
  const room = useRoomsStore(selectActiveRoom);
  const setTransforming = useRoomsStore((s) => s.setTransforming);

  const def = FURNITURE_TYPES[item.type];

  const handleObjectChange = useCallback(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { x, y, z } = clampFurniturePosition(
      { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z },
      room,
      def
    );
    mesh.position.set(x, y, z);
  }, [room, def]);

  return (
    <>
      {isSelected && mesh && (
        <TransformControls
          object={mesh}
          mode="translate"
          showY={false}
          onObjectChange={handleObjectChange}
          onMouseDown={() => setTransforming(true)}
          onMouseUp={() => {
            setTransforming(false);
            if (meshRef.current)
              onMoveEnd([meshRef.current.position.x, 0, meshRef.current.position.z]);
          }}
        />
      )}
      <mesh
        ref={(m) => {
          meshRef.current = m;
          setMesh(m);
        }}
        // x = width axis, y lifted to floor (def.h/2), z = length axis
        position={[item.position[0], def.h / 2, item.position[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        castShadow
      >
        <boxGeometry args={[def.w, def.h, def.d]} />
        <meshStandardMaterial
          color={def.color}
          emissive={isSelected ? '#ffffff' : '#000000'}
          emissiveIntensity={isSelected ? 0.15 : 0}
        />
      </mesh>
    </>
  );
}
