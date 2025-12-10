import { RoleGuard } from '@/components/auth';
import { BuyerOrdersList } from '@/components/buyer/orders-list';

export default function BuyerOrdersPage() {
  return (
    <RoleGuard allowedRoles={['buyer', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <BuyerOrdersList />
      </div>
    </RoleGuard>
  );
}

