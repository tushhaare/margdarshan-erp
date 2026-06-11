
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

export default function AdminOverview() {

  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingStudents: 0,
    activeStudents: 0,
    assignedMentors: 0
  });

  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const snapshot = await getDocs(
        collection(db, "students")
      );

      const students = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStats({
        totalStudents: students.length,

        pendingStudents:
          students.filter(
            s =>
              s.status ===
              "pending_verification"
          ).length,

        activeStudents:
          students.filter(
            s => s.status === "active"
          ).length,

        assignedMentors:
          students.filter(
            s => s.mentorAssigned
          ).length
      });

      setRecentStudents(
        students.slice(0, 5)
      );
    };

    fetchData();

  }, []);

  return (
    <AdminLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Overview of admissions,
          students and mentor assignments.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Students
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalStudents}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Active Students
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {stats.activeStudents}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Pending Verification
          </p>

          <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {stats.pendingStudents}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Assigned Mentors
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {stats.assignedMentors}
          </h2>
        </div>

      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Students */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Recent Students
          </h2>

          <div className="space-y-4">

            {recentStudents.map(student => (

              <div
                key={student.id}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  pb-3
                "
              >

                <div>

                  <p className="font-medium">
                    {student.fullName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {student.email}
                  </p>

                </div>

                <span
                  className="
                    text-xs
                    bg-slate-100
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {student.currentStage ||
                    "Registered"}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Quick Actions
          </h2>

          <div className="grid gap-3">

            <Link
              to="/students"
              className="
                bg-blue-600
                text-white
                px-4
                py-3
                rounded-xl
                text-center
              "
            >
              Manage Students
            </Link>

            <Link
              to="/mentors"
              className="
                bg-green-600
                text-white
                px-4
                py-3
                rounded-xl
                text-center
              "
            >
              Manage Mentors
            </Link>

            <Link
              to="/notices"
              className="
                bg-purple-600
                text-white
                px-4
                py-3
                rounded-xl
                text-center
              "
            >
              Create Notice
            </Link>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}