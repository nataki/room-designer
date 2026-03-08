interface IProps {
  isSelected: boolean;
  color: string;
}

const LEG_COLOR = '#2D3748';

export default function ChairModel({ isSelected, color }: IProps) {
  const emissive = isSelected ? '#ffffff' : '#000000';
  const emissiveIntensity = isSelected ? 0.15 : 0;

  return (
    <>
      {/* Seat */}
      <mesh position={[0, 0.03, 0.025]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.45]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {/* Back */}
      <mesh position={[0, 0.24, -0.245]} castShadow>
        <boxGeometry args={[0.5, 0.42, 0.06]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {/* Front-left leg */}
      <mesh position={[-0.2, -0.225, 0.225]} castShadow>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={LEG_COLOR} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {/* Front-right leg */}
      <mesh position={[0.2, -0.225, 0.225]} castShadow>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={LEG_COLOR} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {/* Rear-left leg */}
      <mesh position={[-0.2, -0.225, -0.225]} castShadow>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={LEG_COLOR} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>

      {/* Rear-right leg */}
      <mesh position={[0.2, -0.225, -0.225]} castShadow>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={LEG_COLOR} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>
    </>
  );
}
