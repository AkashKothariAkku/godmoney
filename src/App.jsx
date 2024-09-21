import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Otp from './pages/Otp';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/Home';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import AddBankAccount from './pages/AddBankAccount';
import WinnersPage from './pages/WinnersPage';
import MatchesPage from './pages/MatchesPage';
import WalletAddMoney from './pages/WalletAddMoney';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/change-password' element={<ChangePassword/>} />
        <Route path='/add-bank-account' element={<AddBankAccount/>} />
        <Route path='/winners' element={<WinnersPage/>} />
        <Route path='/matches' element={<MatchesPage/>} />
        <Route path='/add-money' element={<WalletAddMoney/>} />
      </Routes>
    </Router>
  );
}

export default App;

