import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Prescription from './pages/Prescription/Prescription';
import YourOrders from './pages//Home/YourOrders';
import Support from './pages/Home/Support';
import Profile from './pages/Home/MyProfile';
import Membership from './pages/Home/Membership';
import Cart from './pages/Cart/CartMed';
import Checkout from './pages/Cart/Checkout';
import Validate from './pages/Cart/Valdate';
import HealthDashboard from './pages/Health/HealthDashboard'
import StoreDashboard from './pages/pharmaStore/StoreDashboard';
import { DrugsProvider } from "./Components/DrugsContext";
const Layout = () => (
  <div>
    <Outlet /> 
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/home', element: <Home /> },
      { path: '/upload', element: <Upload /> },
      { path: '/support', element: <Support /> },
      { path: '/profile', element: <Profile /> },
      { path: '/membership', element: <Membership /> },
      { path: '/cart', element: <Cart /> },
      { path: '/validate', element: <Validate /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/prescription', element: <Prescription /> },
      { path: '/storeDashboard', element: <StoreDashboard /> },
      {path: '/health',element: <HealthDashboard/>},
      { path: '/orders', element: <YourOrders /> }  // Add route for orders page /membership
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DrugsProvider>
      <RouterProvider router={router} />
    </DrugsProvider>
  </StrictMode>
);
