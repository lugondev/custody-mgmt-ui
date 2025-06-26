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

/**
 * UI Guideline component showcasing the design system
 * Demonstrates various UI components and their usage
 */
export default function UIGuideline() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Design System Guideline
              </h1>
              <p className="text-muted-foreground mt-1">
                UI Components and Design Tokens Reference
              </p>
            </div>
            <Badge variant="secondary">v1.0.0</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle>Design System Overview</CardTitle>
              <CardDescription>
                A comprehensive collection of reusable UI components for the Custody Management System.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Design System</p>
                  <p className="text-xs text-muted-foreground">Component Library</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Components
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
                  Design Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 mr-1">3</Badge>
                  color palettes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Usage Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mr-1">+5.2%</Badge>
                  adoption rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Component Categories</CardTitle>
              <CardDescription>
                Browse components by category and usage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">🎨</div>
                  <span>Colors & Tokens</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">🔘</div>
                  <span>Buttons</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">📝</div>
                  <span>Forms</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <div className="text-lg">📊</div>
                  <span>Data Display</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Design System Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Component Showcase</CardTitle>
              <CardDescription>
                Live demonstration of UI components and design tokens.
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
                  <Button disabled>Disabled</Button>
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