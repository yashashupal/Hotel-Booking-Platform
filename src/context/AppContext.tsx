import React, { createContext, useContext, useState, useEffect } from 'react';
import { SANCTUARIES, Sanctuary, SanctuaryRoom, BOOKING_ADDONS, BookingAddon } from '../data/sanctuaries';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isAuthenticated: boolean;
  memberSince?: string;
  role?: string;
}

export interface ReservationRecord {
  reference: string;
  sanctuaryId: string;
  sanctuaryName: string;
  sanctuaryLocation: string;
  roomName: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
    country: string;
    arrivalTime: string;
    requests: string;
  };
  addons: { id: string; name: string; cost: number }[];
  baseAmount: number;
  addonsAmount: number;
  serviceAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  heroImage: string;
}

interface AppContextType {
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  
  wishlist: string[];
  toggleWishlist: (sanctuaryId: string) => void;
  isWishlisted: (sanctuaryId: string) => boolean;

  // Active reservation in progress
  selectedSanctuaryId: string;
  setSelectedSanctuaryId: (id: string) => void;
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;
  checkInDate: string;
  checkOutDate: string;
  nightsCount: number;
  guestsCount: number;
  selectedAddonIds: string[];
  toggleAddon: (addonId: string) => void;
  
  guestForm: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    arrivalTime: string;
    requests: string;
  };
  updateGuestForm: (fields: Partial<AppContextType['guestForm']>) => void;
  
  calculateCosts: (sanctuary?: Sanctuary, room?: SanctuaryRoom) => {
    nightRate: number;
    roomSubtotal: number;
    addonsCost: number;
    serviceFee: number;
    taxes: number;
    total: number;
  };

  reservations: ReservationRecord[];
  activeReservation: ReservationRecord | null;
  completeReservation: (paymentInfo: { method: string; cardLast4?: string }) => ReservationRecord;
  
  toast: { message: string; icon?: string; visible: boolean };
  showToast: (message: string, icon?: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Elena Vance',
    email: 'elena.vance@architectural.design',
    phone: '+1 (415) 890-2341',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3XKWg16gKf5yFKCT14rD_0wTD9W6NtyaLwUpAw6coZ9ldW1MjgA1LNDsxsImoLk8_B9S7eoVjCEUNX3WwL2Eib3EE5HWLzKZ1R-UNhDI6UnpCxOT7ho8j_3EcbrlPvbyhChfxR8YhvKWXcl4Yw2aB8AQeuOQ-1YlQCiANqlCgqDhaLgrFzHg8gY9J-BcjxSk7NpY72loVFNu-0gUfXY0LURn-z-czPkcM1NB7V7muDRS2UFNsvATbVg',
    isAuthenticated: true,
    memberSince: '2023',
    role: 'Private Patron'
  });

  const [wishlist, setWishlist] = useState<string[]>(['komorebi-forest', 'vardo-fjord']);

  const [selectedSanctuaryId, setSelectedSanctuaryId] = useState<string>('komorebi-forest');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('forest-pavilion-suite');
  const [checkInDate] = useState<string>('Tue, Oct 14, 2025');
  const [checkOutDate] = useState<string>('Sat, Oct 18, 2025');
  const [nightsCount] = useState<number>(4);
  const [guestsCount] = useState<number>(2);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['spa']);

  const [guestForm, setGuestForm] = useState({
    firstName: 'Elena',
    lastName: 'Vance',
    email: 'elena.vance@architectural.design',
    phone: '+1 (415) 890-2341',
    country: 'United States of America',
    arrivalTime: 'Standard Check-in: 3:00 PM – 6:00 PM (Tea reception included)',
    requests: 'Featherless buckwheat pillows requested. Silent afternoon check-in preferred.'
  });

  // Seed with standard confirmed reservation matching the reference
  const [reservations, setReservations] = useState<ReservationRecord[]>([
    {
      reference: '#AS-8942-KYO',
      sanctuaryId: 'komorebi-forest',
      sanctuaryName: 'The Komorebi Forest Sanctuary',
      sanctuaryLocation: 'Sagatenryuji, Ukyo Ward, Kyoto',
      roomName: 'Forest Pavilion Suite',
      roomId: 'forest-pavilion-suite',
      checkIn: 'Tuesday, Oct 14, 2025',
      checkOut: 'Saturday, Oct 18, 2025',
      nights: 4,
      guests: 2,
      primaryGuest: {
        name: 'Elena Vance',
        email: 'elena.vance@architectural.design',
        phone: '+1 (415) 890-2341',
        country: 'United States of America',
        arrivalTime: 'Standard Check-in: 3:00 PM',
        requests: 'Featherless buckwheat pillows requested. Silent afternoon check-in preferred.'
      },
      addons: [
        { id: 'spa', name: 'Organic Forest Herbal Spa Ritual (60 Min)', cost: 180 },
        { id: 'kaiseki', name: 'Private Kaiseki Dinner on Pavilion Terrace', cost: 140 }
      ],
      baseAmount: 2080,
      addonsAmount: 180,
      serviceAmount: 290,
      taxAmount: 120,
      totalAmount: 2670,
      paymentMethod: 'Apple Pay (•••• 4892)',
      status: 'Confirmed',
      createdAt: '2025-09-28',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDrp96vex9IyKingCOAQAlFnltJ160mPRS84CGywNQ24XmzFXvT51hvhD5regrSoFP48XoI6GJQGUn2KMxC49QYXc3RiztPRhbQbLe7Hx5pI6F4iEbErqW-e6HnGdZCVCSzdh0iHpIqbUHuwsUiQX5pTtRgp8cC1TpHd4XODWGAnPb3eQOdXdQ1KkkXfR8ZahyxLOBCOA3rItdhaDGVIAlKujFFl4oC93WDx4uAgprw3OfFHFZwqajyQ'
    }
  ]);

  const [activeReservation, setActiveReservation] = useState<ReservationRecord | null>(reservations[0]);

  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const toggleWishlist = (sanctuaryId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(sanctuaryId);
      if (exists) {
        showToast('Removed from Saved Stays', 'favorite_border');
        return prev.filter(id => id !== sanctuaryId);
      } else {
        showToast('Saved to your Sanctuary Wishlist', 'favorite');
        return [...prev, sanctuaryId];
      }
    });
  };

  const isWishlisted = (sanctuaryId: string) => wishlist.includes(sanctuaryId);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  const updateGuestForm = (fields: Partial<AppContextType['guestForm']>) => {
    setGuestForm(prev => ({ ...prev, ...fields }));
  };

  const calculateCosts = (sanctuary?: Sanctuary, room?: SanctuaryRoom) => {
    const s = sanctuary || SANCTUARIES.find(item => item.id === selectedSanctuaryId) || SANCTUARIES[0];
    const r = room || s.rooms.find(rm => rm.id === selectedRoomId) || s.rooms[0];

    const nightRate = r.pricePerNight;
    const roomSubtotal = nightRate * nightsCount;

    let addonsCost = 0;
    selectedAddonIds.forEach(id => {
      const addon = BOOKING_ADDONS.find(a => a.id === id);
      if (addon) {
        addonsCost += addon.perPerson ? addon.price * guestsCount : addon.price;
      }
    });

    const serviceFee = 290;
    const taxes = 120;
    const total = roomSubtotal + addonsCost + serviceFee + taxes;

    return {
      nightRate,
      roomSubtotal,
      addonsCost,
      serviceFee,
      taxes,
      total
    };
  };

  const completeReservation = (paymentInfo: { method: string; cardLast4?: string }): ReservationRecord => {
    const s = SANCTUARIES.find(item => item.id === selectedSanctuaryId) || SANCTUARIES[0];
    const r = s.rooms.find(rm => rm.id === selectedRoomId) || s.rooms[0];
    const costs = calculateCosts(s, r);

    const activeAddons = selectedAddonIds.map(id => {
      const a = BOOKING_ADDONS.find(item => item.id === id)!;
      return {
        id: a.id,
        name: a.name,
        cost: a.perPerson ? a.price * guestsCount : a.price
      };
    });

    const newRecord: ReservationRecord = {
      reference: `#AS-${Math.floor(1000 + Math.random() * 9000)}-KYO`,
      sanctuaryId: s.id,
      sanctuaryName: s.name,
      sanctuaryLocation: s.location,
      roomName: r.name,
      roomId: r.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: nightsCount,
      guests: guestsCount,
      primaryGuest: {
        name: `${guestForm.firstName} ${guestForm.lastName}`,
        email: guestForm.email,
        phone: guestForm.phone,
        country: guestForm.country,
        arrivalTime: guestForm.arrivalTime,
        requests: guestForm.requests
      },
      addons: activeAddons,
      baseAmount: costs.roomSubtotal,
      addonsAmount: costs.addonsCost,
      serviceAmount: costs.serviceFee,
      taxAmount: costs.taxes,
      totalAmount: costs.total,
      paymentMethod: paymentInfo.method === 'apple_pay'
        ? 'Apple Pay (•••• 4892)'
        : paymentInfo.method === 'google_pay'
        ? 'Google Pay'
        : `Credit Card (•••• ${paymentInfo.cardLast4 || '4892'})`,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      heroImage: s.heroImage
    };

    setReservations(prev => [newRecord, ...prev]);
    setActiveReservation(newRecord);
    showToast('Reservation Secured. Welcome to Aura Stay.', 'verified');
    return newRecord;
  };

  const login = (email: string, name = 'Elena Vance') => {
    setUser({
      name,
      email,
      phone: '+1 (415) 890-2341',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3XKWg16gKf5yFKCT14rD_0wTD9W6NtyaLwUpAw6coZ9ldW1MjgA1LNDsxsImoLk8_B9S7eoVjCEUNX3WwL2Eib3EE5HWLzKZ1R-UNhDI6UnpCxOT7ho8j_3EcbrlPvbyhChfxR8YhvKWXcl4Yw2aB8AQeuOQ-1YlQCiANqlCgqDhaLgrFzHg8gY9J-BcjxSk7NpY72loVFNu-0gUfXY0LURn-z-czPkcM1NB7V7muDRS2UFNsvATbVg',
      isAuthenticated: true,
      memberSince: '2024',
      role: 'Private Member'
    });
    showToast(`Welcome back, ${name}`, 'check_circle');
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    showToast('Signed out of sanctuary session', 'lock_reset');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        wishlist,
        toggleWishlist,
        isWishlisted,
        selectedSanctuaryId,
        setSelectedSanctuaryId,
        selectedRoomId,
        setSelectedRoomId,
        checkInDate,
        checkOutDate,
        nightsCount,
        guestsCount,
        selectedAddonIds,
        toggleAddon,
        guestForm,
        updateGuestForm,
        calculateCosts,
        reservations,
        activeReservation,
        completeReservation,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
