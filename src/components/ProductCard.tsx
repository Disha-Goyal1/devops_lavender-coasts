import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { whatsappLink } from "@/lib/brand";
import { toast } from "sonner";

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/50 shadow-card hover:shadow-elegant transition-smooth">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] tracking-widest uppercase text-primary-deep font-medium">
              {product.badge === "new" ? "New" : "Best seller"}
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth">
            <Button
              onClick={handleAdd}
              variant="default"
              size="sm"
              className="flex-1 h-10"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </Button>
            <Button
              asChild
              variant="whatsapp"
              size="icon"
              className="h-10 w-10"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={whatsappLink(`Hi! I'd love to order the ${product.name} (₹${product.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-smooth">
            {product.name}
          </h3>
          <span className="text-sm text-muted-foreground tabular-nums">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="text-xs text-muted-foreground tracking-wide mt-1">{product.category}</p>
      </Link>
    </motion.div>
  );
};
