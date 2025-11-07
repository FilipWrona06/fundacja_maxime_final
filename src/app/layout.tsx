// app/layout.tsx

// --- POPRAWIONE SORTOWANIE IMPORTÓW ---

// 1. Importy z paczek zewnętrznych (np. Next.js, Vercel)
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// 2. Importy komponentów wewnętrznych (z aliasem @/)
import Footer from "@/components/layout/Footer"; 
import Navbar from "@/components/layout/Navbar"; 

// 3. Importy stylów (często na końcu)
import "./globals.css";

// -----------------------------------------


// Poprawione metadane dla polskiej strony
export const metadata: Metadata = {
  title: "Fundacja Maxime - Strona Główna",
  description: "Oficjalna strona Fundacji Maxime. Dowiedz się więcej o naszych działaniach, wydarzeniach i możliwościach wsparcia.",
};

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2",
  variable: "--font-youngest",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Zmiana języka na polski dla lepszej dostępności i SEO
    <html lang="pl">
      <body className={`${montserrat.variable} ${fontYoungest.variable}`}>
        {/* Navbar jest renderowany tutaj, poza <main> */}
        <Navbar />

        {/* 
          Główny kontener treści strony:
          1. id="main-content" - pozwala na działanie linku "Przejdź do treści".
          2. className="pt-28 md:pt-36" - dodaje margines od góry, aby treść
             nie była zasłonięta przez stałą nawigację. Możesz dostosować te wartości.
        */}
        <main id="main-content">
          {children}
        </main>

        {/* Stopka renderowana po głównej treści */}
        <Footer />

        {/* Komponenty analityczne Vercel */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}