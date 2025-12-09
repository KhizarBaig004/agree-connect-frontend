import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Next.js with shadcn/ui
        </h1>
        <p className="text-lg mb-8">
          Get started by editing{" "}
          <code className="bg-muted px-2 py-1 rounded">
            src/app/page.tsx
          </code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>shadcn/ui Components</CardTitle>
            <CardDescription>
              Beautiful and accessible components built with Radix UI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Example</CardTitle>
            <CardDescription>
              Input and Label components from shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
