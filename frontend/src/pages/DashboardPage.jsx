import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalBooks: 0, totalIssued: 0, overdue: 0, totalFines: 0 });
  useEffect(() => { api.get('/issues/dashboard/stats').then((res) => setStats(res.data)).catch(() => {}); }, []);
  return <div className='mx-auto max-w-6xl p-4'><h1 className='mb-6 text-2xl font-semibold'>Admin Dashboard</h1><div className='grid gap-4 md:grid-cols-4'>{Object.entries(stats).map(([k,v])=><div key={k} className='rounded bg-white p-5 shadow'><p className='text-sm text-slate-500'>{k}</p><p className='text-3xl font-bold'>{k==='totalFines' ? `$${v}` : v}</p></div>)}</div></div>;
}
