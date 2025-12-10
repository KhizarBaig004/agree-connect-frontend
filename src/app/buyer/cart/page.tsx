import { RoleGuard } from '@/components/auth';
import { CartList } from '@/components/buyer/cart-list';

export default function CartPage() {
  return (
    <RoleGuard allowedRoles={['buyer', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <CartList />
      </div>
    </RoleGuard>
  );
}

