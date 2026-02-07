'use client';

import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductsHeaderProps {
  onNewProduct: () => void;
}

export function ProductsHeader({ onNewProduct }: ProductsHeaderProps) {
  return (
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
        onClick={onNewProduct}
        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Produto
      </Button>
    </div>
  );
}
