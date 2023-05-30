import Layout from "@/components/Layout";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Background from "@/components/Background";
import { adminPages } from "@/middleware/adminPages";

function Admin() {
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
        </div>
      </Layout>
    </Background>
  );
}

export default adminPages(Admin);
