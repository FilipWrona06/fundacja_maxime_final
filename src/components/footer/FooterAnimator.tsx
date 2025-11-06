'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Przenosimy styl, ponieważ jest on bezpośrednio związany z animowanym elementem
const glassStyle = "bg-oxfordBlue/15 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20";

interface FooterAnimatorProps {
    children: ReactNode;
}

export const FooterAnimator = ({ children }: FooterAnimatorProps) => {
    return (
        <motion.footer
            className={`relative overflow-hidden ${glassStyle}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        >
            {children}
        </motion.footer>
    );
};