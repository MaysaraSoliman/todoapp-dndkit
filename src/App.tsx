import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import RootPage from "./RootPage";
import ErrorPage from "./ErrorPage";
import Todo from "./components/TodoComponent/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Todo />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
