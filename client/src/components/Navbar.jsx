import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out Successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-blue-300">BlogSphere</Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-blue-300">Home</Link>

        {isLoggedIn && <Link to="/create" className="hover:text-blue-300">Create Blog</Link>}

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/signup" className="hover:text-blue-300">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-blue-300">Logout</button>
        )}
      </div>
    </nav>
  );
}

