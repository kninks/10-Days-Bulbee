import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Description from './pages/Description/Description';
import Summary from './pages/Summary/Summary';
import Header from './components/Header/Header';
import NewPost from './pages/TestUpload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/testupload' element={ <NewPost /> }></Route>
        <Route path='/description' element={ <Description /> }></Route>
        <Route path='/summary' element={ <Summary /> }></Route>
      </Routes>
    </div>
  )
}

export default App
