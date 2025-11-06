'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

export const Underline = memo(({ isActive, isHovered }: { isActive?: boolean; isHovered?: boolean; }) => (
    <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-arylideYellow/20 via-arylideYellow to-arylideYellow/20 shadow-[0_0_8px_rgba(233,215,88,0.4)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
            scaleX: (isActive || isHovered) ? 1 : 0,
            opacity: (isActive || isHovered) ? 1 : 0
        }}
        transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }}
    />
));

Underline.displayName = 'Underline';

export default Underline;