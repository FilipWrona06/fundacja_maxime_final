// src/components/footer/FooterNav.tsx

'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

// Zakładamy, że w `siteData` typ nazywa się `NavLink` lub `FooterLink`.
// Upewnij się, że nazwa typu jest poprawna. Użyjmy "NavLink" dla spójności.
import type { NavLink } from '@/data/siteData';
import { FooterLink as FooterLinkComponent } from './FooterLink'; // Dobra praktyka, by uniknąć konfliktu nazw

const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;

interface FooterNavProps {
    // --- GŁÓWNA POPRAWKA ---
    // Dodajemy słowo kluczowe `readonly` przed typem tablicy.
    // Teraz komponent akceptuje tablice "tylko do odczytu".
    links: readonly NavLink[];
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