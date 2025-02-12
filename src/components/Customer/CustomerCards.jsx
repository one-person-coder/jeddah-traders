import { Users, UserCheck, UserX, ClockIcon as UserClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function CustomerCards({ data }) {
  const users = data;
  const activeUsers = users.filter((user) => user.status === "active");
  const inActiveUsers = users.filter((user) => user.status === "inactive");
  const pendingUsers = users.filter((user) => user.status === "pending");

  return (
    <div className="py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <h2 className="text-3xl font-bold">{users.length}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-purple-700" />
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Customers
                </p>
                <h2 className="text-3xl font-bold">{activeUsers.length}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-700" />
          </CardContent>
        </Card>

        {/* Inactive Users Card */}
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Inactive Customers
                </p>
                <h2 className="text-3xl font-bold">{inActiveUsers.length}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-red-700" />
          </CardContent>
        </Card>

        {/* Pending Users Card */}
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Customers
                </p>
                <h2 className="text-3xl font-bold">{pendingUsers.length}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <UserClock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
