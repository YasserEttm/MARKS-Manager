import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Filiere from './Components/Filiere';
import PrivateRoute from './Components/PrivateRoute';
import Module from './Components/Module';
import Element from './Components/Element';
import Profs from './Components/Profs';
import Compte from './Components/Compte';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeProf from './Components/HomeProf';
import ElementProf from './Components/ElementProf'
import { UserContext } from './Components/UserContext';
function App() {
  const [logger, setLogger] = useState();

  const getData = (data) =>{
    setLogger(data);
  };

  if (logger){
    localStorage.setItem("user", JSON.stringify(logger));
  }
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login onSubmit={ getData } />} />
            <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/home/filieres" element={<PrivateRoute><Filiere /></PrivateRoute>} />
            <Route path="/home/profs" element={<PrivateRoute><Profs /></PrivateRoute>} />
            <Route path="/home/elements" element={<PrivateRoute><Element /></PrivateRoute>} />
            <Route path="/home/modules" element={<PrivateRoute><Module /></PrivateRoute>} />
            <Route path="/home/comptes" element={<PrivateRoute><Compte /></PrivateRoute>} />
            <Route path="/homeprof" element={<PrivateRoute><HomeProf/></PrivateRoute>} />
            <Route path="/homeprof/elementsprof" element={<PrivateRoute><ElementProf /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
    
  );
}

export default App;
