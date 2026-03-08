import { ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { useRoomsStore, selectActiveRoom } from '../../store/roomsStore';

export default function RoomSelector() {
  const rooms = useRoomsStore((s) => s.rooms);
  const activeRoom = useRoomsStore(selectActiveRoom);
  const setActiveRoom = useRoomsStore((s) => s.setActiveRoom);
  const createRoom = useRoomsStore((s) => s.createRoom);
  const deleteRoom = useRoomsStore((s) => s.deleteRoom);
  const renameRoom = useRoomsStore((s) => s.renameRoom);

  return (
    <>
      {/* Room selector dropdown */}
      <div className="relative shrink-0">
        <Listbox value={activeRoom.id} onChange={setActiveRoom}>
          <ListboxButton className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors min-w-[90px] max-w-[120px]">
            <span className="truncate flex-1 text-left">{activeRoom.name}</span>
            <ChevronDown size={12} className="shrink-0 text-slate-400" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            className="z-50 mt-1 min-w-[160px] rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg py-1 focus:outline-none text-xs"
          >
            {rooms.map((room) => (
              <ListboxOption
                key={room.id}
                value={room.id}
                className="group flex items-center justify-between px-3 py-1.5 cursor-pointer data-[focus]:bg-slate-100 dark:data-[focus]:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                <span className="truncate">{room.name}</span>
                {rooms.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteRoom(room.id);
                    }}
                    className="ml-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all leading-none"
                    title="Delete room"
                  >
                    ×
                  </button>
                )}
              </ListboxOption>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 mt-1 pt-1">
              <button
                onClick={createRoom}
                className="w-full text-left px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                + New room
              </button>
            </div>
          </ListboxOptions>
        </Listbox>
      </div>

      {/* Room name input */}
      <input
        type="text"
        value={activeRoom.name}
        onChange={(e) => renameRoom(activeRoom.id, e.target.value)}
        className="w-36 px-2 py-0.5 rounded text-xs bg-slate-100 border border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:border-blue-500 shrink-0"
        placeholder="Room name"
      />
    </>
  );
}
