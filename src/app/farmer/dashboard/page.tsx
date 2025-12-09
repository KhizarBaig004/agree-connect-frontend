import { RoleGuard } from '@/components/auth';
import { DashboardStats } from '@/components/farmer/dashboard-stats';
import { RecentOrders } from '@/components/farmer/recent-orders';

export default function FarmerDashboardPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <DashboardStats />
        <RecentOrders />
      </div>
    </RoleGuard>
  );
}

