import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SANCTUARIES, SanctuaryRoom } from '../data/sanctuaries';
import { useApp } from '../context/AppContext';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal';
import { ConciergeChatModal } from '../components/ConciergeChatModal';

export const SanctuaryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    setSelectedSanctuaryId,
    setSelectedRoomId,
    selectedRoomId,
    toggleWishlist,
    isWishlisted,
    showToast
  } = useApp();

  const sanctuary = SANCTUARIES.find(s => s.id === (id || 'komorebi-forest')) || SANCTUARIES[0];

  const [activeRoomId, setActiveRoomId] = useState<string>(
    sanctuary.rooms.find(r => r.id === selectedRoomId)?.id || sanctuary.rooms[0].id
  );
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState('2 Adults (1 Room)');

  const activeRoom = sanctuary.rooms.find(r => r.id === activeRoomId) || sanctuary.rooms[0];
  const liked = isWishlisted(sanctuary.id);

  // Calculation for the reservation widget
  const nights = 4;
  const subtotal = activeRoom.pricePerNight * nights;
  const cleaning = 85;
  const tax = Math.round(subtotal * 0.057);
  const total = subtotal + cleaning + tax;

  const handleRoomSelect = (roomId: string) => {
    setActiveRoomId(roomId);
    setSelectedRoomId(roomId);
    setSelectedSanctuaryId(sanctuary.id);
    const chosen = sanctuary.rooms.find(r => r.id === roomId);
    if (chosen) {
      showToast(`Selected ${chosen.name}`, 'bed');
    }
  };

  const handleReserveClick = () => {
    setSelectedSanctuaryId(sanctuary.id);
    setSelectedRoomId(activeRoom.id);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: sanctuary.name,
        text: `Explore this serene architectural sanctuary in ${sanctuary.location}.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Sanctuary dossier link copied to clipboard', 'link');
    }
  };

  return (
    <div className="w-full bg-[#fcf9f3]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-28 md:pb-20">
        
        {/* Top Metadata Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#97472e]/10 text-[#97472e] text-[11px] font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                PREMIER SANCTUARY
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1c1c18]">
                <span className="material-symbols-outlined text-[#97472e] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {sanctuary.rating}
              </span>
              <span className="text-[#cdc5bc]">·</span>
              <a
                href="#reviews-anchor"
                className="text-xs font-semibold text-[#1c1c18] underline underline-offset-4 decoration-[#cdc5bc] hover:text-[#97472e] transition-colors"
              >
                {sanctuary.reviewCount} guest verifications
              </a>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1c1c18] tracking-tight">
              {sanctuary.name}
            </h1>

            <div className="flex items-center gap-1.5 text-xs text-[#4b463f]">
              <span className="material-symbols-outlined text-[16px] text-[#97472e]">location_on</span>
              <span>{sanctuary.location}</span>
              <span className="mx-1.5 text-[#cdc5bc]">/</span>
              <a href="#location-map" className="text-[#97472e] font-semibold underline underline-offset-4 hover:opacity-80">
                View Sanctuary Map
              </a>
            </div>
          </div>

          {/* Share & Wishlist Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-start lg:self-end">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleWishlist(sanctuary.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold shadow-sm transition-colors ${
                liked
                  ? 'bg-[#97472e]/10 border-[#97472e]/30 text-[#97472e]'
                  : 'bg-[#f0eee8] hover:bg-[#ebe8e2] border-transparent text-[#1c1c18]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {liked ? 'favorite' : 'favorite_border'}
              </span>
              <span>{liked ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
            </button>
          </div>
        </div>

        {/* Architectural Photo Grid */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden shadow-sm h-[380px] md:h-[520px]">
            {/* Hero Primary (2 col, 2 row) */}
            <div
              onClick={() => setGalleryOpen(true)}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer bg-[#1c1a17]"
            >
              <img
                src={sanctuary.galleryImages[0]?.url || sanctuary.heroImage}
                alt={sanctuary.galleryImages[0]?.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md">
                  {sanctuary.galleryImages[0]?.title || 'Exterior Pavilion & Stream'}
                </span>
              </div>
            </div>

            {/* 4 Secondary Grid Images */}
            {sanctuary.galleryImages.slice(1, 5).map((img, i) => (
              <div
                key={i}
                onClick={() => setGalleryOpen(true)}
                className="relative overflow-hidden group cursor-pointer bg-[#ebe8e2]"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
          </div>

          {/* Photo Archive Pill Button */}
          <button
            onClick={() => setGalleryOpen(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#fcf9f3]/90 hover:bg-white text-[#1c1c18] backdrop-blur-md text-xs font-semibold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            <span>View all 32 photos</span>
          </button>
        </div>

        {/* Main Content & Reservation Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols / 65%) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Sanctuary Overview & Host Narrative */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 bg-[#f6f3ed]/60 p-4 rounded-xl border border-[#e8e3d9]/60">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-[#97472e]">
                    Sanctuary Residence No. 04
                  </span>
                  <h2 className="font-editorial text-2xl text-[#1c1c18]">
                    Curated by the Aura Kyoto Guild
                  </h2>
                  <p className="text-xs text-[#7c766e]">
                    {sanctuary.tagline}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-[#e8e3d9]">
                  <img
                    src={sanctuary.curatorAvatar}
                    alt={sanctuary.curatorName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#4b463f]">
                <p>
                  Tucked into the mist-shrouded foothills of Arashiyama, <strong className="text-[#1c1c18] font-semibold">{sanctuary.name}</strong> is a dialogue between ancient Japanese timber joinery and Nordic calm. Named after the Japanese word for sunlight filtering through canopy leaves, each structure is elevated on discreet cedar stilts to let the living forest floor breathe unimpeded.
                </p>
                <p>
                  Guests awake to meditative stream water acoustics, hand-whisked Uji matcha ceremonies, and unhurried immersions in private geothermal onsen pools fragrant with fresh hinoki wood resin.
                </p>
              </div>

              {/* Highlight Trio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {sanctuary.highlightTrio.map((hl, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#f6f3ed] flex flex-col gap-2 border border-[#e8e3d9]/50">
                    <span className="material-symbols-outlined text-[#97472e] text-[26px]">
                      {hl.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#1c1c18]">{hl.title}</h4>
                      <p className="text-xs text-[#4b463f] mt-1 leading-snug">{hl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Amenities Spectrum */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl text-[#1c1c18]">Curated Amenities</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766e]">
                  Included in All Stays
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                {sanctuary.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f0eee8] flex items-center justify-center shrink-0 text-[#97472e]">
                      <span className="material-symbols-outlined text-[20px]">{am.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] leading-tight">
                        {am.name}
                      </p>
                      <p className="text-[11px] text-[#7c766e] mt-0.5">{am.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Room Selection Cards */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="font-editorial text-2xl text-[#1c1c18]">Available Sanctuaries</h3>
                <span className="text-xs text-[#7c766e]">
                  Selected dates: Oct 14 – 18 (4 nights)
                </span>
              </div>

              {/* Room Cards List */}
              {sanctuary.rooms.map((room) => {
                const isSelected = room.id === activeRoomId;
                return (
                  <div
                    key={room.id}
                    onClick={() => handleRoomSelect(room.id)}
                    className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#97472e] shadow-lg ring-1 ring-[#97472e]/20'
                        : 'border-[#e8e3d9] hover:border-[#cdc5bc] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Room Photo */}
                      <div className="w-full md:w-5/12 h-52 md:h-auto rounded-xl overflow-hidden shrink-0 relative bg-[#ebe8e2]">
                        <img
                          src={room.imageUrl}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {room.recommended && (
                          <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider bg-[#1c1a17] text-white px-2.5 py-1 rounded">
                            Recommended
                          </span>
                        )}
                      </div>

                      {/* Room Specs & Details */}
                      <div className="w-full md:w-7/12 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="font-editorial text-xl font-semibold text-[#1c1c18]">
                                {room.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-[#7c766e] mt-1">
                                <span>{room.bed}</span>
                                <span>·</span>
                                <span>{room.size}</span>
                                <span>·</span>
                                <span>{room.capacity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-editorial text-2xl font-bold text-[#1c1c18]">
                                ${room.pricePerNight}
                              </span>
                              <span className="text-xs text-[#7c766e] block">/ night</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-[#4b463f] leading-relaxed mt-2.5">
                            {room.description}
                          </p>

                          {/* Room Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {room.tags.map((tag, t) => (
                              <span
                                key={t}
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  tag.includes('Free') || tag.includes('Included')
                                    ? 'bg-[#97472e]/10 text-[#97472e]'
                                    : 'bg-[#f0eee8] text-[#4b463f]'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Action Row */}
                        <div className="pt-2 flex items-center justify-between border-t border-[#f0eee8]">
                          {isSelected ? (
                            <span className="text-xs font-semibold text-[#97472e] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              Selected Sanctuary
                            </span>
                          ) : (
                            <span className="text-xs text-[#7c766e]">
                              {room.remainingText || 'Available Instant Booking'}
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRoomSelect(room.id);
                            }}
                            className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                              isSelected
                                ? 'bg-[#1c1a17] text-white shadow-sm'
                                : 'bg-[#f0eee8] text-[#1c1c18] hover:bg-[#1c1a17] hover:text-white'
                            }`}
                          >
                            {isSelected ? 'Selected' : `Select ${room.name.includes('Villa') ? 'Villa' : room.name.includes('Studio') ? 'Studio' : 'Chamber'}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guest Reviews & Acoustic Ratings Section */}
            <div id="reviews-anchor" className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 bg-[#f6f3ed] p-5 rounded-xl border border-[#e8e3d9]/60">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white px-4 py-2.5 rounded-xl border border-[#e8e3d9] shadow-sm">
                    <span className="font-editorial text-3xl font-bold text-[#97472e] block leading-none">
                      {sanctuary.rating}
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#7c766e]">
                      Overall
                    </span>
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl text-[#1c1c18]">Exceptional Sanctuary Experience</h3>
                    <p className="text-xs text-[#7c766e]">Ranked #1 for Tranquil Retreats in Kyoto Prefecture</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[#4b463f]">
                  <span className="material-symbols-outlined text-[#97472e] text-[18px]">thumb_up</span>
                  <span>100% of past year guests recommended this stay</span>
                </div>
              </div>

              {/* Progress Bars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {[
                  { label: 'Immaculate Cleanliness', score: sanctuary.ratingsBreakdown.cleanliness },
                  { label: 'Bamboo Forest Location', score: sanctuary.ratingsBreakdown.location },
                  { label: 'Acoustic Quietness', score: sanctuary.ratingsBreakdown.quietness },
                  { label: 'Hospitality Service', score: sanctuary.ratingsBreakdown.service },
                  { label: 'Kaiseki Quality', score: sanctuary.ratingsBreakdown.kaiseki },
                  { label: 'Restorative Atmosphere', score: sanctuary.ratingsBreakdown.restorative }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-[#1c1c18]">{item.label}</span>
                      <span className="font-bold text-[#1c1c18]">{item.score}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#f0eee8] overflow-hidden">
                      <div
                        className="h-full bg-[#97472e] rounded-full"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials Quote Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {sanctuary.testimonials.map((t, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]/60 space-y-3 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-[#cdc5bc]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1c1c18]">{t.author}</p>
                        <p className="text-[11px] text-[#7c766e]">{t.origin} · {t.date}</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4b463f] leading-relaxed italic">
                      “{t.quote}”
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sanctuary Geography Map Card */}
            <div id="location-map" className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-[#1c1c18]">Sanctuary Geography</h3>
                  <p className="text-xs text-[#7c766e]">{sanctuary.mapDetails.zone} · {sanctuary.location}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#97472e]">
                  Private Forest Estate
                </span>
              </div>

              <div
                className="w-full h-72 sm:h-80 rounded-2xl bg-cover bg-center border border-[#e8e3d9] shadow-inner relative flex items-end p-5"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlcXNgnzXeEOfgbHBCDxsA1ibTq1YwCPtnlQifNLdrIXqU71Zbmj9Gava0qFLwEh7sQiY079eoMHJkI37gXdx8i86BH8nHMUuhA_A0fO3rFCKr116PQ5U0bX7RrADSZBy7x1xsmdci-xV1n9zdhGiRdnSxdLbmjt9nDiUqW1gJVWBKnY9psQv2JHMHLpW85l39zE7tdxrN-cqTdylXb9FlEc6bBaNjvZ9Buub4IjHDSUtLne2W4J8lww')"
                }}
              >
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#e8e3d9] shadow-lg max-w-sm">
                  <p className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#97472e] text-[18px]">forest</span>
                    {sanctuary.mapDetails.zone}
                  </p>
                  <p className="text-xs text-[#4b463f] mt-1 leading-snug">
                    {sanctuary.mapDetails.travelInfo}
                  </p>
                  <p className="text-[10px] font-mono text-[#7c766e] mt-2">
                    Coordinates: {sanctuary.mapDetails.coordinates}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Reservation Concierge Widget (4 cols / 35%) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e3d9] shadow-xl relative overflow-hidden">
              
              {/* Pricing Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#f0eee8]">
                <div>
                  <span className="font-editorial text-3xl font-bold text-[#1c1c18]">
                    ${activeRoom.pricePerNight}
                  </span>
                  <span className="text-xs text-[#7c766e]"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#1c1c18]">
                  <span className="material-symbols-outlined text-[#97472e] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{sanctuary.rating}</span>
                  <span className="text-[#7c766e]">({sanctuary.reviewCount})</span>
                </div>
              </div>

              {/* Selection Controls Box */}
              <div className="bg-[#f6f3ed] rounded-xl p-3 space-y-2.5 my-5 border border-[#e8e3d9]/70">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border border-[#e8e3d9]/80">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e] block">
                      Check-in
                    </span>
                    <span className="text-xs font-bold text-[#1c1c18]">Oct 14, 2025</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#e8e3d9]/80">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e] block">
                      Check-out
                    </span>
                    <span className="text-xs font-bold text-[#1c1c18]">Oct 18, 2025</span>
                  </div>
                </div>

                {/* Guest dropdown */}
                <div className="relative">
                  <div
                    onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
                    className="bg-white p-2.5 rounded-lg border border-[#e8e3d9]/80 flex items-center justify-between cursor-pointer hover:bg-[#fcf9f3] transition-colors"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e] block">
                        Guests
                      </span>
                      <span className="text-xs font-bold text-[#1c1c18]">{selectedGuests}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#7c766e] text-[18px]">
                      expand_more
                    </span>
                  </div>

                  {guestsDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-[#e8e3d9] shadow-lg p-2 z-20 space-y-1">
                      {['1 Adult', '2 Adults (1 Room)', '2 Adults, 1 Child', '3 Adults', '4 Adults (Villa Only)'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedGuests(opt);
                            setGuestsDropdownOpen(false);
                            showToast(`Updated occupancy to ${opt}`, 'group');
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded text-xs font-medium ${
                            selectedGuests === opt ? 'bg-[#97472e]/10 text-[#97472e] font-bold' : 'text-[#4b463f] hover:bg-[#f6f3ed]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-[#e8e3d9]/80">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e] block">
                    Current Chamber
                  </span>
                  <span className="text-xs font-bold text-[#97472e] truncate block">
                    {activeRoom.name}
                  </span>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pb-5 text-xs text-[#4b463f]">
                <div className="flex justify-between">
                  <span>{nights} nights x ${activeRoom.pricePerNight}</span>
                  <span className="text-[#1c1c18] font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Cleaning &amp; Fine Linens
                    <span className="material-symbols-outlined text-[14px] text-[#7c766e] cursor-help" title="Daily organic linen refresh and aromatherapy turndown">info</span>
                  </span>
                  <span className="text-[#1c1c18] font-bold">${cleaning}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Luxury Hospitality Tax (5.7%)
                    <span className="material-symbols-outlined text-[14px] text-[#7c766e] cursor-help" title="Kyoto Prefecture onsen and cultural conservation levy">info</span>
                  </span>
                  <span className="text-[#1c1c18] font-bold">${tax}</span>
                </div>

                <div className="pt-3 mt-3 bg-[#f6f3ed] -mx-6 sm:-mx-7 px-6 sm:px-7 py-3.5 flex justify-between items-baseline border-y border-[#e8e3d9]">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1c1c18] uppercase tracking-wide block">
                      Total Due
                    </span>
                    <span className="text-[10px] text-[#7c766e] uppercase tracking-wider">
                      All fees &amp; tax included
                    </span>
                  </div>
                  <span className="font-editorial text-2xl font-bold text-[#97472e]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleReserveClick}
                className="w-full py-3.5 px-6 rounded-lg bg-[#1c1a17] hover:bg-[#97472e] text-white text-xs sm:text-sm font-semibold text-center tracking-wide transition-colors shadow-md"
              >
                Reserve Your Stay
              </button>

              {/* Guarantee Note */}
              <div className="text-center pt-3 space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                  You won’t be charged yet
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#4b463f]">
                  <span className="material-symbols-outlined text-[15px] text-[#97472e]">verified_user</span>
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
              </div>
            </div>

            {/* Concierge Direct Assist Badge */}
            <div
              onClick={() => setConciergeOpen(true)}
              className="bg-[#f0eee8] hover:bg-[#ebe8e2] border border-[#e8e3d9] p-4 rounded-xl flex items-center gap-3.5 cursor-pointer transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#97472e] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-[#1c1c18]">Aura Private Concierge</h5>
                <p className="text-[11px] text-[#4b463f] truncate">
                  Need private Kyoto shinkansen or tea reservations?
                </p>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#7c766e]">
                chat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Reservation Bar on Mobile Viewports */}
      <aside className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e8e3d9] shadow-2xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-editorial text-2xl font-bold text-[#1c1c18]">
                ${activeRoom.pricePerNight}
              </span>
              <span className="text-xs text-[#7c766e]">/ night</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#97472e]">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>Free cancel till 72h prior</span>
            </div>
          </div>

          <button
            onClick={handleReserveClick}
            className="flex-1 max-w-[200px] py-3 px-4 rounded-lg bg-[#1c1a17] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>Reserve Stay</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </aside>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        sanctuaryName={sanctuary.name}
        images={sanctuary.galleryImages}
      />

      {/* Concierge Chat Modal */}
      <ConciergeChatModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        sanctuaryName={sanctuary.name}
        hostName="Kenji S. (Aura Kyoto Guild)"
      />
    </div>
  );
};
