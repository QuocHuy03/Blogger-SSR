import Background from "@/components/Background";
import Layout from "@/components/Layout";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

export default function Admin() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    async function fetchUserName() {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwt_decode(accessToken);
        setUserName(decodedToken.user.username);
      } else {
        console.log("Access token not found");
      }
    }

    fetchUserName();
  }, []);
  return (
    <Background>
      <Layout>
        <div className="text-blue-900 flex justify-between">
          <h2>
            Hello, <b>{userName}</b>
          </h2>
          {/* <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
            <img
              src="https://i.imgur.com/bbnrc1T.png"
              alt=""
              className="w-6 h-6"
            />
            <span className="px-2">Admin</span>
          </div> */}
        </div>
      </Layout>
    </Background>
  );
}
