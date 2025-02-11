import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    pNumber: {
      type: String,
      required: [true, "Please enter a valid phone number"],
      unique: false,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    date: {
      type: Date,
      required: [true, "Please enter your date of birth"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    role: {
      type: String,
      enum: ["customer", "admin", "manager"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", UserInfoSchema);

export default UserInfo;
