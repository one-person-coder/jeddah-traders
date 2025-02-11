import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";

export async function GET(request) {
  const login = await checkLoginToken(request);
  if (!login) {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  }
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
