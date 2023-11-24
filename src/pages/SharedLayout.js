import { Navbar, Footer, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};
