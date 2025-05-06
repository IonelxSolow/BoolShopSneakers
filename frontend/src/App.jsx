import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

import Home from './pages/Home';
import DefaultLayout from './layout/DefaultLayout';

export default function App() {
  return (

    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  );
}
