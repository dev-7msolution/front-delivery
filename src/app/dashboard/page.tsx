'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Utensils,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Grid3x3,
  LogOut,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 2.450,00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Pedidos',
      value: '45',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'Produtos',
      value: '127',
      change: '+5 novos',
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Clientes',
      value: '892',
      change: '+23 hoje',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const quickActions = [
    {
      title: 'Categorias',
      description: 'Gerenciar categorias',
      icon: Grid3x3,
      color: 'from-orange-500 to-red-600',
      href: '/dashboard/categories',
    },
    {
      title: 'Produtos',
      description: 'Gerenciar produtos',
      icon: Package,
      color: 'from-yellow-500 to-orange-600',
      href: '/dashboard/products',
    },
    {
      title: 'Relatórios',
      description: 'Ver análises',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      href: '/dashboard/reports',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FoodApp Admin
              </h1>
              <p className="text-xs text-muted-foreground">Painel de Controle</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">{user?.empresaId}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={logout}
              className="border-orange-200"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Olá, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo do seu estabelecimento
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-orange-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 border-orange-200 h-full">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3`}
                    >
                      <action.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas movimentações do seu estabelecimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Novo pedido #1234', time: 'Há 5 minutos', value: 'R$ 45,90' },
                { action: 'Produto cadastrado', time: 'Há 15 minutos', value: 'Pizza Margherita' },
                { action: 'Novo pedido #1233', time: 'Há 23 minutos', value: 'R$ 78,50' },
                { action: 'Categoria criada', time: 'Há 1 hora', value: 'Sobremesas' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <p className="font-semibold text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
