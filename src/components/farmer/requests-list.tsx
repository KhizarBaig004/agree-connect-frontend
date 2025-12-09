import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RequestsList() {
  const requests = [
    { id: '#R001', buyer: 'ABC Company', crop: 'Wheat', quantity: '1000 kg', price: '₹48/kg', status: 'Pending' },
    { id: '#R002', buyer: 'XYZ Corp', crop: 'Rice', quantity: '500 kg', price: '₹58/kg', status: 'Pending' },
    { id: '#R003', buyer: 'Food Mart', crop: 'Corn', quantity: '300 kg', price: '₹38/kg', status: 'Accepted' },
  ];

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-semibold">{request.id}</span>
                  <span className="text-sm text-muted-foreground">{request.buyer}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {request.crop} • {request.quantity} • {request.price}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded text-sm ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {request.status}
                </span>
                {request.status === 'Pending' && (
                  <>
                    <Button size="sm" variant="outline">Reject</Button>
                    <Button size="sm">Accept</Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

