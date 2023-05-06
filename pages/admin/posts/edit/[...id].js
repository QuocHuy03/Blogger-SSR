import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "@/components/PostForm";

export default function Edit() {
  const [blogInfo, setBlogInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/blogs?id=" + id).then((response) => {
      setBlogInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {blogInfo && <PostForm {...blogInfo} />}
    </Layout>
  );
}
