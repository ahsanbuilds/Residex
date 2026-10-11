import { Routes ,Route ,Link,useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { useAuth } from './context/AuthContext';

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

  if(!user){
    return <p>Not Logged In. <Link to="Login">Log In</Link></p>;
  }
  return <div>
  <p>Welcome, {user.name} ({user.role})</p>
  <button onClick={handleLogout}>Logout</button>
  </div>;
}

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/> 
    </Routes>
  );
}