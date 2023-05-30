import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "@/components/PostForm";
import Spinner from "@/components/Spinner";
import { adminPages } from "@/middleware/adminPages";
import Background from "@/components/Background";

function Edit() {
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
    <Background>
      <Layout>
        {blogInfo ? (
          <>
            <h1 className="font-medium">
              Edit Blog <b>[{blogInfo._id}]</b>
            </h1>
            <PostForm {...blogInfo} />
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    </Background>
  );
}
export default adminPages(Edit);
