import { FURNITURE_TYPES } from '../../constants/furniture'
import { useRoomStore } from '../../store/roomStore'

export default function FurniturePalette() {
  const addFurniture = useRoomStore((s) => s.addFurniture)

  return (
    <aside className="w-[72px] bg-slate-900 border-r border-slate-700 flex flex-col items-center py-3 gap-1.5 overflow-y-auto shrink-0">
      <p className="text-slate-600 text-[10px] uppercase tracking-widest mb-1 rotate-0">Add</p>
      {Object.entries(FURNITURE_TYPES).map(([type, def]) => (
        <button
          key={type}
          onClick={() => addFurniture(type)}
          title={`Add ${def.label}`}
          className="group w-[56px] flex flex-col items-center gap-0.5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
        >
          <span className="text-xl leading-none">{def.icon}</span>
          <span className="text-[10px] text-slate-400 group-hover:text-slate-200 leading-tight text-center">
            {def.label}
          </span>
        </button>
      ))}
    </aside>
  )
}
