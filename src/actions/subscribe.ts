'use server';

import { Resend } from 'resend';
import { NewsletterSchema } from '@/lib/schemas';
import { WelcomeEmail } from '@/emails/welcome-template';

// Inicjalizacja klienta Resend (klucz pobierz z .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  // 1. Walidacja danych wejściowych po stronie serwera
  const validatedFields = NewsletterSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Błąd walidacji',
    };
  }

  const { email } = validatedFields.data;

  try {
    // 2. Dodanie kontaktu do bazy (np. Audience w Resend)
    // To jest kluczowe dla zarządzania listą (unsubscribes, marketing)
    const { error: contactError } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    if (contactError) {
      console.error(contactError);
      return { status: 'error', message: 'Nie udało się zapisać do listy.' };
    }

    // 3. Wysłanie e-maila powitalnego
    const { error: emailError } = await resend.emails.send({
      from: 'Newsletter <newsletter@twoja-domena.pl>', // Musisz zweryfikować domenę w Resend
      to: email,
      subject: 'Witamy na pokładzie! 🚀',
      react: WelcomeEmail({ firstName: email.split('@')[0] }),
    });

    if (emailError) {
      console.error(emailError);
      return { status: 'error', message: 'Błąd podczas wysyłki e-maila.' };
    }

    return { status: 'success', message: 'Dziękujemy za subskrypcję! Sprawdź skrzynkę.' };

  } catch (error) {
    return { status: 'error', message: 'Wystąpił nieoczekiwany błąd serwera.' };
  }
}