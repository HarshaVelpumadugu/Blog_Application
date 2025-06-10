import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`/blogs/${id}`, { title, content });
    navigate(`/blog/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={update}>
        <input className="w-full p-2 border mb-4 rounded" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border mb-4 rounded" rows="6" value={content} onChange={e => setContent(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}
