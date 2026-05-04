import { useState } from "react";
import { z } from "zod";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BRAND, whatsappLink } from "@/lib/brand";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(5, "A few words please").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast.success("Thank you! We'll write back soon 💜");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="gradient-hero crochet-texture">
        <div className="container py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Say hello</p>
          <h1 className="font-display text-5xl md:text-6xl text-primary-deep">Let's stay in touch</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Custom orders, questions, or just to say hi — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container py-20 grid lg:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-3xl p-8 md:p-10 shadow-card space-y-5">
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 rounded-full bg-background/80"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 rounded-full bg-background/80"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message" rows={5} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 rounded-2xl bg-background/80"
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">Send message</Button>
        </form>

        <aside className="lg:col-span-2 space-y-6">
          <a
            href={whatsappLink("Hi Lavender Coast! I'd love to chat.")}
            target="_blank" rel="noopener noreferrer"
            className="block bg-card rounded-3xl p-8 shadow-card hover:shadow-elegant transition-smooth group"
          >
            <div className="h-12 w-12 rounded-full bg-[hsl(142_70%_45%)] text-white flex items-center justify-center mb-4">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mt-1">{BRAND.whatsappNumber}</p>
            <p className="text-xs text-primary mt-3 group-hover:underline">Open chat →</p>
          </a>

          <a href={`mailto:${BRAND.email}`} className="block bg-card rounded-3xl p-8 shadow-card hover:shadow-elegant transition-smooth">
            <div className="h-12 w-12 rounded-full bg-accent text-primary flex items-center justify-center mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">Email</h3>
            <p className="text-sm text-muted-foreground mt-1">{BRAND.email}</p>
          </a>

          <div className="bg-card rounded-3xl p-8 shadow-card">
            <div className="h-12 w-12 rounded-full bg-accent text-primary flex items-center justify-center mb-4">
              <Instagram className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">Follow along</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Daily stitches, behind-the-scenes, and small joys.
            </p>
            <div className="mt-4">
              <Button asChild variant="soft" size="sm">
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">@the_lavender_coast</a>
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Contact;
