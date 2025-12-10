import { RoleGuard } from '@/components/auth';
import { ProductsBrowse } from '@/components/buyer/products-browse';

export default function BrowsePage() {
  return (
    <RoleGuard allowedRoles={['buyer', 'admin']}>
      <div className="py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Browse Products</h1>
          <p className="text-muted-foreground mt-1">Discover fresh produce directly from farmers</p>
        </div>
        <ProductsBrowse />
      </div>
    </RoleGuard>
  );
}

