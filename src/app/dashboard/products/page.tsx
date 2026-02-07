'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { productSchema, type ProductFormData } from '@/lib/validations/product';
import type { Product } from '@/types/product';

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela e manjericão',
      price: 45.90,
      categoryId: 1,
      categoryName: 'Pizzas',
      active: true,
    },
    {
      id: 2,
      name: 'Coca-Cola 2L',
      description: 'Refrigerante',
      price: 12.00,
      categoryId: 2,
      categoryName: 'Bebidas',
      active: true,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    categoryId: 1,
    image: '',
    active: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 1, name: 'Pizzas' },
    { id: 2, name: 'Bebidas' },
    { id: 3, name: 'Sobremesas' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = productSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0] as string] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    const categoryName = categories.find(c => c.id === formData.categoryId)?.name;

    if (editingProduct) {
      setProducts(products.map(prod => 
        prod.id === editingProduct.id 
          ? { ...prod, ...formData, categoryName } 
          : prod
      ));
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        categoryName,
        createdAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
    }

    setFormData({ name: '', description: '', price: 0, categoryId: 1, image: '', active: true });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image || '',
      active: product.active,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      setProducts(products.filter(prod => prod.id !== id));
    }
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon" className="border-orange-200">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Produtos</h1>
              <p className="text-muted-foreground">Gerencie o cardápio do seu estabelecimento</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingProduct(null);
                setFormData({ name: '', description: '', price: 0, categoryId: 1, image: '', active: true });
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          {showForm && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </CardTitle>
                <CardDescription>
                  Preencha os dados do produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Pizza Margherita"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição do produto"
                      rows={3}
                    />
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Categoria *</Label>
                    <select
                      id="categoryId"
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL da Imagem</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="active" className="cursor-pointer">Ativo</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600">
                      {editingProduct ? 'Salvar' : 'Criar'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                        setFormData({ name: '', description: '', price: 0, categoryId: 1, image: '', active: true });
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* List */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Listagem</CardTitle>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded">
                            {product.categoryName}
                          </span>
                          {!product.active && (
                            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                              Inativo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum produto encontrado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsContent />
    </ProtectedRoute>
  );
}
