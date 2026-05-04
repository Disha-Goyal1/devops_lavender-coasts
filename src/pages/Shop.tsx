import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { products, Category } from "@/data/products";

const categories: ("All" | Category)[] = ["All", "Accessories", "Clothing", "Gifts"];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("category") as Category | null) ?? "All";
  const [active, setActive] = useState<"All" | Category>(initial);

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  const setCat = (c: "All" | Category) => {
    setActive(c);
    if (c === "All") {
      params.delete("category");
    } else {
      params.set("category", c);
    }
    setParams(params, { replace: true });
  };

  return (
    <>
      <section className="gradient-hero crochet-texture">
        <div className="container py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">The collection</p>
          <h1 className="font-display text-5xl md:text-6xl text-primary-deep">Shop Lavender Coast</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Slow-stitched pieces, ready to come home with you.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-smooth ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-foreground/70 hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;
