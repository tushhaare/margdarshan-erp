import PageTransitionLoader from "../components/PageTransitionLoader";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  UserRound,
  KeyRound
} from "lucide-react";

export default function MentorLayout({ children }) {

  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);

  useEffect(() => {

    const fetchMentor = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const docSnap = await getDoc(
        doc(db, "mentors", user.uid)
      );

      if (docSnap.exists()) {
        setMentor(docSnap.data());
      }
    };

    fetchMentor();

  }, []);

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/");
  };

  return (
<PageTransitionLoader>
    <div className="flex min-h-screen bg-slate-100">

      <aside className="w-72 bg-slate-900 text-white p-6">

        <div className="mb-10 text-center">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-green-600
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              mx-auto
              mb-3
            "
          >

            {mentor?.name
              ?.split(" ")
              .map(word => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "MN"}

          </div>

          <h2 className="font-bold text-lg">
            {mentor?.name || "Mentor"}
          </h2>

          <p className="text-slate-400 text-sm">
            Mentor Portal
          </p>

        </div>

        <nav className="space-y-3">

  <Link
    to="/mentor"
    className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      hover:bg-slate-800
    "
  >
    <LayoutDashboard size={20} />
    Dashboard
  </Link>

  <Link
    to="/mentor/students"
    className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      hover:bg-slate-800
    "
  >
    <Users size={20} />
    Students
  </Link>

  <Link
    to="/mentor/notices"
    className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      hover:bg-slate-800
    "
  >
    <Bell size={20} />
    Notices
  </Link>

  <Link
    to="/mentor/profile"
    className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      hover:bg-slate-800
    "
  >
    <UserRound size={20} />
    Profile
  </Link>

  <Link
    to="/change-password"
    className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-lg
      hover:bg-slate-800
    "
  >
    <KeyRound size={20} />
    Change Password
  </Link>

</nav>

        <button
          onClick={handleLogout}
          className="
            mt-10
            w-full
            bg-red-600
            hover:bg-red-700
            px-4
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
          "
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