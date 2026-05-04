import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { BRAND, upiUri, whatsappLink } from "@/lib/brand";
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "payment" | "done">("details");
  const [details, setDetails] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
  });
  const [checkoutResponse, setCheckoutResponse] = useState<{
    whatsappUrl?: string;
    qrCode?: string;
  } | null>(null);
  const [backendLoading, setBackendLoading] = useState(false);

  if (items.length === 0 && step !== "done") {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <Button asChild variant="default"><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  const note = `Order from ${details.name || "Customer"}`;
  const upi = upiUri(total, note);
  const orderSummary = items.map((i) => `${i.quantity}× ${i.product.name}`).join(", ");

  const createCheckoutOrder = async () => {
    setBackendLoading(true);
    try {
      const orderItems = items.map((item) => ({
        name: item.product.name,
        qty: item.quantity,
      }));

      const response = await fetch(`${backendUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, total }),
      });

      if (!response.ok) {
        throw new Error("Unable to create order summary");
      }

      const data = await response.json();
      setCheckoutResponse(data);
    } catch (error) {
      console.error("Checkout API error:", error);
      toast.error("Unable to connect to checkout service. You can still pay using UPI.");
    } finally {
      setBackendLoading(false);
    }
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.email || !details.phone || !details.address) {
      toast.error("Please fill in your details");
      return;
    }
    await createCheckoutOrder();
    setStep("payment");
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(BRAND.upiId);
    toast.success("UPI ID copied");
  };

  const completeOrder = () => {
    clearCart();
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="container py-32 max-w-lg mx-auto text-center">
        <div className="inline-flex h-20 w-20 rounded-full bg-accent text-primary items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-4xl text-primary-deep mb-4">Thank you 💜</h1>
        <p className="text-muted-foreground mb-8">
          We've received your order details. Once your UPI payment is confirmed,
          we'll start stitching and ship within 5–7 days.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild variant="hero"><Link to="/shop">Keep shopping</Link></Button>
          <Button asChild variant="whatsapp">
            <a href={whatsappLink("Hi! I just placed an order.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="container py-16">
      <h1 className="font-display text-4xl md:text-5xl text-primary-deep mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === "details" && (
            <form onSubmit={handleSubmitDetails} className="bg-card rounded-3xl p-8 shadow-card space-y-5">
              <h2 className="font-display text-2xl mb-2">Shipping details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    className="mt-2 rounded-full bg-background/80" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="mt-2 rounded-full bg-background/80" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  className="mt-2 rounded-full bg-background/80" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={3} value={details.address}
                  onChange={(e) => setDetails({ ...details, address: e.target.value })}
                  className="mt-2 rounded-2xl bg-background/80" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={details.city}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    className="mt-2 rounded-full bg-background/80" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" value={details.pincode}
                    onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                    className="mt-2 rounded-full bg-background/80" />
                </div>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Continue to payment
              </Button>
            </form>
          )}

          {step === "payment" && (
            <div className="bg-card rounded-3xl p-8 shadow-card">
              <h2 className="font-display text-2xl mb-2">Pay via UPI</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Scan the QR with any UPI app (GPay, PhonePe, Paytm, BHIM) or use the UPI ID below.
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-background p-5 rounded-3xl shadow-soft border border-border/40">
                  <QRCodeSVG value={upi} size={220} bgColor="transparent" fgColor="hsl(270 45% 35%)" level="M" />
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="flex items-center justify-between bg-secondary/60 rounded-2xl p-4">
                    <div>
                      <p className="text-xs text-muted-foreground tracking-wide uppercase">Amount</p>
                      <p className="font-display text-2xl text-primary-deep tabular-nums">
                        ₹{total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-secondary/60 rounded-2xl p-4">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground tracking-wide uppercase">UPI ID</p>
                      <p className="font-medium truncate">{BRAND.upiId}</p>
                    </div>
                    <Button variant="soft" size="sm" onClick={copyUpi}>
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <Button asChild variant="default" size="lg" className="w-full md:hidden">
                    <a href={upi}>Open in UPI app</a>
                  </Button>
                </div>
              </div>
              {checkoutResponse?.qrCode && (
                <div className="mt-6 bg-card rounded-3xl p-4 border border-border/60">
                  <p className="text-sm text-muted-foreground mb-3">Order QR code from backend</p>
                  <img
                    src={checkoutResponse.qrCode}
                    alt="Backend QR code"
                    className="mx-auto rounded-3xl"
                    width={260}
                    height={260}
                  />
                </div>
              )}

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Once paid, tap below to confirm. We'll verify and start your order.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={completeOrder} variant="hero" size="lg">
                    I've paid — confirm order
                  </Button>
                  <Button asChild variant="whatsapp" size="lg" disabled={backendLoading}>
                    <a
                      href={checkoutResponse?.whatsappUrl ?? whatsappLink(`Hi! I just paid ₹${total} via UPI. My order: ${orderSummary}. Name: ${details.name}.`)}
                      target="_blank" rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" /> Send proof on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-secondary/50 rounded-3xl p-8 h-fit shadow-card sticky top-24">
          <h2 className="font-display text-2xl mb-4">Your order</h2>
          <ul className="space-y-3 mb-6">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between text-sm">
                <span className="text-foreground/80">{quantity} × {product.name}</span>
                <span className="tabular-nums">₹{(product.price * quantity).toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border/60 pt-4 flex justify-between text-lg font-display">
            <span>Total</span>
            <span className="tabular-nums">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
