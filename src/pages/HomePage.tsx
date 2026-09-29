import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SANCTUARIES, CURATED_LANDSCAPES } from '../data/sanctuaries';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { toggleWishlist, isWishlisted, showToast } = useApp();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [destinationQuery, setDestinationQuery] = useState<string>('Kyoto, Japan');
  const [atmosphereFilter, setAtmosphereFilter] = useState<string>('Wellness & Spa');
  const [guestCount, setGuestCount] = useState<string>('2 Guests, 1 Suite');
  const [acousticDecibel, setAcousticDecibel] = useState<string>('19.4');
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSent, setNewsletterSent] = useState<boolean>(false);

  // Subtle live acoustic index fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      const val = (19.2 + Math.random() * 0.5).toFixed(1);
      setAcousticDecibel(val);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const filteredSanctuaries = activeCategory === 'all'
    ? SANCTUARIES
    : SANCTUARIES.filter(s => s.category === activeCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Filtering stays for ${destinationQuery}`, 'travel_explore');
    // Scroll smoothly to sanctuaries grid
    const el = document.getElementById('explore-sanctuaries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAudioAtmosphere = () => {
    setAudioPlaying(!audioPlaying);
    if (!audioPlaying) {
      showToast('Ambient forest & water acoustics enabled (simulated)', 'graphic_eq');
    } else {
      showToast('Ambient audio paused', 'volume_off');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    showToast('Exclusive invite dispatch reserved for your inbox', 'mark_email_read');
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSent(false);
    }, 4500);
  };

  return (
    <div className="w-full bg-[#fcf9f3]">
      
      {/* 1. Immersive Editorial Hero Section */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#1d1b18] min-h-[640px] md:min-h-[880px] lg:min-h-[940px] flex flex-col justify-end">
        {/* Background Image with Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnS36WGEGxMfguWyBJFKabAe5AtHXc84q_gZIn0Ie8sFWObNt2eH31pYMqBNjVYrN0hTEsKScDJdWdbub4C1C3jA06hTzXOtkbktaUYewH6AdDs1g1d2Pb1v6aTquzatl6Rx0MTLCDdVyrszRWgwyn6Oh4OCF-li9ZDdyk_3tQ1wzL7BYx09crl0DkeOZG1d5nCdDgkuKxDZMSLLiT94XqKKoEc8Ks9wslB_zNCHMBO5qDk2-_LHOlmg')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17] via-[#1c1a17]/40 to-transparent opacity-85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1a17]/75 via-transparent to-transparent"></div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 pt-36 pb-20 md:pb-28">
          <div className="max-w-3xl space-y-5 md:space-y-6">
            
            {/* Curated Collection Pill */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fe997a] animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white">
                  The 2025 Architecture &amp; Solitude Collection
                </span>
              </div>

              {/* Audio preview button */}
              <button
                onClick={handleAudioAtmosphere}
                title="Preview soundscape atmosphere"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  audioPlaying ? 'bg-[#97472e] text-white' : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {audioPlaying ? 'volume_up' : 'graphic_eq'}
                </span>
              </button>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-white leading-[1.08] tracking-tight">
              Find stillness in extraordinary spaces.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#ebe8e2]/90 max-w-xl font-light leading-relaxed">
              Handpicked architectural sanctuaries and boutique hotels curated for mindful travelers seeking restorative design and quiet wilderness.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#explore-sanctuaries"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white text-[#1c1c18] text-[13px] font-semibold shadow-xl hover:bg-[#f6f3ed] hover:text-[#97472e] transition-all"
              >
                <span>Explore Collection</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>

              <div className="flex items-center gap-2 text-[#ebe8e2]/80 text-xs sm:text-sm font-medium">
                <span className="material-symbols-outlined text-[18px] text-[#ffdbd0]">verified</span>
                <span>Over 140+ vetted bioclimatic residences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Horizontal Booking Concierge Dock */}
      <section className="relative z-20 max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 -mt-12 md:-mt-14 mb-16">
        <div className="w-full bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(28,26,23,0.12)] p-3 md:p-4 border border-[#e8e3d9]">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Field 1: Destination */}
            <div className="lg:col-span-3 group relative p-3 rounded-lg bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors border border-transparent focus-within:border-[#97472e]/40">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#7c766e] mb-1">
                Destination
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c766e] text-[18px] group-focus-within:text-[#97472e]">
                  travel_explore
                </span>
                <input
                  type="text"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  placeholder="Where to wander? (Kyoto, Alps...)"
                  className="w-full bg-transparent text-[13px] text-[#1c1c18] font-medium placeholder:text-[#cdc5bc] focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Dates Picker */}
            <div className="lg:col-span-3 group relative p-3 rounded-lg bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#7c766e] mb-1">
                Stay Duration
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c766e] text-[18px]">
                  calendar_month
                </span>
                <span className="text-[13px] text-[#1c1c18] font-medium truncate">
                  Oct 14 — Oct 19, 2025
                </span>
              </div>
            </div>

            {/* Field 3: Guests */}
            <div className="lg:col-span-2 group relative p-3 rounded-lg bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#7c766e] mb-1">
                Guests
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c766e] text-[18px]">
                  group
                </span>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-transparent text-[13px] text-[#1c1c18] font-medium focus:outline-none cursor-pointer"
                >
                  <option>1 Guest, 1 Suite</option>
                  <option>2 Guests, 1 Suite</option>
                  <option>3 Guests, 2 Suites</option>
                  <option>4 Guests, Villa</option>
                </select>
              </div>
            </div>

            {/* Field 4: Atmosphere */}
            <div className="lg:col-span-2 group relative p-3 rounded-lg bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-[#7c766e] mb-1">
                Atmosphere
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7c766e] text-[18px]">
                  spa
                </span>
                <select
                  value={atmosphereFilter}
                  onChange={(e) => setAtmosphereFilter(e.target.value)}
                  className="w-full bg-transparent text-[13px] text-[#1c1c18] font-medium focus:outline-none cursor-pointer"
                >
                  <option>Wellness &amp; Spa</option>
                  <option>Alpine Solitude</option>
                  <option>Coastal Minimal</option>
                  <option>Forest Immersion</option>
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <div className="lg:col-span-2 flex items-center h-full">
              <button
                type="submit"
                className="w-full h-full min-h-[50px] px-5 py-3 rounded-lg bg-[#97472e] text-white text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#772f18] shadow-md transition-all active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Search Stays</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Curated Escapes / Architectural Havens Section */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 py-8" id="explore-sanctuaries">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#97472e] block mb-1">
              Curated Escapes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1c18]">
              Architectural Havens
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'All Stays' },
              { id: 'nordic', label: 'Nordic Cabins' },
              { id: 'coastal', label: 'Coastal Villas' },
              { id: 'alpine', label: 'Alpine Chalets' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-[#1c1a17] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#4b463f] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSanctuaries.map(sanctuary => {
            const liked = isWishlisted(sanctuary.id);
            return (
              <article
                key={sanctuary.id}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#e8e3d9] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#ebe8e2]">
                  <img
                    src={sanctuary.heroImage}
                    alt={sanctuary.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#fcf9f3]/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#1c1c18] shadow-sm">
                      {sanctuary.location}
                    </span>
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(sanctuary.id);
                    }}
                    aria-label="Save to Wishlist"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#fcf9f3]/90 backdrop-blur-md flex items-center justify-center text-[#1c1c18] hover:text-[#97472e] transition-colors shadow-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        liked ? 'text-[#97472e]' : 'text-[#1c1c18]'
                      }`}
                      style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-editorial text-xl font-semibold text-[#1c1c18] group-hover:text-[#97472e] transition-colors truncate">
                        {sanctuary.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 text-xs">
                        <span className="material-symbols-outlined text-[15px] text-[#97472e]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-bold text-[#1c1c18]">{sanctuary.rating}</span>
                        <span className="text-[#7c766e]">({sanctuary.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed text-[#4b463f] line-clamp-2 mb-4">
                      {sanctuary.description}
                    </p>

                    {/* Amenity Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {sanctuary.highlightTrio.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f6f3ed] text-[11px] font-medium text-[#4b463f]"
                        >
                          <span className="material-symbols-outlined text-[13px] text-[#97472e]">
                            {hl.icon}
                          </span>
                          <span>{hl.title}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Price & CTA */}
                  <div className="pt-4 border-t border-[#f0eee8] flex items-center justify-between">
                    <div>
                      <span className="font-editorial text-2xl font-semibold text-[#1c1c18]">
                        ${sanctuary.pricePerNight}
                      </span>
                      <span className="text-xs text-[#7c766e]"> / night</span>
                    </div>

                    <Link
                      to={`/sanctuaries/${sanctuary.id}`}
                      className="px-4 py-2 rounded-lg bg-[#f0eee8] text-[#1c1c18] hover:bg-[#1c1a17] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
                    >
                      View Sanctuary
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Curated Landscapes Showcase */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#97472e] block mb-1">
              Regional Explorations
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1c18]">
              Curated Landscapes
            </h2>
          </div>
          <p className="text-sm text-[#4b463f] max-w-md mt-2 md:mt-0 leading-relaxed">
            Destinations selected for raw natural stillness, seasonal food traditions, and preservation of local architectural vernacular.
          </p>
        </div>

        {/* Landscapes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CURATED_LANDSCAPES.map(loc => (
            <div
              key={loc.id}
              onClick={() => {
                navigate(`/sanctuaries/komorebi-forest`);
                showToast(`Exploring sanctuaries in ${loc.name}`, 'landscape');
              }}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-[#ebe8e2] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${loc.imageUrl}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17] via-[#1c1a17]/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="self-end">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                    {loc.stayCount} Sanctuaries
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#ffdbd0] mb-0.5">
                    {loc.country}
                  </p>
                  <h3 className="font-editorial text-2xl font-semibold mb-0.5">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-[#ebe8e2]/80">
                    From ${loc.startingPrice} / night
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Acoustic Rest Index Feature Widget */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 py-8">
        <div className="bg-[#f6f3ed] rounded-2xl p-8 md:p-12 border border-[#e8e3d9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#97472e]">
                The Acoustic Rest Index
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1c1c18] leading-tight">
                Every sanctuary is mapped by ambient noise levels &amp; dark sky clarity.
              </h3>
              <p className="text-sm text-[#4b463f] leading-relaxed">
                We partner with acoustic ecologists to audit every hideaway. No flight paths, zero highway hum, and verified sub-25dB nighttime environments.
              </p>

              {/* Meter Box */}
              <div className="p-4 bg-white rounded-xl border border-[#e8e3d9] shadow-sm space-y-2 mt-4">
                <div className="flex items-center justify-between text-xs text-[#1c1c18] font-semibold">
                  <span>Average Sanctuary Decibel (Night)</span>
                  <span className="font-editorial text-lg text-[#97472e]">{acousticDecibel} dB</span>
                </div>
                <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#97472e] h-full rounded-full w-[28%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#7c766e] uppercase tracking-wider font-bold pt-1">
                  <span>Pin Drop (10 dB)</span>
                  <span className="text-[#97472e]">Aura Standard (25 dB)</span>
                  <span>City Noise (65 dB)</span>
                </div>
              </div>
            </div>

            {/* Right Live Sensor Simulation Visual */}
            <div className="lg:col-span-6">
              <div
                className="w-full h-80 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center border border-[#e8e3d9]"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzcpMzlKl71T_jodWeJ3iYbLe2QsU-IT8O9hxV5dhOZ4-mkwJsGdrUfjGyJNP8-WcHkWh9BR0JLZ7OtokEa_NteI2iEyQGElgEWjO3ZLqr_Et3ferQcLew5twlaVQPI50kUX-fMuTmzTGyFlMmR8-aCm4CUNg9O2HtcKaF6hx7qpyLLb9M3FkNZIFkjGhLa6R9bBwnt9hq2e17e8vuMHMSraMDOwRiAGAIpUXGsOzAnJP07W3mcI800g')"
                }}
              >
                <div className="absolute inset-0 bg-black/25"></div>
                
                {/* Live Sensor Badge */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md shadow-sm border border-[#e8e3d9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#97472e] animate-ping"></span>
                    <span className="text-xs font-semibold text-[#1c1c18]">
                      Live Acoustic Sensor · Merano High Pass
                    </span>
                  </div>
                </div>

                {/* Bottom Soundwave Visual */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3.5 rounded-lg text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#ffdbd0]">graphic_eq</span>
                    <span className="text-xs font-medium">Ambient Frequencies: Wind in Spruce Needle Canopy</span>
                  </div>
                  <span className="text-xs font-bold text-[#ffdbd0]">{acousticDecibel} dB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Aura Stay / The Sanctuary Promise */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#97472e]">
            Our Philosophy
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1c18]">
            The Sanctuary Promise
          </h2>
          <p className="text-sm sm:text-base text-[#4b463f] leading-relaxed">
            A deliberate antidote to frantic, high-density hotel chains. We measure luxury not by gilded excess, but by spatial clarity, tactile authenticity, and ecological grace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-xl bg-white border border-[#e8e3d9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#f0eee8] flex items-center justify-center text-[#97472e] mb-6">
                <span className="material-symbols-outlined text-[26px]">architecture</span>
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#1c1c18] mb-3">
                Bespoke Architecture
              </h3>
              <p className="text-sm leading-relaxed text-[#4b463f]">
                Every property is hand-selected in partnership with acclaimed architects. Homes that defer to terrain, framing horizons through considered sightlines and natural stone masonry.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f0eee8] flex items-center gap-2 text-xs font-bold text-[#1c1c18]">
              <span>Explore design profiles</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-xl bg-white border border-[#e8e3d9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#f0eee8] flex items-center justify-center text-[#97472e] mb-6">
                <span className="material-symbols-outlined text-[26px]">energy_savings_leaf</span>
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#1c1c18] mb-3">
                Carbon Neutral Stays
              </h3>
              <p className="text-sm leading-relaxed text-[#4b463f]">
                Every booking includes certified micro-grid offsets and geothermal heating audits. We fund 100 square meters of coastal kelp and peatland protection for every guest night.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f0eee8] flex items-center gap-2 text-xs font-bold text-[#1c1c18]">
              <span>Read Sustainability Ledger</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-xl bg-white border border-[#e8e3d9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#f0eee8] flex items-center justify-center text-[#97472e] mb-6">
                <span className="material-symbols-outlined text-[26px]">local_florist</span>
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#1c1c18] mb-3">
                Curated Local Rhythms
              </h3>
              <p className="text-sm leading-relaxed text-[#4b463f]">
                Unscripted access to private foraging masters, ceramic artisans, and silent monastery gardens rarely accessible to typical travelers. True geographic intimacy.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f0eee8] flex items-center gap-2 text-xs font-bold text-[#1c1c18]">
              <span>View Resident Guides</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Guest Stories & Critical Acclaim */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Featured Testimonial Card */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-[#e8e3d9] shadow-md space-y-6">
            <div className="flex items-center gap-1 text-[#97472e]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
            <blockquote className="font-editorial text-xl sm:text-2xl text-[#1c1c18] font-normal italic leading-relaxed">
              “Our five nights at the Reine fjord cabin unlocked a caliber of deep psychological rest we hadn’t felt in a decade. The light shifts across the water like poetry. Aura Stay is redefining slow travel.”
            </blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-[#f0eee8]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw_hiwyOBlmQ7wIBF4DzDP6msvlyybNh3ZbFppOJSiBUYhZokpca7rLi7zfbW9eg1YGTcMEzqG1JzqpgjI-taqRjiZgvKlFQtMJFm_IMZxlnt-sNY-O4VXE1iU4J9I4kuiygDBNmPkB3ud23ncdjEjnN6LAdOX8FxMsoAr71ttAlxzGjidgCrGXvm7ETA3M6e9vMUiEup65xRIeqaM9hEQXGberHQ6hKfKvCAEtA4VemYDn6AQzYaZGg"
                alt="Dr. Helena Voss"
                className="w-12 h-12 rounded-full object-cover ring-1 ring-[#cdc5bc]"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-editorial text-base font-semibold text-[#1c1c18]">
                  Dr. Helena Voss &amp; Marcus Brandt
                </p>
                <p className="text-xs text-[#7c766e]">
                  Stayed at Vardø Fjord Studio · September 2024
                </p>
              </div>
            </div>
          </div>

          {/* Critical Acclaim Press Mentions */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7c766e] block mb-2">
              Critical Acclaim
            </span>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]">
                <p className="font-editorial text-sm italic text-[#1c1c18] mb-1.5">
                  “The benchmark for quiet luxury in an overstimulated hospitality landscape.”
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#97472e]">
                  Architectural Digest
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]">
                <p className="font-editorial text-sm italic text-[#1c1c18] mb-1.5">
                  “Aura Stay curates sanctuaries where silence and spatial harmony take center stage.”
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#97472e]">
                  Vogue Living
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#e8e3d9]">
                <p className="font-editorial text-sm italic text-[#1c1c18] mb-1.5">
                  “A masterclass in slow, environmentally reverent hospitality architecture.”
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#97472e]">
                  Monocle Travel Top 50
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Editorial Newsletter Anchor */}
      <section className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-12">
        <div className="bg-[#1c1a17] text-white rounded-2xl p-8 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl space-y-3 z-10">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#ffdbd0]">
              Private Release Notice
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white">
              Receive exclusive invites to new architectural openings.
            </h3>
            <p className="text-sm text-[#ebe8e2]/80 leading-relaxed">
              Only eight seasonal residences are admitted per quarter. Subscribe to receive private booking windows prior to global publication.
            </p>
          </div>

          <div className="w-full lg:max-w-md z-10">
            {newsletterSent ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-sm text-[#ffdbd0] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Your private access pass has been queued.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your personal email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-[#1c1c18] text-xs font-medium placeholder:text-[#7c766e] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#97472e] text-white text-xs font-semibold hover:bg-[#c86d51] transition-colors shrink-0"
                >
                  Request Access
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#ebe8e2]/60 mt-2">
              Strictly no promotional noise. Unsubscribe at any whim.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
