import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center max-w-md mx-auto">
        <div className="inline-flex h-20 w-20 rounded-full bg-accent items-center justify-center text-primary mb-6">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl text-primary-deep mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Find a piece to bring home — every stitch made with love.
        </p>
        <Button asChild variant="hero" size="lg"><Link to="/shop">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <section className="container py-16">
      <h1 className="font-display text-4xl md:text-5xl text-primary-deep mb-10">Your cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-card rounded-3xl p-4 shadow-card">
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  width={120} height={120} loading="lazy"
                  className="h-28 w-28 rounded-2xl object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <Link to={`/product/${product.id}`} className="font-display text-lg hover:text-primary transition-smooth">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border border-border p-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-7 text-center text-sm tabular-nums">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-sm tabular-nums">₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)} aria-label="Remove">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <aside className="bg-secondary/50 rounded-3xl p-8 h-fit shadow-card sticky top-24">
          <h2 className="font-display text-2xl mb-6">Summary</h2>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Subtotal</span>
            <span className="tabular-nums">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mb-6">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-border/60 pt-4 flex justify-between text-lg font-display">
            <span>Total</span>
            <span className="tabular-nums">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <Button onClick={() => navigate("/checkout")} variant="hero" size="lg" className="w-full mt-6">
            Checkout
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full mt-2">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
