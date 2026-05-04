import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center gradient-hero crochet-texture">
    <div className="text-center px-6">
      <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">404</p>
      <h1 className="font-display text-6xl md:text-7xl text-primary-deep mb-4">A loose thread</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        This page seems to have unraveled. Let's find you something soft to hold instead.
      </p>
      <Button asChild variant="hero" size="lg"><Link to="/">Back home</Link></Button>
    </div>
  </div>
);

export default NotFound;
