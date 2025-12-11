import { z } from 'zod';

export const NewsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('Niepoprawny format adresu email'),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;