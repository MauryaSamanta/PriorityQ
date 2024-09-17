import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, HardDrive, Zap, AlertTriangle, Ban } from "lucide-react"

// Mock data
const mockUsers = [
  { id: 1, name: 'Alice', timeSpent: '2h 30m', storage: '1.2 GB', apiRequests: '150ms', reported: false, banned: false },
  { id: 2, name: 'Bob', timeSpent: '1h 45m', storage: '0.8 GB', apiRequests: '120ms', reported: true, banned: false },
  { id: 3, name: 'Charlie', timeSpent: '3h 15m', storage: '2.1 GB', apiRequests: '180ms', reported: false, banned: false },
  { id: 4, name: 'David', timeSpent: '0h 45m', storage: '0.3 GB', apiRequests: '90ms', reported: true, banned: true },
  { id: 5, name: 'Eve', timeSpent: '4h 00m', storage: '1.7 GB', apiRequests: '160ms', reported: false, banned: false },
]

export default function Dashboard() {
  const [users, setUsers] = useState(mockUsers)

  const totalUsers = users.length
  const averageTime = users.reduce((acc, user) => acc + parseInt(user.timeSpent), 0) / totalUsers
  const totalStorage = users.reduce((acc, user) => acc + parseFloat(user.storage), 0).toFixed(2)
  const averageApiTime = users.reduce((acc, user) => acc + parseInt(user.apiRequests), 0) / totalUsers
  const reportedUsers = users.filter(user => user.reported).length
  const bannedUsers = users.filter(user => user.banned).length

  const toggleBan = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, banned: !user.banned } : user
    ))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTime.toFixed(2)} hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStorage} GB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average API Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageApiTime.toFixed(2)} ms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Users</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportedUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bannedUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Time Spent</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>API Requests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.timeSpent}</TableCell>
                  <TableCell>{user.storage}</TableCell>
                  <TableCell>{user.apiRequests}</TableCell>
                  <TableCell>
                    {user.reported && <Badge className="mr-2 bg-yellow-500">Reported</Badge>}
                    {user.banned && <Badge className="bg-red-500">Banned</Badge>}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant={user.banned ? "outline" : "destructive"} 
                      size="sm"
                      onClick={() => toggleBan(user.id)}
                    >
                      {user.banned ? "Unban" : "Ban"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}