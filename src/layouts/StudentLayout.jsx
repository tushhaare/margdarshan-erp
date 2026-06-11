import PageTransitionLoader from "../components/PageTransitionLoader";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import {
  LayoutDashboard,
  Bell,
  TrendingUp,
  UserRound,
  Phone,
  LogOut,
  KeyRound
} from "lucide-react";

<KeyRound size={20} />
export default function StudentLayout({ children }) {

const [student, setStudent] = useState(null);

useEffect(() => {

  const fetchStudent = async () => {

    const user = auth.currentUser;

    if (!user) return;

    const docSnap = await getDoc(
      doc(db, "students", user.uid)
    );

    if (docSnap.exists()) {
      setStudent(docSnap.data());
    }
  };

  fetchStudent();

}, []);

  const navigate = useNavigate();

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/");
  };

  return (
<PageTransitionLoader>
    <div className="flex min-h-screen bg-slate-100">

      <aside className="w-72 bg-slate-900 text-white p-6">

        <div className="mb-10 text-center">

  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-3">

    {student?.fullName
      ?.split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST"}

  </div>

  <h2 className="font-bold text-lg">
    {student?.fullName || "Student"}
  </h2>

  <p className="text-slate-400 text-sm">
    {student?.currentStage || "Registered"}
  </p>

</div>

        <nav className="space-y-3">

  <Link
    to="/student"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <LayoutDashboard size={20} />
    Dashboard
  </Link>

  <Link
    to="/student/notices"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <Bell size={20} />
    Notices
  </Link>

  <Link
    to="/student/progress"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <TrendingUp size={20} />
    Progress
  </Link>

  <Link
    to="/student/mentor"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <UserRound size={20} />
    Mentor
  </Link>

  <Link
    to="/student/profile"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <UserRound size={20} />
    Profile
  </Link>

  <Link
    to="/change-password"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <UserRound size={20} />
    Change Password
  </Link>

  <Link
    to="/student/support"
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
  >
    <Phone size={20} />
    Support
  </Link>

</nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>


      </aside>

      <main className="flex-1 p-8">

        {children}

      </main>



    </div>
</PageTransitionLoader>
  );
}