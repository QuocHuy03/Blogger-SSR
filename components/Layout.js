import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div className="flex flex-auto h-screen">
        <SideBar />
        <div className="grow">
          <NavBar />
          <div className="m-5">{children}</div>
        </div>
      </div>
    </Background>
  );
}
