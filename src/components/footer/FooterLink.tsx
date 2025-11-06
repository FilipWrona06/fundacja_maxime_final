'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { Underline } from './Underline'; // Import lokalny

interface FooterLinkProps {
    href: string;
    name: string;
    isActive: boolean;
}

export const FooterLink = memo(({ href, name, isActive }: FooterLinkProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }, [mouseX, mouseY]);

    return (
        <Link
            href={href}
            className={`group relative inline-block py-1 text-sm transition-all duration-300 ${isActive ? 'font-bold' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.span
                className="relative inline-block"
                style={{
                    rotateX,
                    rotateY,
                }}
            >
                {name}
            </motion.span>
            <Underline isActive={isActive} isHovered={isHovered} />
        </Link>
    );
});

FooterLink.displayName = 'FooterLink';