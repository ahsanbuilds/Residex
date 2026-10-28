import {useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
    const[email,setEmail] = useState('');
    const[password,setPassword]= useState('');
    const[error,setError]=useState('');
    
    const {setUser} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            const res=await api.post('/auth/login',{email,password});
            setUser(res.data.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went Wrong.');
        }        
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <input
            type="email" placeholder="Email" value={email}
            onChange={(e)=>setEmail(e.target.value)} required
            />
            <input
            type="password" placeholder="Password" value={password}
            onChangeCapture={(e)=>setPassword(e.target.value)} required
            />
            <button type="submit">Log In</button>
            <Link to="/register">Create an account</Link>
        </form>
    );
}