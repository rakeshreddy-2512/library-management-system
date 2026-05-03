import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return <AuthForm title='Sign In' form={form} setForm={setForm} submit={submit} error={error} isRegister={false} />;
}

export function AuthForm({ title, form, setForm, submit, error, isRegister }) {
  return (
    <div className='mx-auto mt-16 max-w-md rounded bg-white p-6 shadow'>
      <h1 className='mb-4 text-2xl font-semibold'>{title}</h1>
      <form onSubmit={submit} className='space-y-3'>
        {isRegister && <input className='w-full rounded border p-2' placeholder='Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />}
        <input className='w-full rounded border p-2' placeholder='Email' value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input className='w-full rounded border p-2' type='password' placeholder='Password' value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        {isRegister && <select className='w-full rounded border p-2' value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}><option value='member'>Member</option><option value='librarian'>Librarian</option><option value='admin'>Admin</option></select>}
        {error && <p className='text-red-600'>{error}</p>}
        <button className='w-full rounded bg-slate-900 py-2 text-white'>{title}</button>
      </form>
    </div>
  );
}
