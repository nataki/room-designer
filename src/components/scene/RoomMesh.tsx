import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useRoomStore } from '../../store/roomStore';
import { useUIStore } from '../../store/uiStore';

export default function RoomMesh() {
  const room = useRoomStore((s) => s.room);
  const theme = useUIStore((s) => s.theme);
  const { width, length, height } = room;

  const colors =
    theme === 'dark'
      ? {
          floor: '#1e293b',
          gridA: '#334155',
          gridB: '#243040',
          wallFB: '#334155',
          wallLR: '#2d3f52',
          edges: '#475569',
        }
      : {
          floor: '#e2e8f0',
          gridA: '#cbd5e1',
          gridB: '#e2e8f0',
          wallFB: '#cbd5e1',
          wallLR: '#d1d5db',
          edges: '#94a3b8',
        };
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
        <meshStandardMaterial color={colors.floor} roughness={0.8} />
      </mesh>

      {/* Floor grid */}
      <gridHelper
        args={[
          Math.max(width, length) + 4,
          (Math.max(width, length) + 4) * 2,
          colors.gridA,
          colors.gridB,
        ]}
        position={[0, 0.001, 0]}
      />

      {/* Back wall */}
      <mesh receiveShadow position={[0, height / 2, -length / 2]}>
        <boxGeometry args={[width + wallThickness * 2, height, wallThickness]} />
        <meshStandardMaterial
          color={colors.wallFB}
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
          color={colors.wallLR}
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
          color={colors.wallLR}
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
          color={colors.wallFB}
          transparent
          depthWrite={false}
          opacity={0.15}
          roughness={0.9}
        />
      </mesh>

      {/* Floor boundary edges */}
      <lineSegments position={[0, 0.003, 0]} geometry={floorEdgesGeo}>
        <lineBasicMaterial color={colors.edges} />
      </lineSegments>
    </group>
  );
}
