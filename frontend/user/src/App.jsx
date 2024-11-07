import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import LoginRegister from './components/loginRegister/LoginRegister';
import UserInter from './components/profile/UserInter';
import MyProfile from './components/profile/MyProfile';
import './App.css'; 

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginRegister' element={<LoginRegister />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/Userinter' element={<UserInter />} />
      </Routes>
    </Router>
  )
}

export default App
