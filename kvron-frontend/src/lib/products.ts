import hoodie from "@/assets/product-hoodie.jpg";
import tee from "@/assets/product-tee.jpg";
import cargo from "@/assets/product-cargo.jpg";
import jacket from "@/assets/product-jacket.jpg";
import sneaker from "@/assets/collection-sneakers.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  hover: string;
  badge?: string;
  colors: string[];
  sizes: string[];
};

export const products: Product[] = [
  { id: "obsidian-hoodie", name: "Obsidian Hoodie", category: "Men", price: 320, oldPrice: 420, image: hoodie, hover: jacket, badge: "−24%", colors: ["#000", "#FFC107", "#F5F5F5"], sizes: ["XS","S","M","L","XL"] },
  { id: "void-tee", name: "Void Oversized Tee", category: "Unisex", price: 180, image: tee, hover: hoodie, badge: "NEW", colors: ["#000", "#F5F5F5"], sizes: ["S","M","L","XL"] },
  { id: "shadow-cargo", name: "Shadow Tactical Cargo", category: "Men", price: 410, image: cargo, hover: jacket, colors: ["#000", "#2a2a2a"], sizes: ["28","30","32","34","36"] },
  { id: "noir-bomber", name: "Noir Bomber Jacket", category: "Outerwear", price: 890, image: jacket, hover: hoodie, badge: "ICON", colors: ["#000"], sizes: ["S","M","L","XL"] },
  { id: "kvron-runner", name: "Kvron Runner", category: "Footwear", price: 540, oldPrice: 620, image: sneaker, hover: cargo, badge: "−13%", colors: ["#000", "#FFC107"], sizes: ["40","41","42","43","44","45"] },
  { id: "midas-hoodie", name: "Midas Heavyweight Hoodie", category: "Men", price: 380, image: hoodie, hover: tee, colors: ["#000","#FFC107"], sizes: ["S","M","L","XL"] },
  { id: "monolith-tee", name: "Monolith Tee", category: "Women", price: 160, image: tee, hover: jacket, badge: "NEW", colors: ["#000"], sizes: ["XS","S","M","L"] },
  { id: "eclipse-jacket", name: "Eclipse Leather", category: "Outerwear", price: 1240, image: jacket, hover: hoodie, colors: ["#000"], sizes: ["S","M","L"] },
];
