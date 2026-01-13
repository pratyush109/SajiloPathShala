import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../Utils/storage';

export const PublicRoutes = () => {
  const token = getToken();
  return token ? <Navigate to="/browser" replace /> : <Outlet />;
};

export default PublicRoutes;
