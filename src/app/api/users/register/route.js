import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import { checkLoginToken } from "../../checker";

export async function POST(request) {
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
    const reqBody = await request.json();

    const {
      fullname,
      username,
      email,
      pNumber,
      password,
      gender,
      date,
      status,
    } = reqBody;

    const existingUser = await UserInfo.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            existingUser.username === username
              ? "Username already exists"
              : "Email already exists",
        },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save new user
    const newCustomer = new UserInfo({
      fullname,
      username,
      email,
      pNumber,
      password: hashedPassword,
      gender,
      date,
      status,
      role: "manager",
    });

    await newCustomer.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
