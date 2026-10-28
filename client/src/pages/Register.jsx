import {useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function Register(){
    const[name,setName]= useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword]= useState('');
    const[error,setError]=useState('');
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            const res=await api.post('/auth/register',{
                name,
                email,
                password,
                societyId:import.meta.env.VITE_SOCIETY_ID,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went Wrong.');
        }        
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <p>{error}</p>}
            <input
            type="name" placeholder="Name" value={name}
            onChange={(e)=>setName(e.target.value)} required
            />
            <input
            type="email" placeholder="Email" value={email}
            onChange={(e)=>setEmail(e.target.value)} required
            />
            <input
            type="password" placeholder="Password" value={password}
            onChangeCapture={(e)=>setPassword(e.target.value)} required
            />
            <button type="submit">Register</button>
            <Link to="/login">Already have an account?</Link>
        </form>
    );
}