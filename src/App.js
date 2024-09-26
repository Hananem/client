import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';

import UserRoutes from "./UserRoutes"
import { useSelector } from 'react-redux';
function App() {
  return (
    <div className="App">

     <Routes>
     <Route path="/*" element={<UserRoutes />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
    
     </Routes>
    </div>
  );
}

export default App;
