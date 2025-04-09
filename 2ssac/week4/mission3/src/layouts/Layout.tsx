import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 공통 네비게이션 */}
      <Navbar />

      {/* 각 페이지가 여기에 렌더링됨 */}
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
