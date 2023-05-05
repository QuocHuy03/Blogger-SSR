import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function PostForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://doannodejs-production.up.railway.app/api/listCategory")
      .then((result) => {
        setCategories(result.data);
      });
  }, []);
  async function saveProduct(e) {
    e.preventDefault();
  }
  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form className="w-full pt-6 rounded-lg " onSubmit={saveProduct}>
      <div className="flex flex-wrap mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product Name"
          className="block w-full px-4 py-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <div className="flex flex-wrap mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="name"
        >
          Category
        </label>
        <select
          id="options"
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map((cate, index) => (
            <option key={cate._id} value={cate.categorySlug}>
              {cate.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>

      <div className="flex flex-wrap mb-6">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          id="price"
          type="number"
          name="price"
          placeholder="100000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Thêm Bài Viết
        </button>
    </form> 
  );
}
