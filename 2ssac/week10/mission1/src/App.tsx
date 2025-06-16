import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MovieList from './components/MovieList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;