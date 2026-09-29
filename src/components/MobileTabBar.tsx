import React from 'react';
import { NavLink } from 'react-router-dom';

export const MobileTabBar: React.FC = () => {
  const tabs = [
    { label: 'Explore', path: '/', icon: 'explore' },
    { label: 'Stays', path: '/sanctuaries/komorebi-forest', icon: 'hotel' },
    { label: 'Bookings', path: '/my-bookings', icon: 'calendar_month' },
    { label: 'Account', path: '/account', icon: 'person' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom,0px)] bg-[#fcf9f3]/90 backdrop-blur-xl border-t border-[#e8e3d9] shadow-[0_-2px_12px_rgba(28,26,23,0.06)]">
      <div className="h-16 px-4 flex items-center justify-around">
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-colors ${
                isActive ? 'text-[#97472e] font-semibold' : 'text-[#7c766e] hover:text-[#1c1c18]'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px] leading-none">
              {tab.icon}
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase leading-none">
              {tab.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
