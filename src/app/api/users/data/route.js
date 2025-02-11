import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";

export async function GET(request) {
  try {
    const login = await checkLoginToken(request);
    
    if (!login) {
      const response = NextResponse.json({
        success: true,
        message: "Logout successful",
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserInfo.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
