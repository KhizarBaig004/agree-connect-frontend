import { RoleGuard } from '@/components/auth';
import { ProductForm } from '@/components/farmer/product-form';

export default function NewProductPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <ProductForm />
      </div>
    </RoleGuard>
  );
}

