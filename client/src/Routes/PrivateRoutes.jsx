import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../Utils/storage';

export const PrivateRoutes = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;