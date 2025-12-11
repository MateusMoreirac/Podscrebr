import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Crown,
  Plus,
  Pencil,
  Trash2,
  Package,
  ArrowLeft,
  LogOut,
  Eye,
  EyeOff,
  Minus,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { toast } from "sonner";

const ADMIN_KEY = "podscre-admin-auth";
const ADMIN_PASSWORD = "podscre2024";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_KEY, "true");
      toast.success("Login realizado com sucesso!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_KEY);
    toast.success("Logout realizado!");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      imageUrl: "",
    });
    setIsEditing(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(isEditing, formData);
      toast.success("Produto atualizado!");
    } else {
      addProduct(formData);
      toast.success("Produto adicionado!");
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
    });
    setIsEditing(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
      toast.success("Produto excluído!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 animate-fade-up">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-primary" />
                <span className="font-brand text-4xl text-primary tracking-wider">Podscre</span>
              </div>
              <h1 className="font-display text-2xl text-foreground">Área Administrativa</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Digite a senha para acessar
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="neon" className="w-full">
                Entrar
              </Button>

              <Link to="/">
                <Button type="button" variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para a Loja
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              <span className="font-brand text-2xl text-primary tracking-wider">Podscre</span>
            </div>
            <div>
              <h1 className="font-display text-xl">Painel Admin</h1>
              <p className="text-xs text-muted-foreground">Gerenciamento de Produtos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ver Loja
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total de Produtos"
            value={products.length}
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard
            title="Itens em Estoque"
            value={products.reduce((acc, p) => acc + p.stock, 0)}
            icon={<Crown className="h-5 w-5" />}
          />
          <StatCard
            title="Produtos Esgotados"
            value={products.filter((p) => p.stock === 0).length}
            icon={<Package className="h-5 w-5" />}
            alert={products.filter((p) => p.stock === 0).length > 0}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl">Produtos</h2>
          <Button variant="neon" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-up">
            <h3 className="font-display text-xl mb-4">
              {isEditing ? "Editar Produto" : "Novo Produto"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" variant="neon">
                  {isEditing ? "Salvar Alterações" : "Adicionar Produto"}
                </Button>
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Preço</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Estoque</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-display text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            if (product.stock > 0) {
                              updateProduct(product.id, { stock: product.stock - 1 });
                              toast.success("Estoque atualizado!");
                            }
                          }}
                          disabled={product.stock === 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className={`font-medium min-w-[3ch] text-center ${product.stock === 0
                            ? "text-destructive"
                            : product.stock <= 5
                              ? "text-yellow-500"
                              : "text-foreground"
                            }`}
                        >
                          {product.stock}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            updateProduct(product.id, { stock: product.stock + 1 });
                            toast.success("Estoque atualizado!");
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        {product.stock <= 5 && product.stock > 0 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                          className="hover:bg-primary/10 transition-all duration-300"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum produto cadastrado</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  alert,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  alert?: boolean;
}) {
  return (
    <div className={`bg-card border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 ${alert ? "border-destructive" : "border-border"}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-3xl font-display mt-1 ${alert ? "text-destructive" : "text-primary"}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${alert ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
