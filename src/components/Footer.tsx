import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { toast } from "sonner";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Welcome to the Lavender Coast circle 💜");
    setEmail("");
  };

  return (
    <footer className="mt-32 border-t border-border/50 bg-secondary/40">
      <div className="container py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl text-primary-deep">{BRAND.name}</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            {BRAND.tagline} — handmade crochet pieces stitched slowly, with intention,
            on the lavender coast.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-sm">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-background/80"
            />
            <Button type="submit" variant="default">
              Subscribe
            </Button>
          </form>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary transition-smooth">Shop all</Link></li>
            <li><Link to="/shop?category=Clothing" className="hover:text-primary transition-smooth">Clothing</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-primary transition-smooth">Accessories</Link></li>
            <li><Link to="/shop?category=Gifts" className="hover:text-primary transition-smooth">Gifts</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-smooth">Our story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Stay close</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-primary transition-smooth">{BRAND.email}</a></li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth shadow-soft"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              aria-label="Email"
              className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth shadow-soft"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {BRAND.name}. Made by hand, with heart.</p>
          <p>Stitched on the coast.</p>
        </div>
      </div>
    </footer>
  );
};
