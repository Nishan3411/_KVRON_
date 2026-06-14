import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group relative">
      <Link
        to="/products/$id"
        params={{ id: p.id }}
        className="block relative aspect-[4/5] bg-card overflow-hidden"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={900}
          height={1100}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:opacity-0 group-hover:scale-105"
        />
        <img
          src={p.hover}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-[1200ms] ease-out group-hover:opacity-100 group-hover:scale-100"
        />
        {p.badge && (
          <span className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${
            p.badge.startsWith("−") ? "bg-primary text-primary-foreground" : "bg-black/80 text-primary border border-primary/40"
          }`}>
            {p.badge}
          </span>
        )}
        <button
          aria-label="Wishlist"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-primary hover:bg-black/60 transition opacity-0 group-hover:opacity-100"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3.5 text-xs uppercase tracking-[0.25em] font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        >
          <ShoppingBag className="w-4 h-4" /> Quick Add
        </button>
      </Link>
      <div className="pt-4 flex justify-between items-start gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">{p.category}</p>
          <h3 className="text-sm font-medium tracking-wide">{p.name}</h3>
        </div>
        <div className="text-right">
          {p.oldPrice && <p className="text-xs text-muted-foreground line-through">${p.oldPrice}</p>}
          <p className={`text-sm font-medium ${p.oldPrice ? "text-primary" : ""}`}>${p.price}</p>
        </div>
      </div>
    </div>
  );
}
