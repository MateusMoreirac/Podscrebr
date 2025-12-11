
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart, Crown, X } from "lucide-react";
import { toast } from "sonner";

interface ProductDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onAddToCart: (product: Product, size: string) => void;
}

const SIZES = ["P", "M", "G", "GG"];

export function ProductDetailsDialog({
    isOpen,
    onClose,
    product,
    onAddToCart,
}: ProductDetailsDialogProps) {
    const [selectedSize, setSelectedSize] = useState<string>("");

    // Reset size when product changes
    useEffect(() => {
        if (isOpen) {
            setSelectedSize("");
        }
    }, [isOpen, product]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize && product.category !== "Acessórios") {
            toast.error("Por favor, selecione um tamanho!");
            return;
        }
        onAddToCart(product, selectedSize);
        toast.success(`${product.name} (Tamanho: ${selectedSize}) adicionado ao carrinho!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card p-0 border-border">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-primary"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative aspect-square md:aspect-auto h-full max-h-[400px] md:max-h-full bg-secondary/20">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.stock <= 0 && (
                            <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                                Esgotado
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="p-6 flex flex-col h-full bg-card">
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-4 h-4 text-primary" />
                                <span className="text-xs font-medium text-primary uppercase tracking-widest">
                                    {product.category}
                                </span>
                            </div>
                            <DialogTitle className="text-2xl font-display text-foreground pr-8">
                                {product.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 flex-1">
                            <p className="text-3xl font-display text-primary mb-4">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                            </p>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {product.category !== "Acessórios" && (
                                <div className="space-y-4">
                                    <span className="text-sm font-medium text-foreground">
                                        Selecione o Tamanho:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZES.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`
                        w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-200
                        ${selectedSize === size
                                                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                                    }
                      `}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                            <Button
                                variant="neon"
                                size="lg"
                                className="w-full"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Adicionar ao Carrinho
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
