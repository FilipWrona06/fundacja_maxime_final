// src/lib/animations.ts

/**
 * Delikatna sprężyna, idealna do subtelnych ruchów tła lub elementów UI.
 */
export const gentleSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as const;

/**
 * Miękka sprężyna, dobra do interaktywnych elementów, które mają być "żywe".
 */
export const softSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25,
} as const;

/**
 * Gładka i responsywna sprężyna, świetna dla przycisków i małych interakcji.
 */
export const smoothSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

/**
 * Szybkie i płynne przejście, idealne do animacji wsuwania tła przy najechaniu.
 */
export const hoverTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
} as const;

/**
 * Dłuższe przejście dla efektu "błysku".
 */
export const shineTransition = { duration: 0.8, ease: "easeInOut" } as const;

/**
 * Złożona animacja "podskoku" dla ikon i tekstu przy najechaniu.
 */
export const iconPopTransition = { duration: 0.6, ease: "easeInOut" } as const;
