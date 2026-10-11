import { Routes ,Route ,Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { useAuth } from './context/AuthContext';

function Home() {
  const {user, loading} = useAuth();

  if(loading){
    return <p>Loading...</p>;
  }

  if(!user){
    return <p>Not Logged In. <Link to="Login">Log In</Link></p>;
  }
  return <p>Welcome, {user.name} ({user.role})</p>;
}

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/> 
    </Routes>
  );
}