'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ProductForm, ProductList, ProductsHeader } from '@/components/products';
import { productSchema, type ProductFormData } from '@/lib/validations/product';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { useAuth } from '@/contexts/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api/products';
import { getCategories } from '@/lib/api/categories';

function ProductsContent() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      categoryId: 1,
      image: '',
      active: true,
    },
  });

  // Carregar produtos e categorias ao montar componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user?.empresaId || !token) return;

    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(user.empresaId, token),
        getCategories(user.empresaId, token),
      ]);
      
      // Produtos já vêm com categoryName da API
      setProducts(productsData);
      setCategories(categoriesData);

      // Atualizar categoryId padrão se houver categorias
      if (categoriesData.length > 0) {
        setValue('categoryId', categoriesData[0].id_categoria);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!user?.empresaId || !token) {
      alert('Erro: usuário não autenticado');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingProduct) {
        // Atualizar produto existente
        await updateProduct(
          editingProduct.id,
          {
            name: data.name,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            active: data.active,
          },
          token
        );
      } else {
        // Criar novo produto
        await createProduct(
          user.empresaId,
          {
            name: data.name,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
          },
          token
        );
      }

      // Recarregar lista de produtos para garantir dados atualizados
      await loadData();

      // Limpar formulário e fechar
      reset({
        name: '',
        description: '',
        price: 0,
        categoryId: categories[0]?.id_categoria || 1,
        image: '',
        active: true,
      });
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(error instanceof Error ? error.message : 'Erro ao salvar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image || '',
      active: product.active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      alert('Erro: usuário não autenticado');
      return;
    }

    if (!confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    try {
      await deleteProduct(id, token);
      setProducts(products.filter(prod => prod.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert(error instanceof Error ? error.message : 'Erro ao deletar produto');
    }
  };

  const handleNewProduct = () => {
    setShowForm(true);
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      price: 0,
      categoryId: categories[0]?.id_categoria || 1,
      image: '',
      active: true,
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      price: 0,
      categoryId: categories[0]?.id_categoria || 1,
      image: '',
      active: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950">
      <div className="container mx-auto px-4 py-8">
        <ProductsHeader onNewProduct={handleNewProduct} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showForm && (
            <ProductForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              categories={categories}
              isSubmitting={isSubmitting}
              isEditing={!!editingProduct}
              onCancel={handleCancel}
            />
          )}

          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <ProductList
              products={products}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
