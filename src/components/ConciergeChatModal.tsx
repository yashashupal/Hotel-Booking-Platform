import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  sanctuaryName?: string;
  hostName?: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  isOpen,
  onClose,
  sanctuaryName = 'The Komorebi Forest Sanctuary',
  hostName = 'Kenji S. (Aura Kyoto Guild)'
}) => {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'concierge',
      time: 'Just now',
      text: `Greetings ${user.name.split(' ')[0] || 'patron'}. I am on duty at the Kyoto Sanctuary Desk. How may we curate your arrival or assist with private tea ceremonies & rail transfers?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'concierge',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Thank you for your note. We have logged this preference into your dossier for ${sanctuaryName}. Our hospitality team will prepare warm roasted hojicha and confirm all arrangements prior to dusk.`
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1a17]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full sm:max-w-lg bg-[#ffffff] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#e8e3d9] flex flex-col max-h-[85vh] h-[600px] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#f6f3ed] border-b border-[#e8e3d9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#97472e]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPA4k2gigQNgcQy4GL49jMavHXnAO_QaATlE1wq0MIKBgtceHHyzUq8WFDKtA17i2uniI0hXviMhrlw1h8QFGn_VRmaxIbPEuKEEQ8AO2esD7QYRXDVYcu_aeAWKXzWKQEHoccAiTh2QFh7WH-RvP3Ry6ErB38kHAMiJ1FJ-buF4Ft1S7d27og666b0RSLo7W49jrRiSrUT_Dg3WKbAjh5cXgDIieYY4E89kn1t9dLxRDk-sZFCSE1WA"
                alt="Concierge"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
            </div>
            <div>
              <h3 className="font-editorial text-base font-semibold text-[#1c1c18] leading-tight">
                {hostName}
              </h3>
              <p className="text-[11px] text-[#7c766e]">
                Dedicated Resident Host • Live
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#ebe8e2] text-[#7c766e] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fcf9f3]/40">
          <div className="text-center my-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7c766e] bg-[#f0eee8] px-3 py-1 rounded-full">
              Private 256-Bit Encrypted Concierge Channel
            </span>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#1c1a17] text-white rounded-br-none'
                    : 'bg-white text-[#1c1c18] border border-[#e8e3d9] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#7c766e] mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#7c766e] italic px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#97472e] animate-ping"></span>
              <span>Host is drafting response...</span>
            </div>
          )}
        </div>

        {/* Input Dock */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e8e3d9] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your request or arrival questions..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#f6f3ed] text-xs md:text-sm text-[#1c1c18] placeholder:text-[#7c766e] focus:outline-none focus:ring-1 focus:ring-[#97472e]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#1c1a17] hover:bg-[#97472e] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
