
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckoutFormProps {
    onConfirm: (data: CheckoutData) => void;
    onCancel: () => void;
    total: number;
}

export interface CheckoutData {
    name: string;
    address: {
        street: string;
        number: string;
        complement?: string;
    };
    paymentMethod: "pix" | "debit" | "credit" | "cash";
}

export function CheckoutForm({ onConfirm, onCancel, total }: CheckoutFormProps) {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<CheckoutData["paymentMethod"]>("pix");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({
            name,
            address: {
                street,
                number,
                complement,
            },
            paymentMethod,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-4">
                    <h3 className="font-display text-lg text-primary">Informações Pessoais</h3>
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: João da Silva"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-display text-lg text-primary">Endereço de Entrega</h3>
                    <div className="space-y-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Ex: Rua das Flores"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Número</Label>
                            <Input
                                id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Ex: 123"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                                id="complement"
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                                placeholder="Ex: Apt 101"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-display text-lg text-primary">Forma de Pagamento</h3>
                    <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as CheckoutData["paymentMethod"])}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="flex items-center space-x-2 border border-border p-3 rounded-md cursor-pointer hover:border-primary transition-colors">
                            <RadioGroupItem value="pix" id="pix" />
                            <Label htmlFor="pix" className="cursor-pointer">Pix</Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-border p-3 rounded-md cursor-pointer hover:border-primary transition-colors">
                            <RadioGroupItem value="debit" id="debit" />
                            <Label htmlFor="debit" className="cursor-pointer">Débito</Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-border p-3 rounded-md cursor-pointer hover:border-primary transition-colors">
                            <RadioGroupItem value="credit" id="credit" />
                            <Label htmlFor="credit" className="cursor-pointer">Crédito</Label>
                        </div>
                        <div className="flex items-center space-x-2 border border-border p-3 rounded-md cursor-pointer hover:border-primary transition-colors">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="cursor-pointer">Dinheiro</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="p-4 border-t border-border mt-auto">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total a Pagar</span>
                    <span className="text-2xl font-display text-primary">
                        R$ {total.toFixed(2).replace(".", ",")}
                    </span>
                </div>
                <Button type="submit" variant="neon" className="w-full" size="lg">
                    Confirmar Pedido
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={onCancel}
                >
                    Voltar ao Carrinho
                </Button>
            </div>
        </form>
    );
}
