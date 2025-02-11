"use client";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch(`/api/logout`, {
        method: "GET",
      });

      if (!response.ok) {
        ErrorToast("Failed to log out.");
        return;
      }

      const data = await response.json();

      if (data.success) {
        SuccessToast(data.message);
        router.push("/login");
      }
    };

    logout();
  }, [router]);
};

export default Logout;
