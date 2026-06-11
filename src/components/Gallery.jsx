import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery({ images = [] }) {
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
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Our Spaces</h2>
        <p className="text-slate-500 max-w-lg mx-auto">Take a glimpse inside your home away from home.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.slice(0, 4).map((src, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-xl bg-stone-200 cursor-pointer group ${index === 0 || index === 3 ? 'md:h-[500px]' : 'md:h-[400px]'} h-72`}
            onClick={() => setSelectedIndex(index)}
          >
            <motion.img
              src={src}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              layoutId={`image-${index}`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors z-50 p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
              src={images[selectedIndex]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl max-h-[90vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}