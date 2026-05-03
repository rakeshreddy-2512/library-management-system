import { useEffect, useState } from 'react';
import api from '../services/api';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', totalCopies: 1 });

  const fetchBooks = async () => {
    const { data } = await api.get('/books', { params: { q } });
    setBooks(data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async (e) => {
    e.preventDefault();
    await api.post('/books', { ...form, totalCopies: Number(form.totalCopies) });
    setForm({ title: '', author: '', isbn: '', category: '', totalCopies: 1 });
    fetchBooks();
  };

  return <div className='mx-auto max-w-6xl p-4'>
    <h1 className='mb-4 text-2xl font-semibold'>Book Management</h1>
    <div className='mb-4 flex gap-2'><input className='rounded border p-2' placeholder='Search by title, author, ISBN' value={q} onChange={(e)=>setQ(e.target.value)} /><button onClick={fetchBooks} className='rounded bg-slate-800 px-3 text-white'>Search</button></div>
    <form onSubmit={addBook} className='mb-6 grid grid-cols-1 gap-2 rounded bg-white p-4 shadow md:grid-cols-5'>
      {['title','author','isbn','category'].map((key)=><input key={key} className='rounded border p-2' placeholder={key} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} required />)}
      <input type='number' min='1' className='rounded border p-2' placeholder='Total copies' value={form.totalCopies} onChange={(e)=>setForm({...form,totalCopies:e.target.value})} required />
      <button className='rounded bg-emerald-600 p-2 text-white md:col-span-5'>Add Book</button>
    </form>
    <div className='grid gap-3'>{books.map((b)=><div key={b._id} className='rounded bg-white p-4 shadow'><p className='font-semibold'>{b.title}</p><p>{b.author} • {b.category}</p><p>ISBN: {b.isbn}</p><p>Available: {b.availableCopies}/{b.totalCopies}</p></div>)}</div>
  </div>;
}
