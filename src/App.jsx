import AdminOverview from "./pages/admin/AdminOverview";

import StudentsPage from "./pages/admin/StudentsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import NoticesPage from "./pages/admin/NoticesPage";
import MentorsPage from "./pages/admin/MentorsPage";
import StudentNotices from "./pages/student/StudentNotices";
import StudentProgress from "./pages/student/StudentProgress";
import StudentMentor from "./pages/student/StudentMentor";
import StudentSupport from "./pages/student/StudentSupport";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorStudents from "./pages/mentor/MentorStudents";
import MentorNotices from "./pages/mentor/MentorNotices";
import ChangePassword from "./pages/common/ChangePassword";
import MentorProfile from "./pages/mentor/MentorProfile";
import StudentProfile from "./pages/student/StudentProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={  <ProtectedRoute> <AdminOverview />  </ProtectedRoute>  }/>
        <Route path="/student" element={ <ProtectedRoute> <StudentDashboard /> </ProtectedRoute>  }/>
        <Route path="/student-details/:id" element={<ProtectedRoute> <StudentDetails /> </ProtectedRoute>} />
        <Route path="/notices" element={ <ProtectedRoute> <NoticesPage /> </ProtectedRoute>  }/>
        <Route path="/students" element={ <ProtectedRoute> <StudentsPage /> </ProtectedRoute>  }/>
        <Route path="/mentors" element={ <ProtectedRoute> <MentorsPage /> </ProtectedRoute>  }/>
        <Route
  path="/student/profile"
  element={
    <ProtectedRoute>
      <StudentProfile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/student/profile"
  element={<StudentProfile />}
/>
<Route
  path="/mentor/profile"
  element={
    <ProtectedRoute>
      <MentorProfile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
        <Route
  path="/student/notices"
  element={
    <ProtectedRoute>
      <StudentNotices />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/progress"
  element={
    <ProtectedRoute>
      <StudentProgress />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/mentor"
  element={
    <ProtectedRoute>
      <StudentMentor />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/support"
  element={
    <ProtectedRoute>
      <StudentSupport />
    </ProtectedRoute>
  }
/>
<Route
  path="/mentor"
  element={
    <ProtectedRoute>
      <MentorDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/mentor/students"
  element={
    <ProtectedRoute>
      <MentorStudents />
    </ProtectedRoute>
  }
/>

<Route
  path="/mentor/notices"
  element={
    <ProtectedRoute>
      <MentorNotices />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}