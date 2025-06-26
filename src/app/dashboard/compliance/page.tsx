'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'




import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { DataTable } from '@/components/common/DataTable'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import { useToast } from '@/hooks/use-toast'
import {
  Shield,
  FileText,
  AlertTriangle,
  Download,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Globe,
  Scale,
  BookOpen,
  Target,
} from 'lucide-react'

interface ComplianceRule {
  id: string
  name: string
  description: string
  category: 'aml' | 'kyc' | 'reporting' | 'operational' | 'security' | 'regulatory'
  jurisdiction: string
  status: 'active' | 'inactive' | 'pending' | 'under_review'
  severity: 'low' | 'medium' | 'high' | 'critical'
  lastReviewed: string
  nextReview: string
  compliance: number // percentage
  violations: number
  assignedTo: string
  documents: string[]
}

interface ComplianceReport {
  id: string
  title: string
  type: 'sar' | 'ctr' | 'regulatory' | 'internal' | 'audit'
  status: 'draft' | 'pending' | 'submitted' | 'approved' | 'rejected'
  dueDate: string
  submittedDate?: string
  jurisdiction: string
  assignedTo: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  completionRate: number
  description: string
}

interface ComplianceViolation {
  id: string
  ruleId: string
  ruleName: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved' | 'false_positive'
  detectedAt: string
  resolvedAt?: string
  assignedTo: string
  affectedEntities: string[]
  remedialActions: string[]
  cost?: number
}

interface ComplianceMetrics {
  overallCompliance: number
  activeRules: number
  pendingReports: number
  openViolations: number
  criticalViolations: number
  complianceByCategory: Array<{
    category: string
    compliance: number
    rules: number
  }>
  violationTrends: Array<{
    month: string
    violations: number
    resolved: number
  }>
}

/**
 * Compliance management page component
 */
export default function CompliancePage() {
  const { toast } = useToast()
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([])
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([])
  const [complianceViolations, setComplianceViolations] = useState<ComplianceViolation[]>([])
  const [complianceMetrics, setComplianceMetrics] = useState<ComplianceMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateRuleForm, setShowCreateRuleForm] = useState(false)

  useEffect(() => {
    fetchComplianceData()
  }, [])

  const fetchComplianceData = async () => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock compliance rules data
      const mockRules: ComplianceRule[] = [
        {
          id: 'rule-001',
          name: 'Anti-Money Laundering (AML) Monitoring',
          description: 'Continuous monitoring of transactions for suspicious activities and patterns',
          category: 'aml',
          jurisdiction: 'US',
          status: 'active',
          severity: 'critical',
          lastReviewed: '2024-01-15T00:00:00Z',
          nextReview: '2024-04-15T00:00:00Z',
          compliance: 95,
          violations: 2,
          assignedTo: 'Sarah Johnson',
          documents: ['AML Policy v2.1.pdf', 'Transaction Monitoring Procedures.pdf'],
        },
        {
          id: 'rule-002',
          name: 'Know Your Customer (KYC) Verification',
          description: 'Customer identity verification and due diligence procedures',
          category: 'kyc',
          jurisdiction: 'US',
          status: 'active',
          severity: 'high',
          lastReviewed: '2024-01-10T00:00:00Z',
          nextReview: '2024-07-10T00:00:00Z',
          compliance: 88,
          violations: 5,
          assignedTo: 'Mike Chen',
          documents: ['KYC Guidelines.pdf', 'Customer Onboarding Checklist.pdf'],
        },
        {
          id: 'rule-003',
          name: 'Suspicious Activity Reporting (SAR)',
          description: 'Mandatory reporting of suspicious transactions to regulatory authorities',
          category: 'reporting',
          jurisdiction: 'US',
          status: 'active',
          severity: 'critical',
          lastReviewed: '2024-01-20T00:00:00Z',
          nextReview: '2024-02-20T00:00:00Z',
          compliance: 92,
          violations: 1,
          assignedTo: 'Emily Davis',
          documents: ['SAR Filing Procedures.pdf', 'Suspicious Activity Indicators.pdf'],
        },
        {
          id: 'rule-004',
          name: 'Currency Transaction Reporting (CTR)',
          description: 'Reporting of cash transactions exceeding $10,000',
          category: 'reporting',
          jurisdiction: 'US',
          status: 'active',
          severity: 'high',
          lastReviewed: '2024-01-05T00:00:00Z',
          nextReview: '2024-04-05T00:00:00Z',
          compliance: 98,
          violations: 0,
          assignedTo: 'Alex Wilson',
          documents: ['CTR Filing Guidelines.pdf'],
        },
        {
          id: 'rule-005',
          name: 'Data Protection and Privacy (GDPR)',
          description: 'European data protection and privacy compliance requirements',
          category: 'security',
          jurisdiction: 'EU',
          status: 'active',
          severity: 'high',
          lastReviewed: '2024-01-12T00:00:00Z',
          nextReview: '2024-07-12T00:00:00Z',
          compliance: 85,
          violations: 3,
          assignedTo: 'Lisa Brown',
          documents: ['GDPR Compliance Manual.pdf', 'Data Processing Agreements.pdf'],
        },
        {
          id: 'rule-006',
          name: 'Operational Risk Management',
          description: 'Framework for identifying and managing operational risks',
          category: 'operational',
          jurisdiction: 'Global',
          status: 'under_review',
          severity: 'medium',
          lastReviewed: '2023-12-20T00:00:00Z',
          nextReview: '2024-03-20T00:00:00Z',
          compliance: 78,
          violations: 8,
          assignedTo: 'John Smith',
          documents: ['Risk Management Framework.pdf', 'Operational Procedures.pdf'],
        },
      ]
      
      // Mock compliance reports data
      const mockReports: ComplianceReport[] = [
        {
          id: 'report-001',
          title: 'Q1 2024 Suspicious Activity Report',
          type: 'sar',
          status: 'pending',
          dueDate: '2024-02-15T00:00:00Z',
          jurisdiction: 'US',
          assignedTo: 'Emily Davis',
          priority: 'high',
          completionRate: 75,
          description: 'Quarterly compilation of suspicious activity reports for FinCEN submission',
        },
        {
          id: 'report-002',
          title: 'January 2024 Currency Transaction Reports',
          type: 'ctr',
          status: 'submitted',
          dueDate: '2024-02-01T00:00:00Z',
          submittedDate: '2024-01-30T00:00:00Z',
          jurisdiction: 'US',
          assignedTo: 'Alex Wilson',
          priority: 'medium',
          completionRate: 100,
          description: 'Monthly CTR filings for transactions exceeding reporting thresholds',
        },
        {
          id: 'report-003',
          title: 'Annual AML Compliance Assessment',
          type: 'regulatory',
          status: 'draft',
          dueDate: '2024-03-31T00:00:00Z',
          jurisdiction: 'US',
          assignedTo: 'Sarah Johnson',
          priority: 'urgent',
          completionRate: 45,
          description: 'Comprehensive annual assessment of AML program effectiveness',
        },
        {
          id: 'report-004',
          title: 'GDPR Data Processing Impact Assessment',
          type: 'regulatory',
          status: 'approved',
          dueDate: '2024-01-31T00:00:00Z',
          submittedDate: '2024-01-25T00:00:00Z',
          jurisdiction: 'EU',
          assignedTo: 'Lisa Brown',
          priority: 'medium',
          completionRate: 100,
          description: 'Impact assessment for new data processing activities under GDPR',
        },
        {
          id: 'report-005',
          title: 'Internal Audit - Q4 2023',
          type: 'internal',
          status: 'submitted',
          dueDate: '2024-01-15T00:00:00Z',
          submittedDate: '2024-01-12T00:00:00Z',
          jurisdiction: 'Global',
          assignedTo: 'Mike Chen',
          priority: 'low',
          completionRate: 100,
          description: 'Quarterly internal audit of compliance procedures and controls',
        },
      ]
      
      // Mock compliance violations data
      const mockViolations: ComplianceViolation[] = [
        {
          id: 'violation-001',
          ruleId: 'rule-001',
          ruleName: 'Anti-Money Laundering (AML) Monitoring',
          description: 'Transaction monitoring system failed to flag suspicious pattern',
          severity: 'high',
          status: 'investigating',
          detectedAt: '2024-01-18T14:30:00Z',
          assignedTo: 'Sarah Johnson',
          affectedEntities: ['Transaction TX-12345', 'Customer C-67890'],
          remedialActions: [
            'Review transaction monitoring rules',
            'Update suspicious activity indicators',
            'Retrain monitoring staff'
          ],
          cost: 15000,
        },
        {
          id: 'violation-002',
          ruleId: 'rule-002',
          ruleName: 'Know Your Customer (KYC) Verification',
          description: 'Incomplete customer documentation for high-risk client',
          severity: 'medium',
          status: 'resolved',
          detectedAt: '2024-01-15T09:15:00Z',
          resolvedAt: '2024-01-19T16:45:00Z',
          assignedTo: 'Mike Chen',
          affectedEntities: ['Customer C-11223'],
          remedialActions: [
            'Obtained missing documentation',
            'Updated customer risk profile',
            'Enhanced onboarding checklist'
          ],
          cost: 5000,
        },
        {
          id: 'violation-003',
          ruleId: 'rule-005',
          ruleName: 'Data Protection and Privacy (GDPR)',
          description: 'Customer data retention period exceeded without proper justification',
          severity: 'medium',
          status: 'open',
          detectedAt: '2024-01-20T11:00:00Z',
          assignedTo: 'Lisa Brown',
          affectedEntities: ['Customer Database', 'Data Retention Policy'],
          remedialActions: [
            'Review data retention policies',
            'Implement automated data purging',
            'Update privacy notices'
          ],
        },
        {
          id: 'violation-004',
          ruleId: 'rule-003',
          ruleName: 'Suspicious Activity Reporting (SAR)',
          description: 'Late filing of suspicious activity report',
          severity: 'critical',
          status: 'resolved',
          detectedAt: '2024-01-10T08:00:00Z',
          resolvedAt: '2024-01-12T17:30:00Z',
          assignedTo: 'Emily Davis',
          affectedEntities: ['SAR-2024-001'],
          remedialActions: [
            'Filed overdue SAR with explanation',
            'Implemented automated filing reminders',
            'Reviewed SAR procedures'
          ],
          cost: 25000,
        },
      ]
      
      // Mock compliance metrics
      const mockMetrics: ComplianceMetrics = {
        overallCompliance: 89,
        activeRules: 5,
        pendingReports: 2,
        openViolations: 2,
        criticalViolations: 0,
        complianceByCategory: [
          { category: 'AML', compliance: 95, rules: 1 },
          { category: 'KYC', compliance: 88, rules: 1 },
          { category: 'Reporting', compliance: 95, rules: 2 },
          { category: 'Security', compliance: 85, rules: 1 },
          { category: 'Operational', compliance: 78, rules: 1 },
        ],
        violationTrends: [
          { month: 'Oct 2023', violations: 12, resolved: 10 },
          { month: 'Nov 2023', violations: 8, resolved: 9 },
          { month: 'Dec 2023', violations: 6, resolved: 7 },
          { month: 'Jan 2024', violations: 4, resolved: 2 },
        ],
      }
      
      setComplianceRules(mockRules)
      setComplianceReports(mockReports)
      setComplianceViolations(mockViolations)
      setComplianceMetrics(mockMetrics)
    } catch (error) {
      console.error('Failed to fetch compliance data:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load compliance data',
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'resolved':
      case 'submitted': return 'bg-green-100 text-green-800'
      case 'pending':
      case 'investigating':
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
      case 'rejected':
      case 'open': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'false_positive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aml': return <Shield className="h-4 w-4" />
      case 'kyc': return <Users className="h-4 w-4" />
      case 'reporting': return <FileText className="h-4 w-4" />
      case 'operational': return <Building className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      case 'regulatory': return <Scale className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-green-600'
    if (compliance >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading compliance data..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-8 w-8" />
            Compliance Management
          </h1>
          <p className="text-slate-600">Monitor regulatory compliance, manage reports, and track violations</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={fetchComplianceData}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateRuleForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      {complianceMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Overall Compliance</p>
                  <p className={`text-2xl font-bold ${getComplianceColor(complianceMetrics.overallCompliance)}`}>
                    {complianceMetrics.overallCompliance}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Rules</p>
                  <p className="text-2xl font-bold text-slate-900">{complianceMetrics.activeRules}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Reports</p>
                  <p className="text-2xl font-bold text-slate-900">{complianceMetrics.pendingReports}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Open Violations</p>
                  <p className="text-2xl font-bold text-slate-900">{complianceMetrics.openViolations}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Critical Issues</p>
                  <p className="text-2xl font-bold text-slate-900">{complianceMetrics.criticalViolations}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rules">Compliance Rules</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance by Category</CardTitle>
                <CardDescription>Compliance scores across different regulatory areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceMetrics?.complianceByCategory.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category.category.toLowerCase())}
                          <span className="font-medium">{category.category}</span>
                          <Badge variant="outline">{category.rules} rules</Badge>
                        </div>
                        <span className={`font-bold ${getComplianceColor(category.compliance)}`}>
                          {category.compliance}%
                        </span>
                      </div>
                      <Progress value={category.compliance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Violations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Violations</CardTitle>
                <CardDescription>Latest compliance violations and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceViolations.slice(0, 5).map((violation) => (
                    <div key={violation.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getSeverityColor(violation.severity)}>
                            {violation.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(violation.status)}>
                            {violation.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <p className="font-medium text-sm">{violation.description}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {violation.ruleName} • {formatDate(violation.detectedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
              <CardDescription>Compliance rules requiring review in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceRules
                  .filter(rule => new Date(rule.nextReview) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                  .map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(rule.category)}
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-slate-500">{rule.jurisdiction}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatDate(rule.nextReview)}</p>
                        <Badge className={getSeverityColor(rule.severity)}>
                          {rule.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Rules</CardTitle>
              <CardDescription>
                Manage regulatory compliance rules and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={complianceRules}
                columns={[
                  {
                    key: 'name',
                    title: 'Rule',
                    render: (rule) => (
                      <div className="flex items-start gap-3">
                        {getCategoryIcon(rule.category)}
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-slate-500">{rule.description}</div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'category',
                    title: 'Category',
                    render: (rule) => (
                      <Badge variant="outline" className="capitalize">
                        {rule.category}
                      </Badge>
                    ),
                  },
                  {
                    key: 'jurisdiction',
                    title: 'Jurisdiction',
                    render: (rule) => (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-slate-400" />
                        <span>{rule.jurisdiction}</span>
                      </div>
                    ),
                  },
                  {
                    key: 'compliance',
                    title: 'Compliance',
                    render: (rule) => (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${getComplianceColor(rule.compliance)}`}>
                            {rule.compliance}%
                          </span>
                        </div>
                        <Progress value={rule.compliance} className="h-1" />
                      </div>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (rule) => (
                      <Badge className={getStatusColor(rule.status)}>
                        {rule.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'severity',
                    title: 'Severity',
                    render: (rule) => (
                      <Badge className={getSeverityColor(rule.severity)}>
                        {rule.severity.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'violations',
                    title: 'Violations',
                    render: (rule) => (
                      <div className="text-center">
                        <span className={rule.violations > 0 ? 'text-red-600 font-medium' : 'text-slate-600'}>
                          {rule.violations}
                        </span>
                      </div>
                    ),
                  },
                  {
                    key: 'nextReview',
                    title: 'Next Review',
                    render: (rule) => (
                      <div className="text-sm">{formatDate(rule.nextReview)}</div>
                    ),
                  },
                  {
                    key: 'actions',
                    title: 'Actions',
                    render: (_) => (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>
                    Manage regulatory reports and submissions
                  </CardDescription>
                </div>
                <Button onClick={() => {}}>  
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={complianceReports}
                columns={[
                  {
                    key: 'title',
                    title: 'Report',
                    render: (report) => (
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-slate-500">{report.description}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'type',
                    title: 'Type',
                    render: (report) => (
                      <Badge variant="outline" className="uppercase">
                        {report.type}
                      </Badge>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (report) => (
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'priority',
                    title: 'Priority',
                    render: (report) => (
                      <Badge className={getSeverityColor(report.priority)}>
                        {report.priority.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'completion',
                    title: 'Progress',
                    render: (report) => (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{report.completionRate}%</span>
                        </div>
                        <Progress value={report.completionRate} className="h-1" />
                      </div>
                    ),
                  },
                  {
                    key: 'dueDate',
                    title: 'Due Date',
                    render: (report) => (
                      <div className="text-sm">{formatDate(report.dueDate)}</div>
                    ),
                  },
                  {
                    key: 'assignedTo',
                    title: 'Assigned To',
                    render: (report) => (
                      <div className="text-sm">{report.assignedTo}</div>
                    ),
                  },
                  {
                    key: 'actions',
                    title: 'Actions',
                    render: (_) => (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Violations Tab */}
        <TabsContent value="violations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Violations</CardTitle>
              <CardDescription>
                Track and manage compliance violations and remedial actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={complianceViolations}
                columns={[
                  {
                    key: 'description',
                    title: 'Violation',
                    render: (violation) => (
                      <div>
                        <div className="font-medium">{violation.description}</div>
                        <div className="text-sm text-slate-500">{violation.ruleName}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'severity',
                    title: 'Severity',
                    render: (violation) => (
                      <Badge className={getSeverityColor(violation.severity)}>
                        {violation.severity.toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'status',
                    title: 'Status',
                    render: (violation) => (
                      <Badge className={getStatusColor(violation.status)}>
                        {violation.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: 'detectedAt',
                    title: 'Detected',
                    render: (violation) => (
                      <div className="text-sm">{formatDate(violation.detectedAt)}</div>
                    ),
                  },
                  {
                    key: 'assignedTo',
                    title: 'Assigned To',
                    render: (violation) => (
                      <div className="text-sm">{violation.assignedTo}</div>
                    ),
                  },
                  {
                    key: 'cost',
                    title: 'Cost Impact',
                    render: (violation) => (
                      <div className="text-sm">
                        {violation.cost ? `$${violation.cost.toLocaleString()}` : 'N/A'}
                      </div>
                    ),
                  },
                  {
                    key: 'actions',
                    title: 'Actions',
                    render: (_) => (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Violation Trends</CardTitle>
                <CardDescription>Monthly violation and resolution trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceMetrics?.violationTrends.map((trend) => (
                    <div key={trend.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{trend.month}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            <span>{trend.violations} violations</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingDown className="h-4 w-4 text-green-500" />
                            <span>{trend.resolved} resolved</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-red-100 h-2 rounded" style={{ width: `${(trend.violations / 15) * 100}%` }} />
                        <div className="bg-green-100 h-2 rounded" style={{ width: `${(trend.resolved / 15) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score Distribution</CardTitle>
                <CardDescription>Distribution of compliance scores across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {complianceMetrics?.overallCompliance}%
                    </div>
                    <p className="text-sm text-slate-600">Overall Compliance Score</p>
                  </div>
                  
                  <div className="space-y-3">
                    {complianceMetrics?.complianceByCategory.map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${category.compliance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {category.compliance}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Rule Form Dialog */}
      <Dialog open={showCreateRuleForm} onOpenChange={setShowCreateRuleForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Compliance Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" placeholder="Enter rule name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aml">AML</SelectItem>
                    <SelectItem value="kyc">KYC</SelectItem>
                    <SelectItem value="reporting">Reporting</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter rule description" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Input id="jurisdiction" placeholder="e.g., US, EU, UK" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateRuleForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateRuleForm(false)}>
                Create Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}