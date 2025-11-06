'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { gentleSpring } from '@/lib/animations'; // ZMIANA: Import

interface FooterAnimatorProps {
    children: ReactNode;
}

export const FooterAnimator = ({ children }: FooterAnimatorProps) => {
    return (
        <motion.footer
            // ZMIANA: Użycie klasy .glass-effect
            className="relative overflow-hidden glass-effect"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            // ZMIANA: Użycie zaimportowanej animacji
            transition={{ ...gentleSpring, delay: 0.2 }}
        >
            {children}
        </motion.footer>
    );
};