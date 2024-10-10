import React, { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Cart from './pages/cart'
import './styles.css'
import Products from './components/Products'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [cart, setCart] = useState(5)
  return (
    <div className='container'>
      <Toaster />
        <Header cart={cart} setCart={setCart}/>
        <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart setCart={setCart}/>} />
        </Routes>
    </div>
  )
}

export default App