'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecentOrders() {
  const recentOrders = [
    { id: '#1234', seller: 'Green Valley Farms', crop: 'Wheat', quantity: '500 kg', date: '2024-01-15', status: 'Pending', amount: '₹25,000' },
    { id: '#1235', seller: 'Farm Fresh', crop: 'Rice', quantity: '300 kg', date: '2024-01-14', status: 'Confirmed', amount: '₹18,000' },
    { id: '#1236', seller: 'Organic Fields', crop: 'Corn', quantity: '200 kg', date: '2024-01-13', status: 'Shipped', amount: '₹12,000' },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Shipped':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Delivered':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Link href="/buyer/orders">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">{order.id}</span>
                  <span className="text-sm text-muted-foreground">{order.seller}</span>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.crop} • {order.quantity} • {order.amount}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded text-sm border ${getStatusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

