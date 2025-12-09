'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/agriculture-bg.jpg)',
        }}
      />
      
      {/* Dark overlay for readability - lighter so image shows through */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/50 via-amber-900/40 to-orange-900/50"></div>
      
      {/* Animated blobs overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500/90 to-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">Create Account</CardTitle>
          <CardDescription className="text-base text-white/90 font-medium drop-shadow">
            Join Agree Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedRole ? (
            <RoleSelection onSelect={handleRoleSelect} />
          ) : selectedRole === 'seller' ? (
            <FarmerForm role={selectedRole} onBack={() => setSelectedRole('')} />
          ) : selectedRole === 'buyer' ? (
            <BuyerForm role={selectedRole} onBack={() => setSelectedRole('')} />
          ) : (
            <LogisticForm role={selectedRole} onBack={() => setSelectedRole('')} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RoleSelection({ onSelect }: { onSelect: (role: UserRole) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-white mb-6 drop-shadow-lg font-medium">
        Choose your role to get started
      </p>
      <div className="grid gap-4">
        <Button
          onClick={() => onSelect('seller')}
          className="h-auto p-6 flex flex-col items-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
        >
          <span className="text-lg font-semibold">🌾 Farmer</span>
          <span className="text-sm opacity-90">Sell your crops directly to buyers</span>
        </Button>
        <Button
          onClick={() => onSelect('buyer')}
          className="h-auto p-6 flex flex-col items-start bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        >
          <span className="text-lg font-semibold">🛒 Buyer</span>
          <span className="text-sm opacity-90">Buy directly from farmers</span>
        </Button>
        <Button
          onClick={() => onSelect('logistic')}
          className="h-auto p-6 flex flex-col items-start bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white"
        >
          <span className="text-lg font-semibold">🚚 Logistic Partner</span>
          <span className="text-sm opacity-90">Deliver crops from farm to buyer</span>
        </Button>
      </div>
      <div className="text-center text-sm text-white/90 mt-6 drop-shadow">
        Already have an account?{' '}
        <a href="/auth/login" className="text-white font-medium underline-offset-4 hover:underline cursor-pointer">
          Login here
        </a>
      </div>
    </div>
  );
}

function FarmerForm({ role, onBack }: { role: UserRole; onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    phone: '',
    address: '',
    farmName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: 'seller' as UserRole,
      };
      login(mockUser, `mock-token-${Date.now()}`);
      router.push('/');
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white drop-shadow">Farmer Registration</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>Back</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-white drop-shadow">Full Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white drop-shadow">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="farmer@example.com"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white drop-shadow">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="border-white/30 bg-white/20 backdrop-blur-sm text-white focus:border-white/50 focus:ring-white/30">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white drop-shadow">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1234567890"
            className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="farmName" className="text-white drop-shadow">Farm Name *</Label>
        <Input
          id="farmName"
          required
          value={formData.farmName}
          onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
          placeholder="Enter your farm name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-white drop-shadow">Farm Address *</Label>
        <Input
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your farm address"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white drop-shadow">Password *</Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Farmer Account'}
      </Button>
    </form>
  );
}

function BuyerForm({ role, onBack }: { role: UserRole; onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    password: '',
    phone: '',
    companyName: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: `${formData.name.toLowerCase().replace(/\s/g, '')}@buyer.com`,
        role: 'buyer' as UserRole,
      };
      login(mockUser, `mock-token-${Date.now()}`);
      router.push('/');
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white drop-shadow">Buyer Registration</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>Back</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-white drop-shadow">Full Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white drop-shadow">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white drop-shadow">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1234567890"
            className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-white drop-shadow">Company/Organization Name *</Label>
        <Input
          id="companyName"
          required
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          placeholder="Enter company name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-white drop-shadow">Business Address *</Label>
        <Input
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter business address"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white drop-shadow">Password *</Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Buyer Account'}
      </Button>
    </form>
  );
}

function LogisticForm({ role, onBack }: { role: UserRole; onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    password: '',
    phone: '',
    companyName: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: `${formData.name.toLowerCase().replace(/\s/g, '')}@logistic.com`,
        role: 'logistic' as UserRole,
      };
      login(mockUser, `mock-token-${Date.now()}`);
      router.push('/');
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white drop-shadow">Logistic Partner Registration</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>Back</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-white drop-shadow">Full Name *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white drop-shadow">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white drop-shadow">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1234567890"
            className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-white drop-shadow">Logistic Company Name *</Label>
        <Input
          id="companyName"
          required
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          placeholder="Enter company name"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-white drop-shadow">Company Address *</Label>
        <Input
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter company address"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white drop-shadow">Password *</Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          className="border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Logistic Account'}
      </Button>
    </form>
  );
}

