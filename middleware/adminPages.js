import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export const adminPages = (WrappedComponent) => {
  const AdminPages = (props) => {
    const router = useRouter();
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    useEffect(() => {
      if (!accessToken) {
        router.push("/admin/login");
      } else {
        try {
          const decodedToken = jwt_decode(accessToken);
          const { isAdmin } = decodedToken.user;

          if (isAdmin !== "admin") {
            router.push("/admin/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AdminPages;
};
