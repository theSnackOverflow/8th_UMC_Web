import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import LPDetail from "./pages/LPDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPage from "./pages/MyPage";
import SearchPage from "./pages/Searchpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="lp/:lpId"
            element={
              <ProtectedRoute>
                <LPDetail />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
          <Route path="search" element={<SearchPage/>} />
          <Route
            path="mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;