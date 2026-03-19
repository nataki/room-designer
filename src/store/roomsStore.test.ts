import { beforeEach, describe, expect, test } from 'vitest';
import { useRoomsStore, selectActiveRoom } from './roomsStore';
import { DEFAULT_ROOM_WIDTH, DEFAULT_ROOM_LENGTH, DEFAULT_ROOM_HEIGHT } from '../constants/room';

function getState() {
  return useRoomsStore.getState();
}

function resetStore() {
  // Clear persisted state so each test starts fresh
  localStorage.clear();
  const initialRoom = {
    id: crypto.randomUUID(),
    name: 'Room 1',
    width: DEFAULT_ROOM_WIDTH,
    length: DEFAULT_ROOM_LENGTH,
    height: DEFAULT_ROOM_HEIGHT,
    items: [],
  };
  useRoomsStore.setState({
    rooms: [initialRoom],
    activeRoomId: initialRoom.id,
    transforming: false,
  });
}

describe('roomsStore', () => {
  beforeEach(resetStore);

  describe('createRoom', () => {
    test('adds a room and sets it as active', () => {
      getState().createRoom();
      const s = getState();
      expect(s.rooms).toHaveLength(2);
      expect(s.activeRoomId).toBe(s.rooms[1].id);
    });

    test('new room has a UUID, default dimensions, and empty items', () => {
      getState().createRoom();
      const room = getState().rooms[1];
      expect(room.id).toBeTruthy();
      expect(room.width).toBe(DEFAULT_ROOM_WIDTH);
      expect(room.length).toBe(DEFAULT_ROOM_LENGTH);
      expect(room.height).toBe(DEFAULT_ROOM_HEIGHT);
      expect(room.items).toEqual([]);
    });
  });

  describe('deleteRoom', () => {
    test('does nothing when only one room remains', () => {
      const id = getState().rooms[0].id;
      getState().deleteRoom(id);
      expect(getState().rooms).toHaveLength(1);
    });

    test('removes the room and switches active to first remaining', () => {
      getState().createRoom();
      const [first, second] = getState().rooms;
      getState().setActiveRoom(second.id);
      getState().deleteRoom(second.id);
      const s = getState();
      expect(s.rooms).toHaveLength(1);
      expect(s.activeRoomId).toBe(first.id);
    });

    test('keeps active room when a different room is deleted', () => {
      getState().createRoom();
      const [, second] = getState().rooms;
      getState().setActiveRoom(second.id);
      getState().deleteRoom(getState().rooms[0].id);
      expect(getState().activeRoomId).toBe(second.id);
    });
  });

  describe('setActiveRoom', () => {
    test('updates activeRoomId', () => {
      getState().createRoom();
      const secondId = getState().rooms[1].id;
      getState().setActiveRoom(secondId);
      expect(getState().activeRoomId).toBe(secondId);
    });
  });

  describe('renameRoom', () => {
    test('renames only the target room', () => {
      getState().createRoom();
      const [first, second] = getState().rooms;
      getState().renameRoom(first.id, 'Living Room');
      const s = getState();
      expect(s.rooms.find((r) => r.id === first.id)?.name).toBe('Living Room');
      expect(s.rooms.find((r) => r.id === second.id)?.name).toBe(second.name);
    });
  });

  describe('setDimensions', () => {
    test('updates only the active room', () => {
      getState().createRoom();
      const [first, second] = getState().rooms;
      getState().setActiveRoom(second.id);
      getState().setDimensions({ width: 10, length: 8 });
      const s = getState();
      const updatedSecond = s.rooms.find((r) => r.id === second.id)!;
      const unchangedFirst = s.rooms.find((r) => r.id === first.id)!;
      expect(updatedSecond.width).toBe(10);
      expect(updatedSecond.length).toBe(8);
      expect(unchangedFirst.width).toBe(DEFAULT_ROOM_WIDTH);
    });
  });

  describe('addItem', () => {
    test('adds item at origin with correct type and a UUID', () => {
      getState().addItem('chair');
      const room = selectActiveRoom(getState());
      expect(room.items).toHaveLength(1);
      const item = room.items[0];
      expect(item.type).toBe('chair');
      expect(item.position).toEqual([0, 0, 0]);
      expect(item.id).toBeTruthy();
    });

    test('only affects the active room', () => {
      getState().createRoom();
      const [first] = getState().rooms;
      getState().setActiveRoom(first.id);
      getState().addItem('desk');
      expect(getState().rooms[1].items).toHaveLength(0);
    });
  });

  describe('moveItem', () => {
    test('updates position for the correct item', () => {
      getState().addItem('chair');
      getState().addItem('desk');
      const [chair, desk] = selectActiveRoom(getState()).items;
      getState().moveItem(chair.id, [1, 0, 2]);
      const items = selectActiveRoom(getState()).items;
      expect(items.find((i) => i.id === chair.id)?.position).toEqual([1, 0, 2]);
      expect(items.find((i) => i.id === desk.id)?.position).toEqual([0, 0, 0]);
    });
  });

  describe('removeItem', () => {
    test('removes the target item and leaves others untouched', () => {
      getState().addItem('chair');
      getState().addItem('desk');
      const [chair, desk] = selectActiveRoom(getState()).items;
      getState().removeItem(chair.id);
      const items = selectActiveRoom(getState()).items;
      expect(items).toHaveLength(1);
      expect(items[0].id).toBe(desk.id);
    });
  });

  describe('selectActiveRoom', () => {
    test('returns the active room', () => {
      const s = getState();
      const room = selectActiveRoom(s);
      expect(room.id).toBe(s.activeRoomId);
    });

    test('throws when rooms array is empty', () => {
      useRoomsStore.setState({ rooms: [], activeRoomId: '' });
      expect(() => selectActiveRoom(getState())).toThrow();
    });
  });
}); // roomsStore
