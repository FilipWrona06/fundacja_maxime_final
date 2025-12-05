"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  // Czy preloader jest widoczny w drzewie DOM?
  const [show, setShow] = useState(true);
  
  // Czy preloader zaczyna znikać (dodajemy klasę opacity-0)?
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 1. Opcjonalnie: Sprawdź sesję, żeby nie pokazywać ciągle
    // Jeśli wolisz prosto, usuń ten fragment z sessionStorage
    // const isSession = sessionStorage.getItem("loaded");
    // if (isSession) {
    //   setShow(false);
    //   return;
    // }

    // 2. Timer: Po 2 sekundach zacznij znikać
    const timer = setTimeout(() => {
      setFading(true); // To uruchamia transition w CSS
      sessionStorage.setItem("loaded", "true");

      // 3. Po zakończeniu animacji (np. 500ms) usuń z DOM
      setTimeout(() => {
        setShow(false);
      }, 500); // Tyle samo co duration-500 w className

    }, 2000); // Czas trwania preloadera

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-raisinBlack text-white transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Nazwa Twojej Marki */}
      <h1 className="font-youngest text-5xl md:text-7xl text-arylideYellow mb-8 animate-pulse">
        Strona w Przebudowie
      </h1>

      {/* Prosty pasek ładowania (CSS only) */}
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-arylideYellow animate-[loading_2s_ease-in-out_infinite]" style={{ width: "100%" }}></div>
      </div>
    </div>
  );
}