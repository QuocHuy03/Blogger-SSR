import SideBar from "./SideBar";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-auto h-screen">
      <SideBar />
      <div className="grow">
        <NavBar />
        <div className="m-5">{children}</div>
      </div>
    </div>
  );
}
