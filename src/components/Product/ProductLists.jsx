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
  DollarSign,
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

export default function ProductLists({ data }) {
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
      const response = await fetch(`/api/products/status`, {
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
    const response = await fetch(`/api/products/status`, {
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

    const response = await fetch("/api/products/delete", {
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
    SuccessToast("Product Deleted Successfully!");
  };

  React.useEffect(() => {
    const filteredUsers = storeUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.description.toLowerCase().includes(searchTerm) ||
        user.price.toLocaleString() === searchTerm
    );
    setUsers(filteredUsers);
  }, [searchTerm]);

  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Product Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor your Products
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
          size="lg"
          asChild
        >
          <Link href={"/dashboard/products/new"}>
            <Plus className="h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          {/* Action Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex flex-wrap items-center gap-3">
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

          {/* Table */}
          <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Sr.</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>DESCRIPTION</TableHead>
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
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{user.price}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Link href={`/dashboard/products/${user.id}/view`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                          asChild
                        >
                          <Link href={`/dashboard/products/${user.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteUser(user.id, user.name);
                          }}
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
