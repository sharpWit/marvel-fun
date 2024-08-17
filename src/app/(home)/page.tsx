"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/Separator";
import AnimatedBg from "@/components/animation/AnimatedBg";
import AnimatedHammer from "@/components/animation/AnimatedHammer";
import AnimatedCharacters from "@/components/animation/AnimatedText";

export default function Home() {
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: "heading1", text: "SAEED KHOSRAVI" },
    {
      type: "heading2",
      text: "Designer and Developer of this Website",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    <main className="flex flex-col min-h-screen">
      <motion.div
        className="text-center my-4" // Use the CSS module
        initial="hidden"
        // animate="visible"
        animate={"visible"}
        variants={container}
      >
        <div className="w-full">
          {placeholderText.map((item, index) => {
            return (
              <AnimatedCharacters
                {...item}
                key={index}
                className={`${
                  item.type === "heading1"
                    ? "text-2xl md:text-4xl font-bold leading-tight"
                    : item.type === "heading2"
                    ? "text-lg md:text-2xl font-normal leading-6 opacity-75"
                    : ""
                }`}
              />
            );
          })}
        </div>
      </motion.div>
      <Separator className="mb-8" />
      <div className="w-full mx-auto relative max-w-lg">
        <AnimatedBg />
        <AnimatedHammer />
      </div>
    </main>
  );
}
