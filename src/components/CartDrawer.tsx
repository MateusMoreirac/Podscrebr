import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import { CheckoutForm, CheckoutData } from "@/components/CheckoutForm";
import { toast } from "sonner";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemove: (productId: string, size?: string) => void;
  onClear: () => void;
  onCheckout: (cart: CartItem[]) => Promise<void>;
  total: number;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
  total,
}: CartDrawerProps) {
  const [isCheckout, setIsCheckout] = useState(false);

  // Reset view when closing
  const handleClose = () => {
    onClose();
    setTimeout(() => setIsCheckout(false), 300); // Wait for transition
  };

  const handleConfirmOrder = async (data: CheckoutData) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Processando pedido...");

      // Process stock updates
      // This MUST wait for the DB update to finish before redirecting
      await onCheckout(cart);

      // Create message for WhatsApp
      const message = `
*Novo Pedido - Podscre* 👑

*Cliente:* ${data.name}
*Endereço:* ${data.address.street}, ${data.address.number}${data.address.complement ? ` - ${data.address.complement}` : ''}
*Pagamento:* ${data.paymentMethod.toUpperCase()}

*Itens do Pedido:*
${cart.map(item => `- ${item.product.name} ${item.size ? `(${item.size})` : ''} x${item.quantity} - R$ ${(item.product.price * item.quantity).toFixed(2)}`).join('\n')}

*Total:* R$ ${total.toFixed(2)}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5584981735466&text=${encodedMessage}`;

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Pedido enviado! Redirecionando para o WhatsApp...");

      // Delay slightly to ensure toast is seen and logic completes
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        onClear();
        handleClose();
      }, 1000);

    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Erro ao processar o pedido. Tente novamente.");
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl">{isCheckout ? "Finalizar Pedido" : "Carrinho"}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          {isCheckout ? (
            <CheckoutForm
              onConfirm={handleConfirmOrder}
              onCancel={() => setIsCheckout(false)}
              total={total}
            />
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Crown className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                    <Button variant="outline" className="mt-4" onClick={handleClose}>
                      Continuar Comprando
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size || 'default'}`}
                        className="flex gap-4 bg-secondary/30 rounded-lg p-3 animate-fade-in"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.product.name}</h3>
                          {item.size && (
                            <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>
                          )}
                          <p className="text-primary font-display text-lg">
                            R$ {item.product.price.toFixed(2).replace(".", ",")}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity - 1, item.size)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1, item.size)
                              }
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => onRemove(item.product.id, item.size)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-2xl font-display text-primary">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <Button variant="neon" className="w-full" size="lg" onClick={() => setIsCheckout(true)}>
                    Finalizar Pedido
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={handleClose}
                  >
                    Continuar Comprando
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-muted-foreground"
                    onClick={onClear}
                  >
                    Limpar Carrinho
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
