import MentorLayout from "../../layouts/MentorLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";

import {
  collection,
  getDocs
} from "firebase/firestore";

export default function MentorDashboard() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const user = auth.currentUser;

      const studentSnapshot = await getDocs(
        collection(db, "students")
      );

      const allStudents =
        studentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      const assignedStudents =
        allStudents.filter(
          student =>
            student.mentorId === user?.uid
        );

      setStudents(assignedStudents);

      const noticeSnapshot = await getDocs(
        collection(db, "notices")
      );

      const noticeData =
        noticeSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      setNotices(noticeData);
    };

    fetchData();

  }, []);

  const mentorNotices =
    notices.filter(
      notice =>
        notice.audience === "mentors" ||
        notice.audience === "all"
    );

  const pendingStudents =
    students.filter(
      student =>
        student.status ===
        "pending_verification"
    );

  return (

    <MentorLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Mentor Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-slate-500">
              Assigned Students
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {students.length}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-slate-500">
              Pending Verification
            </p>

            <h2 className="text-4xl font-bold mt-2 text-orange-600">
              {pendingStudents.length}
            </h2>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-slate-500">
              Mentor Notices
            </p>

            <h2 className="text-4xl font-bold mt-2 text-blue-600">
              {mentorNotices.length}
            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <button
            onClick={() =>
              navigate("/mentor/students")
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              p-4
              rounded-xl
              font-semibold
            "
          >
            Manage Students
          </button>

          <button
            onClick={() =>
              navigate("/mentor/notices")
            }
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              p-4
              rounded-xl
              font-semibold
            "
          >
            View Notices
          </button>

          <button
            onClick={() =>
              navigate("/mentor/profile")
            }
            className="
              bg-purple-600
              hover:bg-purple-700
              text-white
              p-4
              rounded-xl
              font-semibold
            "
          >
            My Profile
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Students Requiring Attention
            </h2>

            {pendingStudents.length > 0 ? (

              pendingStudents
                .slice(0, 5)
                .map(student => (

                  <div
                    key={student.id}
                    className="border-b py-3"
                  >

                    <h3 className="font-semibold">
                      {student.fullName}
                    </h3>

                    <p className="text-slate-600">
                      {student.currentStage ||
                        "Pending Verification"}
                    </p>

                  </div>

                ))

            ) : (

              <p className="text-slate-500">
                No students currently require attention.
              </p>

            )}

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Latest Notices
            </h2>

            {mentorNotices
              .slice(0, 5)
              .map(notice => (

                <div
                  key={notice.id}
                  className="border-b py-3"
                >

                  <h3 className="font-semibold">
                    {notice.title}
                  </h3>

                  <p className="text-slate-600">
                    {notice.content}
                  </p>

                </div>

              ))}

          </div>

        </div>

      </div>

    </MentorLayout>

  );
}