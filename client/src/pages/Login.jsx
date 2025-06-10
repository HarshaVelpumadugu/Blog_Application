import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{setIsLoggedIn}=useAuth();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      toast.success("Logged in Successfully!")
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={login} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Log In</button>
      </form>
    </div>
  );
}
