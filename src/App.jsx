import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AdminLogin from "./pages/Admin/Login/AdminLogin"
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminNavigation from './components/Admin/Navigation/Navigation';
import UserList from './pages/Admin/UserList/UserList';
import User from './pages/Admin/User/User';
import Blogs from './pages/Admin/Blogs/Blogs';
import AddBlog from './pages/Admin/Blogs/Addblog/AddBlog';
import Subscribers from './pages/Admin/Subscribers/Subscribers';
import EditProfile from './pages/Admin/EditProfile/EditProfile';
import NonAdminLayout from './components/NonAdminLayout';
import AdminLayout from './components/AdminLayout';
import ResetPassword from './pages/ResetPassword';
import Contest from './pages/Admin/Blogs copy/Contest';
import AddContest from './pages/Admin/Blogs copy/Addblog/AddContest';
import WithdrawalAmount from './pages/WithdrawalAmount';
import { isAuthenticated, getUserRole } from '../utils/auth';
import ViewContest from './pages/Admin/Blogs copy/ViewContest';
import Cookies from 'js-cookie';
// ProtectedRoute for authenticated users
function ProtectedRoute({ children }) {
  console.log(isAuthenticated())
  return isAuthenticated() ? children : <Navigate to="/" />;
}

// AdminRoute for admin users
function AdminRoute({ children }) {
  return isAuthenticated() && getUserRole() === 'admin' ? children : <Navigate to="/admin-login-panel" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NonAdminLayout> <Login /> </NonAdminLayout>} />
        <Route path="/otp" element={<NonAdminLayout><Otp /></NonAdminLayout>} />
        <Route path="/forgot-password" element={<NonAdminLayout><ForgotPassword /></NonAdminLayout>} />
        <Route path='/home' element={<ProtectedRoute><NonAdminLayout><HomePage/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><NonAdminLayout><Profile/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/change-password' element={<ProtectedRoute><NonAdminLayout><ChangePassword/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/reset-password' element={<NonAdminLayout><ResetPassword/></NonAdminLayout>} />
        <Route path='/add-bank-account' element={<ProtectedRoute><NonAdminLayout><AddBankAccount/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/withdraw-amount' element={<ProtectedRoute><NonAdminLayout><WithdrawalAmount/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/winners' element={<ProtectedRoute><NonAdminLayout><WinnersPage/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/matches' element={<ProtectedRoute><NonAdminLayout><MatchesPage/></NonAdminLayout></ProtectedRoute>} />
        <Route path='/add-money' element={<ProtectedRoute><NonAdminLayout><WalletAddMoney/></NonAdminLayout></ProtectedRoute>} />
        <Route path="/admin-login-panel" element={<AdminLogin />} />
        <Route path="/admin/" element={<AdminLayout><AdminNavigation /></AdminLayout>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="user/:id" element={<User />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contest" element={<Contest />} />
          <Route path="view-contest/:id" element={<ViewContest />} />
          <Route path="add-contest" element={<AddContest />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<AddBlog />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="edit-profile" element={<EditProfile />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;

