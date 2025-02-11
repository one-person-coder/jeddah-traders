import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";

export async function POST(request) {
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

  try {
    const reqBody = await request.json();
    const {
      _id,
      fullname,
      username,
      email,
      pNumber,
      gender,
      date,
      status,
      role,
    } = reqBody;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const user = await UserInfo.findById(_id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.pNumber = pNumber || user.pNumber;
    user.gender = gender || user.gender;
    user.date = date || user.date;
    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
