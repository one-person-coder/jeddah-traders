"use client";

import * as React from "react";
import {
  MoreVertical,
  Pencil,
  Search,
  User2,
  Eye,
  Plus,
  Filter,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const users = [
  {
    id: 1,
    name: "Hussain Coder",
    username: "hussain_coder",
    avatar: "OW",
    role: "Admin",
    plan: "Basic",
    status: "Pending",
    lastActive: "2 hours ago",
    joinDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Ali Coder",
    username: "ali_coder",
    avatar: "GM",
    role: "Admin",
    plan: "Basic",
    status: "Active",
    lastActive: "5 mins ago",
    joinDate: "Jan 12, 2024",
  },
];

export default function CustomerLists() {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(true);

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAll = () => {
    setSelectedUsers((prev) =>
      prev.length === users.length ? [] : users.map((user) => user.id)
    );
  };

  // Status badge variants
  const getStatusBadge = (status) => {
    const variants = {
      Active:
        "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
      Pending: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
      Inactive: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    };

    return (
      <Badge
        variant="secondary"
        className={cn("font-medium border px-2 py-0.5 capitalize")}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor admin accounts
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          {/* Action Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="border-dashed"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              >
                <Filter className="mr-2 h-4 w-4 text-purple-600" />
                Filters
              </Button>
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4 text-purple-600" />
                Refresh
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="w-full pl-9 sm:w-[300px] bg-gray-50 border-0 ring-1 ring-gray-200"
              />
            </div>
          </div>

          {/* Filters */}
          {isFiltersVisible && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 p-4 bg-gray-50 rounded-lg border border-dashed">
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Role: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">Manager</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Status: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Table */}
          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>USER</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>JOIN DATE</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                            {user.avatar}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User2 className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.joinDate}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
