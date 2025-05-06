import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DefaultLayout from './layout/DefaultLayout';

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}
