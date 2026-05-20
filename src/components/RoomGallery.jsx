import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoomGallery({ images, roomName }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div 
        className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-2xl cursor-zoom-in group"
        onClick={() => setSelectedIndex(0)}
      >
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={images[0]}
          alt={`${roomName} main image`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(1).map((src, index) => (
          <div 
            key={index} 
            className="relative h-32 md:h-48 overflow-hidden rounded-xl cursor-zoom-in group"
            onClick={() => setSelectedIndex(index + 1)}
          >
            <img
              src={src}
              alt={`${roomName} gallery image ${index + 2}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4 md:p-12 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors z-50 p-2 bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <button 
              className="absolute left-4 md:left-8 text-white hover:text-stone-300 transition-colors z-50 p-2 bg-black/20 rounded-full hover:bg-black/40"
              onClick={showPrev}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <button 
              className="absolute right-4 md:right-8 text-white hover:text-stone-300 transition-colors z-50 p-2 bg-black/20 rounded-full hover:bg-black/40"
              onClick={showNext}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={images[selectedIndex]}
              className="w-full max-w-6xl max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}