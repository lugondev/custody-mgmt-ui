'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  UserPlus,
  Shield,
  Search,

  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,


  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  MOCK_USERS,
  MOCK_TEAM_MEMBERS,
} from '@/lib/mock-data';
import { User, UserRole } from '@/types';

/**
 * Users management page component
 * Displays user list, roles, permissions, and user management functions
 */
export default function UsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [teamMembers] = useState(MOCK_TEAM_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    department: '',
    permissions: [] as string[]
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'manager':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'operator':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'viewer':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleCreateUser = () => {
    const user: User = {
      id: `user-${Date.now()}`,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role as UserRole,
      department: newUser.department,
      status: 'active', // Use valid status
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      permissions: newUser.permissions,
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: true,
          sms: false,
        }
      }
    };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'viewer', department: '', permissions: [] });
    setIsCreateUserOpen(false);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getPermissionsByRole = (role: string) => {
    switch (role) {
      case 'admin':
        return ['read', 'write', 'delete', 'approve', 'manage_users', 'system_config'];
      case 'manager':
        return ['read', 'write', 'approve', 'manage_team'];
      case 'operator':
        return ['read', 'write', 'create_transactions'];
      case 'viewer':
        return ['read'];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6 px-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className='text-2xl font-bold text-neutral-900'>User Management</h1>
          <p className='mt-1 text-neutral-600'>
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="w-3 h-3 mr-1" />
            {users.length} Total Users
          </Badge>
          <Button onClick={() => setIsCreateUserOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Active Users
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {activeUsers}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              Currently online and active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
              Inactive Users
            </CardTitle>
            <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {inactiveUsers}
            </div>
            <p className="text-xs text-red-600 dark:text-red-400">
              Disabled or suspended
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              Pending Users
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
              {suspendedUsers}
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              Awaiting activation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Administrators
            </CardTitle>
            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {adminUsers}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              System administrators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="team">Team Structure</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Filter Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Search by name, email, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <Label htmlFor="role-filter">Role</Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Users ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{user.department}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          <div>
                            <p className="text-sm">
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(user.lastLogin).toLocaleTimeString()}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(user.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                              {user.status === 'active' ? (
                                <>
                                  <Lock className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Unlock className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['admin', 'manager', 'operator', 'viewer'].map((role) => {
              const permissions = getPermissionsByRole(role);
              const userCount = users.filter(u => u.role === role).length;
              
              return (
                <Card key={role} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center capitalize">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        {role}
                      </CardTitle>
                      <Badge variant="outline">
                        {userCount} users
                      </Badge>
                    </div>
                    <CardDescription>
                      {role === 'admin' && 'Full system access and user management'}
                      {role === 'manager' && 'Team management and transaction approval'}
                      {role === 'operator' && 'Transaction creation and basic operations'}
                      {role === 'viewer' && 'Read-only access to system data'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Permissions:</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs capitalize">
                              {permission.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Team Structure Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Team Structure
              </CardTitle>
              <CardDescription>
                Organizational structure and team hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {member.role} • {member.department}
                        </p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      <div className="flex items-center space-x-1 mt-2">
                        {member.permissions.slice(0, 3).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {member.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.permissions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Add New User
            </DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Enter department"
                />
              </div>
            </div>
            <div>
              <Label>Permissions Preview</Label>
              <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  {getPermissionsByRole(newUser.role).map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs capitalize">
                        {permission.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={!newUser.name || !newUser.email}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                User Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getRoleColor(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <p className="text-sm font-medium">{selectedUser.department}</p>
                </div>
                <div>
                  <Label>User ID</Label>
                  <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-1 rounded">
                    {selectedUser.id}
                  </p>
                </div>
                <div>
                  <Label>Last Login</Label>
                  <p className="text-sm">
                    {selectedUser.lastLogin 
                      ? new Date(selectedUser.lastLogin).toLocaleString()
                      : 'Never'
                    }
                  </p>
                </div>
                <div>
                  <Label>Created</Label>
                  <p className="text-sm">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {selectedUser.permissions.map((permission: string) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs capitalize">
                        {permission.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}