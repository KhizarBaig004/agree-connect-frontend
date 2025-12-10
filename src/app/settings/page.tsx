import { RoleGuard } from '@/components/auth';
import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  return (
    <RoleGuard allowedRoles={['admin', 'seller', 'buyer', 'logistic']}>
      <div className="py-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences</p>
        </div>
        <SettingsForm />
      </div>
    </RoleGuard>
  );
}

