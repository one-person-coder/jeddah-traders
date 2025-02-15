import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function ViewPayment({ params }) {
  const { pId, id } = await params;

  if (!pId) {
    return <h1>No payment found</h1>;
  }

  const user = await prisma.paymentRecord.findUnique({
    where: { id: parseInt(pId) },
    include: {
      user: true,
      customer: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Register New Payment
                </h1>
              </div>

              <form className="w-full space-y-10">
                <h3 className="font-semibold text-center mb-2 text-2xl">
                  User Detail
                </h3>
                <div>
                  <hr />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Username</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.user?.username}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Fullname</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.user?.fullname}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-center text-2xl">
                  Payment Detail
                </h3>
                <div>
                  <hr />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Username</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.customer?.username}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Fullname</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.customer?.fullname}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Phone Number
                    </h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.customer?.pNumber}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Date</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={new Date(user.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          timeZone: "UTC",
                          hour12: true,
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Amount</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.amount}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Paid Amount</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.paid_amount}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Method</h3>
                    <input
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={user?.method || 'None'}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold  mb-2 text-sm">Description</h3>
                    <textarea
                      disabled
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF] min-h-[150px] max-h-[150px]"
                      value={user?.description}
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="w-full h-11 bg-red-600 hover:bg-red-700"
                  >
                    <Link href={`/dashboard/customers/${id}/payments`}>
                      Cancel
                    </Link>
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
