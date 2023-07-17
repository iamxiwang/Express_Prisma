import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login'
function App() {
  return (
    <Routes>
        <Route path ='/' element={<Signup />} ></Route>
        <Route path ='/login' element={<Login />} ></Route>
    </Routes>
  );
}

export default App;
