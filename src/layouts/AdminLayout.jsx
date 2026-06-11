
import PageTransitionLoader from "../components/PageTransitionLoader";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLayout({ children }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  return (
    <PageTransitionLoader>
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-lg">

        <div className="mb-10">

  <h1 className="text-3xl font-bold">
    MARGDARSHAN
  </h1>

  <p className="text-slate-400 text-sm">
    Admissions ERP
  </p>

</div>

        <nav className="space-y-2">

          <Link
            to="/admin"
            className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/students"
            className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Students
          </Link>

          <Link
            to="/mentors"
            className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Mentors
          </Link>

          <Link
            to="/notices"
            className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Notices
          </Link>

        </nav>

        <div className="mt-10">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">

        {children}

      </main>

    </div>
    </PageTransitionLoader>
  );
}
