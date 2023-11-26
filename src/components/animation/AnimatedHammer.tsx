import { motion } from "framer-motion";

const AnimatedHammer = () => {
  return (
    <motion.div
      className="bg-contain bg-no-repeat bg-center w-32 h-[30vh] absolute top-1/3 left-1/3"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      style={{
        backgroundImage: "url('/images/hammer-icon.svg')",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
};
export default AnimatedHammer;
