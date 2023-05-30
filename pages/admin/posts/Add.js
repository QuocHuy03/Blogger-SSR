import Background from "@/components/Background";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { adminPages } from "@/middleware/adminPages";

function Add() {
  return (
    <Background>
      <Layout>
        <PostForm />
      </Layout>
    </Background>
  );
}
export default adminPages(Add);
