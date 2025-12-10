import { RoleGuard } from '@/components/auth';
import { ProductForm } from '@/components/farmer/product-form';

interface EditProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // Handle both Promise and synchronous params
  const resolvedParams = params instanceof Promise ? await params : params;
  
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        <ProductForm productId={resolvedParams.id} />
      </div>
    </RoleGuard>
  );
}

