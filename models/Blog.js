import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Blog = models?.Blog || model("Blog", BlogSchema);
