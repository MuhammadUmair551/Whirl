import { createBrowserRouter } from 'react-router-dom';
import Layout  from '../components/layout/Layout';
import Landing from '../pages/Landing';
import About   from '../pages/About';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',      element: <Landing /> },
      { path: '/story', element: <About />   },
    ],
  },
]);