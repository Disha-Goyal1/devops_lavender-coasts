import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().trim().min(1, "Please share your name").max(100),
});

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="#EA4335" d="M12 5c1.6 0 3 .55 4.1 1.46l3.06-3.06A11.95 11.95 0 0012 0C7.27 0 3.2 2.7 1.24 6.65l3.6 2.79C5.78 6.62 8.66 5 12 5z"/>
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.28 1.5-1.13 2.78-2.4 3.63l3.7 2.87c2.16-2 3.42-4.95 3.42-8.69z"/>
    <path fill="#FBBC05" d="M4.84 14.45a7.16 7.16 0 010-4.55l-3.6-2.79A11.97 11.97 0 000 12c0 1.94.46 3.78 1.24 5.4l3.6-2.95z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.7-2.87c-1.03.7-2.36 1.1-4.25 1.1-3.34 0-6.22-1.62-7.16-4.43l-3.6 2.95C3.2 21.3 7.27 24 12 24z"/>
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse(form);
        if (!parsed.success) {
          toast.error(parsed.error.errors[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: form.displayName },
          },
        });
        if (error) throw error;
        toast.success("Welcome to Lavender Coast! Check your email to confirm.");
      } else {
        const parsed = signInSchema.safeParse(form);
        if (!parsed.success) {
          toast.error(parsed.error.errors[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back 💜");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Google sign-in failed");
        return;
      }
      if (result.redirected) return;
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] gradient-hero crochet-texture flex items-center py-16">
      <div className="container max-w-md">
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-elegant">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">
              {mode === "signin" ? "Welcome back" : "Join the circle"}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-primary-deep">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h1>
          </div>

          <Button onClick={handleGoogle} variant="outline" size="lg" className="w-full" disabled={loading}>
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            or continue with email
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="displayName">Your name</Label>
                <Input id="displayName" value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  className="mt-2 rounded-full bg-background/80" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 rounded-full bg-background/80" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-2 rounded-full bg-background/80" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline font-medium"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8">
            <Link to="/" className="hover:text-primary">← Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
