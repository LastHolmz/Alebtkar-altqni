"use client";
import { motion } from "framer-motion";

const partners = [
  "Our Gym",
  "جامعة الزيتونة",
  "الإتحاد الوطني",
  "الإنماء الطبي",
  "فندق المهاري",
];

const ScrollAnimation = () => {
  return (
    <div className="overflow-hidden py-4  ">
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: "-100%" }} // Move to the left off-screen
        transition={{
          duration: 20, // Duration of the animation
          ease: "linear", // Linear movement
          repeat: Infinity,
          delay: 1,
        }}
      >
        {partners.map((partner, index) => (
          <div
            className="min-w-[100px] mx-4 text-center text-lg text-foreground/70"
            key={index}
          >
            {partner}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollAnimation;
