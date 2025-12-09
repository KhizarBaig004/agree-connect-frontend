import { RoleGuard } from '@/components/auth';
import { OrdersList } from '@/components/farmer/orders-list';

export default function OrdersPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        <OrdersList />
      </div>
    </RoleGuard>
  );
}

