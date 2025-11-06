'use client';

// Importy posortowane alfabetycznie, typy oddzielone
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FormEvent } from 'react';
import { memo, useCallback, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

// Import danych z scentralizowanego pliku
import { contactData, footerLinks, socialLinks } from '@/data/siteData';


// --- DEFINICJE I KONFIGURACJA ---

const glassStyle = "bg-oxfordBlue/15 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20";
const smoothSpring = { type: 'spring', stiffness: 300, damping: 30 } as const;
const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;


// --- KOMPONENTY POMOCNICZE ---

const Logo = memo(() => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href="/"
            aria-label="Fundacja Maxime - strona główna"
            className="relative text-4xl font-youngest text-arylideYellow transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.span
                className="relative inline-block"
                animate={isHovered ? {
                    filter: [
                        'drop-shadow(0 0 0px rgba(233,215,88,0))',
                        'drop-shadow(0 0 12px rgba(233,215,88,0.4))',
                        'drop-shadow(0 0 8px rgba(233,215,88,0.3))'
                    ]
                } : {
                    filter: 'drop-shadow(0 0 0px rgba(233,215,88,0))'
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Fundacja Maxime
            </motion.span>
        </Link>
    );
});
Logo.displayName = 'Logo';

const Underline = memo(({ isActive, isHovered }: { isActive?: boolean; isHovered?: boolean; }) => (
    <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-arylideYellow/20 via-arylideYellow to-arylideYellow/20 rounded-full shadow-[0_0_8px_rgba(233,215,88,0.4)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
            scaleX: (isActive || isHovered) ? 1 : 0,
            opacity: (isActive || isHovered) ? 1 : 0
        }}
        transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }}
    />
));
Underline.displayName = 'Underline';

interface FooterLinkProps {
    href: string;
    name: string;
    isActive: boolean;
}

const FooterLink = memo(({ href, name, isActive }: FooterLinkProps) => {
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
                className="inline-block relative"
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

const SocialIcon = memo(({ social }: { social: typeof socialLinks[0] }) => {
    const [isHovered, setIsHovered] = useState(false);

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
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-philippineSilver/50 text-philippineSilver overflow-hidden transition-colors duration-300 ${social.color}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* To jest animowane tło, które wjeżdża z lewej strony */}
                <motion.span
                    className={`absolute inset-0 ${social.color.replace('hover:', '')}`}
                    initial={{ x: '-100%' }}
                    animate={isHovered ? { x: '0%' } : { x: '-100%' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                
                {/* Ikona, która jest zawsze na wierzchu */}
                <motion.span
                    className="relative z-10"
                    animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0], color: '#FFFFFF' } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <social.icon size={20} />
                </motion.span>
                
                {/* Efekt błysku, który przelatuje nad wszystkim */}
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

const NewsletterForm = memo(() => {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Dziękujemy za zapisanie się do newslettera!');
        setEmail('');
    }, []);

    return (
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
            <motion.div
                className="relative flex items-center border-b py-2 transition-colors duration-300"
                animate={{
                    borderColor: isFocused ? 'rgba(233,215,88,0.8)' : 'rgba(200,200,200,0.2)'
                }}
            >
                <input
                    type="email"
                    placeholder="Twój adres e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent text-sm placeholder:text-philippineSilver focus:outline-none"
                />
                <motion.button
                    type="submit"
                    aria-label="Zapisz się do newslettera"
                    className="right-2 relative flex h-8 w-8 items-center justify-center rounded-full border border-arylideYellow bg-transparent text-arylideYellow overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={smoothSpring}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    <motion.span
                        className="absolute inset-0 bg-arylideYellow"
                        initial={{ x: '-100%' }}
                        animate={isButtonHovered ? { x: '0%' } : { x: '-100%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.span
                        className="relative z-10"
                        animate={isButtonHovered ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0] } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ color: isButtonHovered ? '#1a1a2e' : undefined }}
                    >
                        <FiArrowRight size={20} />
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%', skewX: -20 }}
                        animate={isButtonHovered ? { x: '200%' } : { x: '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                </motion.button>
            </motion.div>
        </form>
    );
});
NewsletterForm.displayName = 'NewsletterForm';

const CreditLink = memo(({ href, children }: { href: string; children: React.ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-semibold transition-colors duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.span
                className="inline-block"
                animate={isHovered ? { y: -2 } : { y: 0 }}
                transition={softSpring}
            >
                {children}
            </motion.span>
            <Underline isHovered={isHovered} />
        </Link>
    );
});
CreditLink.displayName = 'CreditLink';


// --- GŁÓWNY KOMPONENT FOOTER ---

const Footer = () => {
    const pathname = usePathname();

    return (
        <motion.footer
            className={`relative overflow-hidden ${glassStyle}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        >


            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
                    {/* Kolumna 1: Logo */}
                    <motion.div
                        className="flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, ...softSpring }}
                    >
                        <Logo />
                        <motion.p
                            className="mt-4 max-w-xs text-sm text-philippineSilver/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Inspirujemy, wspieramy i działamy na rzecz rozwoju talentów i pasji.
                        </motion.p>
                    </motion.div>

                    {/* Kolumna 2: Nawigacja */}
                    <motion.div
                        className="flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, ...softSpring }}
                    >
                        <h3 className="text-lg font-bold text-arylideYellow">Nawigacja</h3>
                        <ul className="mt-6 space-y-2">
                            {footerLinks.map((link, index) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.05, ...softSpring }}
                                >
                                    <FooterLink {...link} isActive={pathname === link.href} />
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Kolumna 3: Kontakt */}
                    <motion.div
                        className="flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, ...softSpring }}
                    >
                        <h3 className="text-lg font-bold text-arylideYellow">Bądź w kontakcie</h3>
                        <motion.div
                            className="mt-6 space-y-2 text-sm text-philippineSilver/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            <p>{contactData.address}</p>
                            <p>{contactData.email}</p>
                        </motion.div>
                        <motion.div
                            className="mt-6 flex justify-center space-x-4 md:justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {socialLinks.map((social, index) => (
                                <motion.div
                                    key={social.name}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.55 + index * 0.05, ...smoothSpring }}
                                >
                                    <SocialIcon social={social} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Kolumna 4: Newsletter */}
                    <motion.div
                        className="flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, ...softSpring }}
                    >
                        <h3 className="text-lg font-bold text-arylideYellow">Newsletter</h3>
                        <motion.p
                            className="mt-6 text-sm text-philippineSilver/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Zapisz się, aby otrzymywać informacje o naszych wydarzeniach.
                        </motion.p>
                        <NewsletterForm />
                    </motion.div>
                </div>

                <motion.hr
                    className="my-8 border-philippineSilver/10"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                />

                <motion.div
                    className="flex flex-col items-center justify-center gap-y-2 text-center text-sm text-philippineSilver/70 md:flex-row md:gap-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <p>&copy; {new Date().getFullYear()} Fundacja Maxime. Wszelkie prawa zastrzeżone.</p>
                    <span className="hidden md:block">|</span>
                    <p>
                        Strona wykonana przez{' '}
                        <CreditLink href="https://www.instagram.com/filip_wrona/">
                            Filip Wrona
                        </CreditLink>
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

Footer.displayName = 'Footer';

export default Footer;