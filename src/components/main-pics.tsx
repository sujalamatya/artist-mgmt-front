"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpeg";
import image6 from "@/assets/image6.jpg";

const images = [image1, image2, image3, image4, image5, image6];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000); // Auto-change every 4 seconds
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

  return (
    <div
      className="flex items-center justify-center bg-background w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center justify-center w-full max-w-5xl">
        {/* Image Carousel */}
        <div className="flex items-center justify-center w-full gap-6 overflow-hidden">
          {/* Left Side Image - Click to go back */}
          <motion.div
            className="w-40 h-60 overflow-hidden rounded-lg shadow-lg transition-all duration-300 opacity-80 brightness-75 cursor-pointer"
            initial={{ scale: 0.9 }}
            animate={{ scale: 0.9 }}
            whileHover={{ scale: 1, opacity: 1 }}
            onClick={handlePrev}
          >
            <Image
              src={images[(activeIndex - 1 + images.length) % images.length]}
              alt="Previous Image"
              width={350}
              height={500}
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Main Image with Smooth Transition */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              className="w-[40vw] h-[50vh] overflow-hidden rounded-lg shadow-lg"
              initial={{ x: direction * 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 250, opacity: 0 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={images[activeIndex]}
                alt="Current Image"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Right Side Image - Click to go forward */}
          <motion.div
            className="w-40 h-60 overflow-hidden rounded-lg shadow-lg transition-all duration-300 opacity-80 brightness-75 cursor-pointer"
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
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
