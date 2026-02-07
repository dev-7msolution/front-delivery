import { 
  Check, 
  X, 
  AlertCircle, 
  Loader2, 
  Mail, 
  User,
  Settings,
  LogOut,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IconExample() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Exemplos de Ícones (lucide-react)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Botões com ícones */}
        <div>
          <h3 className="font-semibold mb-3">Botões com Ícones</h3>
          <div className="flex flex-wrap gap-2">
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Confirmar
            </Button>
            
            <Button variant="destructive">
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <Button variant="secondary">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </Button>
          </div>
        </div>

        {/* Botões somente com ícones */}
        <div>
          <h3 className="font-semibold mb-3">Botões de Ícone</h3>
          <div className="flex gap-2">
            <Button size="icon">
              <User className="h-4 w-4" />
            </Button>
            
            <Button size="icon" variant="outline">
              <Mail className="h-4 w-4" />
            </Button>
            
            <Button size="icon" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button size="icon" variant="destructive">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Alertas com ícones */}
        <div>
          <h3 className="font-semibold mb-3">Alertas com Ícones</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 rounded-md bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span>Operação realizada com sucesso!</span>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-md bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
              <X className="h-4 w-4" />
              <span>Erro ao processar a solicitação.</span>
            </div>
            
            <div className="flex items-center gap-2 p-3 rounded-md bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              <span>Atenção: Esta ação não pode ser desfeita.</span>
            </div>
          </div>
        </div>

        {/* Loading states */}
        <div>
          <h3 className="font-semibold mb-3">Estados de Carregamento</h3>
          <div className="flex items-center gap-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Carregando dados...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
