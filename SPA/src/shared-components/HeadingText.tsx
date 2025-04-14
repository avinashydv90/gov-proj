import { motion } from "framer-motion";
import React from "react";

interface HeadingProps {
  text: string;
  className?: string;
}
const HeadingText: React.FC<HeadingProps> = (props) => {
  const { text, className } = props;
  return (
    <motion.h2
      className={`bg-primaryBrown text-white p-2 rounded-md text-lg font-semibold text-center mb-5 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {text}
    </motion.h2>
  );
};

export default HeadingText;
