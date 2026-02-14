import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import ViewPage from './pages/ViewPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddEditPage />} />
        <Route path="/edit/:id" element={<AddEditPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;