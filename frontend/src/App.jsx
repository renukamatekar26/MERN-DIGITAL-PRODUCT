import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
// useLocation
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import CreateProduct from './pages/CreateProduct';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminNavbar from './components/AdminNavbar';


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
    {!isAdminRoute ? <Navbar /> : <AdminNavbar />}
    
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path = '/register' element={<Register />} />
      <Route path = '/login' element={<Login />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
        <Route
          path='/admin/*'
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
      
    </>
  )
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/product/create' element={<CreateProduct />} />
      <Route path='/product/edit/:id' element={<EditProduct />} />
      <Route path='/product/delete/:id' element={<DeleteProduct />} />
    </Routes>
  )
}
export default App;
