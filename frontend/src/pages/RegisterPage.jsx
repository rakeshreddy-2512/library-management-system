import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthForm } from './LoginPage';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/dashboard');
    } catch {
      setError('Registration failed');
    }
  };

  return <AuthForm title='Create Account' form={form} setForm={setForm} submit={submit} error={error} isRegister />;
}
