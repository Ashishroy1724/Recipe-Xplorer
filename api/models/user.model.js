import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn.iconscout.com/icon/free/png-512/free-profile-1481935-1254808.png?f=webp&w=256",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
