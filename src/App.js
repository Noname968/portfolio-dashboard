import React from 'react'
import './App.css'
import Create from './components/Create'
import Delete from './components/Delete'
import Update from './components/Update'
import Read from './components/Read'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Create/>}/>
          <Route path='/read' element={<Read/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route path='/delete' element={<Delete/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
