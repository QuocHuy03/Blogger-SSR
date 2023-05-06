import { mongooseConnect } from "@/config/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findOne({ _id: req.query.id }));
    } else {
      res.json(await Blog.find());
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
