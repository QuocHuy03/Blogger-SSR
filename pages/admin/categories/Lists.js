import Background from "@/components/Background";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListCategory() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  
  return (
    <Background>
      <Layout>
        <table className="min-w-full divide-y divide-gray-200">
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
            {categories.map(cate => (
              <tr key={cate._id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {cate.categoryName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/edit-category/${cate._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <span className="px-2">|</span>
                  <Link
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
