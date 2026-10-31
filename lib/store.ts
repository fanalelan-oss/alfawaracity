import { useState, useEffect } from "react";
import { RoomUnit, roomsData } from "@/data/roomsData";
import { BookingRecord, initialBookings } from "@/data/mockBookings";

export type RoomStatus = "available" | "occupied" | "reserved" | "cleaning";

export interface RoomStateInfo {
  unitId: string;
  status: RoomStatus;
  currentGuestName?: string;
  currentBookingCode?: string;
  checkInTime?: string;
  expectedCheckOut?: string;
}

const STORAGE_KEYS = {
  BOOKINGS: "alfawara_bookings_v1",
  ROOM_STATES: "alfawara_room_states_v1",
  WA_CONNECTED: "alfawara_wa_connected_v1"
};

// Initial state for rooms
const defaultRoomStates: Record<string, RoomStateInfo> = {
  "suite-royal-vip": {
    unitId: "suite-royal-vip",
    status: "reserved",
    currentGuestName: "أحمد عبد الله الحيمي",
    currentBookingCode: "AF-7821",
    expectedCheckOut: "2026-11-03 12:00"
  },
  "room-family-vip": {
    unitId: "room-family-vip",
    status: "available"
  },
  "chalet-private-hours": {
    unitId: "chalet-private-hours",
    status: "cleaning",
    currentGuestName: "أحمد سراج",
    expectedCheckOut: "جاهز خلال 20 دقيقة"
  },
  "majlis-large-50": {
    unitId: "majlis-large-50",
    status: "occupied",
    currentGuestName: "محمد ناصر الصنعاني",
    currentBookingCode: "AF-7822",
    checkInTime: "اليوم 18:00",
    expectedCheckOut: "اليوم 23:00"
  },
  "majlis-youth-30": {
    unitId: "majlis-youth-30",
    status: "available"
  },
  "majlis-cozy-10": {
    unitId: "majlis-cozy-10",
    status: "available"
  },
  "room-youth-cozy": {
    unitId: "room-youth-cozy",
    status: "available"
  },
  "pools-sulfur-private": {
    unitId: "pools-sulfur-private",
    status: "occupied",
    currentGuestName: "عائلة آل الضلعي",
    checkInTime: "20:00",
    expectedCheckOut: "22:00"
  }
};

export function useHotelStore() {
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [roomStates, setRoomStates] = useState<Record<string, RoomStateInfo>>(defaultRoomStates);
  const [isWaConnected, setIsWaConnected] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      const savedStates = localStorage.getItem(STORAGE_KEYS.ROOM_STATES);
      if (savedStates) {
        setRoomStates(JSON.parse(savedStates));
      }
      const savedWa = localStorage.getItem(STORAGE_KEYS.WA_CONNECTED);
      if (savedWa !== null) {
        setIsWaConnected(savedWa === "true");
      }
    } catch (e) {
      console.warn("Storage not available, using defaults", e);
    }
    setIsLoaded(true);
  }, []);

  const saveBookings = (newBookings: BookingRecord[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(newBookings));
    } catch (e) {
      console.error(e);
    }
  };

  const saveRoomStates = (newStates: Record<string, RoomStateInfo>) => {
    setRoomStates(newStates);
    try {
      localStorage.setItem(STORAGE_KEYS.ROOM_STATES, JSON.stringify(newStates));
    } catch (e) {
      console.error(e);
    }
  };

  const addBooking = (newBooking: Omit<BookingRecord, "id" | "bookingCode" | "createdAt">) => {
    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const fullBooking: BookingRecord = {
      ...newBooking,
      id: `b-${Date.now()}`,
      bookingCode: `AF-${codeNum}`,
      createdAt: new Date().toLocaleString("ar-YE", { dateStyle: "short", timeStyle: "short" })
    };
    const updated = [fullBooking, ...bookings];
    saveBookings(updated);

    // Update room status to reserved
    const updatedStates = { ...roomStates };
    if (updatedStates[newBooking.roomUnitId]) {
      updatedStates[newBooking.roomUnitId] = {
        ...updatedStates[newBooking.roomUnitId],
        status: "reserved",
        currentGuestName: newBooking.customerName,
        currentBookingCode: fullBooking.bookingCode
      };
      saveRoomStates(updatedStates);
    }

    return fullBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingRecord["status"]) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    saveBookings(updated);
  };

  const verifyPayment = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, paymentStatus: "paid" as const } : b);
    saveBookings(updated);
  };

  const setRoomStatus = (unitId: string, status: RoomStatus, guestName?: string) => {
    const updated = {
      ...roomStates,
      [unitId]: {
        unitId,
        status,
        currentGuestName: guestName || roomStates[unitId]?.currentGuestName || ""
      }
    };
    saveRoomStates(updated);
  };

  const toggleWhatsAppConnection = (connected: boolean) => {
    setIsWaConnected(connected);
    try {
      localStorage.setItem(STORAGE_KEYS.WA_CONNECTED, String(connected));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    bookings,
    roomStates,
    rooms: roomsData,
    isWaConnected,
    isLoaded,
    addBooking,
    updateBookingStatus,
    verifyPayment,
    setRoomStatus,
    toggleWhatsAppConnection
  };
}
