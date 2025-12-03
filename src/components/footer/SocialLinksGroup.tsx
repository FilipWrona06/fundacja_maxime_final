// Brak "use client" = Server Component
import { socialLinks } from "@/data/siteData";
import { SocialIcon } from "./SocialIcon";

export const SocialLinksGroup = () => {
  return (
    <div className="mt-6 flex justify-center space-x-4 md:justify-start">
      {socialLinks.map((social) => (
        <SocialIcon key={social.name} social={social} />
      ))}
    </div>
  );
};
