import { motion } from "framer-motion";

const AnimatedBg = () => {
  return (
    <motion.div
      className="bg-contain bg-no-repeat bg-center relative"
      style={{
        backgroundImage: "url('/images/ComicStyleBackground.svg')",
        width: "100%",
        height: "60vh",
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    />
  );
};
export default AnimatedBg;
