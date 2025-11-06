'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

// POPRAWKA 1: Zmieniamy nazwę importowanego typu
import type { FooterLink } from '@/data/siteData';
import { FooterLink as FooterLinkComponent } from './FooterLink'; // Zmieniamy nazwę komponentu, by uniknąć konfliktu

const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;

interface FooterNavProps {
    // POPRAWKA 2: Używamy poprawnej nazwy typu
    links: FooterLink[];
}

export const FooterNav = memo(({ links }: FooterNavProps) => {
    const pathname = usePathname();

    return (
        <ul className="mt-6 space-y-2">
            {links.map((link, index) => (
                <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, ...softSpring }}
                >
                    {/* Używamy komponentu o zmienionej nazwie */}
                    <FooterLinkComponent
                        href={link.href}
                        name={link.name}
                        isActive={pathname === link.href}
                    />
                </motion.li>
            ))}
        </ul>
    );
});

FooterNav.displayName = 'FooterNav';