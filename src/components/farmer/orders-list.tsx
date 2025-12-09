import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function OrdersList() {
  const orders = [
    { id: '#1234', buyer: 'ABC Company', crop: 'Wheat', quantity: '500 kg', date: '2024-01-15', status: 'Pending', amount: '₹25,000' },
    { id: '#1235', buyer: 'XYZ Corp', crop: 'Rice', quantity: '300 kg', date: '2024-01-14', status: 'Confirmed', amount: '₹18,000' },
    { id: '#1236', buyer: 'Food Mart', crop: 'Corn', quantity: '200 kg', date: '2024-01-13', status: 'Shipped', amount: '₹12,000' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">{order.id}</span>
                  <span className="text-sm text-muted-foreground">{order.buyer}</span>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {order.crop} • {order.quantity} • {order.amount}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded text-sm ${
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
                {order.status === 'Pending' && (
                  <Button size="sm">Confirm</Button>
                )}
                {order.status === 'Confirmed' && (
                  <Button size="sm" variant="outline">Mark Ready</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

