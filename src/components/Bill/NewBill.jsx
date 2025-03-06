"use client";

import * as React from "react";
import { CalendarIcon, Printer, RotateCcw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import Link from "next/link";

// Sample inventory data
const inventory = [
  { id: 2, name: "Mobile", price: 200 },
  { id: 4, name: "Cloth", price: 300 },
  { id: 5, name: "Laptop", price: 400 },
  { id: 6, name: "Watch", price: 500 },
];

export default function SaleEntry({ username, userRole }) {
  const params = useParams();
  const [inventory, setInventory] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products/status`);
      if (!res.ok) {
        ErrorToast("Failed to fetch products");
        return;
      }
      const data = await res.json();

      if (!data.success) {
        ErrorToast("Failed to fetch products");
        return;
      }
      setInventory(data.data);
    };
    fetchProducts();
  }, []);

  const { id: customerId } = params;
  const [date, setDate] = React.useState(() => {
    const now = new Date(new Date() + "Z");
    return now.toISOString().slice(0, 16);
  });
  const [selectedInventory, setSelectedInventory] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [less, setLess] = React.useState(0);
  const [payment, setPayment] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [disableBtn, setDisableBtn] = React.useState(false);
  const router = useRouter();

  const addItem = (item) => {
    const newItem = {
      id: items.length + 1,
      productId: item.id,
      name: item.name,
      qty: 1,
      price: item.price,
      amount: item.price * 1,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setSelectedInventory("");
    calculateTotals(updatedItems);
  };

  const calculateTotals = (currentItems) => {
    const newTotal = currentItems.reduce((sum, item) => sum + item.amount, 0);
    setTotal(newTotal);
    setPayment(newTotal);
  };

  const updateQuantity = (index, qty) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          qty,
          amount: item.price * qty,
        };
      }
      return item;
    });
    setItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const updateCost = (index, cost) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          price: cost,
          amount: cost * item.qty,
        };
      }
      return item;
    });
    setItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotals(updatedItems);
  };

  const resetForm = () => {
    setDate(undefined);
    setSelectedInventory("");
    setRemarks("");
    setItems([]);
    setTotal(0);
    setLess(0);
    setPayment(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const response = await fetch("/api/customers/payments/register", {
      method: "POST",
      body: JSON.stringify({
        description: remarks,
        items,
        total,
        less,
        payment,
        customerId,
        createdAt: date,
      }),
    });

    const rspJson = await response.json();

    if (!rspJson.success) {
      setDisableBtn(false);
      ErrorToast(rspJson.message);
      return;
    }
    SuccessToast("Bill Registered successful!");
    router.push(`/dashboard/customers/${customerId}/payments`);
  };

  React.useEffect(() => {
    setPayment(total - less);
  }, [less, items, total]);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <Card className="mx-auto bg-white">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl font-bold">
            Sale Entry [ <span className="text-purple-600">{customerId}</span>{" "}
            {username} ]
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Date Picker */}
                {userRole === "admin" ? (
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Date <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="datetime-local"
                      name="date"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[7px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </div>
                ) : null}
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Select (Inventory)
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border-gray-200"
                      >
                        {selectedInventory
                          ? inventory.find(
                              (item) => item.name === selectedInventory
                            )?.name
                          : "Search inventory..."}
                        <Search className="ml-2 h-4 w-4 shrink-0 text-purple-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search inventory..." />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          <CommandGroup>
                            {inventory.map((item) => (
                              <CommandItem
                                key={item.id}
                                onSelect={() => {
                                  setSelectedInventory(item.name);
                                  addItem(item);
                                  setOpen(false);
                                }}
                              >
                                {item.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Bill Remarks */}
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Bill remarks
                  </Label>
                  <Textarea
                    placeholder="Enter remarks..."
                    className="border-gray-200 resize-none"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>

                {/* Print & Reset Buttons */}
                <div className="flex space-x-2">
                  {/* <Button
                    type="button"
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt
                  </Button> */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={resetForm}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Bill Details */}
              <div className="space-y-4">
                <Card className="border border-gray-200">
                  <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold">
                      Bill Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow>
                          <TableHead>Sr.</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.qty}
                                onChange={(e) =>
                                  updateQuantity(
                                    index,
                                    Number.parseInt(e.target.value) || 0
                                  )
                                }
                                className="w-20 border-gray-200"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  updateCost(
                                    index,
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-24 border-gray-200"
                              />
                            </TableCell>
                            <TableCell>{item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeItem(index)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">PAID:</span>
                      <Input
                        type="number"
                        value={less}
                        onChange={(e) => setLess(Number(e.target.value))}
                        className="w-32 border-gray-200"
                      />
                      <Input
                        type="number"
                        value={total.toFixed(2)}
                        readOnly
                        className="w-32 bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Payment:</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={payment.toFixed(2)}
                        onChange={(e) => setPayment(Number(e.target.value))}
                        className="w-32 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50/50 flex justify-end space-x-2 p-4">
            <Button
              type="button"
              variant="outline"
              asChild
              onClick={resetForm}
              className="border-gray-200 hover:bg-gray-100"
            >
              <Link href={`/dashboard/customers/${customerId}/payments`}>
                CLOSE
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="border-gray-200 hover:bg-gray-100"
            >
              RESET
            </Button>
            <Button
              disabled={disableBtn}
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
            >
              ACTION →
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
