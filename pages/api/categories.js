import { mongooseConnect } from "@/config/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find();
    res.json({ categories });
  }

  if (method === "POST") {
    const { name, slug } = req.body;
    const categoryDoc = await Category.create({
      name,
      slug,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, slug, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        slug,
      }
    );
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
