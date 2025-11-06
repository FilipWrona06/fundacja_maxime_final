'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';

export const Logo = memo(() => {
    return (
        <Link
            href="/"
            aria-label="Fundacja Maxime - strona główna"
            className="relative text-4xl font-youngest text-arylideYellow transition-all duration-300"
        >
            <motion.span
                className="relative inline-block"
                whileHover={{
                    filter: [
                        'drop-shadow(0 0 0px rgba(233,215,88,0))',
                        'drop-shadow(0 0 12px rgba(233,215,88,0.4))',
                        'drop-shadow(0 0 8px rgba(233,215,88,0.3))',
                        'drop-shadow(0 0 0px rgba(233,215,88,0))',
                    ]
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Fundacja Maxime
            </motion.span>
        </Link>
    );
});
Logo.displayName = 'Logo';