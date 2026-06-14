import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — KVRON" },
      { name: "description", content: "Shop the full Kvron collection — outerwear, knits, footwear and accessories." },
    ],
  }),
  component: Shop,
});

const CATEGORIES = ["All", "Men", "Women", "Outerwear", "Footwear", "Unisex"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Black", hex: "#000" },
  { name: "Gold", hex: "#FFC107" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Graphite", hex: "#2a2a2a" },
];
const SORTS = ["Newest", "Popular", "Best Selling", "Price: Low → High", "Price: High → Low"];

function Shop() {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Newest");

  const filtered = products
    .filter((p) => cat === "All" || p.category === cat)
    .sort((a, b) => {
      if (sort === "Price: Low → High") return a.price - b.price;
      if (sort === "Price: High → Low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SmoothScroll />
      <Navbar />

      <header className="pt-40 pb-12 max-w-[1600px] mx-auto px-6 lg:px-10">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— Drop 04 / Winter 26</p>
        <h1 className="text-display text-6xl md:text-8xl lg:text-[10vw] leading-[0.85]">
          The <span className="gold-text italic font-serif normal-case">Archive.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
        <aside className="hidden lg:block sticky top-32 self-start space-y-10 py-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button key={s} className="w-10 h-10 border border-border text-xs hover:border-primary hover:text-primary transition">{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Colors</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button key={c.name} title={c.name} className="w-8 h-8 rounded-full border border-border hover:ring-2 hover:ring-primary transition" style={{ background: c.hex }} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Price</h3>
            <div className="space-y-2 text-sm">
              {["Under $200", "$200 – $500", "$500 – $1000", "$1000+"].map((p) => (
                <label key={p} className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:text-foreground">
                  <input type="checkbox" className="accent-primary" /> {p}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-4">Availability</h3>
            <div className="space-y-2 text-sm">
              {["In stock", "Pre-order", "Members only"].map((p) => (
                <label key={p} className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:text-foreground">
                  <input type="checkbox" className="accent-primary" /> {p}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="py-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">{filtered.length} pieces</p>
            <div className="flex items-center gap-4">
              <button className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent border border-border px-4 py-2 pr-9 text-xs uppercase tracking-[0.2em] focus:outline-none focus:border-primary">
                  {SORTS.map((s) => <option key={s} className="bg-background">{s}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 md:gap-x-6">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
