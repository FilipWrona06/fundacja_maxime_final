// app/(user)/layout.tsx

// --- IMPORTY LOKALNE DLA TEJ GRUPY STRON ---

// 1. Importy komponentów wewnętrznych
import type React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";

// -----------------------------------------

// Ten layout opakowuje wszystkie strony w folderze (user)
export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      {/* Navbar jest renderowany dla wszystkich stron w tej grupie */}
      <Navbar />

      {/* 
        Główny kontener treści strony:
        1. id="main-content" - pozwala na działanie linku "Przejdź do treści".
      */}
      <main id="main-content">{children}</main>

      {/* Stopka jest renderowana po głównej treści na stronach z tej grupy */}
      <Footer />
    </>
  );
}
