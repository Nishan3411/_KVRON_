import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-black border-t border-border mt-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <h3 className="text-display text-5xl lg:text-7xl mb-6">
              JOIN THE<br /><span className="gold-text">CIRCLE.</span>
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Early access to drops, private invitations, and the Kvron journal — direct to your inbox.
            </p>
            <form className="flex border-b border-border focus-within:border-primary transition-colors">
              <input type="email" placeholder="your@email.com" className="bg-transparent flex-1 py-3 outline-none placeholder:text-muted-foreground" />
              <button className="text-primary uppercase tracking-[0.2em] text-sm font-medium px-2">Subscribe →</button>
            </form>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            {[
              { title: "Shop", links: ["New Arrivals", "Men", "Women", "Footwear", "Sale"] },
              { title: "Kvron", links: ["Our Story", "Atelier", "Journal", "Sustainability"] },
              { title: "Support", links: ["Contact", "Shipping", "Returns", "Size Guide", "FAQ"] },
              { title: "Connect", links: ["Instagram", "TikTok", "YouTube", "Pinterest"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-10">
          <div className="text-display text-[14vw] leading-none gold-text opacity-90 select-none">KVRON</div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-10 text-xs text-muted-foreground uppercase tracking-[0.2em] font-mono">
          <span>© 2026 Kvron Atelier. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
