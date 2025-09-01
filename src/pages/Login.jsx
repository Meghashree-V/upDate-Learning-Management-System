import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', { email, password });

    // backend se aane wala data check karo
    // kuch backend direct { token, role } bhejta hai
    // aur kuch { token, user: { role } } bhejta hai
    const token = res.data.token;
    const role = res.data.role || res.data.user?.role; 

    // token & role save karo
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // role ke hisaab se redirect
    if (role === 'teacher') {
      navigate('/teacher');
    } else if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'student') {
      navigate('/student');
    } else {
      navigate('/'); // fallback agar role galat aa jaye
    }

  } catch (err) {
    alert(err.response?.data?.error || 'Login failed');
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
