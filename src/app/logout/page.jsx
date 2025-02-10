"use client";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";

const Logout = async () => {
  const router = useRouter();
  const response = await fetch("/api/logout", {
    method: "GET",
  });
  if (!response.ok) {
    ErrorToast("Failed to log out.");
  }
  const data = await response.json();

  if (data.success) {
    SuccessToast(data.message)
    router.push("/login");
  }
};

export default Logout;
