import { Children } from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Mainlayouts from "./layouts/Mainlayouts";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";

import { action as RegisterAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { isAuthReady, login } from "./app/features/userSlice";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/task";

function App() {
  const { user, authReady } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <Mainlayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/Createtask",
          element: <CreateTask />,
        },
        {
          path: "/task/:id",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
