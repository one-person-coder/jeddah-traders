import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const users = await UserInfo.find({
    role: { $in: ["admin", "manager"] },
  }).select("-password");

  return NextResponse.json({
    success: true,
    data: users,
    message: "Users fetched successfully",
  });
}
