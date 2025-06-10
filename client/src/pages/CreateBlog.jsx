import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();
    await axios.post('/blogs', { title, content });
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={create}>
        <input className="w-full p-2 border mb-4 rounded" placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border mb-4 rounded" rows="6" placeholder="Content" onChange={e => setContent(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Publish</button>
      </form>
    </div>
  );
}
