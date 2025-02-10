import {
  Users,
  UserCheck,
  UserX,
  ClockIcon as UserClock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserCards() {
  return (
    <div className="container py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users Card */}
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h2 className="text-3xl font-bold">2,543</h2>
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
                  Active Users
                </p>
                <h2 className="text-3xl font-bold">1,875</h2>
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
                  Inactive Users
                </p>
                <h2 className="text-3xl font-bold">428</h2>
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
                  Pending Users
                </p>
                <h2 className="text-3xl font-bold">240</h2>
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
