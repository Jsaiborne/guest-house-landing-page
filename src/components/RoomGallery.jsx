import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoomGallery({ images, roomName }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div 
        className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-2xl cursor-zoom-in group"
        onClick={() => setSelectedImage(images[0])}
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
            onClick={() => setSelectedImage(src)}
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
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 p-4 md:p-12 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors z-50 p-2 bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              className="w-full max-w-6xl max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}