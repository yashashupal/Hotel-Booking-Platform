import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { user, logout, wishlist } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Destinations', path: '/' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Sanctuaries', path: '/sanctuaries/komorebi-forest' },
    { label: 'Journal', path: '/journal' },
    { label: 'Special Offers', path: '/special-offers' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f3]/85 backdrop-blur-xl border-b border-[#e8e3d9]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark & Reticle Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            {/* SVG Logo mark with warm terracotta reticle */}
            <div className="w-8 h-8 relative flex items-center justify-center text-[#1c1c18] group-hover:text-[#97472e] transition-colors">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full stroke-current stroke-[2.5]">
                <circle cx="20" cy="20" r="14" />
                <line x1="20" y1="2" x2="20" y2="8" />
                <line x1="20" y1="32" x2="20" y2="38" />
                <line x1="2" y1="20" x2="8" y2="20" />
                <line x1="32" y1="20" x2="38" y2="20" />
                <circle cx="20" cy="20" r="4.5" fill="#97472e" className="stroke-none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-[20px] font-semibold tracking-tight text-[#1c1c18] group-hover:text-[#97472e] transition-colors leading-none">
                Aura Stay
              </span>
              <span className="text-[9px] font-bold tracking-[0.18em] text-[#7c766e] uppercase mt-0.5">
                Nordic Sanctuaries
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: Navigation Links (Text Links with Underlines) */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/sanctuaries') && location.pathname.startsWith('/sanctuaries'));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 text-[14px] tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#1c1c18] font-semibold border-b-2 border-[#97472e]'
                    : 'text-[#4b463f] hover:text-[#1c1c18] font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          
          {/* Currency / Language Selector */}
          <div className="hidden md:flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#f0eee8] text-[#4b463f] hover:text-[#1c1c18] cursor-pointer transition-colors text-xs font-semibold">
            <span className="material-symbols-outlined text-[15px]">language</span>
            <span className="tracking-wider uppercase">USD · EN</span>
          </div>

          {/* Primary CTA */}
          <Link
            to="/sanctuaries/komorebi-forest"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1c1a17] text-[#ffffff] text-[13px] font-semibold hover:bg-[#97472e] transition-colors shadow-sm duration-200"
          >
            Find Sanctuary
          </Link>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[#f0eee8] transition-colors"
              aria-label="Account menu"
              type="button"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#cdc5bc]">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {user.isAuthenticated && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#97472e] ring-1 ring-white"></span>
                )}
              </div>
              <span className={`material-symbols-outlined text-[16px] text-[#7c766e] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 py-2 rounded-xl bg-white shadow-[0_12px_32px_-8px_rgba(28,26,23,0.12),0_4px_12px_-2px_rgba(28,26,23,0.04)] border border-[#e8e3d9] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2.5 mb-1 bg-[#fcf9f3]/60 border-b border-[#f0eee8]">
                  <p className="text-[10px] tracking-widest text-[#7c766e] uppercase font-bold">
                    {user.isAuthenticated ? 'Signed in as' : 'Guest Traveler'}
                  </p>
                  <p className="text-[13px] font-semibold text-[#1c1c18] truncate mt-0.5">
                    {user.isAuthenticated ? user.name : 'Exploring Sanctuary'}
                  </p>
                  <p className="text-[11px] text-[#4b463f] truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  to="/my-bookings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-[13px] text-[#4b463f] hover:bg-[#f6f3ed] hover:text-[#1c1c18] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#97472e]">calendar_month</span>
                    My Bookings
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0eee8] text-[#7c766e] font-bold">
                    1 Active
                  </span>
                </Link>

                <Link
                  to="/saved-stays"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-[13px] text-[#4b463f] hover:bg-[#f6f3ed] hover:text-[#1c1c18] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#97472e]">favorite</span>
                    Saved Stays
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0eee8] text-[#7c766e] font-bold">
                    {wishlist.length}
                  </span>
                </Link>

                <Link
                  to="/account"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#4b463f] hover:bg-[#f6f3ed] hover:text-[#1c1c18] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#7c766e]">person</span>
                  Sanctuary Portal & Keys
                </Link>

                <div className="h-px bg-[#f0eee8] my-1"></div>

                {user.isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      navigate('/account');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-[#97472e] hover:bg-[#f6f3ed] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Conclude Sanctuary Session
                  </button>
                ) : (
                  <Link
                    to="/account"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#97472e] hover:bg-[#f6f3ed] font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">login</span>
                    Sign in to Sanctuary
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#1c1c18] hover:bg-[#f0eee8] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f3] border-b border-[#e8e3d9] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-[15px] font-medium text-[#1c1c18] hover:text-[#97472e] border-b border-[#f0eee8] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-[18px] text-[#7c766e]">chevron_right</span>
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                to="/sanctuaries/komorebi-forest"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-[#1c1a17] text-white text-center text-sm font-semibold hover:bg-[#97472e] transition-colors"
              >
                Explore Sanctuaries
              </Link>
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg border border-[#e8e3d9] text-[#1c1c18] text-center text-sm font-medium hover:bg-[#f0eee8] transition-colors"
              >
                View My Bookings (#AS-8942-KYO)
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
