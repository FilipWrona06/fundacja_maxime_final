// Plik: src/components/layout/Footer.tsx

// Importujemy Twój uniwersalny wrapper
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { contactData, navLinks } from "@/data/siteData";

import { CreditLink } from "../footer/CreditLink";
// FooterAnimator USUNIĘTY
import { FooterNav } from "../footer/FooterNav";
import { NewsletterForm } from "../footer/NewsletterForm";
import { SocialLinksGroup } from "../footer/SocialLinksGroup";
import { Logo } from "../ui/Logo";

const Footer = () => {
  return (
    // 1. Zwykły tag HTML (Server Side) - renderuje tło i obramowanie natychmiast
    <footer className="relative overflow-hidden glass-effect">
      {/* 2. MotionWrapper animuje wejście zawartości (Client Side) */}
      <MotionWrapper variant="fadeUp" delay={0.2}>
        <div className="container relative z-10 mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 lg:text-left lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
            {/* Kolumna 1: Logo */}
            <div className="flex flex-col items-center md:col-span-2 lg:col-span-1 lg:items-start">
              <Logo className="text-4xl" />
              <p className="mt-4 max-w-xs text-sm text-philippineSilver/80">
                Inspirujemy, wspieramy i działamy na rzecz rozwoju talentów i
                pasji.
              </p>
            </div>

            {/* Kolumna 2: Nawigacja */}
            <div className="flex flex-col items-center md:col-span-2 lg:col-span-1 lg:items-start">
              <h3 className="text-lg font-bold text-arylideYellow">
                Nawigacja
              </h3>
              <FooterNav links={navLinks} />
            </div>

            {/* Kolumna 3: Kontakt */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg font-bold text-arylideYellow">
                Bądź w kontakcie
              </h3>
              <div className="mt-6 space-y-2 text-sm text-philippineSilver/80">
                <p>{contactData.address}</p>
                <p>{contactData.email}</p>
              </div>
              <SocialLinksGroup />
            </div>

            {/* Kolumna 4: Newsletter */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg font-bold text-arylideYellow">
                Newsletter
              </h3>
              <p className="mt-6 text-sm text-philippineSilver/80">
                Zapisz się, aby otrzymywać informacje o naszych wydarzeniach.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <hr className="my-8 border-philippineSilver/10" />

          <div className="flex flex-col items-center justify-center gap-y-2 text-center text-sm text-philippineSilver/70 md:flex-row md:gap-x-4">
            <p>
              &copy; {new Date().getFullYear()} Fundacja Maxime. Wszelkie prawa
              zastrzeżone.
            </p>
            <span className="hidden md:block">|</span>
            <p>
              Strona wykonana przez{" "}
              <CreditLink href="https://www.instagram.com/filip_wrona/">
                Filip Wrona
              </CreditLink>
            </p>
          </div>
        </div>
      </MotionWrapper>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
