"use client";

import { motion } from "framer-motion";
import { FC } from "react";

interface WraperProps {
  children: React.ReactNode;
}

interface AnimatedCharactersProps {
  text: string;
  type: string;
  className: string;
}

// Word wrapper
const Wrapper: FC<WraperProps> = ({ children }) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span className=" whitespace-nowrap">{children}</span>;
};

// Map API "type" vaules to JSX tag names
const tagMap: { [key: string]: React.ElementType } = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
const AnimatedCharacters: FC<AnimatedCharactersProps> = ({
  text,
  type,
  className,
}) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
      color: "rgb(234 179 8)",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: "#000",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  //  Split each word of props.text into an array
  const splitWords = text.split(" ");

  const words: string[][] = splitWords.map((word) => [...word, "\u00A0"]);

  // Get the tag name from tagMap
  const Tag = tagMap[type];

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <Wrapper key={index}>
          {word.map((element, index) => (
            <span
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
              key={index}
            >
              <motion.span style={{ display: "inline-block" }} variants={item}>
                {element}
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </Tag>
  );
};

export default AnimatedCharacters;
