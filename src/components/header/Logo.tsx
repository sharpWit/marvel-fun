import Link from "next/link";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link href="/" className="w-24 p-2">
      <motion.div
        className="bg-contain bg-no-repeat bg-center relative"
        style={{
          backgroundImage: "url('/logo.svg')",
          width: "100%",
          height: "80px",
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />
    </Link>
  );
};
export default Logo;
