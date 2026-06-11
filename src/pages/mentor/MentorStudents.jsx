import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import {
  collection,
  getDocs
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MentorLayout from "../../layouts/MentorLayout";

export default function MentorStudents() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchStudents = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const snapshot = await getDocs(
        collection(db, "students")
      );

      const data = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(
          student =>
            student.mentorId === user.uid
        );

      setStudents(data);
    };

    fetchStudents();

  }, []);

  const filteredStudents =
    students.filter(student =>

      student.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <MentorLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">

  <h1 className="text-4xl font-bold">
    My Students
  </h1>

  <p className="text-slate-500 mt-2">
    Manage assigned students and monitor their admission progress.
  </p>

</div>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            mb-6
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Stage
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.map(student => (

                <tr
                  key={student.id}
                  className="border-t"
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
    className="
      bg-purple-100
      text-purple-700
      px-3
      py-1
      rounded-full
      text-sm
    "
  >
    {student.currentStage}
  </span>

</td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        navigate(
                          `/student-details/${student.id}`
                        )
                      }
                      className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Open
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </MentorLayout>

  );
}