'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  UserPlus,
  UserMinus,
  Shield,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for team members
const MOCK_TEAM_MEMBERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Operations',
    lastActive: '2023-10-15T14:30:00Z',
    avatar: '/avatars/john-smith.jpg',
    permissions: ['view', 'create', 'approve', 'manage'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Finance',
    lastActive: '2023-10-14T09:45:00Z',
    avatar: '',
    permissions: ['view', 'create', 'approve'],
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Analyst',
    status: 'inactive',
    department: 'Risk',
    lastActive: '2023-09-28T16:20:00Z',
    avatar: '',
    permissions: ['view', 'create'],
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'Auditor',
    status: 'pending',
    department: 'Compliance',
    lastActive: '2023-10-12T11:15:00Z',
    avatar: '',
    permissions: ['view'],
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'Developer',
    status: 'active',
    department: 'Technology',
    lastActive: '2023-10-15T10:30:00Z',
    avatar: '',
    permissions: ['view', 'create'],
  },
]

// Mock data for roles
const MOCK_ROLES = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access and management capabilities',
    memberCount: 2,
    permissions: ['view', 'create', 'approve', 'manage'],
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage team members and approve transactions',
    memberCount: 5,
    permissions: ['view', 'create', 'approve'],
  },
  {
    id: '3',
    name: 'Analyst',
    description: 'Can view and create transactions',
    memberCount: 8,
    permissions: ['view', 'create'],
  },
  {
    id: '4',
    name: 'Auditor',
    description: 'Read-only access for audit purposes',
    memberCount: 3,
    permissions: ['view'],
  },
  {
    id: '5',
    name: 'Developer',
    description: 'Technical access for system development',
    memberCount: 4,
    permissions: ['view', 'create'],
  },
]

/**
 * Team management page component
 * Displays team members, roles, and permissions management
 */
export default function TeamPage() {
  const [teamMembers] = useState(MOCK_TEAM_MEMBERS)
  const [roles] = useState(MOCK_ROLES)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any | null>(null)
  const [selectedRole, setSelectedRole] = useState<any | null>(null)

  // Filter team members based on search and filters
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || member.status === statusFilter
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  }

  // Handle adding a new team member
  const handleAddMember = () => {
    // In a real app, this would make an API call
    setIsAddMemberDialogOpen(false)
  }

  // Handle editing a role
  const handleEditRole = () => {
    // In a real app, this would make an API call
    setIsEditRoleDialogOpen(false)
  }

  return (
    <div className='space-y-6 px-4'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>Team Management</h1>
          <p className='mt-1 text-neutral-600'>
            Manage team members, roles, and permissions
          </p>
        </div>
        <Button onClick={() => setIsAddMemberDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="members">
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their access levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center"
                        >
                          No team members found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                {member.avatar ? (
                                  <AvatarImage src={member.avatar} />
                                ) : null}
                                <AvatarFallback>
                                  {member.name
                                    .split(' ')
                                    .map((n: string) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{member.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {member.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.department}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                member.status === 'active'
                                  ? 'success'
                                  : member.status === 'pending'
                                  ? 'warning'
                                  : 'destructive'
                              }
                            >
                              {member.status.charAt(0).toUpperCase() +
                                member.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(member.lastActive)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedMember(member)
                                    setIsAddMemberDialogOpen(true)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className={
                                    member.status === 'active'
                                      ? 'text-destructive'
                                      : 'text-green-600'
                                  }
                                >
                                  {member.status === 'active' ? (
                                    <>
                                      <UserMinus className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Configure roles and their associated permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          {role.name}
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.memberCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission) => (
                              <Badge
                                key={permission}
                                variant="outline"
                                className="capitalize"
                              >
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRole(role)
                              setIsEditRoleDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Member Dialog */}
      <Dialog
        open={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMember ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
            <DialogDescription>
              {selectedMember
                ? 'Update the team member details below.'
                : 'Fill in the details to add a new team member.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={selectedMember?.name || ''}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={selectedMember?.email || ''}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select defaultValue={selectedMember?.role || 'Analyst'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                defaultValue={selectedMember?.department || ''}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue={selectedMember?.status || 'active'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              {selectedMember ? 'Save Changes' : 'Add Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog
        open={isEditRoleDialogOpen}
        onOpenChange={setIsEditRoleDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role details and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleName" className="text-right">
                Name
              </Label>
              <Input
                id="roleName"
                defaultValue={selectedRole?.name || ''}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleDescription" className="text-right">
                Description
              </Label>
              <Input
                id="roleDescription"
                defaultValue={selectedRole?.description || ''}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Permissions</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="viewPermission"
                    defaultChecked={selectedRole?.permissions.includes('view')}
                  />
                  <Label htmlFor="viewPermission">View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="createPermission"
                    defaultChecked={selectedRole?.permissions.includes('create')}
                  />
                  <Label htmlFor="createPermission">Create</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="approvePermission"
                    defaultChecked={selectedRole?.permissions.includes('approve')}
                  />
                  <Label htmlFor="approvePermission">Approve</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="managePermission"
                    defaultChecked={selectedRole?.permissions.includes('manage')}
                  />
                  <Label htmlFor="managePermission">Manage</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}