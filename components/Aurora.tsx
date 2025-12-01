import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AuroraProps {
  className?: string;
  opacity?: number;
}

const blobCommon = "absolute rounded-full blur-3xl will-change-transform pointer-events-none";

export default function Aurora({ className = "", opacity = 0.25 }: AuroraProps) {
  const prefersReduced = useReducedMotion();

  const transition = {
    duration: 20,
    repeat: Infinity,
    ease: "easeInOut" as const,
    repeatType: "mirror" as const,
  };

  const animateOrStatic = (from: any, to: any) => (
    prefersReduced ? {} : { initial: from, animate: to, transition }
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] ${className}`} style={{ opacity }}>
      <motion.div
        className={`${blobCommon} bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.6),transparent_60%)]`}
        style={{ width: 600, height: 600, left: -200, top: -200 }}
        {...animateOrStatic({ x: -40, y: -20 }, { x: 40, y: 20 })}
      />
      <motion.div
        className={`${blobCommon} bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5),transparent_60%)]`}
        style={{ width: 500, height: 500, right: -180, top: -120 }}
        {...animateOrStatic({ x: 30, y: -10 }, { x: -30, y: 10 })}
      />
      <motion.div
        className={`${blobCommon} bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.35),transparent_60%)]`}
        style={{ width: 700, height: 700, left: -250, bottom: -260 }}
        {...animateOrStatic({ x: 20, y: 30 }, { x: -20, y: -30 })}
      />
    </div>
  );
}
