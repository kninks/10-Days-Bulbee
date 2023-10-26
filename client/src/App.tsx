import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Description from './pages/Description/Description';
import Summary from './pages/Summary/Summary';
import Header from './components/Header/Header';
import AdminAdd from './pages/AdminAdd/AdminAdd';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/description' element={ <Description /> }></Route>
        <Route path='/adminadd' element={ <AdminAdd /> }></Route>
        <Route path='/summary' element={ <Summary /> }></Route>
      </Routes>
    </div>
  )
}

export default App
