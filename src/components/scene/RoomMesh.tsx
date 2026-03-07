import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useRoomStore } from '../../store/roomStore';

export default function RoomMesh() {
  const room = useRoomStore((s) => s.room);
  const { width, length, height } = room;
  const wallThickness = 0.08;

  const floorEdgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(width, 0.001, length);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [width, length]);

  useEffect(() => () => floorEdgesGeo.dispose(), [floorEdgesGeo]);

  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Floor grid */}
      <gridHelper
        args={[
          Math.max(width, length) + 4,
          (Math.max(width, length) + 4) * 2,
          '#334155',
          '#243040',
        ]}
        position={[0, 0.001, 0]}
      />

      {/* Back wall */}
      <mesh receiveShadow position={[0, height / 2, -length / 2]}>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <meshStandardMaterial
          color="#334155"
          transparent
          depthWrite={false}
          opacity={0.6}
          roughness={0.9}
        />
      </mesh>

      {/* Left wall */}
      <mesh receiveShadow position={[-width / 2, height / 2, 0]}>
        <boxGeometry args={[wallThickness, height, length]} />
        <meshStandardMaterial
          color="#2d3f52"
          transparent
          depthWrite={false}
          opacity={0.6}
          roughness={0.9}
        />
      </mesh>

      {/* Right wall (more transparent for visibility) */}
      <mesh receiveShadow position={[width / 2, height / 2, 0]}>
        <boxGeometry args={[wallThickness, height, length]} />
        <meshStandardMaterial
          color="#2d3f52"
          transparent
          depthWrite={false}
          opacity={0.25}
          roughness={0.9}
        />
      </mesh>

      {/* Front wall (most transparent) */}
      <mesh receiveShadow position={[0, height / 2, length / 2]}>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <meshStandardMaterial
          color="#334155"
          transparent
          depthWrite={false}
          opacity={0.15}
          roughness={0.9}
        />
      </mesh>

      {/* Floor boundary edges */}
      <lineSegments position={[0, 0.003, 0]} geometry={floorEdgesGeo}>
        <lineBasicMaterial color="#475569" />
      </lineSegments>
    </group>
  );
}
