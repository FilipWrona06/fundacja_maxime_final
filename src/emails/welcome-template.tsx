import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
} from '@react-email/components';

interface WelcomeEmailProps {
  firstName?: string;
}

export const WelcomeEmail = ({ firstName = 'Subskrybencie' }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Witamy w naszym newsletterze!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#0070f3',
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Cześć, <strong>{firstName}</strong>!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dziękujemy za dołączenie do naszego newslettera. To jest w pełni 
              stylowany komponent React, który działa w Gmailu, Outlooku i Apple Mail.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                className="bg-brand rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://twoja-domena.pl"
              >
                Przejdź do strony
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};