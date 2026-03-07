import { Box, Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useRoomStore } from '../../store/roomStore';

const VIEWS = ['3d', 'top', 'front', 'side'] as const;
const ROOM_SIZES = [
  { key: 'width', label: 'W' },
  { key: 'length', label: 'D' },
  { key: 'height', label: 'H' },
] as const;

export default function Toolbar() {
  const cameraView = useUIStore((s) => s.cameraView);
  const setCameraView = useUIStore((s) => s.setCameraView);
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const room = useRoomStore((s) => s.room);
  const setDimensions = useRoomStore((s) => s.setDimensions);

  return (
    <header className="flex items-center gap-4 px-4 h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shrink-0">
      <div className="flex items-center gap-2 font-semibold text-sm shrink-0">
        <Box size={18} className="text-blue-500 dark:text-blue-400" />
        <span className="hidden sm:inline text-slate-900 dark:text-slate-100">Room Designer</span>
      </div>

      {/* Camera view buttons */}
      <div className="flex items-center gap-1">
        {VIEWS.map((view) => (
          <button
            key={view}
            onClick={() => setCameraView(view)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              cameraView === view
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {view.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Room size inputs */}
      <div className="flex items-center gap-2 ml-auto">
        {ROOM_SIZES.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            {label}:
            <input
              type="number"
              min={1}
              max={20}
              step={0.5}
              value={room[key]}
              onChange={(e) => setDimensions({ [key]: parseFloat(e.target.value) || 1 })}
              className="w-14 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 text-xs text-center focus:outline-none focus:border-blue-500"
            />
          </label>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
        title="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
