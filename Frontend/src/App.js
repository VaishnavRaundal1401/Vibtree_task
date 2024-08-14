import './App.scss';
import Auth from './Components/AuthPage/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './Components/UserList/UserList';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/usersList' element={<UserList/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
