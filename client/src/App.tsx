import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Description from './pages/Description';
import Summary from './pages/Summary';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/description' element={ <Description /> }></Route>
        <Route path='/summary' element={ <Summary /> }></Route>
      </Routes>
    </div>
  )
}

export default App
