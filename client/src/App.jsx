import { Routes ,Route ,Link,useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { useAuth } from './context/AuthContext';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function Home() {
  const {user, loading, logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout(){
    await logout();
    navigate('/login');
  }

  if(loading){
    return <p>Loading...</p>;
  }
  
  return <div>
  <p>Welcome, {user.name} ({user.role})</p>
  <button onClick={handleLogout}>Logout</button>
  </div>;
}

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/> 
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}