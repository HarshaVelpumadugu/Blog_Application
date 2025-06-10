import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const{setIsLoggedIn}=useAuth();

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/login');
      toast.success("Signed up Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={signup} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Account</button>
      </form>
    </div>
  );
}
