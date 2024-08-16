import { HomePage } from '../pages/HomePage';
import { Layout } from '../layout/Layout';
import EventBooking from '../components/EventBooking/EventBooking';
import Home from '../layout/Home';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  }
  ,{
    path: '/eventBooking',
    element: <EventBooking />,
  }
];
