'use client';

import { motion } from 'framer-motion';
import type { Ref } from 'react';
import { memo } from 'react';

// --- Warianty animacji dla ikonki "hamburgera" ---
const menuButtonVariants = {
    top: { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 }},
    middle: { closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0.8 }},
    bottom: { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 }},
};

interface AnimatedMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    buttonRef: Ref<HTMLButtonElement>;
}

export const AnimatedMenuButton = memo(({ isOpen, onClick, buttonRef }: AnimatedMenuButtonProps) => (
    <motion.button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className="z-50 p-2 relative"
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
    >
        {/* Tło podświetlenia przy hover */}
        <motion.div
            className="absolute inset-0 rounded-lg"
            whileHover={{ backgroundColor: 'rgba(233, 215, 88, 0.1)' }}
            transition={{ duration: 0.3 }}
        />
        <motion.div
            className="flex flex-col justify-around w-6 h-6 relative z-10"
            animate={isOpen ? 'open' : 'closed'}
            initial={false}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.span
                className="block h-0.5 w-full bg-white origin-center"
                variants={menuButtonVariants.top}
            />
            <motion.span
                className="block h-0.5 w-full bg-white"
                variants={menuButtonVariants.middle}
            />
            <motion.span
                className="block h-0.5 w-full bg-white origin-center"
                variants={menuButtonVariants.bottom}
            />
        </motion.div>
    </motion.button>
));

AnimatedMenuButton.displayName = 'AnimatedMenuButton';