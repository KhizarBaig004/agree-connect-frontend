import { RoleGuard } from '@/components/auth';
import { AnalyticsOverview } from '@/components/farmer/analytics-overview';

export default function AnalyticsPage() {
  return (
    <RoleGuard allowedRoles={['seller', 'admin']}>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        <AnalyticsOverview />
      </div>
    </RoleGuard>
  );
}

