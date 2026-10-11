import { createContext, useContext,useState,useEffect } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext();

export default function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function checkAuth(){
            try {
                const res = await api.get('/auth/me');
                setUser(res.data.data);
            } 
            catch (error) {
                setUser(null)
            }
            finally{
                setLoading(false);
            }
        }
        checkAuth();
    },[]);

    return(
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}