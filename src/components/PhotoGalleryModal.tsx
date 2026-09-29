import React, { useState } from 'react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sanctuaryName: string;
  images: { url: string; title: string; category: string }[];
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  sanctuaryName,
  images
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Architecture', 'Onsen & Bath', 'Bedrooms', 'Dining'];
  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1a17]/90 backdrop-blur-md flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white shrink-0">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#ffdbd0] font-bold">
            Sanctuary Photographic Archive
          </span>
          <h3 className="font-editorial text-xl font-medium">{sanctuaryName}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-white/60 hidden sm:inline-block">
            {images.length} Archival Plates
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="py-4 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-white text-[#1c1a17]'
                : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid View or Focused Photo */}
      {selectedPhotoIndex !== null ? (
        <div className="flex-1 relative flex flex-col items-center justify-center min-h-0 py-4">
          <div className="relative max-h-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
            <img
              src={filtered[selectedPhotoIndex]?.url || images[0].url}
              alt={filtered[selectedPhotoIndex]?.title}
              className="max-h-[75vh] w-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-[#ffdbd0] uppercase tracking-widest font-semibold">
                  {filtered[selectedPhotoIndex]?.category}
                </p>
                <h4 className="font-editorial text-lg">{filtered[selectedPhotoIndex]?.title}</h4>
              </div>
              <span className="text-xs text-white/60">
                {selectedPhotoIndex + 1} of {filtered.length}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1))}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Previous
            </button>
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="px-4 py-2 rounded-lg bg-white text-[#1c1a17] text-xs font-semibold"
            >
              View All Grid
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0))}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              Next
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
            {filtered.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 cursor-pointer shadow-md"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-[#ffdbd0] uppercase tracking-wider font-semibold">
                    {img.category}
                  </p>
                  <p className="text-xs truncate font-medium">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
