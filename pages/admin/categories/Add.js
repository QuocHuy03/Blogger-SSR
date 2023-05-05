import Background from "@/components/Background";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import slugName from "url-slug";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  async function fetchCategories() {
    try {
      const result = await axios.get("/api/categories");
      const data = result?.data.categories;
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Invalid response data:", data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const slug = slugName(name);
  async function saveCategory(e) {
    e.preventDefault();
    try {
      await axios.post("/api/categories", { name, slug });
      setName("")
      inputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Background>
      <Layout>
        <form className="w-full pt-6 rounded-lg " onSubmit={saveCategory}>
          <div className="flex flex-wrap mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 w-full"
              htmlFor="name"
            >
              Category Name
            </label>
            <input
              type="text"
              placeholder="Category Name"
              className="block w-full px-4 py-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={name}
              ref={inputRef}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Thêm Danh Mục
          </button>
        </form>
        <table className="min-w-full divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STT
              </th>

              <th
                scope="col"
                className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>

              <th
                scope="col"
                className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories &&
              categories.map((cate, index) => (
                <tr key={cate._id} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {cate.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/edit-category/${cate._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <span className="px-2">|</span>
                    <Link
                      href={"/"}
                      className="text-red-600 hover:text-red-900"
                      // onClick={() => handleDelete(cate._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    </Background>
  );
}
