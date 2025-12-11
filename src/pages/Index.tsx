import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, updateStock } = useProducts();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount } = useCart();

  const handleAddToCart = (product: Product, size?: string) => {
    addToCart(product, 1, size);
    setIsCartOpen(true); // Open cart when adding
  };

  const handleCheckout = async (cartItems: typeof cart) => {
    // 1. Aggregate quantities by product ID
    const quantitiesByProduct = cartItems.reduce((acc, item) => {
      acc[item.product.id] = (acc[item.product.id] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

    // 2. Update stock for each unique product
    // Use Promise.all to wait for all updates to complete
    const updatePromises = Object.entries(quantitiesByProduct).map(([productId, quantity]) =>
      updateStock(productId, quantity)
    );

    await Promise.all(updatePromises);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={itemCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <ProductsSection products={products} onAddToCart={handleAddToCart} />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={handleCheckout}
        total={total}
      />
    </div>
  );
};

export default Index;
