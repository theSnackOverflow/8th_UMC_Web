import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Detail from './pages/Detail'
import MovieList from "./components/MovieList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detail" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App