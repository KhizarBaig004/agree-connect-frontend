import { RoleGuard } from '@/components/auth';
import { RequestsList } from '@/components/farmer/requests-list';

export default function RequestsPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Buyer Requests</h1>
        <RequestsList />
      </div>
    </RoleGuard>
  );
}

