import Toolbar from '../ui/Toolbar.jsx';
import FurniturePalette from '../ui/FurniturePalette';
import RoomScene from '../scene/RoomScene';

export default function AppLayout() {
  return (
    <div className="flex flex-col h-full w-full">
      <Toolbar />
      <div className="flex flex-1 min-h-0">
        <FurniturePalette />
        <div className="flex-1">
          <RoomScene />
        </div>
      </div>
    </div>
  );
}
