import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import slugName from "url-slug";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function PostForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  publisher: existingPublisher,
  category: existingCategory,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [publisher, setPublisher] = useState(existingPublisher || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data.categories);
    });
  }, []);
  if (!Array.isArray(categories)) {
    return <div>Loading...</div>;
  }
  async function saveBlogs(e) {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      publisher === "" ||
      category === ""
    ) {
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
        const data = {
          title,
          description,
          publisher,
          category,
          slug: slugName(title),
        };
        if (_id) {
          //update
          await axios.put("/api/blogs", { ...data, _id });
          toast.success("Cập Nhật Bài Viết Thành Công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          //create
          await axios.post("/api/blogs", data);
          toast.success("Thêm Bài Viết Thành Công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTitle("");
          setPublisher("");
          setCategory("");
          setDescription("");
        }
        router.push("/admin/posts/Lists")
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <form className="w-full pt-6 rounded-lg " onSubmit={saveBlogs}>
      <div className="flex flex-wrap mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="name"
        >
          Title
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
          Publisher
        </label>
        <input
          type="text"
          placeholder="Publisher"
          className="block w-full px-4 py-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={publisher}
          onChange={(ev) => setPublisher(ev.target.value)}
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
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Chọn Danh Mục Bài Viết</option>
          {categories &&
            categories.map((cate, index) => {
              const isSelected = cate.slug === category;
              console.log(isSelected);
              return (
                <option key={cate._id} value={cate.slug} selected={isSelected}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex flex-wrap mb-4">
        <label
          className="block text-gray-700 font-medium mb-2 w-full"
          htmlFor="description"
        >
          Description
        </label>

        <JoditEditor value={description} onChange={handleDescriptionChange} />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        {_id ? "Cập nhật bài viết" : "Thêm bài viết"}
      </button>
    </form>
  );
}
