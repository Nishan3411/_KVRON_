import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Men", to: "/shop" },
  { label: "Women", to: "/shop" },
  { label: "Editorial", to: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-foreground/80 hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <Link
            to="/"
            className="text-[22px] lg:text-[26px] font-display tracking-[0.35em] text-foreground shrink-0"
          >
            KVRON
          </Link>

          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-[11px] uppercase tracking-[0.22em] font-medium text-foreground/60 hover:text-foreground transition-colors duration-300 relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground/40 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Cart"
              className="relative text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background border-r border-border p-8 transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-14">
            <span className="font-display text-xl tracking-[0.3em]">KVRON</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display tracking-wider text-foreground/70 hover:text-foreground transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-10 left-8 right-8 flex gap-6 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Account
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Wishlist
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Help
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
