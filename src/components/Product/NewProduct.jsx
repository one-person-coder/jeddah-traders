"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProduct() {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const router = useRouter();
  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registerFormData.name || !registerFormData.price) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/products/register", {
      method: "POST",
      body: JSON.stringify(registerFormData),
    });

    setDisableBtn(false);

    const rspJson = await response.json();

    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }

    SuccessToast("Product Registered successful!");
    router.push("/dashboard/products");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Register New Product
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-10">
                <hr />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Product Name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Product Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Product Price <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Product Price"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </h3>
                    <textarea
                      type="number"
                      name="description"
                      placeholder="Enter Product Description"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF] min-h-[100px] max-h-[200px]"
                      onChange={handleInputChange}
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
                    <Link href={"/dashboard/products"}>Cancel</Link>
                  </Button>
                  <Button
                    disabled={disableBtn}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                  >
                    Register Product
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
