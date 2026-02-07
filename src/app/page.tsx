'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ArrowRight, Pizza, Coffee, Sparkles } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <Utensils className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            FoodApp
          </h1>
          
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mate sua fome com os melhores pratos da cidade 🔥
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-lg px-8 shadow-xl"
              onClick={() => router.push('/login')}
            >
              Fazer Pedido
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold text-lg px-8"
              onClick={() => router.push('/login')}
            >
              Entrar
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                <Pizza className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Variedade Incrível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Centenas de opções dos melhores restaurantes da cidade
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Entrega Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seu pedido quentinho em até 40 minutos
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
                <Coffee className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">Melhor Experiência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interface simples e pedido em poucos cliques
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950">
          <CardContent className="text-center py-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Pronto para fazer seu pedido?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Entre agora e descubra as melhores opções de comida perto de você
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-lg px-12 shadow-xl"
              onClick={() => router.push('/login')}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t">
        <p>FoodApp - Seu app favorito de delivery 🍕</p>
      </footer>
    </div>
  );
}
