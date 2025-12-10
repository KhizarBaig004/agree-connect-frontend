import { RoleGuard } from '@/components/auth';
import { BuyerDashboardStats } from '@/components/buyer/dashboard-stats';
import { RecentOrders } from '@/components/buyer/recent-orders';

export default function BuyerDashboardPage() {
  return (
    <RoleGuard allowedRoles={['buyer', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="space-y-6">
          <BuyerDashboardStats />
          <RecentOrders />
        </div>
      </div>
    </RoleGuard>
  );
}

