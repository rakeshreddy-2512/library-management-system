import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className='bg-slate-900 text-white'>
      <nav className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <Link to='/' className='font-bold'>LMS Pro</Link>
        {user ? (
          <div className='flex items-center gap-4 text-sm'>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/books'>Books</Link>
            <Link to='/issues'>Issues</Link>
            <span>{user.name}</span>
            <button className='rounded bg-red-500 px-3 py-1' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className='flex gap-3 text-sm'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
