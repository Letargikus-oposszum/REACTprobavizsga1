import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllPizzaPage from './pages/allPizza';
import OnePizzaPage from './pages/OnePizza';
import EditPizzaPage from './pages/EditPizza';
import NewPizzaPage from './pages/NewPizza';
import NotFoundPage from './pages/errors/NotFound';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarElement from './components/Navbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavbarElement/>
      <Routes>
        <Route path='/' element={<AllPizzaPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/onepizza/:id' element={<OnePizzaPage/>}/>
        <Route path='/editpizza/:id' element={<EditPizzaPage/>}/>
        <Route path='/newpizza' element={<NewPizzaPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer theme='colored'/>
  </StrictMode>,
  //cart osszes, sima torles, navbar, Login
)
