import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./Routes/PrivateRoutes";
import logo from "./assets/logo.png";

// PUBLIC PAGES
const Home = React.lazy(() => import("./Pages/public/Home"));
const HomeRedirect = React.lazy(() => import("./Pages/public/HomeRedirect"));
const LoginPage = React.lazy(() => import("./Pages/public/Login"));
const SignupPage = React.lazy(() => import("./Pages/public/Signup"));
const ForgetPasswordPage = React.lazy(() => import("./Pages/public/ForgetPassword"));
const ResetPasswordPage = React.lazy(() => import("./Pages/public/ResetPassword"));

// PRIVATE PAGES
const StudentDashboard = React.lazy(() => import("./Pages/private/StudentDashboard"));
const EditStudentProfile = React.lazy(() => import("./Pages/private/EditStudentProfile"));
const TutorDashboard = React.lazy(() => import("./Pages/private/TutorDashboard"));
const EditTutorProfile = React.lazy(() => import("./Pages/private/EditTutorProfile"));
const BrowseTutors = React.lazy(() => import("./Pages/private/BrowserTutor"));
const TutorDetails = React.lazy(() => import("./Pages/private/TutorDetails"));

// ADMIN
const AdminDashboard = React.lazy(() => import("./Pages/admin/AdminDashboard"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <img src={logo} alt="Loading" style={{ width: "500px" }} />
        </div>
      }
    >
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentprofile" element={<EditStudentProfile />} />
          <Route path="/tutordashboard" element={<TutorDashboard />} />
          <Route path="/tutor/profile" element={<EditTutorProfile />} />
          <Route path="/browser" element={<BrowseTutors />} />
          <Route path="/tutor/:id" element={<TutorDetails />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;