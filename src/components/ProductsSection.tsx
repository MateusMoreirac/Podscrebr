import { useState } from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailsDialog } from "@/components/ProductDetailsDialog";
import { Product } from "@/types/product";

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
}

const categories = ["Todos", "Camisetas", "Moletons", "Calças", "Bermudas", "Acessórios"];

export function ProductsSection({ products, onAddToCart }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="produtos" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Coleção
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            Nossos Produtos
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "neon" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onClick={setSelectedProduct}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado nessa categoria.
          </p>
        )}

        {/* Product Details Dialog */}
        <ProductDetailsDialog
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
}


