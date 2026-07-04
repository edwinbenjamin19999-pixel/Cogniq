import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * MINIMALIST MODERN entrance — innehållet fade:ar upp när sektionen når
 * viewporten (once, 15% synligt). Respekterar prefers-reduced-motion:
 * då renderas allt statiskt utan rörelse.
 */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_OUT, delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
