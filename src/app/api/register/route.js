import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";

export async function POST(request) {
  try {
    await connectDB();
    const reqBody = await request.json();

    const { fullname, username, email, pNumber, password, gender, date } =
      reqBody;


    // Check if user already exists
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
