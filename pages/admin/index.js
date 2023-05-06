import Background from "@/components/Admins/Background";
import Layout from "@/components/Admins/Layout";

export default function Admin() {
  return (
    <Background>
      <Layout>
        <div className="text-blue-900 flex justify-between">
          <h2>
            Hello, <b>Lê Quốc Huy</b>
          </h2>
          <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
            <img src="https://i.imgur.com/bbnrc1T.png" alt="" className="w-6 h-6" />
            <span className="px-2">Admin</span>
          </div>
        </div>
      </Layout>
    </Background>
  );
}
