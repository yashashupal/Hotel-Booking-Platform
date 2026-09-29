import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SANCTUARIES, BOOKING_ADDONS } from '../data/sanctuaries';
import { ConciergeChatModal } from '../components/ConciergeChatModal';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedSanctuaryId,
    selectedRoomId,
    guestForm,
    updateGuestForm,
    selectedAddonIds,
    toggleAddon,
    calculateCosts,
    completeReservation,
    showToast
  } = useApp();

  const sanctuary = SANCTUARIES.find(s => s.id === selectedSanctuaryId) || SANCTUARIES[0];
  const room = sanctuary.rooms.find(r => r.id === selectedRoomId) || sanctuary.rooms[0];
  const costs = calculateCosts(sanctuary, room);

  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4829 •••• •••• 9104');
  const [cardExpiry, setCardExpiry] = useState('11 / 28');
  const [cardCvc, setCardCvc] = useState('842');
  const [cardName, setCardName] = useState('JULIAN VANDERMEER');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion drawer toggle on mobile
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleBookingSubmit = (e?: React.FormEvent, directMethod?: 'apple_pay' | 'google_pay') => {
    if (e) e.preventDefault();

    if (!termsAgreed) {
      showToast('Please accept the Terms of Sanctuary to proceed', 'error');
      return;
    }

    setIsSubmitting(true);
    const chosenMethod = directMethod || paymentMode;

    setTimeout(() => {
      completeReservation({
        method: chosenMethod,
        cardLast4: '9104'
      });
      setIsSubmitting(false);
      navigate('/confirmed');
    }, 1100);
  };

  return (
    <div className="w-full bg-[#fcf9f3]">
      
      {/* Top Breadcrumb & Security Stage Bar */}
      <section className="w-full bg-[#f6f3ed] border-b border-[#e8e3d9] pb-6 pt-4">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <Link
                to={`/sanctuaries/${sanctuary.id}`}
                className="text-[11px] font-bold uppercase tracking-wider text-[#7c766e] hover:text-[#1c1c18] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Sanctuaries
              </Link>
              <span className="text-[#cdc5bc] text-xs">/</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1c1c18]">
                {sanctuary.name} Reservation
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0eee8] text-[#4b463f] text-[10px] font-bold uppercase tracking-wider border border-[#e8e3d9]">
              <span className="material-symbols-outlined text-[#97472e] text-[16px]">lock</span>
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>

          {/* Stepper / Progress Bar Component */}
          <div className="bg-white rounded-xl p-4 md:p-5 border border-[#e8e3d9] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Step 1: Completed */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#97472e] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">Step 01</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] truncate">Dates &amp; Pavilion</p>
                </div>
                <div className="hidden md:block flex-1 h-0.5 bg-[#97472e] ml-2 rounded-full"></div>
              </div>

              {/* Step 2: Active */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1c1a17] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md ring-4 ring-[#1c1a17]/10">
                  2
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#97472e]">In Progress</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] truncate">Guest Details &amp; Upgrades</p>
                </div>
                <div className="hidden md:block flex-1 h-0.5 bg-[#e8e3d9] ml-2 rounded-full"></div>
              </div>

              {/* Step 3: Pending */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-[#f0eee8] text-[#7c766e] flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">Final Stage</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#1c1c18] truncate">Payment &amp; Confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Canvas */}
      <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Guest Details Form Container */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#97472e]">
                    Primary Resident
                  </span>
                  <h2 className="font-editorial text-2xl text-[#1c1c18]">Contact Information</h2>
                </div>
                <span className="material-symbols-outlined text-[#7c766e] text-[28px]">shield_person</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestForm.firstName}
                    onChange={(e) => updateGuestForm({ firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestForm.lastName}
                    onChange={(e) => updateGuestForm({ lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestForm.email}
                    onChange={(e) => updateGuestForm({ email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all"
                  />
                  <p className="text-[11px] text-[#7c766e]">
                    Your itinerary and sanctuary keypass will be sent here.
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestForm.phone}
                    onChange={(e) => updateGuestForm({ phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all"
                  />
                  <p className="text-[11px] text-[#7c766e]">
                    For discreet airport liaison updates only.
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                  Country / Jurisdiction
                </label>
                <select
                  value={guestForm.country}
                  onChange={(e) => updateGuestForm({ country: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all cursor-pointer"
                >
                  <option>United States of America</option>
                  <option>Japan</option>
                  <option>United Kingdom</option>
                  <option>Switzerland</option>
                  <option>France</option>
                  <option>Germany</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Arrival Time & Special Requests */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Estimated Arrival at Kyoto Station / Sanctuary
                  </label>
                  <select
                    value={guestForm.arrivalTime}
                    onChange={(e) => updateGuestForm({ arrivalTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all cursor-pointer"
                  >
                    <option>Early Arrival: 12:00 PM – 2:00 PM (Luggage drop available)</option>
                    <option>Standard Check-in: 3:00 PM – 6:00 PM (Tea reception included)</option>
                    <option>Twilight Arrival: 6:00 PM – 9:00 PM</option>
                    <option>Late Arrival: After 9:00 PM (Private night concierge required)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Sanctuary Curations &amp; Special Considerations
                  </label>
                  <textarea
                    rows={3}
                    value={guestForm.requests}
                    onChange={(e) => updateGuestForm({ requests: e.target.value })}
                    placeholder="Dietary restrictions (e.g. pescatarian Kaiseki), celebratory occasions (honeymoon / anniversary), or bespoke pillow menu preferences..."
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e] transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 2. Curated Add-on Experiences Container */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 pb-2 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#97472e]">
                    Enhance Your Sojourn
                  </span>
                  <h2 className="font-editorial text-2xl text-[#1c1c18]">Tailored Experience Add-ons</h2>
                </div>
                <span className="text-xs text-[#7c766e]">Optional rituals designed for Kyoto</span>
              </div>

              <div className="space-y-3 pt-1">
                {BOOKING_ADDONS.map(addon => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#f6f3ed] border-[#97472e]/50 ring-1 ring-[#97472e]/20'
                          : 'bg-[#fcf9f3] border-[#e8e3d9] hover:bg-[#f6f3ed]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          toggleAddon(addon.id);
                          showToast(
                            isChecked ? `Removed ${addon.name}` : `Added ${addon.name}`,
                            'spa'
                          );
                        }}
                        className="mt-1 w-5 h-5 rounded text-[#97472e] accent-[#97472e] cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-editorial text-base font-semibold text-[#1c1c18] group-hover:text-[#97472e] transition-colors">
                              {addon.name}
                            </h3>
                            {addon.tag && (
                              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#97472e]/10 text-[#97472e]">
                                {addon.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#1c1c18] bg-white px-2.5 py-1 rounded-full border border-[#e8e3d9] shrink-0">
                            +${addon.price} {addon.perPerson ? <span className="font-normal text-[#7c766e]">/ person</span> : null}
                          </span>
                        </div>
                        <p className="text-xs text-[#4b463f] mt-1.5 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method Container */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e8e3d9] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#97472e]">
                    Step 03 of 03
                  </span>
                  <h2 className="font-editorial text-2xl text-[#1c1c18]">Payment Sanctuary</h2>
                </div>
                <div className="flex items-center gap-1.5 text-[#7c766e]">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">PCI-DSS Level 1</span>
                </div>
              </div>

              {/* Express Digital Wallets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleBookingSubmit(undefined, 'apple_pay')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1c1a17] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.64-1.04 1.7-0.91 2.73 1.02.08 2.05-.53 2.64-1.25z"></path>
                  </svg>
                  <span>Pay with Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBookingSubmit(undefined, 'google_pay')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-[#e8e3d9]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" fill="#34A853"></path>
                    <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                  </svg>
                  <span>Google Pay / Klarna</span>
                </button>
              </div>

              {/* Or Direct Card */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full h-px bg-[#e8e3d9]"></div>
                <span className="absolute px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-[#7c766e]">
                  Or Pay With Direct Card
                </span>
              </div>

              {/* Credit Card Inputs */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                      Card Number
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f0eee8] text-[#4b463f]">VISA</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f0eee8] text-[#4b463f]">MC</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f0eee8] text-[#4b463f]">AMEX</span>
                    </div>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#7c766e] text-[18px]">
                      credit_card
                    </span>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] font-mono tracking-wider border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] text-center border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                        Security Code
                      </label>
                      <span className="material-symbols-outlined text-[14px] text-[#7c766e] cursor-help" title="3 or 4 digit code on the back">help</span>
                    </div>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] text-center font-mono border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#4b463f] block">
                    Name as Printed on Card
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-lg bg-[#fcf9f3] text-sm text-[#1c1c18] uppercase tracking-wider border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                  />
                </div>

                {/* Cancellation Policy Box */}
                <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#97472e] text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Tranquility Policy • Flexible Cancellation</span>
                  </div>
                  <p className="text-xs text-[#4b463f] leading-relaxed">
                    Full refund guaranteed up to 72 hours prior to arrival (October 11, 2025 at 3:00 PM JST). No hidden alteration surcharges.
                  </p>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#97472e] accent-[#97472e] cursor-pointer"
                  />
                  <span className="text-xs text-[#4b463f] leading-relaxed">
                    I agree to the <span className="text-[#1c1c18] underline">Terms of Sanctuary</span>, Guest Privacy Protocol, and understand that {sanctuary.name} operates a serene, low-acoustic environment.
                  </span>
                </label>

                {/* Big Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-[#97472e] hover:bg-[#772f18] text-white font-semibold text-sm transition-all flex items-center justify-between shadow-lg shadow-[#97472e]/25 active:scale-[0.99] disabled:opacity-75"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">
                      {isSubmitting ? 'sync' : 'lock'}
                    </span>
                    <span>{isSubmitting ? 'Securing Sanctuary...' : 'Confirm & Reserve Sanctuary'}</span>
                  </span>
                  <span className="font-editorial text-xl text-white">
                    ${costs.total.toLocaleString()}
                  </span>
                </button>

                <p className="text-center text-[11px] text-[#7c766e]">
                  Your card will be securely debited. Instant receipt issued upon confirmation.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column: Sticky Booking Order Summary Card (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#e8e3d9] shadow-sm relative overflow-hidden">
              
              {/* Instant Confirmation Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcf9f3]/95 backdrop-blur-md text-[#97472e] text-[10px] font-bold uppercase tracking-wider border border-[#e8e3d9] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#97472e] animate-pulse"></span>
                <span>Instant Confirmation</span>
              </div>

              {/* Hotel Image & Caption Header Preview */}
              <div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 bg-[#1c1a17]">
                <img
                  src={sanctuary.heroImage}
                  alt={sanctuary.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#ffdbd0] font-bold">
                      {sanctuary.location}
                    </span>
                    <h3 className="font-editorial text-lg text-white font-medium">
                      {sanctuary.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Suite Allocation Specs */}
              <div className="p-4 rounded-xl bg-[#f6f3ed] mb-4 space-y-2 border border-[#e8e3d9]/70">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#97472e]">
                      Suite Allocation
                    </span>
                    <p className="font-editorial text-base font-semibold text-[#1c1c18]">
                      {room.name}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#7c766e]">
                    <span className="material-symbols-outlined text-[18px]">king_bed</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7c766e]">
                  <span className="px-2 py-0.5 rounded bg-white">{room.bed}</span>
                  <span className="px-2 py-0.5 rounded bg-white">Private Hinoki Onsen</span>
                  <span className="px-2 py-0.5 rounded bg-white">{room.size}</span>
                </div>
              </div>

              {/* Dates & Stay Matrix */}
              <div className="grid grid-cols-2 gap-3 pb-4">
                <div className="p-3 rounded-lg bg-[#fcf9f3] border border-[#e8e3d9] space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e]">Check-In</span>
                  <p className="text-xs font-bold text-[#1c1c18]">Tue, Oct 14, 2025</p>
                  <p className="text-[11px] text-[#7c766e]">From 3:00 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-[#fcf9f3] border border-[#e8e3d9] space-y-0.5">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#7c766e]">Check-Out</span>
                  <p className="text-xs font-bold text-[#1c1c18]">Sat, Oct 18, 2025</p>
                  <p className="text-[11px] text-[#7c766e]">Until 11:00 AM</p>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-[#f0eee8] text-xs text-[#4b463f]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#97472e]">schedule</span>
                  <span>4 Nights Length of Stay</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#97472e]">group</span>
                  <span>2 Guests Sanctuary Occupancy</span>
                </div>
              </div>

              {/* Cost Breakdown List */}
              <div className="space-y-2.5 py-4 text-xs text-[#4b463f]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e] block mb-1">
                  Detailed Investment Breakdown
                </span>
                
                <div className="flex items-center justify-between">
                  <span>Pavilion Base Rate (4 × ${room.pricePerNight})</span>
                  <span className="font-semibold text-[#1c1c18]">${costs.roomSubtotal.toFixed(2)}</span>
                </div>

                {selectedAddonIds.map(id => {
                  const addon = BOOKING_ADDONS.find(a => a.id === id);
                  if (!addon) return null;
                  const cost = addon.perPerson ? addon.price * 2 : addon.price;
                  return (
                    <div key={id} className="flex items-center justify-between text-[#97472e]">
                      <span className="flex items-center gap-1">
                        <span>{addon.name}</span>
                        <span className="material-symbols-outlined text-[14px]">spa</span>
                      </span>
                      <span className="font-semibold">+${cost.toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between">
                  <span>Sanctuary Service &amp; Hospitality Amenity</span>
                  <span className="font-semibold text-[#1c1c18]">${costs.serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Prefectural Tourism Levy &amp; VAT</span>
                  <span className="font-semibold text-[#1c1c18]">${costs.taxes.toFixed(2)}</span>
                </div>

                {/* Total Line */}
                <div className="pt-3 mt-3 flex items-baseline justify-between bg-[#f6f3ed] -mx-6 -mb-6 p-4 rounded-b-xl border-t border-[#e8e3d9]">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7c766e]">
                      Total Sanctuary Investment
                    </span>
                    <p className="text-[11px] text-[#7c766e]">Includes all taxes &amp; sanctuary gratuities</p>
                  </div>
                  <span className="font-editorial text-2xl font-bold text-[#1c1c18]">
                    ${costs.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white border border-[#e8e3d9] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#97472e] text-[20px] shrink-0 mt-0.5">price_check</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#1c1c18]">Best Rate Direct</p>
                  <p className="text-[11px] text-[#7c766e]">Direct patron benefits included</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e8e3d9] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#97472e] text-[20px] shrink-0 mt-0.5">support_agent</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#1c1c18]">24/7 Concierge</p>
                  <p className="text-[11px] text-[#7c766e]">Dedicated Kyoto liaison desk</p>
                </div>
              </div>
            </div>

            {/* Eco Contribution Note */}
            <div className="p-3.5 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9] flex items-center justify-center gap-2 text-center text-xs text-[#4b463f]">
              <span className="material-symbols-outlined text-[#97472e] text-[18px]">park</span>
              <span>$80 of this stay contributes to Arashiyama Bamboo Grove conservation.</span>
            </div>

            {/* Help & Contact */}
            <div className="p-4 rounded-xl bg-white border border-[#e8e3d9] flex items-center justify-between text-xs text-[#4b463f]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7c766e]">contact_support</span>
                <div>
                  <p className="font-bold text-[#1c1c18]">Need personal assistance?</p>
                  <p className="text-[11px] text-[#7c766e]">Speak directly with our Sanctuary Curator</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConciergeOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] font-semibold text-[#1c1c18] transition-colors"
              >
                Connect
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Concierge Modal */}
      <ConciergeChatModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        sanctuaryName={sanctuary.name}
      />
    </div>
  );
};
