import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-semibold">₹1,25,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Month</span>
              <span className="font-semibold">₹1,10,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Growth</span>
              <span className="font-semibold text-green-600">+13.6%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Wheat</span>
              <span className="font-semibold">₹45,000</span>
            </div>
            <div className="flex justify-between">
              <span>Rice</span>
              <span className="font-semibold">₹38,000</span>
            </div>
            <div className="flex justify-between">
              <span>Corn</span>
              <span className="font-semibold">₹25,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

