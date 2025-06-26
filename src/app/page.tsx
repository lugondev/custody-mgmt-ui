import Link from 'next/link'
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge
} from '@/components/ui'
import { APP_CONFIG } from '@/constants'

/**
 * Home page component - main landing page
 * Provides overview and navigation to key features
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              v{APP_CONFIG.version}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {APP_CONFIG.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/dashboard">
                 <Button size="lg" className="w-full sm:w-auto">
                   Go to Dashboard
                 </Button>
               </Link>
               <Link href="/wallets">
                 <Button variant="outline" size="lg" className="w-full sm:w-auto">
                   Manage Wallets
                 </Button>
               </Link>
               <Link href="/ui-guideline">
                 <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                   View UI Guideline
                 </Button>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital asset custody management with enterprise-grade security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🔐</div>
                <CardTitle>Secure Custody</CardTitle>
                <CardDescription>
                  Multi-signature wallets with hardware security module integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Hardware security modules</li>
                  <li>• Multi-signature protection</li>
                  <li>• Cold storage solutions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Comprehensive dashboard with live transaction tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Live transaction feeds</li>
                  <li>• Portfolio analytics</li>
                  <li>• Risk assessment tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle>Automated Workflows</CardTitle>
                <CardDescription>
                  Streamlined approval processes and automated compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Approval workflows</li>
                  <li>• Compliance automation</li>
                  <li>• Smart notifications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Platform Overview
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">24</div>
                  <p className="text-sm text-muted-foreground">Active Wallets</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">$2.4M</div>
                  <p className="text-sm text-muted-foreground">Assets Under Management</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">99.9%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">8</div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Custody Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}