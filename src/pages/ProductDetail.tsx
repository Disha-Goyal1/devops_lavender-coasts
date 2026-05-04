import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { whatsappLink } from "@/lib/brand";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProduct(id) : undefined;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Piece not found</h1>
        <Button asChild variant="default"><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`Added ${qty} × ${product.name} to cart`);
  };

  return (
    <>
      <div className="container pt-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      <section className="container py-12 grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative">
          <div className="absolute -inset-6 gradient-primary opacity-15 blur-3xl rounded-full" />
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="relative rounded-3xl shadow-elegant w-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl text-primary-deep">{product.name}</h1>
          <p className="mt-4 text-2xl text-foreground tabular-nums">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
              <Button
                variant="ghost" size="icon" className="h-9 w-9"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty(qty + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={handleAdd} variant="hero" size="lg">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={whatsappLink(`Hi! I'd love to order ${qty} × ${product.name} (₹${(product.price * qty).toLocaleString("en-IN")}).`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-muted-foreground border-t border-border/60 pt-6">
            <div className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5" /> Made by hand</div>
            <div className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5" /> Pan-India shipping</div>
            <div className="flex items-start gap-2"><Heart className="h-4 w-4 text-primary mt-0.5" /> Easy care</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container py-20">
          <h2 className="font-display text-3xl text-primary-deep mb-10">You may also love</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
