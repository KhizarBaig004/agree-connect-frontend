import { RoleGuard } from '@/components/auth';
import { InventoryList } from '@/components/farmer/inventory-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InventoryPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <Link href="/farmer/products/new">
            <Button>Add New Product to Market</Button>
          </Link>
        </div>
        <InventoryList />
      </div>
    </RoleGuard>
  );
}

