import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  const handleClick = () => {
    onClick(product);
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden card-hover border border-border/50">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={handleClick}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button variant="neon" size="icon" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            <Eye className="h-5 w-5" />
          </Button>
        </div>

        {/* Stock badge */}
        {isOutOfStock && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Esgotado
          </div>
        )}

        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Últimas unidades
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-display text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.stock} em estoque
          </span>
        </div>
      </div>
    </div>
  );
}
