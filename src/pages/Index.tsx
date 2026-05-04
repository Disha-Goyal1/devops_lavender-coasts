import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { BRAND } from "@/lib/brand";
import hero from "@/assets/hero-crochet.jpg";

const testimonials = [
  {
    quote:
      "The tote is even more beautiful in person. You can feel the love in every stitch.",
    name: "Aanya R.",
    location: "Mumbai",
  },
  {
    quote:
      "I gifted the bunny plushie to my niece — she sleeps with it every night. Pure joy.",
    name: "Priya S.",
    location: "Bengaluru",
  },
  {
    quote:
      "Soft, soft, soft. The scarf is my new winter favourite. Lavender Coast magic ✨",
    name: "Meera K.",
    location: "Goa",
  },
];

const Index = () => {
  const newArrivals = products.filter((p) => p.badge === "new");
  const bestSellers = products.filter((p) => p.badge === "best");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 crochet-texture opacity-60" />
        <div className="relative container py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur text-xs tracking-[0.2em] uppercase text-primary-deep">
              <Sparkles className="h-3 w-3" /> Slow-made in small batches
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-primary-deep">
              {BRAND.hero.split(",")[0]},
              <br />
              <em className="text-primary">{BRAND.hero.split(",")[1].trim()}</em>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Soft yarn, slow stitches, and the colour of dusk on the lavender coast.
              Each piece is hand-crocheted to be loved for years.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">Shop Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-full" />
            <img
              src={hero}
              alt="Handmade lavender crochet collection — tote, scarf, plushie and crop top"
              width={1600}
              height={1200}
              className="relative rounded-3xl shadow-elegant w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: Heart, title: "Handmade with care", text: "Every stitch placed by hand. No machines, no shortcuts." },
          { icon: Leaf, title: "Naturally sustainable", text: "Soft cotton yarns, small batches, zero waste." },
          { icon: Sparkles, title: "One of a kind", text: "Tiny variations make each piece uniquely yours." },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex h-14 w-14 rounded-full bg-accent items-center justify-center text-primary mb-4 shadow-soft">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </section>

      {/* NEW ARRIVALS */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Just stitched</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-deep">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm text-primary hover:gap-3 transition-smooth">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Loved most</p>
              <h2 className="font-display text-4xl md:text-5xl text-primary-deep">Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm text-primary hover:gap-3 transition-smooth">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 text-center">Kind words</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-deep text-center mb-16">
          Loved by softies everywhere
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-card"
            >
              <div className="text-primary text-3xl font-display mb-3 leading-none">"</div>
              <blockquote className="text-foreground/80 leading-relaxed italic font-display text-lg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-primary-deep">{t.name}</span>
                <span className="text-muted-foreground"> — {t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
