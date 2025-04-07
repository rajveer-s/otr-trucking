import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  // Modern truck on highway
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2070',
  // Logistics warehouse
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070',
  // Night driving truck
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070',
  // Container terminal
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070',
  // Modern fleet
  'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2070',
];

export function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black/60 z-10" /> {/* Darker overlay for better contrast */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
