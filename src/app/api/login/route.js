import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const user = await UserInfo.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
    };


    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "15d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login user",
      },
      { status: 500 }
    );
  }
}
