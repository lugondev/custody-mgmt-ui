'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Shield, Activity, AlertTriangle } from 'lucide-react';
import { NETWORK_TYPES, CURRENCY_TYPES } from '@/constants';

interface CreateWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Dialog component for creating new wallets
 * Supports both hot and cold wallet creation with proper validation
 */
export function CreateWalletDialog({ open, onOpenChange }: CreateWalletDialogProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'hot' as 'hot' | 'cold',
    network: '',
    currency: '',
    description: '',
    // For import existing wallet
    importMethod: 'generate' as 'generate' | 'import',
    privateKey: '',
    mnemonic: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close dialog
      setFormData({
        name: '',
        type: 'hot',
        network: '',
        currency: '',
        description: '',
        importMethod: 'generate',
        privateKey: '',
        mnemonic: '',
        address: ''
      });
      setStep(1);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.type;
      case 2:
        return formData.network && formData.currency;
      case 3:
        if (formData.importMethod === 'generate') return true;
        return formData.importMethod === 'import' && 
               (formData.privateKey || formData.mnemonic || formData.address);
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="wallet-name">Wallet Name</Label>
        <Input
          id="wallet-name"
          placeholder="Enter wallet name"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Label>Wallet Type</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) => updateFormData('type', value)}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hot" id="hot" />
            <Label htmlFor="hot" className="flex-1">
              <Card className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-sm">
                    <Activity className="w-4 h-4 mr-2 text-orange-600" />
                    Hot Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs">
                    Connected to the internet. Best for frequent transactions and trading.
                  </CardDescription>
                </CardContent>
              </Card>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cold" id="cold" />
            <Label htmlFor="cold" className="flex-1">
              <Card className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-sm">
                    <Shield className="w-4 h-4 mr-2 text-blue-600" />
                    Cold Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs">
                    Offline storage. Maximum security for long-term holdings.
                  </CardDescription>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Enter wallet description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="network">Network</Label>
        <Select value={formData.network} onValueChange={(value) => updateFormData('network', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            {NETWORK_TYPES.map((network) => (
              <SelectItem key={network} value={network}>
                {network}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select value={formData.currency} onValueChange={(value) => updateFormData('currency', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCY_TYPES.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.type === 'hot' && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Hot wallets are connected to the internet and are more convenient for frequent transactions 
            but less secure than cold wallets.
          </AlertDescription>
        </Alert>
      )}

      {formData.type === 'cold' && (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Cold wallets provide maximum security by keeping your private keys offline. 
            Perfect for long-term storage of large amounts.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Import Method</Label>
        <RadioGroup
          value={formData.importMethod}
          onValueChange={(value) => updateFormData('importMethod', value as 'generate' | 'import')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="generate" id="generate" />
            <Label htmlFor="generate">Generate new wallet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="import" id="import" />
            <Label htmlFor="import">Import existing wallet</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.importMethod === 'import' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="private-key">Private Key (Optional)</Label>
            <Input
              id="private-key"
              type="password"
              placeholder="Enter private key"
              value={formData.privateKey}
              onChange={(e) => updateFormData('privateKey', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mnemonic">Mnemonic Phrase (Optional)</Label>
            <Textarea
              id="mnemonic"
              placeholder="Enter 12 or 24 word mnemonic phrase"
              value={formData.mnemonic}
              onChange={(e) => updateFormData('mnemonic', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address (Optional)</Label>
            <Input
              id="address"
              placeholder="Enter wallet address"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
            />
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Only provide one of the above options. Your private information is encrypted and stored securely.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {formData.importMethod === 'generate' && (
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertDescription>
            A new wallet will be generated with a secure private key and mnemonic phrase. 
            Make sure to backup your recovery phrase safely.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Create New Wallet
          </DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Network & Currency' : 'Import Method'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} disabled={!isStepValid()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isStepValid() || isLoading}>
                {isLoading ? 'Creating...' : 'Create Wallet'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}