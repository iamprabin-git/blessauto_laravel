import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Login from './components/admin/Login'
import { ToastContainer } from 'react-bootstrap'
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import { AdminAuthProvider } from './components/context/AdminAuth'


function App () {
  return (
    <>
    <AdminAuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/shop" element={<Shop />}/>
      <Route path="/product/:id" element={<Product />} />

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={
      <AdminRequireAuth>
        <Dashboard />
      </AdminRequireAuth>} />
      
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    </AdminAuthProvider>
    </>
  )
}

export default App