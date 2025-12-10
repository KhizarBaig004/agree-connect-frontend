import { RoleGuard } from '@/components/auth';
import { ProductsList } from '@/components/farmer/products-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-muted-foreground mt-1">Manage your products and publish them to the market</p>
          </div>
          <Link href="/farmer/products/new">
            <Button>Add New Product</Button>
          </Link>
        </div>
        <ProductsList />
      </div>
    </RoleGuard>
  );
}

