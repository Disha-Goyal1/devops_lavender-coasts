import { MessageCircle } from "lucide-react";
import { whatsappLink, BRAND } from "@/lib/brand";

export const FloatingWhatsApp = () => {
  return (
    <a
      href={whatsappLink(`Hi ${BRAND.name}! I'd love to know more about your crochet pieces.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-elegant hover:shadow-glow hover:scale-110 transition-bounce flex items-center justify-center group"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};
