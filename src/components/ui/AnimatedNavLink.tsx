'use client';

import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { Underline } from './Underline';

const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;

const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, y: -15, filter: 'blur(3px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
        }
    },
};

interface AnimatedNavLinkProps {
    href: string;
    name: string;
    isActive: boolean;
    isMobile?: boolean;
    className?: string;
    onClick?: () => void;
}

export const AnimatedNavLink = memo(({ href, name, isActive, isMobile = false, className = '', onClick }: AnimatedNavLinkProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    }, [isMobile, mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }, [mouseX, mouseY]);

    if (isMobile) {
        return (
            <motion.li variants={mobileLinkVariants}>
                <Link
                    href={href}
                    className={`relative text-2xl font-semibold transition-colors duration-300 ${className}`}
                    onClick={onClick}
                    aria-current={isActive ? 'page' : undefined}
                >
                    <motion.span className="inline-block" whileHover={{ x: 6 }} transition={softSpring}>
                        {name}
                    </motion.span>
                    {/* W wersji mobilnej Underline jest poza spanem, co jest OK */}
                    <Underline isActive={isActive} />
                </Link>
            </motion.li>
        );
    }

    return (
        <li>
            <Link
                href={href}
                className={`group block py-1 relative transition-all duration-300 ${isActive ? 'font-bold' : ''} ${className}`}
                aria-current={isActive ? 'page' : undefined}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {/* --- POCZĄTEK POPRAWKI --- */}
                <motion.span
                    // Ten span ma `position: relative` i idealnie otacza tekst
                    className="inline-block relative"
                    style={{ rotateX, rotateY }}
                >
                    {name}
                    
                    {/* Przenosimy Underline tutaj! */}
                    {/* Teraz będzie on miał szerokość tego spana, a nie całego linku. */}
                    <Underline isActive={isActive} isHovered={isHovered} />
                </motion.span>
                {/* --- KONIEC POPRAWKI --- */}
            </Link>
        </li>
    );
});

AnimatedNavLink.displayName = 'AnimatedNavLink';

export default AnimatedNavLink;