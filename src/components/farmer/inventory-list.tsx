import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function InventoryList() {
  const inventory = [
    { id: '1', crop: 'Wheat', quantity: '500', unit: 'kg', minStock: '100', status: 'In Stock' },
    { id: '2', crop: 'Rice', quantity: '300', unit: 'kg', minStock: '100', status: 'In Stock' },
    { id: '3', crop: 'Corn', quantity: '50', unit: 'kg', minStock: '100', status: 'Low Stock' },
  ];

  return (
    <div className="space-y-4">
      {inventory.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.crop}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Current Quantity</label>
                <div className="text-lg font-semibold">{item.quantity} {item.unit}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Min Stock Level</label>
                <div className="text-sm">{item.minStock} {item.unit}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Update Quantity</label>
                <Input type="number" placeholder="Enter quantity" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Update</Button>
                <span className={`px-3 py-1 rounded text-xs self-center ${
                  item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

