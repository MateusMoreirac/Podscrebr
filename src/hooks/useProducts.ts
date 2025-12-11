import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      const mappedProducts: Product[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name || "",
        description: item.description || "",
        price: item.price || 0,
        stock: item.stock || 0,
        category: item.category || "",
        imageUrl: item.image_url || item.imageUrl || "",
        createdAt: item.created_at || item.createdAt || new Date().toISOString(),
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
    try {
      const newProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image_url: product.imageUrl,
      };

      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();

      if (error) throw error;

      const createdProduct: Product = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        imageUrl: data.image_url,
        createdAt: data.created_at,
      };

      setProducts((prev) => [...prev, createdProduct]);
      return createdProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const dbUpdates: any = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.price !== undefined) dbUpdates.price = updates.price;
      if (updates.stock !== undefined) dbUpdates.stock = updates.stock;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;

      const { error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateStock = async (id: string, quantity: number) => {
    try {
      // 1. Try to use the secure RPC function (Atomic update)
      const { error: rpcError } = await supabase.rpc('decrement_stock', {
        product_id: id,
        amount: quantity
      });

      if (!rpcError) {
        // Update local state to reflect change immediately
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
          )
        );
        return;
      }

      console.warn("RPC failed, falling back to direct update:", rpcError.message);

      // 2. Fallback: Direct Update (Requires RLS to be disabled or permissive)
      const { data: currentProduct, error: fetchError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', id)
        .single();

      if (fetchError || !currentProduct) {
        console.error("Error fetching current stock:", fetchError);
        return;
      }

      const newStock = Math.max(0, currentProduct.stock - quantity);

      const { data, error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', id)
        .select();

      if (updateError) {
        console.error("Error updating stock directly:", updateError);
      } else if (data && data.length === 0) {
        console.error("Update succeeded but returned no data. Check RLS policies.");
      } else {
        // Update local state
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
        );
      }
    } catch (error) {
      console.error("Error in updateStock:", error);
    }
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    fetchProducts
  };
}
