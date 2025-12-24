"use client";

import {
  domAnimation,
  LazyMotion,
  m,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export const GalleryBackgroundBlur = ({ isEven }: { isEven: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        style={{ y, opacity }}
        className={`pointer-events-none absolute ${
          isEven ? "right-0" : "left-0"
        } top-1/3 h-80 w-80 rounded-full bg-arylideYellow/6 blur-3xl`}
      />
    </LazyMotion>
  );
};
