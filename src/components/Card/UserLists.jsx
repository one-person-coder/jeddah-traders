"use client";

import * as React from "react";
import {
  Pencil,
  Search,
  User2,
  Eye,
  Plus,
  Filter,
  RefreshCcw,
  Trash2,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { statusColors } from "@/constant/constant";
import { ErrorToast, SuccessToast } from "../utils/CustomToasts";

export default function UserLists({ data, permissions, role }) {
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(true);

  const [storeUsers, setStoreUsers] = React.useState(
    data.sort((a, b) => (b.role === "admin") - (a.role === "admin"))
  );

  const [users, setUsers] = React.useState(
    data.sort((a, b) => (b.role === "admin") - (a.role === "admin"))
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchFilterData = async () => {
      const response = await fetch(`/api/users/status`, {
        method: "GET",
      });
      const userStatus = await response.json();

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      const sortUsers = userStatus.data.sort(
        (a, b) => (b.role === "admin") - (a.role === "admin")
      );

      const filtered = sortUsers.filter((user) => user.status === statusFilter);
      setUsers(filtered);
    };

    if (statusFilter !== "all") {
      fetchFilterData();
    } else {
      refreshData();
    }
  }, [statusFilter]);

  React.useEffect(() => {
    const fetchFilterData = async () => {
      const response = await fetch(`/api/users/status`, {
        method: "GET",
      });
      const userStatus = await response.json();

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      const sortUsers = userStatus.data.sort(
        (a, b) => (b.role === "admin") - (a.role === "admin")
      );

      const filtered = sortUsers.filter((user) => user.role === roleFilter);
      setUsers(filtered);
    };

    if (roleFilter !== "all") {
      fetchFilterData();
    } else {
      refreshData();
    }
  }, [roleFilter]);

  const refreshData = async () => {
    const response = await fetch(`/api/users/status`, {
      method: "GET",
    });
    const userStatus = await response.json();

    if (!userStatus.success) {
      ErrorToast("User Cannot Fetch Server Error");
    }

    if (!userStatus.success) {
      ErrorToast("User Cannot Fetch Server Error");
    }
    if (userStatus.data && userStatus.data.length >= 1) {
      setUsers(
        userStatus.data.sort(
          (a, b) => (b.role === "admin") - (a.role === "admin")
        )
      );
    } else {
      setUsers([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteUser = async (userId, username) => {
    let userResponse = confirm(
      `Are you sure you want to delete user [ ${username} ]`
    );

    if (!userResponse) return;

    const response = await fetch("/api/users/delete", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    });
    const responseJson = await response.json();

    if (!responseJson.success) {
      ErrorToast(responseJson.message);
      return;
    }
    refreshData();
    SuccessToast("User Deleted Successfully!");
  };

  React.useEffect(() => {
    const filteredUsers = storeUsers.filter(
      (user) =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user?.account_number?.toLocaleString().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
    setUsers(filteredUsers);
  }, [searchTerm]);

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
        {permissions.includes("create user") ? (
          <Button
            className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
            size="lg"
            asChild
          >
            <Link href={"/dashboard/users/new"}>
              <Plus className="h-4 w-4" />
              Add New User
            </Link>
          </Button>
        ) : null}
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
              <Button onClick={refreshData} variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4 text-purple-600" />
                Refresh
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="w-full pl-9 sm:w-[300px] bg-gray-50 border-0 ring-1 ring-gray-200"
              />
            </div>
          </div>

          {/* Filters */}
          {isFiltersVisible && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 p-4 bg-gray-50 rounded-lg border border-dashed">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Role: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Sr.</TableHead>
                  <TableHead>USER</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>CONTACT</TableHead>
                  <TableHead>JOIN DATE</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-gray-200/50 data-[selected=true]:bg-blue-100"
                    onClick={(e) => {
                      document
                        .querySelectorAll("[data-selected]")
                        .forEach((row) => {
                          row.removeAttribute("data-selected");
                        });
                      e.currentTarget.setAttribute("data-selected", "true");
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                            {user.fullname
                              .split(" ")
                              .map((word) => word.charAt(0))
                              .join("")}
                          </div>
                          <div
                            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
                            style={{
                              backgroundColor:
                                statusColors[`more-${user.status}`],
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.fullname}
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
                        <span className="font-medium">
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-md text-xs transition-colors font-medium px-2 py-0.5 capitalize"
                          style={{
                            backgroundColor: statusColors[user.status],
                          }}
                        >
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.pNumber ? (
                        <div className="flex gap-2 items-center bg-orange-300 overflow-hidden w-fit pr-2 rounded-md">
                          <div
                            className="hover:bg-orange-400 py-2 px-2"
                            onClick={() => {
                              window.location.href = `tel:${user.pNumber}`;
                            }}
                          >
                            <PhoneCall className="h-4 w-4" />
                          </div>
                          <span>{user.pNumber}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Link href={`/dashboard/users/${user.id}/view`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        {permissions.includes("edit user") ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                            asChild
                          >
                            <Link href={`/dashboard/users/${user.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                        ) : null}

                        {permissions.includes("delete user") ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              deleteUser(user.id, user.username);
                            }}
                            className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : null}
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
