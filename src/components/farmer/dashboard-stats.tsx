import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardStats() {
  const stats = [
    { label: 'Total Sales', value: '₹1,25,000', change: '+12%' },
    { label: 'Active Orders', value: '24', change: '+5' },
    { label: 'Products', value: '18', change: '+2' },
    { label: 'Revenue', value: '₹95,000', change: '+8%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

