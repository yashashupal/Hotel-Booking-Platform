import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to The Journal Dispatch', 'mark_email_read');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#f6f3ed] border-t border-[#e8e3d9] mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">
          
          {/* Brand & Newsletter Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 relative flex items-center justify-center text-[#1c1c18]">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[2.5]">
                  <circle cx="20" cy="20" r="14" />
                  <line x1="20" y1="2" x2="20" y2="8" />
                  <line x1="20" y1="32" x2="20" y2="38" />
                  <line x1="2" y1="20" x2="8" y2="20" />
                  <line x1="32" y1="20" x2="38" y2="20" />
                  <circle cx="20" cy="20" r="4.5" fill="#97472e" className="stroke-none" />
                </svg>
              </div>
              <span className="font-editorial text-[22px] font-semibold text-[#1c1c18]">
                Aura Stay
              </span>
            </div>

            <p className="text-[14px] leading-relaxed text-[#4b463f] max-w-sm">
              Curating sanctuaries of quiet architectural poetry and restorative hospitality across Mediterranean landscapes and Nordic coasts.
            </p>

            <div className="pt-2">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7c766e] mb-2.5">
                The Journal Dispatch
              </p>
              {subscribed ? (
                <div className="p-3 bg-[#ffffff] rounded-lg border border-[#cdc5bc] flex items-center gap-2 text-sm text-[#97472e]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Welcome. Look for our dawn dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#cdc5bc] text-[13px] text-[#1c1c18] placeholder:text-[#7c766e] focus:outline-none focus:ring-1 focus:ring-[#97472e] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#1c1a17] text-white text-[12px] font-semibold hover:bg-[#97472e] transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Directory Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7c766e]">
              Sanctuary Directory
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/sanctuaries/komorebi-forest" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  The Komorebi Forest, Kyoto
                </Link>
              </li>
              <li>
                <Link to="/sanctuaries/miramonti-forest" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Miramonti Forest Sanctuary, Dolomites
                </Link>
              </li>
              <li>
                <Link to="/sanctuaries/vardo-fjord" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Vardø Fjord Studio, Lofoten
                </Link>
              </li>
              <li>
                <Link to="/sanctuaries/akro-stone-cove" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Akro Stone Cove, Milos
                </Link>
              </li>
              <li>
                <span className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors cursor-pointer">
                  Mallorca Tramuntana Fincas
                </span>
              </li>
            </ul>
          </div>

          {/* Concierge Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7c766e]">
              Concierge
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/my-bookings" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Direct Reservation Desk
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Curated Itineraries
                </Link>
              </li>
              <li>
                <span className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors cursor-pointer">
                  Private Aviation
                </span>
              </li>
              <li>
                <Link to="/journal" className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors">
                  Press &amp; Editorial
                </Link>
              </li>
              <li>
                <span className="text-[13px] text-[#4b463f] hover:text-[#1c1c18] transition-colors cursor-pointer">
                  Private Dining Guild
                </span>
              </li>
            </ul>
          </div>

          {/* Sustainability Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7c766e]">
              Sustainability Manifesto
            </p>
            <p className="text-[13px] text-[#4b463f] leading-relaxed">
              Every Aura residence operates in reverent harmony with its surrounding ecology. We commit 3% of seasonal revenues to coastal restoration, preserve heirloom architectural heritage, and maintain rigorous low-impact bioclimatic standards.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[#1c1c18]">
              <span className="material-symbols-outlined text-[20px] text-[#97472e]">eco</span>
              <span className="text-[13px] font-semibold">Certified B-Corp Hospitality</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#e8e3d9] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7c766e]">
          <p>© 2025 Aura Stay Hospitality Collection. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-[#1c1c18] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#1c1c18] cursor-pointer transition-colors">Terms of Sanctuary</span>
            <span className="hover:text-[#1c1c18] cursor-pointer transition-colors">Accessibility</span>
            <span className="hover:text-[#1c1c18] cursor-pointer transition-colors">Architectural Credits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
