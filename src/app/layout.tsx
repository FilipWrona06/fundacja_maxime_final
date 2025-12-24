// app/layout.tsx

// --- IMPORTY GLOBALNE ---

// 1. Importy z paczek zewnętrznych
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// 2. Importy stylów (muszą być tutaj, aby działały globalnie)
import "./globals.css";

// -----------------------------------------

// Globalne metadane dla całej aplikacji
export const metadata: Metadata = {
  title: "Fundacja Maxime - Strona Główna",
  description:
    "Oficjalna strona Fundacji Maxime. Dowiedz się więcej o naszych działaniach, wydarzeniach i możliwościach wsparcia.",
};

// Definicje czcionek, które będą dostępne w całej aplikacji jako zmienne CSS
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2",
  variable: "--font-youngest",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ustawienie języka dla całej witryny
    <html lang="pl">
      {/* 
        Body w głównym layoucie zawiera tylko to, co absolutnie globalne:
        - definicje zmiennych CSS dla czcionek
        - komponenty analityczne
        - `children`, które w tym przypadku będzie renderować layout z grupy (user) lub stronę /studio
      */}
      <body className={`${montserrat.variable} ${fontYoungest.variable}`}>
        {children}

        {/* Komponenty analityczne Vercel, działające globalnie */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
