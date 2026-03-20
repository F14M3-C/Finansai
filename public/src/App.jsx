
import { createBrowserRouter, RouterProvider} from 'react-router';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import AuthContext from './pages/auth/AuthContext';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsAuth(false);
        setAuthUser(null);
        return;
      }

      const data = await response.json();


      setAuthUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setAuthUser(null);
      console.log(error);
      
    }
  };

  checkAuth();
}, []);

const router = createBrowserRouter([
    {path:"/login", element: <Login />},
    {path:"/register", element: <Register />},
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        // { path: "expenses/:id", element: <Expenses />},
        // { path:"incomes/:id", element: <Incomes />},
      ]
    },
  ])


  return (
      <AuthContext.Provider value={{ authUser, setAuthUser, isAuth, setIsAuth}}>
      <RouterProvider router={router} />
     </AuthContext.Provider>
  );
}

export default App;
