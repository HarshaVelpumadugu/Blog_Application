import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`/blogs?page=${page}`)
      .then(res => setBlogs(res.data))
      .catch(err => {
        console.error("Failed to fetch blogs", err);
        setBlogs([]);
      });
  }, [page]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">All Blogs</h1>

      {blogs.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl font-bold text-gray-600">No Blogs Available</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {blogs.map(blog => (
              <div key={blog._id} className="border p-4 rounded shadow bg-white">
                <Link to={`/blog/${blog._id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </Link>
                <p className="text-sm text-gray-500">By: {blog.author?.email}</p>
              </div>
            ))}
          </div>

          {(blogs.length > 5 || page > 1) && (
            <div className="flex justify-between mt-6">
              {page > 1 && (
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Prev
                </button>
              )}
              {blogs.length > 5 && (blogs.length)%5!==0 && (
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}


