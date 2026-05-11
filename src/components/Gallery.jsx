import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Our Spaces</h2>
        <p className="text-slate-500 max-w-lg mx-auto">Take a glimpse inside your home away from home.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-xl bg-stone-200 cursor-pointer group ${index === 0 || index === 3 ? 'md:h-[500px]' : 'md:h-[400px]'} h-72`}
            onClick={() => setSelectedImage(src)}
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
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <motion.img
              src={selectedImage}
              layoutId={`image-${images.indexOf(selectedImage)}`}
              className="w-full max-w-5xl max-h-[90vh] object-contain rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}