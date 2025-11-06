'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';

interface LogoProps {
    className?: string;
}

export const Logo = memo(({ className = '' }: LogoProps) => {
    return (
        <Link
            href="/"
            aria-label="Fundacja Maxime - strona główna"
            // Łączymy domyślne klasy z przekazanymi, aby umożliwić personalizację
            className={`relative font-youngest text-arylideYellow transition-all duration-300 ${className}`}
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

export default Logo;