import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import Landing from "./pages/movies/Landing";
import Popular from "./pages/movies/Popular";
import Upcoming from "./pages/movies/Upcoming";
import TopRated from "./pages/movies/TopRated";
import NowPlaying from "./pages/movies/NowPlaying";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="movies/popular" element={<Popular />} />
          <Route path="movies/upcoming" element={<Upcoming />} />
          <Route path="movies/top-rated" element={<TopRated />} />
          <Route path="movies/now_playing" element={<NowPlaying />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
