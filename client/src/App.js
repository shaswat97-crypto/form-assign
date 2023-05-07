import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import UsersTable from "./components/Table";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/table",
    element: <UsersTable />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
