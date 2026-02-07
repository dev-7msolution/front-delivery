export interface Category {
  id_categoria: number;
  id_empresa: number;
  nome_categoria: string;
  ativo: number;
  data_cadastrou: string;
  data_update: string | null;
  icon: string;
}

export interface CategoryResponse {
  status: boolean;
  resultado: Category[];
}

export interface CreateCategoryData {
  nome_categoria: string;
  ativo: number;
  icon?: string;
}
