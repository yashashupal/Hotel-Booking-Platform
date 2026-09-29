import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, logout, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'logout'>(
    user.isAuthenticated ? 'logout' : 'login'
  );
  const [email, setEmail] = useState('elena.vance@architectural.design');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, 'Elena Vance');
      setLoading(false);
      setActiveTab('logout');
      showToast('Sanctuary session established', 'verified');
    }, 700);
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    setLoading(true);
    setTimeout(() => {
      login(
        provider === 'Google' ? 'elena.vance@gmail.com' : 'elena.vance@icloud.com',
        'Elena Vance'
      );
      setLoading(false);
      setActiveTab('logout');
      showToast(`Authenticated via ${provider}`, 'check_circle');
    }, 600);
  };

  const handleSignOutAction = () => {
    logout();
    setActiveTab('login');
  };

  return (
    <div className="w-full bg-[#fcf9f3]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">
        
        {/* Top Segmented View Switcher */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#f0eee8] shadow-sm border border-[#e8e3d9]">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-[#1c1a17] text-white shadow-sm'
                  : 'text-[#4b463f] hover:text-[#1c1c18]'
              }`}
            >
              Sanctuary Sign In
            </button>
            <button
              onClick={() => setActiveTab('logout')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'logout'
                  ? 'bg-[#1c1a17] text-white shadow-sm'
                  : 'text-[#4b463f] hover:text-[#1c1c18]'
              }`}
            >
              Session / Sign Out View
            </button>
          </div>
        </div>

        {/* VIEW 1: SIGN IN VIEW */}
        {activeTab === 'login' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white border border-[#e8e3d9] shadow-xl overflow-hidden min-h-[640px]">
            
            {/* Left Column: Visual Architectural Moodboard Card */}
            <div className="lg:col-span-6 relative flex flex-col justify-between p-8 md:p-14 overflow-hidden min-h-[380px] lg:min-h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0dZ8nM7t5Mrr_4KL7ptOGg4fbErTVoE_oTZPnXU149x1mwiRiAe-0bfjt8VAwUWu13ty_qIIji7ok7PjiWODm4JHOUY1p3rM9fuG6-r4PiUUrdKd0QNGT4a6kApirw0pyuXUAAnbIODIF879KLUstYZoDsx7RhwBiDRck89n4x-ggGgKNjCx-Td0__upSXv70076djFlO5xxBCGTUvzZ-vY-8Cu-O6kH0bfrBvDFsZcxelKJ_BFHoig')"
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17]/90 via-[#1c1a17]/40 to-transparent"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#1c1c18]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#97472e]"></span>
                  Private Member Portal
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 hidden sm:inline-block">
                  Est. 2021
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-16">
                <div className="w-8 h-px bg-white/60 mb-6"></div>
                <p className="font-editorial text-2xl sm:text-3xl text-white leading-relaxed max-w-md">
                  “The world begins when you step outside.”
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-4">
                  Aura Stay Architectural Anthology
                </p>
              </div>
            </div>

            {/* Right Column: Sign In Form Box */}
            <div className="lg:col-span-6 flex flex-col justify-center p-8 md:p-14 lg:p-16 bg-white">
              <div className="max-w-md w-full mx-auto space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#97472e] block mb-1">
                    Welcome Back
                  </span>
                  <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1c18]">
                    Sign in to your sanctuary
                  </h1>
                  <p className="text-xs sm:text-sm text-[#4b463f] mt-1.5">
                    Access your bespoke itineraries, private fincas, and restorative retreats.
                  </p>
                </div>

                {/* Social Auth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] text-xs font-semibold text-[#1c1c18] border border-[#e8e3d9] transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] text-xs font-semibold text-[#1c1c18] border border-[#e8e3d9] transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.01-.48 2.63-1.23z"></path>
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-4">
                  <div className="w-full h-px bg-[#e8e3d9]"></div>
                  <span className="absolute px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-[#7c766e]">
                    or email access
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#4b463f]">
                      Member Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#f6f3ed] text-xs sm:text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                      />
                      <span className="material-symbols-outlined absolute right-3 text-[#7c766e] text-[18px] pointer-events-none">
                        mail
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#4b463f]">
                        Sanctuary Keyphrase
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Keyphrase reset link dispatched', 'send')}
                        className="text-xs text-[#97472e] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3 rounded-lg bg-[#f6f3ed] text-xs sm:text-sm text-[#1c1c18] border border-[#e8e3d9] focus:outline-none focus:bg-white focus:border-[#97472e]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-[#7c766e] hover:text-[#1c1c18]"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberSession}
                        onChange={(e) => setRememberSession(e.target.checked)}
                        className="w-4 h-4 rounded text-[#1c1a17] accent-[#1c1a17] cursor-pointer"
                      />
                      <span className="text-xs text-[#4b463f]">
                        Remember my session for 30 days
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#1c1a17] hover:bg-[#97472e] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
                  >
                    <span>{loading ? 'Authenticating...' : 'Sign In to Aura'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-[#4b463f]">
                    Don’t have an account?{' '}
                    <button
                      onClick={() => showToast('Membership invitation requested', 'mark_email_read')}
                      className="font-semibold text-[#1c1c18] hover:text-[#97472e] underline ml-1"
                    >
                      Request an invitation
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: ACTIVE SESSION / TERMINATED VIEW */
          <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-[#e8e3d9] shadow-xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#f6f3ed] border border-[#e8e3d9] flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[32px] text-[#97472e]">
                  lock_reset
                </span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#97472e] mb-1">
                Active Member Session
              </span>
              <h2 className="font-editorial text-3xl text-[#1c1c18] mb-2">
                Sanctuary Credentials Verified
              </h2>
              <p className="text-xs sm:text-sm text-[#4b463f] max-w-lg mb-8 leading-relaxed">
                Your bookings, private itineraries, and saved sanctuaries are synchronized across your devices.
              </p>

              {/* User Identity Card */}
              <div className="w-full rounded-xl bg-[#f6f3ed] p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-[#e8e3d9]">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#7c766e] block">
                      Active Profile
                    </span>
                    <p className="font-editorial text-base font-semibold text-[#1c1c18]">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#4b463f]">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#e8e3d9] text-xs font-semibold text-[#1c1c18]">
                  <span className="material-symbols-outlined text-[16px] text-[#97472e]">check_circle</span>
                  <span>Data Encrypted</span>
                </div>
              </div>

              {/* Active Itinerary Link Card */}
              <Link
                to="/my-bookings"
                className="w-full bg-[#fcf9f3] hover:bg-[#f6f3ed] border border-[#e8e3d9] rounded-xl p-4 mb-8 flex items-center justify-between gap-3 text-left transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#e8e3d9] flex items-center justify-center shrink-0 text-[#97472e]">
                    <span className="material-symbols-outlined text-[20px]">hotel</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766e] block">
                      Active Itinerary Stored
                    </span>
                    <p className="text-xs font-semibold text-[#1c1c18] truncate">
                      1 Upcoming Reservation · The Komorebi Forest Sanctuary (Oct 2025)
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#7c766e] text-[18px]">
                  chevron_right
                </span>
              </Link>

              {/* Session Control Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSignOutAction}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#97472e] hover:bg-[#772f18] text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Conclude Session &amp; Sign Out</span>
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#1c1c18] text-xs font-semibold border border-[#e8e3d9] transition-colors text-center"
                >
                  Return to Home Explore
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3. Bottom Trust & Standards Cards */}
        <div className="w-full max-w-[1360px] mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#e8e3d9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee8] flex items-center justify-center shrink-0 text-[#97472e]">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1c18] mb-1">
                  Encrypted Sessions
                </h3>
                <p className="text-xs text-[#4b463f] leading-relaxed">
                  Zero-knowledge identity architecture ensuring your retreat notes and schedules remain purely private.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#e8e3d9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee8] flex items-center justify-center shrink-0 text-[#97472e]">
                <span className="material-symbols-outlined text-[20px]">concierge</span>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1c18] mb-1">
                  Curated Concierge
                </h3>
                <p className="text-xs text-[#4b463f] leading-relaxed">
                  Direct channel to your host architect and culinary team available right upon signing in.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#e8e3d9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee8] flex items-center justify-center shrink-0 text-[#97472e]">
                <span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1c18] mb-1">
                  Synchronized Journeys
                </h3>
                <p className="text-xs text-[#4b463f] leading-relaxed">
                  Instant synchronization across your mobile, tablet, and flight offline reading lists.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
