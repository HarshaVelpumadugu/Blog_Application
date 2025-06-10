import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/blogs/${id}`).then(res => setBlog(res.data));
  }, [id]);

  const deleteBlog = async () => {
    await axios.delete(`/blogs/${id}`);
    navigate('/');
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  const isAuthor = blog.author?._id === JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || 'e30='))?.id;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By: {blog.author?.email}</p>
      <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
      {isAuthor && (
        <div className="mt-4 flex gap-4">
          <Link to={`/edit/${id}`} className="text-blue-500 hover:underline">Edit</Link>
          <button onClick={deleteBlog} className="text-red-500 hover:underline">Delete</button>
        </div>
      )}
    </div>
  );
}
