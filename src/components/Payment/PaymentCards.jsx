import { DollarSign, HandCoins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function PaymentCards({ data }) {
  const users = data;
  const totalAmount = users.reduce(
    (acc, user) => (user.isDelete ? acc : acc + user.amount),
    0
  );
  const totalPaid = users.reduce(
    (acc, user) => (user.isDelete ? acc : acc + user.paid_amount),
    0
  );
  const totalPending = totalAmount - totalPaid;

  return (
    <div className="py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </p>
                <h2 className="text-3xl font-bold">{totalAmount}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
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
                  Paid Amount
                </p>
                <h2 className="text-3xl font-bold">{totalPaid}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <HandCoins className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-700" />
          </CardContent>
        </Card>
        {/* Pending Users Card */}
        <Card className="relative overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Amount
                </p>
                <h2 className="text-3xl font-bold">{totalPending}</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
