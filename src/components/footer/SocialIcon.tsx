'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { FC, SVGProps } from 'react';
import { memo, useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

import type { SocialLink } from '@/data/siteData';

const smoothSpring = { type: 'spring', stiffness: 300, damping: 30 } as const;

// POPRAWKA 1: Tworzymy jawny, bezpieczny typ dla propsów naszych ikon
interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
}

// POPRAWKA 2: Aktualizujemy PatroniteIcon, aby poprawnie obsługiwał prop `size`
const PatroniteIcon: FC<IconProps> = ({ size, ...props }) => (
	<svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        // Używamy `size` do ustawienia wymiarów, z domyślną wartością
        width={size || '1em'}
        height={size || '1em'}
        {...props}
    >
		<title>Patronite</title>
		<path d="M16.48.5H3.03v23h4.91v-9.42h8.54c4.14 0 7.52-3.38 7.52-7.54S20.62.5 16.48.5z" />
	</svg>
);

// POPRAWKA 3: Używamy naszego nowego, bezpiecznego typu zamiast `any`
const ICON_MAP: Record<string, FC<IconProps>> = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    youtube: FaYoutube,
    patronite: PatroniteIcon,
};

export const SocialIcon = memo(({ social }: { social: SocialLink }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const IconComponent = ICON_MAP[social.icon] || null;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={smoothSpring}
        >
            <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-philippineSilver/50 text-philippineSilver transition-colors duration-300 ${social.colorClasses.hover}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.span
                    className={`absolute inset-0 ${social.colorClasses.background}`}
                    initial={{ x: '-100%' }}
                    animate={isHovered ? { x: '0%' } : { x: '-100%' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                    className="relative z-10"
                    animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0], color: '#FFFFFF' } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {IconComponent && <IconComponent size={20} />}
                </motion.span>
                <motion.span
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%', skewX: -20 }}
                    animate={isHovered ? { x: '200%' } : { x: '-100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
            </Link>
        </motion.div>
    );
});

SocialIcon.displayName = 'SocialIcon';