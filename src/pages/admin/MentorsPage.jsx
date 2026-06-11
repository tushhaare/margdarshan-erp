import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import AdminLayout from "../../layouts/AdminLayout";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function MentorsPage() {

  const [mentors, setMentors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPhone, setMentorPhone] = useState("");
const fetchMentors = async () => {

  const mentorSnapshot = await getDocs(
    collection(db, "mentors")
  );

  const studentSnapshot = await getDocs(
    collection(db, "students")
  );

  const students = studentSnapshot.docs.map(
    doc => doc.data()
  );

  const data = mentorSnapshot.docs.map(doc => {

    const mentor = {
      id: doc.id,
      ...doc.data()
    };

    const assignedCount =
      students.filter(
        student =>
          student.mentorId === mentor.id
      ).length;

    return {
      ...mentor,
      assignedCount
    };

  });

  setMentors(data);

};
useEffect(() => {
  fetchMentors();
}, []);
  const createMentor = async () => {

  if (!mentorName || !mentorEmail) {
    alert("Name and Email are required");

    return;
  }

  try {

    await addDoc(
      collection(db, "users"),
      {
        name: mentorName,
        email: mentorEmail,
        phone: mentorPhone,
        role: "mentor",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    );

    await addDoc(
  collection(db, "mentors"),
  {
    name: mentorName,
    email: mentorEmail,
    phone: mentorPhone,
    createdAt: new Date().toISOString()
  }
);

    alert("Mentor Created");

await fetchMentors();

    setShowModal(false);

    setMentorName("");
    setMentorEmail("");
    setMentorPhone("");

  } catch (error) {

  console.error(error);

  alert(
    error.message
  );

}
};

const deleteMentor = async (mentorId) => {

  const confirmed = window.confirm(
    "Delete this mentor?"
  );

  if (!confirmed) return;

  try {

    await deleteDoc(
      doc(db, "mentors", mentorId)
    );

    await fetchMentors();

    alert("Mentor Deleted");

  } catch (error) {

    console.error(error);

    alert("Failed to delete mentor");

  }

};

  const totalAssignedStudents =
  mentors.reduce(
    (sum, mentor) =>
      sum + (mentor.assignedCount || 0),
    0
  );

  const averageLoad =
    mentors.length > 0
      ? (
          totalAssignedStudents /
          mentors.length
        ).toFixed(1)
      : 0;

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Mentor Management
      </h1>


<button
  onClick={() => setShowModal(true)}
  className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
  "
>
  + Add Mentor
</button>



      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Total Mentors
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {mentors.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Assigned Students
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {totalAssignedStudents}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Average Load
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {averageLoad}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Assigned Students
              </th>

              <th className="text-left p-4">
                Status
              </th>

<th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {mentors.map(mentor => (

              <tr
                key={mentor.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">

  <div className="flex items-center gap-3">

    <div
      className="
        w-10
        h-10
        rounded-full
        bg-indigo-600
        text-white
        flex
        items-center
        justify-center
        font-bold
      "
    >
      {mentor.name
        ?.charAt(0)
        ?.toUpperCase()}
    </div>

    <div>

      <p className="font-medium">
        {mentor.name}
      </p>

      <p className="text-xs text-slate-500">
        Mentor
      </p>

    </div>

  </div>

</td>

                <td className="p-4">
                  {mentor.email}
                </td>

                <td className="p-4">

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
    {mentor.assignedCount} Students
  </span>

</td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>

                </td>

                <td className="p-4">

  <button
    onClick={() =>
      deleteMentor(mentor.id)
    }
    className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-3
      py-2
      rounded-lg
      text-sm
    "
  >
    Delete
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Create Mentor
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={mentorName}
        onChange={(e) => setMentorName(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={mentorEmail}
        onChange={(e) => setMentorEmail(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-3"
      />

      <input
        type="text"
        placeholder="Phone"
        value={mentorPhone}
        onChange={(e) => setMentorPhone(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-4"
      />

      <div className="flex gap-3">

        <button
          onClick={createMentor}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
        >
          Create
        </button>

        <button
          onClick={() => setShowModal(false)}
          className="flex-1 bg-gray-200 py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
    </AdminLayout>
  );
}