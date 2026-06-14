import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, ShoppingBag, Truck, RotateCcw, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — KVRON` },
      { name: "description", content: `${loaderData?.product.name} — hand-finished luxury streetwear from Kvron Atelier.` },
      { property: "og:title", content: `${loaderData?.product.name} — KVRON` },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Product not found.</p>
    </div>
  ),
  component: Product,
});

function Product() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [activeImg, setActiveImg] = useState(0);
  const gallery = [product.image, product.hover, product.image];

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SmoothScroll />
      <Navbar />

      <div className="pt-32 max-w-[1600px] mx-auto px-6 lg:px-10">
        <nav className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link> <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-24 overflow-hidden border ${activeImg === i ? "border-primary" : "border-border"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 aspect-[4/5] bg-card overflow-hidden group">
              <img src={gallery[activeImg]} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {product.badge && (
                <span className="absolute top-5 left-5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em] bg-primary text-primary-foreground">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-32 self-start py-2">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-3">{product.category}</p>
            <h1 className="text-display text-5xl lg:text-6xl mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
              </div>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">128 Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-3xl font-display tracking-wide">${product.price}</span>
              {product.oldPrice && <span className="text-lg text-muted-foreground line-through">${product.oldPrice}</span>}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Cut from heavyweight Japanese cotton with a precision-shaped silhouette.
              Hand-finished hardware, internal storm-flap, and the signature gold-leaf
              Kvron sigil pressed into the inner placket.
            </p>

            {/* Color */}
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-[0.25em]">Color</h3>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">Selected</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c: string) => (
                  <button key={c} onClick={() => setColor(c)} className={`w-10 h-10 rounded-full border-2 transition ${color === c ? "border-primary" : "border-border"}`} style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-[0.25em]">Size</h3>
                <button className="text-xs text-primary uppercase tracking-[0.2em] hover:underline">Size guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s: string) => (
                  <button key={s} onClick={() => setSize(s)} className={`py-3 text-sm border transition ${size === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button className="btn-gold flex-1 py-4 text-xs uppercase tracking-[0.25em] font-medium inline-flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to bag
              </button>
              <button className="w-14 h-14 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            <button className="w-full py-4 border border-foreground text-xs uppercase tracking-[0.25em] font-medium hover:bg-foreground hover:text-background transition mb-8">
              Buy now
            </button>

            <div className="grid grid-cols-3 gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex flex-col items-center text-center gap-2 p-3 border border-border">
                <Truck className="w-4 h-4 text-primary" /> Free shipping
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 border border-border">
                <RotateCcw className="w-4 h-4 text-primary" /> 30-day returns
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 border border-border">
                <ShieldCheck className="w-4 h-4 text-primary" /> Authenticated
              </div>
            </div>

            {/* Accordions (simple) */}
            <div className="mt-10 divide-y divide-border border-y border-border">
              {[
                { t: "Product Details", c: "100% heavyweight Japanese cotton (480 gsm). YKK gold-anodized hardware. Hand-finished in Milan." },
                { t: "Shipping & Delivery", c: "Complimentary express worldwide. Dispatched within 24 hours." },
                { t: "Returns", c: "30-day free returns on unworn items with all original tags." },
              ].map((a) => (
                <details key={a.t} className="group py-5">
                  <summary className="flex justify-between items-center cursor-pointer text-sm uppercase tracking-[0.2em] font-medium list-none">
                    {a.t}
                    <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{a.c}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-32">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-display text-4xl md:text-6xl">You might <span className="gold-text italic font-serif normal-case">also love</span></h2>
            <Link to="/shop" className="hidden md:inline-flex text-xs uppercase tracking-[0.25em] items-center gap-2 hover:text-primary">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12 md:gap-x-6">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
