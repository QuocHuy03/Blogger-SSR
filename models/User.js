import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.Users || model("Users", UserSchema);
