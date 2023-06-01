import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, text: true },
    slug: { type: String, required: true, text: true },
    publisher: { type: String, required: true },
    image: { type: String, required: true },
    career: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true, text: true },
  },
  {
    timestamps: true,
  }
);

export const Blog = models?.Blog || model("Blog", BlogSchema);
