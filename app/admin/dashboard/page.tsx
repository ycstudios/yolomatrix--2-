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
  ShoppingCart,
  User,
  Users,
} from "lucide-react"

export default function AdminDashboard() {
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
              <ShoppingCart className="mr-2 h-5 w-5" />
              Bookings
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Home className="mr-2 h-5 w-5" />
              Properties
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Users className="mr-2 h-5 w-5" />
              Customers
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Calendar className="mr-2 h-5 w-5" />
              Calendar
            </Button>
          </div>
          <div className="px-4 py-2 mt-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Settings</p>
          </div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-4 font-normal">
              <Settings className="mr-2 h-5 w-5" />
              Settings
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
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin! Here's what's happening today.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Property
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
                <div className="text-2xl font-bold">$1,248,560</div>
                <p className="text-xs text-green-500 dark:text-green-400">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
                <ShoppingCart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-green-500 dark:text-green-400">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,423</div>
                <p className="text-xs text-green-500 dark:text-green-400">+5.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
                <Home className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-blue-500 dark:text-blue-400">+2 new this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <BarChart className="h-10 w-10 text-gray-400" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400">Chart Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Detailed analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Analytics Content</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generated reports and exports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Reports Content</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">Notifications Content</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Bookings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking transactions across all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">ID</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Property</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "B-1234",
                        customer: "John Smith",
                        property: "Beverly Hills Mansion",
                        date: "Apr 05, 2025",
                        amount: "$45,000",
                        status: "Confirmed",
                      },
                      {
                        id: "B-1235",
                        customer: "Emma Johnson",
                        property: "Miami Beach Yacht",
                        date: "Apr 04, 2025",
                        amount: "$28,500",
                        status: "Pending",
                      },
                      {
                        id: "B-1236",
                        customer: "Michael Chen",
                        property: "Private Jet - LA to NYC",
                        date: "Apr 03, 2025",
                        amount: "$75,200",
                        status: "Confirmed",
                      },
                      {
                        id: "B-1237",
                        customer: "Sophia Williams",
                        property: "Lamborghini Aventador",
                        date: "Apr 02, 2025",
                        amount: "$12,800",
                        status: "Completed",
                      },
                      {
                        id: "B-1238",
                        customer: "Robert Davis",
                        property: "Manhattan Penthouse",
                        date: "Apr 01, 2025",
                        amount: "$38,500",
                        status: "Cancelled",
                      },
                    ].map((booking, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2">{booking.id}</td>
                        <td className="py-3 px-2">{booking.customer}</td>
                        <td className="py-3 px-2">{booking.property}</td>
                        <td className="py-3 px-2">{booking.date}</td>
                        <td className="py-3 px-2">{booking.amount}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : booking.status === "Completed"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {booking.status}
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
                              <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                              <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                Cancel Booking
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
        </main>
      </div>
    </div>
  )
}
