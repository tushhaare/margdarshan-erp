import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function StudentsPage() {
const navigate = useNavigate();

  const [students, setStudents] = useState([]);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [mentorFilter, setMentorFilter] = useState("all");

  useEffect(() => {

    const fetchStudents = async () => {

      const querySnapshot = await getDocs(
        collection(db, "students")
      );

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStudents(data);
    };

    fetchStudents();

  }, []);

const approveStudent = async (studentId) => {

  await updateDoc(
    doc(db, "students", studentId),
    {
      status: "active"
    }
  );

  window.location.reload();
};

const filteredStudents = students.filter(student => {

  const matchesSearch =
    student.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    student.email
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "all"
      ? true
      : student.status === statusFilter;

  const matchesMentor =
    mentorFilter === "all"
      ? true
      : mentorFilter === "assigned"
      ? student.mentorAssigned
      : !student.mentorAssigned;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesMentor
  );

});

return (
  <AdminLayout>

    <h1 className="text-3xl font-bold mb-6">
      Student Management
    </h1>

<div className="grid md:grid-cols-4 gap-4 mb-6">
      <div className="
  bg-white
  p-6
  rounded-2xl
  shadow-sm
  border
">
        <p className="text-gray-500">Total Students</p>
        <h2 className="text-3xl font-bold">
          {students.length}
        </h2>
      </div>

      <div className="
  bg-white
  p-6
  rounded-2xl
  shadow-sm
  border
">
        <p className="text-gray-500">Active</p>
        <h2 className="text-3xl font-bold">
          {students.filter(
            s => s.status === "active"
          ).length}
        </h2>
      </div>

      <div className="
  bg-white
  p-6
  rounded-2xl
  shadow-sm
  border
">
        <p className="text-gray-500">Pending</p>
        <h2 className="text-3xl font-bold">
          {students.filter(
            s => s.status === "pending_verification"
          ).length}
        </h2>
      </div>

      <div className="
  bg-white
  p-6
  rounded-2xl
  shadow-sm
  border
">
        <p className="text-gray-500">Assigned</p>
        <h2 className="text-3xl font-bold">
          {students.filter(
            s => s.mentorAssigned
          ).length}
        </h2>
      </div>

    </div>

    <input
      type="text"
      placeholder="Search students..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border rounded-xl px-4 py-3 mb-5 bg-white"
    />

    <div className="flex gap-3 mb-5">

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        className="border rounded-lg px-3 py-2 bg-white"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="pending_verification">
          Pending
        </option>
      </select>

      <select
        value={mentorFilter}
        onChange={(e) =>
          setMentorFilter(e.target.value)
        }
        className="border rounded-lg px-3 py-2 bg-white"
      >
        <option value="all">All Mentors</option>
        <option value="assigned">Assigned</option>
        <option value="unassigned">Unassigned</option>
      </select>

    </div>

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Mentor</th>
            <th className="text-left p-4">Stage</th>
            <th className="text-left p-4">Action</th>
            <th className="text-left p-4">View</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.map(student => (

            <tr
              key={student.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">

  <div className="flex items-center gap-3">

    <div
      className="
        w-10
        h-10
        rounded-full
        bg-blue-600
        text-white
        flex
        items-center
        justify-center
        font-bold
      "
    >
      {student.fullName
        ?.charAt(0)
        ?.toUpperCase()}
    </div>

    <div>

      <p className="font-medium">
        {student.fullName}
      </p>

      <p className="text-xs text-slate-500">
        {student.stream}
      </p>

    </div>

  </div>

</td>

              <td className="p-4">
                {student.email}
              </td>

              <td className="p-4">

                <span
                  className={
                    student.status === "active"
                      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                  }
                >
                  {student.status}
                </span>

              </td>

              <td className="p-4">

  {student.mentorName ? (

    <span
      className="
        bg-blue-100
        text-blue-700
        px-3
        py-1
        rounded-full
        text-sm
      "
    >
      {student.mentorName}
    </span>

  ) : (

    <span
      className="
        bg-slate-100
        text-slate-600
        px-3
        py-1
        rounded-full
        text-sm
      "
    >
      Not Assigned
    </span>

  )}

</td>

              <td className="p-4">

  <span
    className="
      bg-purple-100
      text-purple-700
      px-3
      py-1
      rounded-full
      text-sm
    "
  >
    {student.currentStage || "Registered"}
  </span>

</td>

              <td className="p-4">

                {student.status === "pending_verification" ? (

                  <button
                    onClick={() =>
                      approveStudent(student.id)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                ) : (
                  <span className="text-green-600 font-medium">
                    Approved
                  </span>
                )}

              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    navigate(
                      `/student-details/${student.id}`
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </AdminLayout>
);
}