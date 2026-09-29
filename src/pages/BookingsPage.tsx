import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SANCTUARIES } from '../data/sanctuaries';
import { ConciergeChatModal } from '../components/ConciergeChatModal';

interface BookingsPageProps {
  defaultTab?: 'upcoming' | 'wishlist' | 'saved' | 'past';
}

export const BookingsPage: React.FC<BookingsPageProps> = ({ defaultTab = 'upcoming' }) => {
  const navigate = useNavigate();
  const { reservations, wishlist, toggleWishlist, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'wishlist' | 'past'>(
    defaultTab === 'saved' ? 'wishlist' : (defaultTab as any) || 'upcoming'
  );
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const wishlistedSanctuaries = SANCTUARIES.filter(s => wishlist.includes(s.id));

  return (
    <div className="w-full bg-[#fcf9f3]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-14 min-h-[700px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#97472e] block mb-1">
              Member Sanctuary Ledger
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1c18]">
              My Bookings &amp; Saved Havens
            </h1>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f0eee8] border border-[#e8e3d9]">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-white text-[#1c1c18] shadow-sm'
                  : 'text-[#4b463f] hover:text-[#1c1c18]'
              }`}
            >
              Upcoming ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-white text-[#1c1c18] shadow-sm'
                  : 'text-[#4b463f] hover:text-[#1c1c18]'
              }`}
            >
              Saved Stays ({wishlist.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'past'
                  ? 'bg-white text-[#1c1c18] shadow-sm'
                  : 'text-[#4b463f] hover:text-[#1c1c18]'
              }`}
            >
              Past Sojourns
            </button>
          </div>
        </div>

        {/* TAB 1: UPCOMING RESERVATIONS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {reservations.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#e8e3d9] space-y-4">
                <span className="material-symbols-outlined text-[40px] text-[#7c766e]">
                  calendar_today
                </span>
                <h3 className="font-editorial text-xl text-[#1c1c18]">No active reservations</h3>
                <p className="text-xs text-[#7c766e] max-w-sm mx-auto">
                  Begin your journey by exploring our collection of architectural retreats.
                </p>
                <Link
                  to="/"
                  className="inline-flex px-6 py-2.5 rounded-lg bg-[#1c1a17] text-white text-xs font-semibold hover:bg-[#97472e] transition-colors"
                >
                  Explore Sanctuaries
                </Link>
              </div>
            ) : (
              reservations.map((res, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-[#e8e3d9] shadow-sm overflow-hidden flex flex-col lg:flex-row"
                >
                  {/* Visual Left Frame */}
                  <div className="lg:w-5/12 relative aspect-[16/10] lg:aspect-auto bg-[#1c1a17]">
                    <img
                      src={res.heroImage}
                      alt={res.sanctuaryName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#1c1c18]">
                        Confirmed Reservation
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-[#ffdbd0] tracking-widest">
                        {res.sanctuaryLocation}
                      </span>
                      <h3 className="font-editorial text-2xl font-medium leading-snug">
                        {res.sanctuaryName}
                      </h3>
                      <p className="text-xs text-white/80 mt-1">{res.roomName}</p>
                    </div>
                  </div>

                  {/* Details Right Pane */}
                  <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#f0eee8]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7c766e] tracking-wider">
                            Booking Dossier
                          </span>
                          <p className="font-bold text-base text-[#97472e] tracking-wide">
                            {res.reference}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#dbe6d3] text-[#151e12] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Secured &amp; Guaranteed
                        </span>
                      </div>

                      {/* Stay Timing Grid */}
                      <div className="grid grid-cols-2 gap-3 py-4">
                        <div className="p-3 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]/70">
                          <span className="text-[9px] uppercase font-bold text-[#7c766e] block">
                            Arrival (Check-in)
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] mt-0.5">
                            {res.checkIn}
                          </p>
                          <p className="text-[11px] text-[#7c766e]">From 3:00 PM JST</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]/70">
                          <span className="text-[9px] uppercase font-bold text-[#7c766e] block">
                            Departure (Check-out)
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] mt-0.5">
                            {res.checkOut}
                          </p>
                          <p className="text-[11px] text-[#7c766e]">Until 11:00 AM JST</p>
                        </div>
                      </div>

                      {/* Inclusions & Add-ons Summary */}
                      <div className="space-y-1.5 text-xs text-[#4b463f]">
                        <p className="font-semibold text-[#1c1c18]">Sanctuary Upgrades Included:</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {res.addons.map((add, a) => (
                            <span
                              key={a}
                              className="px-2.5 py-1 rounded-md bg-[#f0eee8] text-[11px] font-medium text-[#1c1c18]"
                            >
                              ✓ {add.name}
                            </span>
                          ))}
                          <span className="px-2.5 py-1 rounded-md bg-[#f0eee8] text-[11px] font-medium text-[#1c1c18]">
                            ✓ Shinkansen Station Reception
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[#f0eee8] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#7c766e] block">
                          Total Amount Paid
                        </span>
                        <span className="font-editorial text-2xl font-bold text-[#1c1c18]">
                          ${res.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setConciergeOpen(true)}
                          className="px-4 py-2.5 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-xs font-semibold text-[#1c1c18] border border-[#e8e3d9] transition-colors flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                          <span>Message Host</span>
                        </button>

                        <Link
                          to="/confirmed"
                          className="px-5 py-2.5 rounded-lg bg-[#1c1a17] hover:bg-[#97472e] text-xs font-semibold text-white transition-colors shadow-sm"
                        >
                          View Full Dossier
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED SANCTUARY WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedSanctuaries.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-[#e8e3d9] space-y-4">
                <span className="material-symbols-outlined text-[40px] text-[#7c766e]">
                  favorite_border
                </span>
                <h3 className="font-editorial text-xl text-[#1c1c18]">Your wishlist is clear</h3>
                <p className="text-xs text-[#7c766e] max-w-sm mx-auto">
                  Click the heart icon on any architectural sanctuary to save it for future contemplation.
                </p>
                <Link
                  to="/"
                  className="inline-flex px-6 py-2.5 rounded-lg bg-[#1c1a17] text-white text-xs font-semibold hover:bg-[#97472e] transition-colors"
                >
                  Explore Sanctuaries
                </Link>
              </div>
            ) : (
              wishlistedSanctuaries.map(s => (
                <div
                  key={s.id}
                  className="group rounded-2xl bg-white border border-[#e8e3d9] shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe8e2]">
                    <img
                      src={s.heroImage}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => toggleWishlist(s.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#97472e] shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                    </button>
                    <div className="absolute bottom-2.5 left-2.5 text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {s.location}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-editorial text-lg font-semibold text-[#1c1c18] group-hover:text-[#97472e] transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-xs text-[#4b463f] line-clamp-2 mt-1">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                      <div>
                        <span className="font-editorial text-xl font-bold text-[#1c1c18]">
                          ${s.pricePerNight}
                        </span>
                        <span className="text-xs text-[#7c766e]"> / night</span>
                      </div>
                      <Link
                        to={`/sanctuaries/${s.id}`}
                        className="px-4 py-2 rounded-lg bg-[#1c1a17] text-white text-xs font-semibold hover:bg-[#97472e] transition-colors"
                      >
                        Reserve
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: PAST SOJOURNS */}
        {activeTab === 'past' && (
          <div className="rounded-2xl bg-white border border-[#e8e3d9] p-8 md:p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#f6f3ed] flex items-center justify-center text-[#97472e] mx-auto border border-[#e8e3d9]">
              <span className="material-symbols-outlined text-[24px]">history_edu</span>
            </div>
            <h3 className="font-editorial text-2xl text-[#1c1c18]">Archive of Past Sojourns</h3>
            <p className="text-xs text-[#4b463f] max-w-md mx-auto leading-relaxed">
              Upon conclusion of your stay, your tailored tasting menus, acoustic audits, and personal tea recipes are cataloged permanently in your private anthology.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7c766e]">
                No concluded retreats in the 2025 calendar year yet.
              </span>
            </div>
          </div>
        )}

      </div>

      <ConciergeChatModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        sanctuaryName="The Komorebi Forest Sanctuary"
      />
    </div>
  );
};
