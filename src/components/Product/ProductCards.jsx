import { Users, UserCheck, UserX, ClockIcon as UserClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProductCards({ data }) {
  const users = data;

  return (
    <div className="py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Products
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
      </div>
    </div>
  );
}
