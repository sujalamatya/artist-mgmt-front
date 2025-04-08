"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpeg";
import image6 from "@/assets/image6.jpg";

const images = [image1, image2, image3, image4, image5, image6];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div
      className="flex items-center justify-center bg-background w-full py-4 md:py-8"
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
    >
      <div className="relative w-full max-w-5xl px-4">
        {/* Image Carousel */}
        <div className="flex items-center justify-center w-full gap-2 md:gap-6 overflow-hidden">
          {/* Side Images (Desktop Only) */}
          {!isMobile && (
            <>
              <motion.div
                className="hidden md:block w-20 lg:w-40 h-32 lg:h-60 overflow-hidden rounded-lg shadow-lg transition-all duration-300 opacity-80 brightness-75 cursor-pointer"
                initial={{ scale: 0.9 }}
                animate={{ scale: 0.9 }}
                whileHover={{ scale: 1, opacity: 1 }}
                onClick={handlePrev}
              >
                <Image
                  src={
                    images[(activeIndex - 1 + images.length) % images.length]
                  }
                  alt="Previous Image"
                  width={350}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>
            </>
          )}

          {/* Main Image */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              className="w-[80vw] md:w-[40vw] h-[30vh] md:h-[50vh] overflow-hidden rounded-lg shadow-lg"
              initial={{ x: direction * (isMobile ? 100 : 250), opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * (isMobile ? 100 : 250), opacity: 0 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={images[activeIndex]}
                alt={`Carousel image ${activeIndex + 1}`}
                width={isMobile ? 400 : 600}
                height={isMobile ? 300 : 400}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Side Images (Desktop Only) */}
          {!isMobile && (
            <motion.div
              className="hidden md:block w-20 lg:w-40 h-32 lg:h-60 overflow-hidden rounded-lg shadow-lg transition-all duration-300 opacity-80 brightness-75 cursor-pointer"
              initial={{ scale: 0.9 }}
              animate={{ scale: 0.9 }}
              whileHover={{ scale: 1, opacity: 1 }}
              onClick={handleNext}
            >
              <Image
                src={images[(activeIndex + 1) % images.length]}
                alt="Next Image"
                width={350}
                height={500}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
          )}
        </div>

        {/* Dots Indicator (Mobile) */}
        {isMobile && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
