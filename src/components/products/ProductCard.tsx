'use client';

import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors">
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
          onClick={() => onEdit(product)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(product.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
