import { mongooseConnect } from "@/config/mongoose";
import { Blog } from "@/models/Blog";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findOne({ _id: req.query.id }));
    } else {
      const blogs = await Blog.find();
      const categoryOfblog = await Promise.all(
        blogs.map(async (huydev) => {
          const categories = await Category.findOne({
            slug: huydev.category,
          });
          return { ...huydev._doc, categoryName: categories.name };
        })
      );
      res.json(categoryOfblog);
    }
  }

  if (method === "POST") {
    const blogs = await Blog.create(req.body);
    res.json(blogs);
  }

  if (method === "PUT") {
    const { title, description, slug, publisher, category, _id } = req.body;
    await Blog.updateOne(
      { _id },
      { title, description, slug, publisher, category }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Blog.deleteOne({ _id });
    res.json("ok");
  }
}
