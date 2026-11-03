import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Products from './components/Products'
import AddProducts from './components/AddProducts'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import PrivateComponent from './components/PrivateComponent'
import UpdateProduct from './components/UpdateProduct'
import VerifyEmail from './components/VerifyEmail'


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<Products/>}/>
        <Route path='/add' element={<AddProducts/>}/>
        <Route path='/edit/:id' element={<UpdateProduct/>}/>
        </Route>
      
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/verifyemail' element={<VerifyEmail/>}/>
      </Routes>
      <ToastContainer position='top-right'/>
    </div>
  )
}

export default App;