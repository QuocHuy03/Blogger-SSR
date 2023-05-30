import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { adminPages } from "@/middleware/adminPages";

function Add() {
  return (
    <Layout>
      <PostForm />
    </Layout>
  );
}
export default adminPages(Add);
