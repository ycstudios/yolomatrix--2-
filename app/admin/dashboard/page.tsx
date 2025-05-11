"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  BarChart,
  Bell,
  Calendar,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldAlert,
  ShoppingCart,
  User,
  Users,
  Wallet,
  FileText,
  Activity,
  Lock,
} from "lucide-react"

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              YoloMatrix
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="py-4">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Main</p>
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start pl-4 font-normal text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Home className="mr-2 h-5 w-5" />
              Manage Listings
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Users className="mr-2 h-5 w-5" />
              Manage Users
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Manage Sub-Admins
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Wallet className="mr-2 h-5 w-5" />
              Payments & Payouts
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <AlertCircle className="mr-2 h-5 w-5" />
              Reports & Complaints
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Settings className="mr-2 h-5 w-5" />
              System Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Activity className="mr-2 h-5 w-5" />
              Activity Logs
            </Button>
          </div>
          <div className="px-4 py-2 mt-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Account</p>
          </div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Lock className="mr-2 h-5 w-5" />
              Security
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 border-b bg-white dark:bg-gray-900 flex items-center px-4 shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xs font-medium">SA</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Super Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Security</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Welcome back! Complete system overview and control panel.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
              <Button size="sm">
                <ShieldAlert className="mr-2 h-4 w-4" />
                System Status
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,248,560</div>
                <p className="text-xs text-green-500 dark:text-green-400">+18.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <ShoppingCart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-green-500 dark:text-green-400">+12.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,423</div>
                <p className="text-xs text-green-500 dark:text-green-400">+7.9% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
                <Home className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,356</div>
                <p className="text-xs text-blue-500 dark:text-blue-400">+24 new this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="subadmins">Sub-Admins</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown across all property types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <BarChart className="h-10 w-10 text-gray-400" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400">Revenue Analytics Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="listings" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Property Listings</CardTitle>
                      <CardDescription>Manage all property listings across categories</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Listing
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Property</th>
                          <th className="text-left py-3 px-2">Category</th>
                          <th className="text-left py-3 px-2">Owner</th>
                          <th className="text-left py-3 px-2">Listed Date</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "P-5678",
                            property: "Beverly Hills Mansion",
                            category: "Real Estate",
                            owner: "Luxury Homes LLC",
                            date: "Jan 15, 2025",
                            status: "Active",
                          },
                          {
                            id: "P-5679",
                            property: "Lamborghini Aventador",
                            category: "Vehicle",
                            owner: "Exotic Cars Inc",
                            date: "Feb 03, 2025",
                            status: "Active",
                          },
                          {
                            id: "P-5680",
                            property: "Private Jet - G650",
                            category: "Aircraft",
                            owner: "Sky Charters",
                            date: "Mar 12, 2025",
                            status: "Pending Approval",
                          },
                          {
                            id: "P-5681",
                            property: "Miami Beach Yacht",
                            category: "Watercraft",
                            owner: "Ocean Luxury",
                            date: "Mar 28, 2025",
                            status: "Active",
                          },
                          {
                            id: "P-5682",
                            property: "Manhattan Penthouse",
                            category: "Real Estate",
                            owner: "NYC Properties",
                            date: "Apr 05, 2025",
                            status: "Under Review",
                          },
                        ].map((listing, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{listing.id}</td>
                            <td className="py-3 px-2">{listing.property}</td>
                            <td className="py-3 px-2">{listing.category}</td>
                            <td className="py-3 px-2">{listing.owner}</td>
                            <td className="py-3 px-2">{listing.date}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  listing.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : listing.status === "Pending Approval"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {listing.status}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Listing</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Owner</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Approve Listing</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    Remove Listing
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage all platform users</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Users
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Name</th>
                          <th className="text-left py-3 px-2">Email</th>
                          <th className="text-left py-3 px-2">Joined</th>
                          <th className="text-left py-3 px-2">Bookings</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "U-8765",
                            name: "John Smith",
                            email: "john.smith@example.com",
                            joined: "Dec 12, 2024",
                            bookings: "8",
                            status: "Active",
                          },
                          {
                            id: "U-8766",
                            name: "Emma Johnson",
                            email: "emma.j@example.com",
                            joined: "Jan 24, 2025",
                            bookings: "3",
                            status: "Active",
                          },
                          {
                            id: "U-8767",
                            name: "Michael Chen",
                            email: "m.chen@example.com",
                            joined: "Feb 15, 2025",
                            bookings: "12",
                            status: "Active",
                          },
                          {
                            id: "U-8768",
                            name: "Sophia Williams",
                            email: "s.williams@example.com",
                            joined: "Mar 05, 2025",
                            bookings: "1",
                            status: "Pending Verification",
                          },
                          {
                            id: "U-8769",
                            name: "Robert Davis",
                            email: "r.davis@example.com",
                            joined: "Mar 28, 2025",
                            bookings: "0",
                            status: "Suspended",
                          },
                        ].map((user, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{user.id}</td>
                            <td className="py-3 px-2">{user.name}</td>
                            <td className="py-3 px-2">{user.email}</td>
                            <td className="py-3 px-2">{user.joined}</td>
                            <td className="py-3 px-2">{user.bookings}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : user.status === "Pending Verification"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                  <DropdownMenuItem>View Activity</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Verify Account</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    Ban User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="subadmins" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Sub-Admin Management</CardTitle>
                      <CardDescription>Manage delegation and permissions</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Sub-Admin
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Name</th>
                          <th className="text-left py-3 px-2">Email</th>
                          <th className="text-left py-3 px-2">Role</th>
                          <th className="text-left py-3 px-2">Assigned Area</th>
                          <th className="text-left py-3 px-2">Last Login</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "SA-231",
                            name: "Alex Morgan",
                            email: "a.morgan@yolomatrix.com",
                            role: "Property Manager",
                            area: "Real Estate",
                            lastLogin: "Today, 09:24 AM",
                          },
                          {
                            id: "SA-232",
                            name: "Sarah Johnson",
                            email: "s.johnson@yolomatrix.com",
                            role: "User Relations",
                            area: "Customer Support",
                            lastLogin: "Today, 10:15 AM",
                          },
                          {
                            id: "SA-233",
                            name: "David Lee",
                            email: "d.lee@yolomatrix.com",
                            role: "Fleet Manager",
                            area: "Vehicles & Aircraft",
                            lastLogin: "Yesterday, 04:38 PM",
                          },
                          {
                            id: "SA-234",
                            name: "Jennifer Lopez",
                            email: "j.lopez@yolomatrix.com",
                            role: "Content Manager",
                            area: "Marketing",
                            lastLogin: "May 10, 2025, 11:52 AM",
                          },
                          {
                            id: "SA-235",
                            name: "James Wilson",
                            email: "j.wilson@yolomatrix.com",
                            role: "Finance Admin",
                            area: "Payments & Reports",
                            lastLogin: "May 09, 2025, 03:21 PM",
                          },
                        ].map((admin, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{admin.id}</td>
                            <td className="py-3 px-2">{admin.name}</td>
                            <td className="py-3 px-2">{admin.email}</td>
                            <td className="py-3 px-2">{admin.role}</td>
                            <td className="py-3 px-2">{admin.area}</td>
                            <td className="py-3 px-2">{admin.lastLogin}</td>
                            <td className="py-3 px-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                  <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    Revoke Access
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Complaints</CardTitle>
                  <CardDescription>Reported issues requiring administrator attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">ID</th>
                          <th className="text-left py-3 px-2">Type</th>
                          <th className="text-left py-3 px-2">Reported Item</th>
                          <th className="text-left py-3 px-2">Reported By</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Severity</th>
                          <th className="text-left py-3 px-2">Status</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "R-4231",
                            type: "Listing",
                            item: "Manhattan Penthouse",
                            reporter: "Emma Johnson",
                            date: "May 10, 2025",
                            severity: "Medium",
                            status: "Pending",
                          },
                          {
                            id: "R-4232",
                            type: "User",
                            item: "Robert Davis",
                            reporter: "Sarah Williams",
                            date: "May 09, 2025",
                            severity: "High",
                            status: "Under Review",
                          },
                          {
                            id: "R-4233",
                            type: "Transaction",
                            item: "Booking #B-1238",
                            reporter: "Michael Chen",
                            date: "May 08, 2025",
                            severity: "Low",
                            status: "Resolved",
                          },
                          {
                            id: "R-4234",
                            type: "Listing",
                            item: "Miami Beach Yacht",
                            reporter: "System Flag",
                            date: "May 07, 2025",
                            severity: "Critical",
                            status: "Pending",
                          },
                          {
                            id: "R-4235",
                            type: "Sub-Admin",
                            item: "Content Actions",
                            reporter: "David Lee",
                            date: "May 06, 2025",
                            severity: "Medium",
                            status: "Resolved",
                          },
                        ].map((report, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{report.id}</td>
                            <td className="py-3 px-2">{report.type}</td>
                            <td className="py-3 px-2">{report.item}</td>
                            <td className="py-3 px-2">{report.reporter}</td>
                            <td className="py-3 px-2">{report.date}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  report.severity === "Low"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : report.severity === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : report.severity === "High"
                                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {report.severity}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  report.status === "Resolved"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : report.status === "Under Review"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                }`}
                              >
                                {report.status}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Assign to Sub-Admin</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                                  <DropdownMenuItem>Flag as Priority</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    Dismiss Report
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Activity and Upcoming Tasks */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>System events and admin actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "New Listing Added",
                      description: "Luxury Ski Chalet in Aspen was added to the platform",
                      time: "10 minutes ago",
                      icon: <Home className="h-4 w-4" />,
                    },
                    {
                      action: "User Verified",
                      description: "Sophia Williams completed identity verification",
                      time: "1 hour ago",
                      icon: <User className="h-4 w-4" />,
                    },
                    {
                      action: "Payment Processed",
                      description: "Booking #B-1245 payment of $15,280 was successful",
                      time: "3 hours ago",
                      icon: <DollarSign className="h-4 w-4" />,
                    },
                    {
                      action: "Sub-Admin Login",
                      description: "David Lee logged into the system",
                      time: "Yesterday at 4:38 PM",
                      icon: <LogOut className="h-4 w-4" />,
                    },
                    {
                      action: "System Update",
                      description: "Platform maintenance completed successfully",
                      time: "2 days ago",
                      icon: <Settings className="h-4 w-4" />,
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-2 rounded-full bg-blue-50 dark:bg-blue-900/20 p-2">
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{activity.action}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Scheduled actions requiring attention</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      task: "Review Luxury Ski Chalet",
                      due: "Today, 5:00 PM",
                      priority: "High",
                      icon: <FileText className="h-4 w-4" />,
                    },
                    {
                      task: "Monthly Financial Report",
                      due: "Tomorrow, 12:00 PM",
                      priority: "Medium",
                      icon: <BarChart className="h-4 w-4" />,
                    },
                    {
                      task: "Onboard New Sub-Admin",
                      due: "May 12, 2025",
                      priority: "Medium",
                      icon: <Users className="h-4 w-4" />,
                    },
                    {
                      task: "Platform Security Audit",
                      due: "May 15, 2025",
                      priority: "Critical",
                      icon: <ShieldAlert className="h-4 w-4" />,
                    },
                    {
                      task: "Marketing Campaign Review",
                      due: "May 18, 2025",
                      priority: "Low",
                      icon: <BarChart className="h-4 w-4" />,
                    },
                  ].map((task, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`mr-2 rounded-full p-2 ${
                            task.priority === "Low"
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : task.priority === "Medium"
                                ? "bg-yellow-50 dark:bg-yellow-900/20"
                                : task.priority === "High"
                                  ? "bg-orange-50 dark:bg-orange-900/20"
                                  : "bg-red-50 dark:bg-red-900/20"
                          }`}
                        >
                          {task.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{task.task}</h3>
                          <div className="flex items-center text-xs">
                            <Calendar className="mr-1 h-3 w-3 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400">{task.due}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          task.priority === "Low"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : task.priority === "High"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 YoloMatrix. All rights reserved. Super Admin Dashboard v1.2.0</p>
        </footer>
      </div>
    </div>
  )
}