import { useState, useEffect } from "react";
import { CartItem, Product } from "@/types/product";

const CART_KEY = "podscre-cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number = 1, size?: string) => {
    const existing = cart.find((item) => item.product.id === product.id && item.size === size);
    if (existing) {
      const newCart = cart.map((item) =>
        item.product.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity, size }]);
    }
  };

  const removeFromCart = (productId: string, size?: string) => {
    saveCart(cart.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      const newCart = cart.map((item) =>
        item.product.id === productId && item.size === size ? { ...item, quantity } : item
      );
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}
