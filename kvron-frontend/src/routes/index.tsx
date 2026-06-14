import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import heroModel from "@/assets/hero-model.jpg";
import editorial from "@/assets/editorial.jpg";
import collMen from "@/assets/collection-men.jpg";
import collWomen from "@/assets/collection-women.jpg";
import collSneakers from "@/assets/collection-sneakers.jpg";
import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KVRON — Luxury Streetwear Atelier" },
      { name: "description", content: "KVRON. Hand-finished luxury streetwear. Drops, editorials, and the Kvron Atelier." },
      { property: "og:title", content: "KVRON — Luxury Streetwear Atelier" },
      { property: "og:description", content: "Hand-finished luxury streetwear. Drops, editorials, and the Kvron Atelier." },
    ],
  }),
  component: Home,
});

const COLLECTIONS = [
  { name: "Men", count: "84 Pieces", image: collMen, href: "/shop" },
  { name: "Women", count: "62 Pieces", image: collWomen, href: "/shop" },
  { name: "Footwear", count: "28 Pieces", image: collSneakers, href: "/shop" },
  { name: "New Arrivals", count: "Drop 04", image: editorial, href: "/shop" },
];

function Home() {


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero typography reveal
      gsap.from(".hero-letter", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".hero-outline", {
        opacity: 0,
        scale: 1.08,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.4,
      });

      // Models reveal — left slides from left, center fades up, right slides from right
      gsap.from(".hero-model-left", {
        xPercent: -40, opacity: 0, filter: "blur(14px)",
        duration: 1.6, ease: "expo.out", delay: 0.55,
      });
      gsap.from(".hero-model-center", {
        yPercent: 18, opacity: 0, filter: "blur(14px)",
        duration: 1.7, ease: "expo.out", delay: 0.75,
      });
      gsap.from(".hero-model-right", {
        xPercent: 40, opacity: 0, filter: "blur(14px)",
        duration: 1.6, ease: "expo.out", delay: 0.95,
      });

      gsap.from(".hero-meta", { opacity: 0, y: 24, duration: 1, delay: 1.2, stagger: 0.1 });

      // Subtle independent breathing
      gsap.to(".hero-model-left",   { y: -10, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
      gsap.to(".hero-model-center", { y: -14, duration: 5.0, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.0 });
      gsap.to(".hero-model-right",  { y: -8,  duration: 4.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 });

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".parallax-near", { x: x * 28, y: y * 14, duration: 0.8, ease: "power3.out" });
        gsap.to(".parallax-mid", { x: x * 16, y: y * 8, duration: 0.9, ease: "power3.out" });
        gsap.to(".parallax-far", { x: x * -22, y: y * -10, duration: 1, ease: "power3.out" });
      };
      window.addEventListener("mousemove", onMove);

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Marquee headline parallax
      gsap.utils.toArray<HTMLElement>(".parallax-text").forEach((el) => {
        gsap.to(el, {
          xPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Editorial image parallax
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      return () => window.removeEventListener("mousemove", onMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-clip">
      <SmoothScroll />
      <Navbar />

      {/* HERO — Editorial Campaign */}
      <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-black">
        {/* Atmospheric backdrop: radial vignette + gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(255,193,7,0.10),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(0,0,0,0.9),_transparent_60%)]" />

        {/* Futuristic perspective grid floor */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:900px] pointer-events-none parallax-far">
          <div
            className="absolute inset-0 origin-top"
            style={{
              transform: "rotateX(64deg) translateZ(0)",
              backgroundImage:
                "linear-gradient(rgba(255,193,7,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,193,7,0.18) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%, black 75%, transparent 100%)",
            }}
          />
        </div>

        {/* Soft atmospheric fog */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />

        {/* MASSIVE KVRON TYPOGRAPHY — behind models */}
        <div className="absolute inset-x-0 top-[9%] h-[28%] z-10 flex items-center justify-center pointer-events-none">
          <div className="relative w-full text-center leading-none select-none parallax-far">
            {/* Outlined ghost layer */}
            <span
              className="hero-outline absolute inset-x-0 top-1/2 -translate-y-1/2 text-display font-black tracking-[-0.04em] text-[28vw] md:text-[22vw] lg:text-[18vw] block"
              style={{
                WebkitTextStroke: "1px rgba(255,193,7,0.35)",
                color: "transparent",
              }}
              aria-hidden="true"
            >
              KVRON
            </span>
            {/* Solid gold layer with per-letter reveal */}
            <h1 className="relative text-display font-black tracking-[-0.04em] text-[28vw] md:text-[22vw] lg:text-[18vw] flex justify-center overflow-hidden">
              {"KVRON".split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span
                    className="hero-letter inline-block gold-text"
                    style={{ textShadow: "0 0 60px rgba(255,193,7,0.25)" }}
                  >
                    {c}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* THREE FASHION MODELS — true 3-column editorial, equal billing */}
        <div className="absolute inset-x-0 bottom-0 top-[39%] md:top-[38%] lg:top-[37%] grid grid-cols-3 items-end gap-[2%] px-[5%] mx-auto pointer-events-none z-10">
          {[
            { cls: "hero-model-left parallax-mid", src: model1, alt: "KVRON model wearing oversized black bomber and cargo pants" },
            { cls: "hero-model-center parallax-near", src: model2, alt: "KVRON model in oversized black leather trench" },
            { cls: "hero-model-right parallax-mid", src: model3, alt: "KVRON model in black puffer and tactical cargos" },
          ].map((m) => (
            <div key={m.src} className={`${m.cls} relative w-full h-full flex items-end justify-center`}>
              <img
                src={m.src}
                alt={m.alt}
                width={1024}
                height={1408}
                className="h-full w-full object-contain object-bottom drop-shadow-[0_40px_60px_rgba(0,0,0,0.85)]"
                style={{ maskImage: "linear-gradient(to bottom, black 93%, transparent 100%)" }}
              />
            </div>
          ))}
        </div>

        {/* EDITORIAL COPY — compact, top-left, does not cover models */}
        <div className="absolute z-20 top-28 md:top-32 left-6 lg:left-10 max-w-[260px] pointer-events-auto">
          <div className="hero-meta flex items-center gap-3 mb-4 text-[10px] font-mono uppercase tracking-[0.35em] text-primary">
            <span className="w-8 h-px bg-primary" /> Coll. 04 / Winter 26
          </div>
          <h2 className="hero-meta text-display text-2xl md:text-3xl leading-[0.95] mb-4">
            The new <span className="gold-text italic font-serif normal-case">uniform</span> of luxury.
          </h2>
          <Link
            to="/shop"
            className="hero-meta btn-gold px-5 py-3 text-[10px] uppercase tracking-[0.3em] font-medium inline-flex items-center gap-2"
          >
            Shop Collection <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Right meta */}
        <div className="absolute z-20 right-6 lg:right-10 top-28 md:top-32 hero-meta hidden md:flex flex-col items-end gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground">
          <span className="text-primary">/ 03 looks</span>
          <span>Drop 04</span>
          <span>MMXXVI</span>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hero-meta text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-3">
          <span className="w-6 h-px bg-muted-foreground" />
          Scroll to enter
          <span className="w-6 h-px bg-muted-foreground" />
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="border-y border-border py-8 overflow-hidden">
        <div className="parallax-text flex whitespace-nowrap gap-12 text-display text-6xl md:text-8xl">

          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={i % 2 ? "gold-text" : "text-foreground"}>KVRON · ATELIER · MMXXVI ·</span>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal flex justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— 02 / Collections</p>
            <h2 className="text-display text-5xl md:text-7xl lg:text-8xl">The <span className="gold-text italic font-serif normal-case">Houses</span></h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex text-xs uppercase tracking-[0.25em] items-center gap-2 hover:text-primary transition">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {COLLECTIONS.map((c, i) => (
            <Link key={c.name} to={c.href} className={`reveal group relative aspect-[3/4] overflow-hidden bg-card ${i % 2 ? "lg:translate-y-12" : ""}`}>
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-5 lg:p-7 flex flex-col justify-end">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">{c.count}</p>
                <h3 className="text-display text-3xl md:text-4xl lg:text-5xl mb-2">{c.name}</h3>
                <span className="text-xs uppercase tracking-[0.25em] inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 group-hover:text-primary transition">
                  Discover <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal flex justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— 03 / Trending</p>
            <h2 className="text-display text-5xl md:text-7xl lg:text-8xl">Most <span className="gold-text italic font-serif normal-case">Coveted</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12 md:gap-x-6">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="reveal"><ProductCard p={p} /></div>
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="relative my-24 lg:my-32 overflow-hidden">
        <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <img src={editorial} alt="Editorial" loading="lazy" className="parallax-img absolute inset-0 w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 max-w-[1600px] mx-auto px-6 lg:px-10 flex flex-col justify-center">
            <div className="reveal max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">— 04 / Editorial</p>
              <h2 className="text-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9]">
                Streets of <span className="gold-text italic font-serif normal-case">midnight gold.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mb-8">
                A cinematic study of the new collection — shot through neon-lit alleys
                and brutalist concrete. The new uniform of the after-hours.
              </p>
              <Link to="/shop" className="btn-gold px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium inline-flex items-center gap-2">
                Watch the film <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal flex justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— 05 / Best Sellers</p>
            <h2 className="text-display text-5xl md:text-7xl lg:text-8xl">House <span className="gold-text italic font-serif normal-case">Classics</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12 md:gap-x-6">
          {products.slice(4, 8).map((p) => (
            <div key={p.id} className="reveal"><ProductCard p={p} /></div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-card/50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="reveal text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— Voices of the House</p>
            <h2 className="text-display text-4xl md:text-6xl">Worn by the <span className="gold-text italic font-serif normal-case">few.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { q: "The bomber is unreal. The weight, the lining, the way it falls — this is genuinely the best piece in my wardrobe.", a: "M. Okafor", role: "Creative Director, LDN" },
              { q: "Kvron doesn't make clothes. They make armor. The cargo is a permanent fixture.", a: "K. Tanaka", role: "Architect, TKY" },
              { q: "Finally a house that gets streetwear without diluting the craft. The runner sneaker is faultless.", a: "S. Moreau", role: "Stylist, PAR" },
            ].map((t) => (
              <figure key={t.a} className="reveal border border-border p-8 bg-background hover-lift">
                <div className="flex gap-1 text-primary mb-6">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <blockquote className="font-serif text-2xl leading-snug mb-6">“{t.q}”</blockquote>
                <figcaption className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {t.a} — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="reveal flex justify-between items-end mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">— @kvron.atelier</p>
            <h2 className="text-display text-4xl md:text-6xl">In the <span className="gold-text italic font-serif normal-case">wild.</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
          {[heroModel, collMen, collWomen, collSneakers, editorial, heroModel].map((src, i) => (
            <a key={i} href="#" className="reveal group relative aspect-square overflow-hidden bg-card">
              <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
