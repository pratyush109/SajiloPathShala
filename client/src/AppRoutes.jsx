import React,{Suspense} from "react";

import logo from "../src/assets/logo.png";
import { Route ,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./Routes/PrivateRoutes";

const LoginPage = React.lazy(() =>import('./Pages/public/Login'));
const SignupPage = React.lazy(() =>import( './Pages/public/Signup'));
const ForgetPasswordPage =  React.lazy(() =>import( './Pages/public/forgetpassword'));
const Home =  React.lazy(() =>import('./Pages/public/Home'));

const TutorDashboard =  React.lazy(() =>import ('./Pages/private/tutordashboard'));

const EditTutorProfile = React.lazy(() =>import( './Pages/private/EditTutorProfile'));
const StudentDashboard = React.lazy(() =>import( "./Pages/private/studentdashboard"));
const EditStudentProfile=  React.lazy(() =>import ("./Pages/private/EditStudentProfile"));
const BrowseTutors = React.lazy(() =>import("./Pages/private/BrowserTutor"));
const TutorDetails = React.lazy(() =>import( "./Pages/private/TutorDetails"));

 const AppRoutes = () => {
   return (
   <Suspense
   fallback={
    <div className="d-flex justify-content-center align-items-center vh-100">

      <img src={logo} alt="Loading" style={{width:"500px"}}/>
    </div>

   }
   >
<Navbar/>
   <Routes>
       
       
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
       

      
        <Route path="/" element={<Home />} />

        
        <Route element={<PrivateRoute />}>
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/tutordashboard" element={<TutorDashboard />} />
          <Route path="/studentprofile" element={<EditStudentProfile />} />
          <Route path="/tutorprofile" element={<EditTutorProfile />} />
          <Route path="/browser" element={<BrowseTutors />} />
          <Route path="/tutor/:id" element={<TutorDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
