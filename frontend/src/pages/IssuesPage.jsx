import { useEffect, useState } from 'react';
import api from '../services/api';

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ bookId: '', memberId: '', dueDate: '' });

  const fetchIssues = async () => { const { data } = await api.get('/issues'); setIssues(data); };
  useEffect(() => { fetchIssues(); }, []);

  const issueBook = async (e) => { e.preventDefault(); await api.post('/issues', form); setForm({ bookId: '', memberId: '', dueDate: '' }); fetchIssues(); };
  const returnBook = async (id) => { await api.put(`/issues/${id}/return`); fetchIssues(); };

  return <div className='mx-auto max-w-6xl p-4'>
    <h1 className='mb-4 text-2xl font-semibold'>Issue / Return Tracking</h1>
    <form onSubmit={issueBook} className='mb-6 grid gap-2 rounded bg-white p-4 shadow md:grid-cols-4'>
      <input className='rounded border p-2' placeholder='Book ID' value={form.bookId} onChange={(e)=>setForm({...form,bookId:e.target.value})} required />
      <input className='rounded border p-2' placeholder='Member ID' value={form.memberId} onChange={(e)=>setForm({...form,memberId:e.target.value})} required />
      <input className='rounded border p-2' type='date' value={form.dueDate} onChange={(e)=>setForm({...form,dueDate:e.target.value})} required />
      <button className='rounded bg-indigo-600 p-2 text-white'>Issue Book</button>
    </form>
    <div className='space-y-3'>{issues.map((i)=><div key={i._id} className='rounded bg-white p-4 shadow'><p className='font-semibold'>{i.book?.title || i.book}</p><p>Member: {i.member?.name || i.member}</p><p>Status: {i.status}</p><p>Due: {new Date(i.dueDate).toLocaleDateString()}</p><p>Fine: ${i.fineAmount}</p>{i.status==='issued'&&<button onClick={()=>returnBook(i._id)} className='mt-2 rounded bg-amber-500 px-3 py-1 text-white'>Return</button>}</div>)}</div>
  </div>;
}
