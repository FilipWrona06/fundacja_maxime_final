// src/components/Navbar.tsx

'use client';

// POPRAWKA: Importy posortowane alfabetycznie, a importy typów oddzielone dla spójności.
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Ref, RefObject } from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

// NOWOŚĆ: Import danych z zewnętrznego pliku. Upewnij się, że ścieżka jest poprawna.
import { navLinks } from '@/data/siteData';
import type { NavLink as LinkItem } from '@/data/siteData'; // Import typu dla spójności


// --- DEFINICJE I KONFIGURACJA ---

// 1. Definicje linków i stałych
// TWORZYMY LINKI DYNAMICZNIE NA PODSTAWIE ZAIMPORTOWANYCH DANYCH
// Zakładamy, że logo ma się pojawić po 3 linku. Możesz to łatwo zmienić.
const leftLinks: readonly LinkItem[] = navLinks.slice(0, 3);
const rightLinks: readonly LinkItem[] = navLinks.slice(3);
const allLinks: readonly LinkItem[] = navLinks; // Dla menu mobilnego użyjemy całej tablicy
const patroniteUrl = 'https://patronite.pl/stowarzyszeniemaxime';

// 2. Stałe dla stylów i animacji - eleganckie i nowoczesne
const glassStyle = "bg-oxfordBlue/15 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20";
const navBaseStyle = "flex items-center rounded-full py-5";
const patroniteButtonBaseClasses = "relative flex items-center gap-x-2 rounded-full font-bold text-arylideYellow overflow-hidden";
const skipLinkClasses = "sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-arylideYellow focus:text-raisinBlack focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-arylideYellow/50";
const navTransition = { type: 'spring', stiffness: 260, damping: 30 } as const;

// Eleganckie timing functions
const smoothSpring = { type: 'spring', stiffness: 300, damping: 30 } as const;
const softSpring = { type: 'spring', stiffness: 200, damping: 25 } as const;

const menuButtonVariants = {
    top: { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 }},
    middle: { closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0.8 }},
    bottom: { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 }},
};

const mobileMenuVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
            when: "afterChildren",
            duration: 0.2
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.06,
            staggerDirection: 1,
            when: "beforeChildren",
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

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


// --- WEWNĘTRZNY HOOK ---

const useOnClickOutside = (
    refs: ReadonlyArray<RefObject<HTMLElement | null>>,
    handler: (event: MouseEvent | TouchEvent) => void
) => {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const listener = (event: MouseEvent | TouchEvent) => {
            const isClickInside = refs.some(ref => ref.current?.contains(event.target as Node));
            if (isClickInside) return;
            savedHandler.current(event);
        };

        document.addEventListener('mousedown', listener, { passive: true });
        document.addEventListener('touchstart', listener, { passive: true });

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [refs]);
};


// --- KOMPONENTY POMOCNICZE ---

const Logo = memo(() => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href="/"
            aria-label="Fundacja Maxime - strona główna"
            className="relative text-3xl lg:text-4xl font-youngest text-arylideYellow"
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

interface AnimatedMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    buttonRef: Ref<HTMLButtonElement>;
}

const AnimatedMenuButton = memo(({ isOpen, onClick, buttonRef }: AnimatedMenuButtonProps) => (
    <motion.button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className="z-50 p-2 relative"
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
    >
        <motion.div
            className="absolute inset-0 rounded-lg bg-arylideYellow/0"
            whileHover={{ backgroundColor: 'rgba(233,215,88,0.1)' }}
            transition={{ duration: 0.3 }}
        />
        <motion.div
            className="flex flex-col justify-around w-6 h-6 relative z-10"
            animate={isOpen ? 'open' : 'closed'}
            initial={false}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.span className="block h-0.5 w-full bg-white origin-center" variants={menuButtonVariants.top} />
            <motion.span className="block h-0.5 w-full bg-white" variants={menuButtonVariants.middle} />
            <motion.span className="block h-0.5 w-full bg-white origin-center" variants={menuButtonVariants.bottom} />
        </motion.div>
    </motion.button>
));
AnimatedMenuButton.displayName = 'AnimatedMenuButton';

const Underline = memo(({ isActive, isHovered }: { isActive: boolean; isHovered?: boolean; }) => (
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

interface NavItemProps {
    href: string;
    name: string;
    isActive: boolean;
    isMobile?: boolean;
    onClick?: () => void;
}

const NavItem = memo(({ href, name, isActive, isMobile = false, onClick }: NavItemProps) => {
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
                    className="relative text-2xl font-semibold transition-colors duration-300"
                    onClick={onClick}
                    aria-current={isActive ? 'page' : undefined}
                >
                    <motion.span className="inline-block" whileHover={{ x: 6 }} transition={softSpring}>
                        {name}
                    </motion.span>
                    <Underline isActive={isActive} />
                </Link>
            </motion.li>
        );
    }

    return (
        <li>
            <Link
                href={href}
                className={`group block py-2 relative text-sm transition-all duration-300 ${isActive ? 'font-bold' : ''}`}
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
        </li>
    );
});
NavItem.displayName = 'NavItem';

interface PatroniteLinkProps {
    isMobile?: boolean;
    onClick?: () => void;
}

const PatroniteLink = memo(({ isMobile = false, onClick }: PatroniteLinkProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const mobileClasses = "border-2 px-6 py-3 text-xl shadow-lg";
    const desktopClasses = "border px-4 py-2 text-sm shadow-md";

    return (
        <motion.div
            whileHover={!isMobile ? { scale: 1.05 } : undefined}
            whileTap={{ scale: 0.95 }}
            transition={smoothSpring}
        >
            <Link
                href={patroniteUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className={`${patroniteButtonBaseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                onClick={onClick}
                prefetch={false}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.span className="absolute inset-0 bg-linear-to-r from-arylideYellow via-arylideYellow/80 to-arylideYellow" initial={{ x: '-100%' }} animate={isHovered ? { x: '0%' } : { x: '-100%' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                <span className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? '#1a1a2e' : undefined }}>Wesprzyj nas</span>
                <motion.span className="relative z-10" animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0] } : { scale: 1, rotate: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} style={{ color: isHovered ? '#1a1a2e' : undefined }} >
                    <FaHeart aria-hidden="true" />
                </motion.span>
                <motion.span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" initial={{ x: '-100%', skewX: -20 }} animate={isHovered ? { x: '200%' } : { x: '-100%' }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
            </Link>
        </motion.div>
    );
});
PatroniteLink.displayName = 'PatroniteLink';


// --- GŁÓWNY KOMPONENT NAVBAR ---

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [announceMessage, setAnnounceMessage] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const MOBILE_MENU_ID = 'mobile-menu';
    const MOBILE_MENU_HEADING_ID = 'mobile-menu-heading';

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navbarY = Math.min(scrollY * 0.3, 20);
    const navbarBlur = Math.min(12 + scrollY * 0.05, 24);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setAnnounceMessage('Menu zamknięte');
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => {
            const newState = !prev;
            setAnnounceMessage(newState ? 'Menu otwarte' : 'Menu zamknięte');
            return newState;
        });
    }, []);

    useOnClickOutside([mobileMenuRef, menuButtonRef], closeMobileMenu);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const lastActiveElement = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';

        const mainContent = document.querySelector<HTMLElement>('#main-content');
        const footer = document.querySelector<HTMLElement>('footer');

        if (mainContent) { mainContent.setAttribute('inert', ''); }
        if (footer) { footer.setAttribute('inert', ''); }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { closeMobileMenu(); return; }
            if (event.key === 'Tab') {
                const menuNode = mobileMenuRef.current;
                if (!menuNode) return;
                const focusableElements = Array.from(menuNode.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
                if (focusableElements.length === 0) return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) { lastElement.focus(); event.preventDefault(); }
                } else {
                    if (document.activeElement === lastElement) { firstElement.focus(); event.preventDefault(); }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            if (mainContent) { mainContent.removeAttribute('inert'); }
            if (footer) { footer.removeAttribute('inert'); }
            document.removeEventListener('keydown', handleKeyDown);
            setTimeout(() => { lastActiveElement?.focus(); }, 100);
        };
    }, [isMobileMenuOpen, closeMobileMenu]);

    return (
        <>
            <a href="#main-content" className={skipLinkClasses}>Przejdź do treści</a>
            <output aria-live="polite" aria-atomic="true" className="sr-only">{announceMessage}</output>

            <header className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:pt-5">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: navbarY, opacity: 1 }}
                    transition={navTransition}
                >
                    <nav
                        aria-label="Główna nawigacja"
                        className={`hidden lg:flex gap-x-5 xl:gap-x-6 px-10 ${navBaseStyle} ${glassStyle}`}
                        style={{
                            backdropFilter: `blur(${navbarBlur}px)`,
                            transformStyle: 'preserve-3d',
                            perspective: '1000px',
                        }}
                    >
                        <ul className="flex items-center gap-x-5 xl:gap-x-6" style={{ transformStyle: 'preserve-3d' }}>
                            {leftLinks.map((link) => <NavItem key={link.href} {...link} isActive={pathname === link.href} />)}
                        </ul>
                        <div className="shrink-0" style={{ transformStyle: 'preserve-3d' }}><Logo /></div>
                        <ul className="flex items-center gap-x-5 xl:gap-x-6" style={{ transformStyle: 'preserve-3d' }}>
                            {rightLinks.map((link) => <NavItem key={link.href} {...link} isActive={pathname === link.href} />)}
                            <li><PatroniteLink /></li>
                        </ul>
                    </nav>
                </motion.div>

                <motion.nav
                    aria-label="Główna nawigacja mobilna"
                    className={`lg:hidden w-full justify-between px-5 md:px-10 ${navBaseStyle} ${glassStyle}`}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={navTransition}
                >
                    <Logo />
                    <AnimatedMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} buttonRef={menuButtonRef} />
                </motion.nav>
            </header>

            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        ref={mobileMenuRef}
                        id={MOBILE_MENU_ID}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={MOBILE_MENU_HEADING_ID}
                        className={`fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden ${glassStyle}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileMenuVariants}
                        onAnimationComplete={(definition) => {
                            if (definition === 'visible') {
                                const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
                                setTimeout(() => { firstFocusable?.focus(); }, 50);
                            }
                        }}
                    >
                        <h2 id={MOBILE_MENU_HEADING_ID} className="sr-only">Nawigacja mobilna</h2>

                        <div className="absolute inset-0 opacity-40 pointer-events-none">
                            <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-arylideYellow/10 rounded-full blur-[100px]"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        <ul className="flex flex-col items-center space-y-8 relative z-10">
                            {allLinks.map((link) => (
                                <NavItem key={link.href} {...link} isActive={pathname === link.href} isMobile onClick={closeMobileMenu} />
                            ))}
                            <motion.li variants={mobileLinkVariants} className="pt-8">
                                <PatroniteLink isMobile onClick={closeMobileMenu} />
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

Navbar.displayName = 'Navbar';

export default Navbar;