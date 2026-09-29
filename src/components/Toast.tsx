import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast.visible) return null;

  return (
    <div
      onClick={hideToast}
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#1c1a17] text-white shadow-2xl flex items-center gap-3 cursor-pointer border border-[#31312d] animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <span className="material-symbols-outlined text-[20px] text-[#ffdbd0] shrink-0">
        {toast.icon || 'check_circle'}
      </span>
      <div className="flex-1 text-[13px] font-medium leading-snug">
        {toast.message}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffdbd0]/80 shrink-0">
        Aura
      </span>
    </div>
  );
};
