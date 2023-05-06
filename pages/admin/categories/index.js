import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import slugName from "url-slug";

export default function index() {
  const [name, setName] = useState("");
  const [_id, set_id] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  async function saveCategory(e) {
    e.preventDefault();
    if (name === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await axios.post("/api/categories", { name, slug: slugName(name) });
        toast.success("Thêm Danh Mục Thành Công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setName("");
        inputRef.current.focus();
        fetchCategories();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function updateCategory(e) {
    e.preventDefault();
    if (name === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await axios.put(`/api/categories`, {
          _id,
          name,
          slug: slugName(name),
        });
        toast.success("Update Danh Mục Thành Công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setName("");
        setEditingCategory(null);
        inputRef.current.focus();
        fetchCategories();
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleEdit(category, _id) {
    setName(category.name);
    set_id(category._id);
    setEditingCategory(category);
    inputRef.current.focus();
  }

  function handleDelete(category, _id) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete [${category.name}]?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        fetchCategories();
      }
    });
  }

  return (
    <Layout>
      {!editingCategory ? (
        <form className="w-full pt-6 rounded-lg" onSubmit={saveCategory}>
          <div className="flex flex-wrap mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 w-full"
              htmlFor="name"
            >
              Name Category
            </label>
            <input
              type="text"
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
            Save Category
          </button>
        </form>
      ) : (
        <form className="w-full pt-6 rounded-lg" onSubmit={updateCategory}>
          <div className="flex flex-wrap mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 w-full"
              htmlFor="name"
            >
              {editingCategory
                ? `Edit Category [ ${editingCategory.name} ]`
                : "Name Category"}
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
            Update Category
          </button>
        </form>
      )}
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

                <td className="px-6 py-4 whitespace-nowrap">{cate.name}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(cate, _id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <span className="px-2">|</span>
                  <button
                    href={"/"}
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(cate, _id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
