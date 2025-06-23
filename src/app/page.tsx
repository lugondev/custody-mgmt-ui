import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Label,
  Separator
} from '@/components/ui'
import { APP_CONFIG } from '@/constants'

/**
 * Home page component showcasing the design system
 * Demonstrates various UI components and their usage
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {APP_CONFIG.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {APP_CONFIG.description}
              </p>
            </div>
            <Badge variant="secondary">v{APP_CONFIG.version}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Custody Management System</CardTitle>
              <CardDescription>
                A comprehensive solution for managing digital asset custody with advanced security features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">System Administrator</p>
                  <p className="text-xs text-muted-foreground">admin@custody-mgmt.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="mr-1">+12%</Badge>
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 mr-1">3</Badge>
                  require approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mr-1">+5.2%</Badge>
                  portfolio growth
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and operations for custody management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">💼</div>
                  <span>Create Wallet</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">💸</div>
                  <span>New Transaction</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">✅</div>
                  <span>Approve Pending</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">📊</div>
                  <span>View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Design System Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Design System Components</CardTitle>
              <CardDescription>
                Demonstration of the UI components and design tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Buttons */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Buttons</Label>
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Success</Button>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Warning</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button disabled>Loading</Button>
                </div>
              </div>

              <Separator />

              {/* Badges */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Badges</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Warning</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Info</Badge>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Pending</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
                </div>
              </div>

              <Separator />

              {/* Form Elements */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Form Elements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}