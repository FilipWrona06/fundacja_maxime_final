// src/app/HomePageClient.tsx

'use client';

import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { FiArrowDown, FiArrowRight, FiAward, FiMusic, FiUsers } from 'react-icons/fi';
import { gentleSpring, smoothSpring } from '@/lib/animations';

// NOWE IMPORTY
import { urlFor } from '@/sanity/lib/image'; // Helper do generowania URL-i obrazów z Sanity
import type { HomePageData } from '@/app/page'; // Typy danych zdefiniowane w komponencie serwerowym

// ============================================================================
// KONFIGURACJA IKON
// Mapa, która pozwoli dynamicznie wybierać ikonę na podstawie tekstu z CMS
// ============================================================================

const ICONS_MAP: { [key: string]: React.ElementType } = {
  Koncertów: FiMusic,
  Widzów: FiUsers,
  Nagród: FiAward,
};

// ============================================================================
// WARIANTY ANIMACJI (bez zmian)
// ============================================================================

const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainerVariant: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ============================================================================
// GŁÓWNY KOMPONENT KLIENCKI
// ============================================================================

interface HomePageClientProps {
  data: HomePageData;
}

export default function HomePageClient({ data }: HomePageClientProps) {
  // Destrukturyzacja danych dla łatwiejszego dostępu w komponentach
  const { heroSection, statsSection, aboutSection, impactSection, timelineSection, ctaSection } = data;
  
  return (
    <>
      <HeroSection heroData={heroSection} />
      <main>
        <StatsSection statsData={statsSection} />
        <AboutSection aboutData={aboutSection} />
        <ImpactSection impactData={impactSection} />
        <TimelineSection timelineData={timelineSection} />
        <CTASection ctaData={ctaSection} />
      </main>
    </>
  );
}

// ============================================================================
// SUBKOMPONENTY (zmodyfikowane do przyjmowania danych przez props)
// ============================================================================

const HeroSection = ({ heroData }: { heroData: HomePageData['heroSection'] }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const heroY = useTransform(smoothProgress, [0, 1], [0, 300]);

  const scrollToContent = useCallback(() => {
    document.querySelector('#stats-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(244, 208, 111, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(244, 208, 111, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(244, 208, 111, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.video
        style={{ scale: heroScale }}
        poster="/home/images/video-poster.webp"
        autoPlay loop muted playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/home/video/Background-Video.webm" type="video/webm" />
        <source src="/home/video/Background-Video.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-raisinBlack/50 via-raisinBlack/70 to-raisinBlack" />
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-arylideYellow/40 bg-arylideYellow/10 px-6 py-2.5 text-sm font-medium tracking-wide text-arylideYellow backdrop-blur-md shadow-lg shadow-arylideYellow/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arylideYellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-arylideYellow"></span>
            </span>
            <time dateTime="2022">{heroData.badgeText}</time>
          </span>
        </motion.div>
        <h1 id="hero-heading" className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="block mb-6 font-youngest text-arylideYellow text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-tight"
          >
            {heroData.headingPart1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-white font-youngest text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-tight"
          >
            {heroData.headingPart2}
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl"
        >
          {heroData.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/wydarzenia" className="group relative inline-flex items-center gap-3 rounded-full bg-arylideYellow px-10 py-5 text-base font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-300 hover:shadow-arylideYellow/50">
              <span className="relative">Nadchodzące koncerty</span>
              <FiArrowRight className="relative transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/kontakt" className="group inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/5 px-10 py-5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-arylideYellow/60 hover:bg-white/10">
              Skontaktuj się z nami
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="absolute bottom-12 cursor-pointer" aria-label="Przewiń w dół do treści"
      >
        <FiArrowDown size={36} className="text-arylideYellow/80" aria-hidden="true" />
      </motion.button>
    </section>
  );
};

const StatsSection = ({ statsData }: { statsData: HomePageData['statsSection'] }) => {
  return (
    <section id="stats-section" className="relative -mt-20 z-20" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Nasze osiągnięcia w liczbach</h2>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 glass-effect rounded-3xl p-8 shadow-2xl"
        >
          {statsData.map((stat) => {
            const Icon = ICONS_MAP[stat.label] || FiAward; // Domyślna ikona, gdyby etykieta nie pasowała
            return (
              <motion.article
                key={stat.label} variants={fadeInUpVariant} whileHover={{ scale: 1.05, y: -5 }} transition={smoothSpring}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-arylideYellow/30 transition-all duration-300"
              >
                <div className="mb-4 p-4 rounded-full bg-arylideYellow/10 border border-arylideYellow/20">
                  <Icon size={32} className="text-arylideYellow" aria-hidden="true" />
                </div>
                <p className="text-5xl font-bold text-arylideYellow mb-2">{stat.value}</p>
                <p className="text-white/60 font-semibold">{stat.label}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = ({ aboutData }: { aboutData: HomePageData['aboutSection'] }) => {
  const scrollToHistory = useCallback(() => {
    document.getElementById('historia-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="relative min-h-screen py-32" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerVariant}>
            <motion.span variants={fadeInUpVariant} className="mb-6 inline-block text-sm font-semibold uppercase tracking-widest text-arylideYellow">
              {aboutData.smallHeading}
            </motion.span>
            <h2 id="about-heading" className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <motion.span variants={fadeInUpVariant} className="block">{aboutData.headingPart1}</motion.span>
              <motion.span variants={fadeInUpVariant} className="block font-youngest text-arylideYellow">{aboutData.headingPart2}</motion.span>
              <motion.span variants={fadeInUpVariant} className="block">{aboutData.headingPart3}</motion.span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-white/70">
              <motion.p variants={fadeInUpVariant}>{aboutData.paragraph1}</motion.p>
              <motion.p variants={fadeInUpVariant}>{aboutData.paragraph2}</motion.p>
            </div>
            <motion.button
              variants={fadeInUpVariant} whileHover={{ x: 10 }} transition={smoothSpring}
              type="button" onClick={scrollToHistory}
              className="group mt-10 inline-flex items-center gap-3 text-lg font-semibold text-arylideYellow transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-arylideYellow/50 rounded-lg px-2 py-1"
            >
              Poznaj naszą historię
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
            </motion.button>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUpVariant}
            className="relative"
          >
            <motion.div
              className="relative aspect-4/5 overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }} transition={gentleSpring}
            >
              {aboutData.image && (
                <Image
                  src={urlFor(aboutData.image).width(600).height(750).url()}
                  alt={aboutData.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-raisinBlack/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="absolute -bottom-8 -left-8 rounded-2xl border border-white/10 glass-effect p-8 md:-left-16 shadow-2xl"
            >
              <p className="mb-2 font-youngest text-6xl text-arylideYellow">50+</p>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Zorganizowanych Koncertów</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ImpactSection = ({ impactData }: { impactData: HomePageData['impactSection'] }) => {
  return (
    <section className="py-32" aria-labelledby="impact-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerVariant}
          className="mb-20 text-center"
        >
          <motion.h2 id="impact-heading" variants={fadeInUpVariant} className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            Nasz <span className="font-youngest text-arylideYellow">{impactData.heading}</span>
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="mx-auto max-w-2xl text-xl text-white/60">
            {impactData.subheading}
          </motion.p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainerVariant}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {impactData.impactCards.map((card, index) => (
            <motion.article
              key={card.title} variants={fadeInUpVariant} whileHover={{ y: -10 }} transition={smoothSpring}
              className={`group relative overflow-hidden rounded-3xl ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="relative aspect-3/4">
                {card.image && (
                    <Image
                      src={urlFor(card.image).width(400).height(533).url()}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/40 to-transparent" />
                <motion.div className="absolute inset-0 bg-arylideYellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="mb-2 text-2xl font-bold group-hover:text-arylideYellow transition-colors duration-300">{card.title}</h3>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300">{card.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TimelineSection = ({ timelineData }: { timelineData: HomePageData['timelineSection'] }) => {
  return (
    <section id="historia-section" className="relative py-32 overflow-hidden" aria-labelledby="timeline-heading">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-oxfordBlue/10 to-transparent" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerVariant}
          className="mb-20 text-center"
        >
          <motion.h2 id="timeline-heading" variants={fadeInUpVariant} className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            Nasza <span className="font-youngest text-arylideYellow">{timelineData.heading}</span>
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="mx-auto max-w-2xl text-xl text-white/60">
            {timelineData.subheading}
          </motion.p>
        </motion.div>
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-linear-to-b from-arylideYellow/50 via-arylideYellow/20 to-transparent md:block" />
          <div className="space-y-16">
            {timelineData.timelineEvents.map((item) => (
              <motion.article
                key={item.year} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainerVariant}
                className="relative grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    variants={fadeInUpVariant} whileHover={{ scale: 1.2, rotate: 360 }} transition={smoothSpring}
                    className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-arylideYellow bg-raisinBlack md:flex"
                  >
                    <span className="font-youngest text-2xl text-arylideYellow">{item.year}</span>
                  </motion.div>
                </div>
                <div>
                  <time dateTime={item.fullYear} className="mb-2 inline-block font-youngest text-3xl text-arylideYellow md:hidden">
                    {item.fullYear}
                  </time>
                  <motion.h3 variants={fadeInUpVariant} className="mb-4 text-3xl font-bold">{item.title}</motion.h3>
                  <motion.p variants={fadeInUpVariant} className="mb-6 text-lg leading-relaxed text-white/70">{item.text}</motion.p>
                  <motion.div variants={fadeInUpVariant} whileHover={{ scale: 1.02 }} transition={gentleSpring} className="overflow-hidden rounded-2xl">
                    {item.image && (
                        <Image
                          src={urlFor(item.image).width(800).height(450).url()}
                          alt={item.alt}
                          width={800}
                          height={450}
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="h-auto w-full object-cover"
                          loading="lazy"
                        />
                    )}
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ ctaData }: { ctaData: HomePageData['ctaSection'] }) => {
  return (
    <section className="relative py-32" aria-labelledby="cta-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUpVariant}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-arylideYellow/10 via-transparent to-oxfordBlue/20 p-12 text-center backdrop-blur-sm md:p-20"
        >
          <motion.div
            className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-arylideYellow/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative">
            <h2 id="cta-heading" className="mb-6 font-youngest text-6xl leading-tight text-arylideYellow md:text-7xl lg:text-8xl">
              {ctaData.heading}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/70 md:text-2xl">
              {ctaData.text}
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/wydarzenia" className="group inline-flex items-center gap-3 rounded-full bg-arylideYellow px-10 py-5 text-lg font-bold text-raisinBlack shadow-2xl shadow-arylideYellow/30 transition-all duration-500 hover:shadow-arylideYellow/50">
                  Dołącz do nas
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/kontakt" className="inline-flex items-center gap-3 rounded-full border-2 border-arylideYellow/50 bg-transparent px-10 py-5 text-lg font-bold text-arylideYellow transition-all duration-500 hover:border-arylideYellow hover:bg-arylideYellow/10">
                  Skontaktuj się z nami
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};