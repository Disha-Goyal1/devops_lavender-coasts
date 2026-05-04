import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-crochet.jpg";

const About = () => (
  <>
    <section className="gradient-hero crochet-texture">
      <div className="container py-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Our story</p>
        <h1 className="font-display text-5xl md:text-6xl text-primary-deep">
          Soft threads, coastal dreams
        </h1>
      </div>
    </section>

    <section className="container py-20 grid md:grid-cols-2 gap-16 items-center">
      <motion.img
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        src={hero}
        alt="A flat-lay of lavender crochet pieces"
        width={1600} height={1200}
        loading="lazy"
        className="rounded-3xl shadow-elegant"
      />
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-primary-deep mb-6">
          Hand-stitched on a quiet coast
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Lavender Coast began with one hook, a basket of soft cotton yarn,
            and afternoons spent watching the sea turn lilac at dusk.
          </p>
          <p>
            Every piece in our collection is crocheted slowly, one stitch at a time,
            in small batches. There's no factory, no rush — just careful hands
            and the quiet rhythm of yarn through fingers.
          </p>
          <p>
            We choose natural cotton yarns, work with a soft palette inspired by
            sea-spray and lavender fields, and create pieces meant to be held,
            worn, and loved for years.
          </p>
        </div>
      </motion.div>
    </section>

    <section className="bg-secondary/40 py-20">
      <div className="container grid md:grid-cols-3 gap-8">
        {[
          { icon: Heart, title: "Made by hand", text: "Every stitch is human. No machines, just care." },
          { icon: Leaf, title: "Sustainably small", text: "Tiny batches, soft cotton, zero waste left behind." },
          { icon: Sparkles, title: "Uniquely yours", text: "Tiny variations make every piece one of a kind." },
        ].map((v) => (
          <div key={v.title} className="bg-background rounded-3xl p-8 shadow-card text-center">
            <div className="inline-flex h-14 w-14 rounded-full bg-accent items-center justify-center text-primary mb-4">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-24 text-center">
      <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-6">
        Ready to find your favourite?
      </h2>
      <Button asChild variant="hero" size="xl">
        <Link to="/shop">Explore the collection</Link>
      </Button>
    </section>
  </>
);

export default About;
