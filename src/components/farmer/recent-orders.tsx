import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RecentOrders() {
  const orders = [
    { id: '#1234', buyer: 'ABC Company', crop: 'Wheat', quantity: '500 kg', status: 'Pending', amount: '₹25,000' },
    { id: '#1235', buyer: 'XYZ Corp', crop: 'Rice', quantity: '300 kg', status: 'Confirmed', amount: '₹18,000' },
    { id: '#1236', buyer: 'Food Mart', crop: 'Corn', quantity: '200 kg', status: 'Shipped', amount: '₹12,000' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{order.id}</span>
                  <span className="text-sm text-muted-foreground">{order.buyer}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {order.crop} • {order.quantity} • {order.amount}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

