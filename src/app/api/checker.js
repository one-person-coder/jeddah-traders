import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function checkLoginToken(request) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserInfo.findById(decoded.id).select("-password");

    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
