'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Fingerprint,

} from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';

/**
 * Login page component
 * Handles user authentication with 2FA support
 */
export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'credentials' | 'twoFactor' | 'success'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState<'app' | 'sms' | 'email'>('app');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Demo credentials
  const demoCredentials = [
    { email: 'admin@custody.com', password: 'admin123', role: 'Admin' },
    { email: 'manager@custody.com', password: 'manager123', role: 'Manager' },
    { email: 'operator@custody.com', password: 'operator123', role: 'Operator' },
    { email: 'auditor@custody.com', password: 'auditor123', role: 'Auditor' },
  ];

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const user = MOCK_USERS.find(u => u.email === email);
    const validCredentials = demoCredentials.find(c => c.email === email && c.password === password);

    if (!validCredentials || !user) {
      setError('Invalid email or password');
      setIsLoading(false);
      return;
    }

    if (user.status !== 'active') {
      setError('Account is not active. Please contact administrator.');
      setIsLoading(false);
      return;
    }

    // Proceed to 2FA if enabled
    setStep('twoFactor');
    setIsLoading(false);
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate 2FA verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, accept any 6-digit code
    if (twoFactorCode.length !== 6 || !/^\d{6}$/.test(twoFactorCode)) {
      setError('Please enter a valid 6-digit code');
      setIsLoading(false);
      return;
    }

    // Success
    setStep('success');
    setIsLoading(false);

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));

    setResetSent(true);
    setIsLoading(false);
  };

  const handleDemoLogin = (credentials: typeof demoCredentials[0]) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  const resendTwoFactorCode = () => {
    // Simulate resending code
    setError('');
    // Show success message or handle resend logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Custody Management
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Secure digital asset custody platform
          </p>
        </div>

        {/* Main Login Card */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {step === 'credentials' && 'Sign In'}
              {step === 'twoFactor' && 'Two-Factor Authentication'}
              {step === 'success' && 'Welcome Back!'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'credentials' && 'Enter your credentials to access your account'}
              {step === 'twoFactor' && `Enter the verification code from your ${twoFactorMethod === 'app' ? 'authenticator app' : twoFactorMethod === 'sms' ? 'SMS' : 'email'}`}
              {step === 'success' && 'Login successful! Redirecting to dashboard...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Credentials Step */}
            {step === 'credentials' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="px-0 text-sm">
                        Forgot password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      {!resetSent ? (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="reset-email">Email Address</Label>
                            <Input
                              id="reset-email"
                              type="email"
                              placeholder="Enter your email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Send Reset Link
                            </Button>
                          </DialogFooter>
                        </form>
                      ) : (
                        <div className="text-center space-y-4">
                          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                          <p className="text-sm text-slate-600">
                            Password reset link has been sent to {resetEmail}
                          </p>
                          <DialogFooter>
                            <Button onClick={() => setShowForgotPassword(false)}>
                              Close
                            </Button>
                          </DialogFooter>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Two-Factor Authentication Step */}
            {step === 'twoFactor' && (
              <div className="space-y-4">
                {/* 2FA Method Selection */}
                <div className="space-y-2">
                  <Label>Verification Method</Label>
                  <Select value={twoFactorMethod} onValueChange={(value: any) => setTwoFactorMethod(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Authenticator App</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>SMS</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="email">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twoFactorCode">Verification Code</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="twoFactorCode"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="pl-10 text-center text-lg tracking-widest"
                        maxLength={6}
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      {twoFactorMethod === 'app' && 'Open your authenticator app and enter the 6-digit code'}
                      {twoFactorMethod === 'sms' && 'Check your phone for the SMS verification code'}
                      {twoFactorMethod === 'email' && 'Check your email for the verification code'}
                    </p>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading || twoFactorCode.length !== 6}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Code
                  </Button>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm"
                      onClick={resendTwoFactorCode}
                    >
                      Didn't receive a code? Resend
                    </Button>
                  </div>
                </form>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setStep('credentials')}
                    className="text-sm"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <p className="text-slate-600 dark:text-slate-300">
                  Authentication successful! You will be redirected shortly.
                </p>
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        {step === 'credentials' && (
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-center">Demo Credentials</CardTitle>
              <CardDescription className="text-center">
                Click on any role to auto-fill credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {demoCredentials.map((cred, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-start space-y-1"
                    onClick={() => handleDemoLogin(cred)}
                  >
                    <span className="font-medium text-sm">{cred.role}</span>
                    <span className="text-xs text-slate-500">{cred.email}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-slate-500 text-center mt-4">
                For demo purposes only. In production, use your actual credentials.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Security Features */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fingerprint className="h-4 w-4" />
              <span>2FA Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Your security is our priority. All data is encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}