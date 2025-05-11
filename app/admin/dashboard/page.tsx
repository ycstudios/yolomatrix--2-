"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, BarChart, Bell, Calendar, DollarSign, Download, Home, LayoutDashboard, LogOut, Menu, MoreHorizontal, Plus, Settings, ShieldAlert, ShoppingCart, User, Users, Wallet, FileText, Activity, Lock } from "lucide-react"

// Sample data
const LISTINGS = [
  { id: "P-5678", property: "Beverly Hills Mansion", category: "Real Estate", owner: "Luxury Homes LLC", date: "Jan 15, 2025", status: "Active" },
  { id: "P-5679", property: "Lamborghini Aventador", category: "Vehicle", owner: "Exotic Cars Inc", date: "Feb 03, 2025", status: "Active" },
  { id: "P-5680", property: "Private Jet - G650", category: "Aircraft", owner: "Sky Charters", date: "Mar 12, 2025", status: "Pending Approval" },
  { id: "P-5681", property: "Miami Beach Yacht", category: "Watercraft", owner: "Ocean Luxury", date: "Mar 28, 2025", status: "Active" },
  { id: "P-5682", property: "Manhattan Penthouse", category: "Real Estate", owner: "NYC Properties", date: "Apr 05, 2025", status: "Under Review" }
]

const USERS = [
  { id: "U-8765", name: "John Smith", email: "john.smith@example.com", joined: "Dec 12, 2024", bookings: "8", status: "Active" },
  { id: "U-8766", name: "Emma Johnson", email: "emma.j@example.com", joined: "Jan 24, 2025", bookings: "3", status: "Active" },
  { id: "U-8767", name: "Michael Chen", email: "m.chen@example.com", joined: "Feb 15, 2025", bookings: "12", status: "Active" },
  { id: "U-8768", name: "Sophia Williams", email: "s.williams@example.com", joined: "Mar 05, 2025", bookings: "1", status: "Pending Verification" },
  { id: "U-8769", name: "Robert Davis", email: "r.davis@example.com", joined: "Mar 28, 2025", bookings: "0", status: "Suspended" }
]

const ADMINS = [
  { id: "SA-231", name: "Alex Morgan", email: "a.morgan@yolomatrix.com", role: "Property Manager", area: "Real Estate", lastLogin: "Today, 09:24 AM" },
  { id: "SA-232", name: "Sarah Johnson", email: "s.johnson@yolomatrix.com", role: "User Relations", area: "Customer Support", lastLogin: "Today, 10:15 AM" },
  { id: "SA-233", name: "David Lee", email: "d.lee@yolomatrix.com", role: "Fleet Manager", area: "Vehicles & Aircraft", lastLogin: "Yesterday, 04:38 PM" },
  { id: "SA-234", name: "Jennifer Lopez", email: "j.lopez@yolomatrix.com", role: "Content Manager", area: "Marketing", lastLogin: "May 10, 2025, 11:52 AM" },
  { id: "SA-235", name: "James Wilson", email: "j.wilson@yolomatrix.com", role: "Finance Admin", area: "Payments & Reports", lastLogin: "May 09, 2025, 03:21 PM" }
]

const REPORTS = [
  { id: "R-4231", type: "Listing", item: "Manhattan Penthouse", reporter: "Emma Johnson", date: "May 10, 2025", severity: "Medium", status: "Pending" },
  { id: "R-4232", type: "User", item: "Robert Davis", reporter: "Sarah Williams", date: "May 09, 2025", severity: "High", status: "Under Review" },
  { id: "R-4233", type: "Transaction", item: "Booking #B-1238", reporter: "Michael Chen", date: "May 08, 2025", severity: "Low", status: "Resolved" },
  { id: "R-4234", type: "Listing", item: "Miami Beach Yacht", reporter: "System Flag", date: "May 07, 2025", severity: "Critical", status: "Pending" },
  { id: "R-4235", type: "Sub-Admin", item: "Content Actions", reporter: "David Lee", date: "May 06, 2025", severity: "Medium", status: "Resolved" }
]

const ACTIVITIES = [
  { action: "New Listing Added", description: "Luxury Ski Chalet in Aspen was added", time: "10 minutes ago", icon: <Home className="h-4 w-4" /> },
  { action: "User Verified", description: "Sophia Williams completed verification", time: "1 hour ago", icon: <User className="h-4 w-4" /> },
  { action: "Payment Processed", description: "Booking #B-1245 payment of $15,280", time: "3 hours ago", icon: <DollarSign className="h-4 w-4" /> },
  { action: "Sub-Admin Login", description: "David Lee logged into the system", time: "Yesterday at 4:38 PM", icon: <LogOut className="h-4 w-4" /> },
  { action: "System Update", description: "Platform maintenance completed", time: "2 days ago", icon: <Settings className="h-4 w-4" /> }
]

const TASKS = [
  { task: "Review Luxury Ski Chalet", due: "Today, 5:00 PM", priority: "High", icon: <FileText className="h-4 w-4" /> },
  { task: "Monthly Financial Report", due: "Tomorrow, 12:00 PM", priority: "Medium", icon: <BarChart className="h-4 w-4" /> },
  { task: "Onboard New Sub-Admin", due: "May 12, 2025", priority: "Medium", icon: <Users className="h-4 w-4" /> },
  { task: "Platform Security Audit", due: "May 15, 2025", priority: "Critical", icon: <ShieldAlert className="h-4 w-4" /> },
  { task: "Marketing Campaign Review", due: "May 18, 2025", priority: "Low", icon: <BarChart className="h-4 w-4" /> }
]

// Reusable components
const StatusBadge = ({ status, type = "default" }) => {
  const styles = {
    default: {
      Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Pending Approval": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Under Review": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Pending Verification": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    },
    priority: {
      Low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    },
    severity: {
      Low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
  }
  
  const styleClass = type === "priority" ? styles.priority[status] : 
                    type === "severity" ? styles.severity[status] : 
                    styles.default[status]
  
  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full ${styleClass}`}>
      {status}
    </span>
  )
}

const DataTable = ({ data, columns, actions }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b">
          {columns.map((col, i) => (
            <th key={i} className="text-left py-3 px-2">{col.header}</th>
          ))}
          {actions && <th className="text-left py-3 px-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="py-3 px-2">
                {col.render ? col.render(row) : row[col.accessor]}
              </td>
            ))}
            {actions && (
              <td className="py-3 px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {actions.map((action, i) => (
                      action.separator ? 
                        <DropdownMenuSeparator key={i} /> : 
                        <DropdownMenuItem key={i} className={action.className}>{action.label}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function SuperAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Column definitions for tables
  const listingColumns = [
    { header: "ID", accessor: "id" },
    { header: "Property", accessor: "property" },
    { header: "Category", accessor: "category" },
    { header: "Owner", accessor: "owner" },
    { header: "Listed Date", accessor: "date" },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> }
  ]
  
  const userColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Joined", accessor: "joined" },
    { header: "Bookings", accessor: "bookings" },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> }
  ]
  
  const adminColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Assigned Area", accessor: "area" },
    { header: "Last Login", accessor: "lastLogin" }
  ]
  
  const reportColumns = [
    { header: "ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    { header: "Reported Item", accessor: "item" },
    { header: "Reported By", accessor: "reporter" },
    { header: "Date", accessor: "date" },
    { header: "Severity", accessor: "severity", render: (row) => <StatusBadge status={row.severity} type="severity" /> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> }
  ]

  // Action definitions for dropdown menus
  const listingActions = [
    { label: "View Details" },
    { label: "Edit Listing" },
    { label: "Contact Owner" },
    { separator: true },
    { label: "Approve Listing" },
    { label: "Remove Listing", className: "text-red-600 dark:text-red-400" }
  ]
  
  const userActions = [
    { label: "View Profile" },
    { label: "View Bookings" },
    { label: "View Activity" },
    { separator: true },
    { label: "Verify Account" },
    { label: "Ban User", className: "text-red-600 dark:text-red-400" }
  ]
  
  const adminActions = [
    { label: "View Profile" },
    { label: "Edit Permissions" },
    { label: "View Activity Log" },
    { separator: true },
    { label: "Reset Password" },
    { label: "Revoke Access", className: "text-red-600 dark:text-red-400" }
  ]
  
  const reportActions = [
    { label: "View Details" },
    { label: "Assign to Sub-Admin" },
    { separator: true },
    { label: "Mark as Resolved" },
    { label: "Flag as Priority" },
    { label: "Dismiss Report", className: "text-red-600 dark:text-red-400" }
  ]

  const statCards = [
    { title: "Total Revenue", value: "$5,248,560", change: "+18.3% from last month", icon: <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" /> },
    { title: "Total Bookings", value: "2,845", change: "+12.4% from last month", icon: <ShoppingCart className="h-4 w-4 text-gray-500 dark:text-gray-400" /> },
    { title: "Active Users", value: "18,423", change: "+7.9% from last month", icon: <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" /> },
    { title: "Active Properties", value: "1,356", change: "+24 new this week", icon: <Home className="h-4 w-4 text-gray-500 dark:text-gray-400" /> }
  ]

  // Sidebar menu items definition
  const sidebarMainMenu = [
    { icon: <LayoutDashboard className="mr-2 h-5 w-5" />, label: "Dashboard", active: true },
    { icon: <Home className="mr-2 h-5 w-5" />, label: "Manage Listings" },
    { icon: <Users className="mr-2 h-5 w-5" />, label: "Manage Users" },
    { icon: <ShieldAlert className="mr-2 h-5 w-5" />, label: "Manage Sub-Admins" },
    { icon: <Wallet className="mr-2 h-5 w-5" />, label: "Payments & Payouts" },
    { icon: <AlertCircle className="mr-2 h-5 w-5" />, label: "Reports & Complaints" },
    { icon: <Settings className="mr-2 h-5 w-5" />, label: "System Settings" },
    { icon: <Activity className="mr-2 h-5 w-5" />, label: "Activity Logs" }
  ]
  
  const sidebarAccountMenu = [
    { icon: <User className="mr-2 h-5 w-5" />, label: "Profile" },
    { icon: <Lock className="mr-2 h-5 w-5" />, label: "Security" },
    { icon: <LogOut className="mr-2 h-5 w-5" />, label: "Logout" }
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar - Mobile overlay when open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            YoloMatrix
          </span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="py-4">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Main</p>
          </div>
          <div className="space-y-1">
            {sidebarMainMenu.map((item, i) => (
              <Button
                key={i}
                variant="ghost"
                className={`w-full justify-start pl-4 font-normal ${item.active ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : ""}`}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
          
          <div className="px-4 py-2 mt-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Account</p>
          </div>
          <div className="space-y-1">
            {sidebarAccountMenu.map((item, i) => (
              <Button key={i} variant="ghost" className="w-full justify-start pl-4 font-normal">
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
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
        <main className="p-4 md:p-6 flex-1">
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
            {statCards.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500 dark:text-green-400">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="overflow-x-auto whitespace-nowrap">
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
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Property Listings</CardTitle>
                      <CardDescription>Manage all property listings across categories</CardDescription>
                    </div>
                    <Button size="sm" className="self-start sm:self-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Listing
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    data={LISTINGS} 
                    columns={listingColumns} 
                    actions={listingActions} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage all platform users</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="self-start sm:self-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Export Users
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    data={USERS} 
                    columns={userColumns} 
                    actions={userActions} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subadmins" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Sub-Admin Management</CardTitle>
                      <CardDescription>Manage delegation and permissions</CardDescription>
                    </div>
                    <Button size="sm" className="self-start sm:self-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Sub-Admin
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    data={ADMINS} 
                    columns={adminColumns} 
                    actions={adminActions} 
                  />
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
                  <DataTable 
                    data={REPORTS} 
                    columns={reportColumns} 
                    actions={reportActions} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Activity and Upcoming Tasks */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>System events and admin actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ACTIVITIES.map((activity, index) => (
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
            
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Scheduled actions requiring attention</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="self-start sm:self-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {TASKS.map((task, index) => (
  <div key={index} className="flex items-center justify-between flex-wrap gap-2">
    <div className="flex items-center">
      <div className={`mr-2 rounded-full p-2 ${
        task.priority === "Low" ? "bg-blue-50 dark:bg-blue-900/20" :
        task.priority === "Medium" ? "bg-yellow-50 dark:bg-yellow-900/20" :
        task.priority === "High" ? "bg-orange-50 dark:bg-orange-900/20" : 
        "bg-red-50 dark:bg-red-900/20"
      }`}>
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
    <div>
      <StatusBadge status={task.priority} type="priority" />
    </div>
  </div>
))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 YoloMatrix. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}