import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Trash2 } from "lucide-react";
import DeletePaymentLists from "@/components/DeletePayment/DeletePaymentLists";

export const revalidate = 0;
const RecycleBin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const deletedPayments = await prisma.paymentRecord.findMany({
    include: {
      user: true,
      customer: true,
      items: true,
    },
  });

  const totalDeleted = deletedPayments.filter((payment) => payment.isDelete);

  return (
    <div className="custom-width">
      <div className="mt-3">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Delete Payments Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor Deleted Payments
          </p>
        </div>
      </div>

      <div className="py-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Deleted Payments
                  </p>
                  <h2 className="text-3xl font-bold">
                    {totalDeleted.length}
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-red-700" />
            </CardContent>
          </Card>
        </div>
        <DeletePaymentLists data={deletedPayments} />
      </div>
    </div>
  );
};

export default RecycleBin;
