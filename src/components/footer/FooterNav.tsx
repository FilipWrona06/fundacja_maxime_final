'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import type { NavLink } from '@/data/siteData';
// POPRAWKA: Importujemy nowy, uniwersalny komponent
import { AnimatedNavLink } from '../ui/AnimatedNavLink';

const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;

interface FooterNavProps {
    links: readonly NavLink[];
}

export const FooterNav = memo(({ links }: FooterNavProps) => {
    const pathname = usePathname();

    return (
        <ul className="mt-6 space-y-2">
            {links.map((link, index) => (
                <motion.div // Zamiast motion.li, ponieważ <li> jest już w AnimatedNavLink
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, ...softSpring }}
                >
                    <AnimatedNavLink
                        href={link.href}
                        name={link.name}
                        isActive={pathname === link.href}
                        className="text-sm" // Przekazujemy styl specyficzny dla stopki
                    />
                </motion.div>
            ))}
        </ul>
    );
});

FooterNav.displayName = 'FooterNav';