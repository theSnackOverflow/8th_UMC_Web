import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./layouts/Layout";

import Landing from "./pages/movies/Landing";
import Popular from "./pages/movies/Popular";
import Upcoming from "./pages/movies/Upcoming";
import TopRated from "./pages/movies/TopRated";
import NowPlaying from "./pages/movies/NowPlaying";
import MovieDetail from "./pages/movies/MovieDetial";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OAuthCallback from "./pages/OAuthCallback";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="movies/popular" element={<Popular />} />
            <Route
              path="movies/:movieId"
              element={
                <ProtectedRoute>
                  <MovieDetail />
                </ProtectedRoute>
              }
            />
            <Route path="movies/upcoming" element={<Upcoming />} />
            <Route path="movies/top-rated" element={<TopRated />} />
            <Route path="movies/now_playing" element={<NowPlaying />} />

            {/* 인증 불필요 */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;