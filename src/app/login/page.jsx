"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoginHeader } from "@/components/LoginHeader/LoginHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, SetLoginFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    SetLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginFormData.username || !loginFormData.password) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginFormData),
    });

    setDisableBtn(false);

    const rspJson = await response.json();

    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }
    router.push("/dashboard");
    SuccessToast("Login successful!");
  };
  return (
    <div>
      <LoginHeader />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-[600px]">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              {/* Welcome Text */}
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Welcome to <br />
                  Jeddah Traders!
                </h1>
                <p className="text-muted-foreground">
                  Please sign-in to your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onChange={handleInputChange}
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  disabled={disableBtn}
                  className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                >
                  Login
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Login Your Account Here.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
