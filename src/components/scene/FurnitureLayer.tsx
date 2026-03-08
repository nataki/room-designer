import { useEffect, useState } from 'react';
import { useFurnitureStore } from '../../store/furnitureStore';
import FurnitureItem from './FurnitureItem';

export default function FurnitureLayer() {
  const items = useFurnitureStore((s) => s.items);
  const moveItem = useFurnitureStore((s) => s.moveItem);
  const removeItem = useFurnitureStore((s) => s.removeItem);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keyboard delete
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        removeItem(selectedId);
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, removeItem]);

  // If the selected item was removed, treat selection as empty without needing an effect
  const validSelectedId = selectedId && items.some((i) => i.id === selectedId) ? selectedId : null;

  return (
    <group onClick={() => setSelectedId(null)}>
      {items.map((item) => (
        <FurnitureItem
          key={item.id}
          item={item}
          isSelected={validSelectedId === item.id}
          onClick={() => setSelectedId(item.id)}
          onMoveEnd={(pos) => moveItem(item.id, pos)}
        />
      ))}
    </group>
  );
}
