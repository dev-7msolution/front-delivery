'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { categorySchema, type CategoryFormData } from '@/lib/validations/category';
import type { Category } from '@/types/category';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api/categories';

function CategoriesContent() {
  const { user, token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    nome_categoria: '',
    ativo: 1,
    icon: 'Lucid',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Carregar categorias da API
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    if (!user?.empresaId || !token) return;
    
    try {
      setIsLoading(true);
      const data = await getCategories(user.empresaId, token);
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      alert('Erro ao carregar categorias');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!user?.empresaId || !token) return;

    const result = categorySchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0] as string] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      setIsSaving(true);
      
      if (editingCategory) {
        await updateCategory(editingCategory.id_categoria, formData, token);
      } else {
        await createCategory(formData, user.empresaId, token);
      }

      await loadCategories();
      setFormData({ nome_categoria: '', ativo: 1, icon: 'Lucid' });
      setEditingCategory(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      nome_categoria: category.nome_categoria,
      ativo: category.ativo,
      icon: category.icon,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    
    if (confirm('Deseja realmente excluir esta categoria?')) {
      try {
        await deleteCategory(id, token);
        await loadCategories();
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        alert('Erro ao excluir categoria');
      }
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.nome_categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">Categorias</h1>
              <p className="text-muted-foreground">Gerencie as categorias dos seus produtos</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingCategory(null);
                setFormData({ nome_categoria: '', ativo: 1, icon: 'Lucid' });
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          {showForm && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>
                  {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                </CardTitle>
                <CardDescription>
                  Preencha os dados da categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome_categoria">Nome *</Label>
                    <Input
                      id="nome_categoria"
                      value={formData.nome_categoria}
                      onChange={(e) => setFormData({ ...formData, nome_categoria: e.target.value })}
                      placeholder="Ex: Pizzas"
                      disabled={isSaving}
                    />
                    {errors.nome_categoria && (
                      <p className="text-sm text-destructive">{errors.nome_categoria}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Ícone</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="Ex: Lucid"
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="ativo"
                      checked={formData.ativo === 1}
                      onChange={(e) => setFormData({ ...formData, ativo: e.target.checked ? 1 : 0 })}
                      className="rounded"
                      disabled={isSaving}
                    />
                    <Label htmlFor="ativo" className="cursor-pointer">Ativa</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        editingCategory ? 'Salvar' : 'Criar'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingCategory(null);
                        setFormData({ nome_categoria: '', ativo: 1, icon: 'Lucid' });
                      }}
                      disabled={isSaving}
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
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id_categoria}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{category.nome_categoria}</h3>
                          {category.ativo === 0 && (
                            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                              Inativa
                            </span>
                          )}
                          <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded">
                            {category.icon}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Criada em: {new Date(category.data_cadastrou).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id_categoria)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredCategories.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhuma categoria encontrada
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

export default function CategoriesPage() {
  return (
    <ProtectedRoute>
      <CategoriesContent />
    </ProtectedRoute>
  );
}
