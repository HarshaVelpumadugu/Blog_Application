import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));

      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <Spinner />;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
