'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, TrendingUp, DollarSign } from 'lucide-react';

export function BuyerDashboardStats() {
  const stats = [
    {
      title: 'Total Orders',
      value: '12',
      change: '+2 this month',
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Active Orders',
      value: '3',
      change: 'In progress',
      icon: Package,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Spent',
      value: '₹1,25,000',
      change: '+15% this month',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: 'Cart Items',
      value: '5',
      change: 'Ready to checkout',
      icon: TrendingUp,
      color: 'text-yellow-600 dark:text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

