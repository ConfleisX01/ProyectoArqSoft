import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LoginCard from './pages/login';
import BooksIndex from './pages/booksIndex';
import BooksList from './pages/booksList';
import BookEdit from './pages/bookEdit';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginCard />
  },
  {
    path: '/index',
    element: <BooksIndex />,
    children: [
      {
        path: '/index/books',
        element: <BooksList />
      },
      {
        path: '/index/edit',
        element: <BookEdit />
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
