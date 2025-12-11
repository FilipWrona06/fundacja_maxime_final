import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  firstName?: string;
}

export const WelcomeEmail = ({
  firstName = "Subskrybencie",
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Witamy w naszym newsletterze!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#0070f3",
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-10 mx-auto p-5 w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Cześć, <strong>{firstName}</strong>!
            </Heading>
            <Text className="text-black text-[14px] leading-6">
              Dziękujemy za dołączenie do naszego newslettera. To jest w pełni
              stylowany komponent React, który działa w Gmailu, Outlooku i Apple
              Mail.
            </Text>
            <Section className="text-center mt-8 mb-8">
              <Link
                className="bg-brand rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://fundacja-maxime-final.vercel.app"
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
