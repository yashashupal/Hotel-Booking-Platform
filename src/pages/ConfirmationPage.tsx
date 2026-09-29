import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ConciergeChatModal } from '../components/ConciergeChatModal';

export const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeReservation, showToast } = useApp();
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // Fallback reservation details
  const res = activeReservation || {
    reference: '#AS-8942-KYO',
    sanctuaryName: 'The Komorebi Forest Sanctuary',
    sanctuaryLocation: 'Sagatenryuji, Ukyo Ward, Kyoto',
    roomName: 'Forest Pavilion Suite',
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
    baseAmount: 2080,
    addonsAmount: 180,
    serviceAmount: 290,
    taxAmount: 120,
    totalAmount: 2670,
    paymentMethod: 'Apple Pay •••• 4892'
  };

  const handleAppleWallet = () => {
    showToast('Sanctuary Pass saved to Apple Wallet', 'wallet');
  };

  const handleDownloadPDF = () => {
    showToast('PDF Itinerary and Arrival Guide downloaded', 'download_done');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareReservation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Aura Stay Reservation Confirmation',
        text: `Confirmed stay at ${res.sanctuaryName} (${res.reference})`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Reservation dossier link copied to clipboard', 'link');
    }
  };

  return (
    <div className="w-full bg-[#fcf9f3]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-20">
        
        {/* Top Status Header Section */}
        <div className="w-full flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          
          {/* Pulsing Organic Seal / Icon */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-[#ffdbd0]/60 animate-ping opacity-35"></div>
            <div className="relative w-16 h-16 rounded-full bg-[#97472e] text-white flex items-center justify-center shadow-lg shadow-[#97472e]/25">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            {/* Subtle compass reticle detail referencing brand mark */}
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#97472e]"></div>
            <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#97472e]"></div>
            <div className="absolute -left-1 w-1.5 h-1.5 rounded-full bg-[#97472e]"></div>
            <div className="absolute -right-1 w-1.5 h-1.5 rounded-full bg-[#97472e]"></div>
          </div>

          {/* Stepper Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdbd0]/60 text-[#793019] mb-3 shadow-sm border border-[#ffb59f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#97472e]"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Reservation Confirmed &amp; Secured
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1c1c18] tracking-tight mb-2">
            Your Sanctuary Awaits, {res.primaryGuest.name.split(' ')[0]}
          </h1>

          <p className="text-sm sm:text-base text-[#4b463f] max-w-2xl leading-relaxed">
            A confirmation keyphrase and curated arrival dossier have been dispatched to{' '}
            <span className="font-semibold text-[#1c1c18] underline decoration-[#cdc5bc] underline-offset-2">
              {res.primaryGuest.email}
            </span>.
          </p>

          {/* Reference Tag */}
          <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#f0eee8] text-[#1c1c18] border border-[#e8e3d9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766e]">
              Dossier Reference
            </span>
            <span className="text-xs font-bold text-[#97472e] tracking-wider">
              {res.reference}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#97472e]"></span>
            <span className="text-xs text-[#4b463f]">Instant Confirmation</span>
          </div>

          {/* Action Dock */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#e8e3d9] shadow-sm hover:shadow text-[#1c1c18] hover:text-[#97472e] text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
              <span>Download PDF Itinerary</span>
            </button>
            <button
              onClick={handleAppleWallet}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#e8e3d9] shadow-sm hover:shadow text-[#1c1c18] hover:text-[#97472e] text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">wallet</span>
              <span>Add to Apple Wallet</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#e8e3d9] shadow-sm hover:shadow text-[#1c1c18] hover:text-[#97472e] text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid (8 col left + 4 col right on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Reservation Dossier & Accommodation (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Sanctuary Architectural Showcase Card */}
            <div className="rounded-2xl overflow-hidden bg-white border border-[#e8e3d9] shadow-sm">
              <div className="relative w-full h-64 md:h-80 overflow-hidden bg-[#1c1a17]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS76Ge8H-qHCTYoT7VhOjpCJWSnrYLHo2WQS2sUGOeeM47yNb0jJVgAmoMktTLZ-9plgyLI5yyhHr7Apj7iXwPaswA4siL0brCmW7U8KeHPZ1vaYFC85mwIyxNM5I0xplIiH6nxElccBosdO-zzuMbGgfkjTorIcxDeUGhZddDB8qi6MFqy6eIDbNaY-1Zi6f7x1rQqxNhOE4QiRRmFd2r9hIsxFpRYej16RWoZldEfrqMXHaCzAMPiw"
                  alt={res.sanctuaryName}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                  <span className="material-symbols-outlined text-[15px] text-[#97472e]">spa</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1c1c18]">
                    Curated Forest Retreat
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row md:items-end justify-between gap-2 text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffdbd0]">
                      Arashiyama Sanctuary · Kyoto
                    </span>
                    <h2 className="font-editorial text-2xl md:text-3xl text-white font-medium">
                      {res.sanctuaryName}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/90">
                    <span className="material-symbols-outlined text-[16px] text-[#ffdbd0]">location_on</span>
                    <span>{res.sanctuaryLocation}</span>
                  </div>
                </div>
              </div>

              {/* Suite Details & Attributes Matrix */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 bg-[#f6f3ed] rounded-xl p-5 gap-4 border border-[#e8e3d9]/70">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#97472e]">
                      Confirmed Accommodation
                    </span>
                    <h3 className="font-editorial text-2xl text-[#1c1c18] mt-0.5">
                      {res.roomName}
                    </h3>
                    <p className="text-xs text-[#7c766e] mt-1">
                      Private cantilevered cedar deck with panoramic views of the sacred bamboo grove.
                    </p>
                  </div>
                  <div className="shrink-0 text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                      Sanctuary Scale
                    </span>
                    <p className="font-editorial text-2xl font-bold text-[#1c1c18]">120 m²</p>
                  </div>
                </div>

                {/* Features Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f6f3ed] border border-[#e8e3d9]/50">
                    <span className="material-symbols-outlined text-[20px] text-[#97472e]">bed</span>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7c766e] block">Bedding</span>
                      <span className="text-xs font-semibold text-[#1c1c18]">Custom King</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f6f3ed] border border-[#e8e3d9]/50">
                    <span className="material-symbols-outlined text-[20px] text-[#97472e]">hot_tub</span>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7c766e] block">Bath</span>
                      <span className="text-xs font-semibold text-[#1c1c18]">Hinoki Onsen</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f6f3ed] border border-[#e8e3d9]/50">
                    <span className="material-symbols-outlined text-[20px] text-[#97472e]">group</span>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7c766e] block">Capacity</span>
                      <span className="text-xs font-semibold text-[#1c1c18]">2 Guests</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f6f3ed] border border-[#e8e3d9]/50">
                    <span className="material-symbols-outlined text-[20px] text-[#97472e]">air</span>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7c766e] block">Orientation</span>
                      <span className="text-xs font-semibold text-[#1c1c18]">Bamboo Horizon</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Timetable Ribbon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">login</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                        Check-In
                      </span>
                      <p className="font-editorial text-base font-semibold text-[#1c1c18] mt-0.5">
                        {res.checkIn}
                      </p>
                      <p className="text-xs text-[#7c766e]">From 3:00 PM · Welcoming Tea Service</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] shrink-0">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                        Check-Out
                      </span>
                      <p className="font-editorial text-base font-semibold text-[#1c1c18] mt-0.5">
                        {res.checkOut}
                      </p>
                      <p className="text-xs text-[#7c766e]">Until 11:00 AM · {res.nights} Restorative Nights</p>
                    </div>
                  </div>
                </div>

                {/* Confirmed Curated Add-ons */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-editorial text-lg text-[#1c1c18]">
                    Confirmed Curated Add-ons
                  </h4>
                  <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#97472e]/10 text-[#97472e] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">spa</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[#1c1c18]">
                          Organic Forest Herbal Spa Ritual (60 Min)
                        </p>
                        <p className="text-[11px] text-[#7c766e]">
                          Wednesday, Oct 15 · 10:30 AM · Cedar Steam Chamber
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#ffdbd0] text-[#793019] text-[10px] font-bold uppercase tracking-wider">
                      Included
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#97472e]/10 text-[#97472e] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[#1c1c18]">
                          Private Kaiseki Dinner on Pavilion Terrace
                        </p>
                        <p className="text-[11px] text-[#7c766e]">
                          Thursday, Oct 16 · 7:30 PM · Master Chef Kenji Matsuno
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-[#1c1c18] text-[10px] font-bold uppercase tracking-wider">
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* Guest Profile & Requests */}
                <div className="p-5 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                      Guest Dossier Specification
                    </span>
                    <button
                      onClick={() => showToast('Dossier preferences are synchronized', 'sync')}
                      className="text-xs text-[#97472e] font-semibold hover:underline"
                    >
                      Preferences Locked
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-[#7c766e]">Primary Registered Guest</p>
                      <p className="text-sm font-semibold text-[#1c1c18]">{res.primaryGuest.name}</p>
                      <p className="text-[#7c766e]">{res.primaryGuest.phone}</p>
                    </div>
                    <div>
                      <p className="text-[#7c766e]">Recorded Preferences &amp; Requests</p>
                      <p className="text-xs italic text-[#1c1c18] mt-0.5">
                        "{res.primaryGuest.requests}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Curator Welcome Note */}
                <div className="p-6 rounded-xl bg-[#1c1a17] text-white flex flex-col sm:flex-row items-start gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_sY2DZ3sYRVYT3iKeNmzyzO0Fvcq11pWextiusx3kTuZhMvmfQAYPpeuqB3rvnG4Celp4Tl9EGmmgzzw4ZUybocs7_gRd5wT9SHFUoA8TKT_UNlN0itXuTh5Invthf1hP1YgKaGgIWp8jpY5lDVoAwseVdV2Olu3K55t3C_oIA6Cyv39tzi9fkGADl-hsngDJE2M-hM0piCi8_LWABsofWPGbyEjzwSY30dgDgZ2TG8ZYsauZMm_JqQ"
                    alt="Master Sōsen"
                    className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-[#97472e]/50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-lg text-white">
                        A Personal Welcome from Master Sōsen
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#ffdbd0]">
                        Lead Curator
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#ebe8e2]/80 leading-relaxed italic">
                      “We have prepared our seasonal roasted hojicha and spring water from the Arashiyama mountain spring for your arrival. Your private cedar onsen will be drawn at 40°C upon your arrival at the pavilion.”
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Financial Ledger & Concierge Transport (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Financial Ledger Card */}
            <div className="rounded-2xl bg-white p-6 border border-[#e8e3d9] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                    Receipt Summary
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1c18]">Financial Ledger</h3>
                </div>
                <span className="material-symbols-outlined text-[24px] text-[#97472e]">receipt_long</span>
              </div>

              <div className="space-y-2.5 text-xs text-[#4b463f]">
                <div className="flex justify-between">
                  <span>Pavilion Base Rate (4 nights × $520.00)</span>
                  <span className="font-medium text-[#1c1c18]">${res.baseAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Organic Forest Herbal Spa Ritual</span>
                  <span className="font-medium text-[#1c1c18]">${res.addonsAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hospitality &amp; Environmental Stewardship</span>
                  <span className="font-medium text-[#1c1c18]">${res.serviceAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prefectural Tourism Levy &amp; VAT (10%)</span>
                  <span className="font-medium text-[#1c1c18]">${res.taxAmount.toFixed(2)}</span>
                </div>

                <div className="h-px bg-[#e8e3d9] my-2"></div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                      Total Paid &amp; Settled
                    </span>
                    <p className="font-editorial text-2xl font-bold text-[#1c1c18]">
                      ${res.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1c1c18]">
                      <span className="material-symbols-outlined text-[15px]">credit_card</span>
                      {res.paymentMethod}
                    </span>
                    <p className="text-[10px] text-[#7c766e]">Transaction ID #99283-KY</p>
                  </div>
                </div>
              </div>

              {/* Carbon Neutrality Badge */}
              <div className="p-3.5 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-center gap-3">
                <span className="material-symbols-outlined text-[22px] text-[#97472e] shrink-0">
                  energy_savings_leaf
                </span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#1c1c18]">
                    100% Certified Carbon-Neutral
                  </p>
                  <p className="text-[11px] text-[#7c766e] mt-0.5">
                    3% invested into Arashiyama ancient cedar canopy conservation.
                  </p>
                </div>
              </div>
            </div>

            {/* Pre-Arrival Logistics / Curated Concierge */}
            <div className="rounded-2xl bg-white p-6 border border-[#e8e3d9] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                    Pre-Arrival Logistics
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1c18]">Curated Concierge</h3>
                </div>
                <span className="material-symbols-outlined text-[24px] text-[#97472e]">concierge</span>
              </div>

              {/* Transfer Status Ribbon */}
              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#97472e]">directions_car</span>
                    Private Station Transfer
                  </span>
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#ffdbd0] text-[#793019]">
                    Scheduled
                  </span>
                </div>
                <p className="text-xs text-[#4b463f] leading-relaxed">
                  Lexus Hybrid VIP transport confirmed for pickup at <strong>Kyoto Shinkansen Station (Hachijo Gate)</strong> on Tuesday, Oct 14 at 2:15 PM.
                </p>
              </div>

              {/* Direct Concierge Contact Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConciergeOpen(true)}
                  className="py-2.5 px-3 rounded-lg bg-[#1c1a17] text-white text-xs font-semibold hover:bg-[#97472e] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Message Concierge</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Calling Kyoto Liaison Desk (+81 75 871 0022)...', 'call')}
                  className="py-2.5 px-3 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#e8e3d9]"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Kyoto Guild</span>
                </button>
              </div>

              {/* Traditions & Etiquette */}
              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] space-y-2 text-xs text-[#4b463f]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e] block">
                  Sanctuary Traditions &amp; Etiquette
                </span>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[15px] text-[#97472e] shrink-0 mt-0.5">check_circle</span>
                    <span>Silent forest hours observed nightly from 22:00 to 07:00.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[15px] text-[#97472e] shrink-0 mt-0.5">check_circle</span>
                    <span>Footwear-free tatami chambers throughout the pavilion interior.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[15px] text-[#97472e] shrink-0 mt-0.5">check_circle</span>
                    <span>Mineral onsen waters drawn from natural forest aquifers.</span>
                  </li>
                </ul>
              </div>

              {/* Modifiers */}
              <div className="pt-1 flex items-center justify-between text-xs text-[#7c766e]">
                <button
                  onClick={() => showToast('Opening amendment request for #AS-8942-KYO', 'edit')}
                  className="hover:text-[#97472e] underline transition-colors"
                >
                  Modify Dates or Add-ons
                </button>
                <button
                  onClick={() => showToast('Free zero-penalty cancellation until Oct 12, 3:00 PM JST', 'info')}
                  className="hover:text-[#1c1c18] underline transition-colors"
                >
                  Cancellation Terms
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Panoramic Navigation / Action Strip */}
        <div className="w-full mt-16 pt-8 border-t border-[#e8e3d9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#4b463f] hover:text-[#1c1c18] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Return to Sanctuary Directory &amp; Explore Stays</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShareReservation}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#f0eee8] text-[#1c1c18] hover:bg-[#ebe8e2] text-xs font-semibold transition-colors border border-[#e8e3d9]"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Share Reservation</span>
            </button>
            <Link
              to="/my-bookings"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#1c1a17] text-white hover:bg-[#97472e] text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>View in My Bookings</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Concierge Modal */}
      <ConciergeChatModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        sanctuaryName={res.sanctuaryName}
        hostName="Kenji S. (Aura Kyoto Guild)"
      />
    </div>
  );
};
