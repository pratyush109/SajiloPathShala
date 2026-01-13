import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "./Routes/PublicRoutes";
import { PrivateRoutes } from "./Routes/PrivateRoutes";
import logo from "./assets/logo.png"
import Navbar from "./components/Navbar";





const LoginPage = React.lazy(() => import('./Pages/Public/Login'));

const SignupPage = React.lazy(() => import('./Pages/public/Signup'));
const BrowserPage = React.lazy(() => import('./Pages/Private/Browser'));
const ForgetPasswordPage = React.lazy(() => import('./Pages/public/forgetpassword'));

export const AppRoutes = () => (

    
<Suspense
  fallback={
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={logo} alt="Loading" style={{ width: "500px" }} />
    </div>
  }
>
    <Navbar/>
    <Routes>
      
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
      </Route>

     
      <Route element={<PrivateRoutes />}>
        <Route path="/browser" element={<BrowserPage />} />
      </Route>

     
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>

   
  </Suspense>
  
);
