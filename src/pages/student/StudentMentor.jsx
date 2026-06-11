import StudentLayout from "../../layouts/StudentLayout";
import { auth, db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { UserRound } from "lucide-react";

export default function StudentMentor() {

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

  if (!student) {
    return (
      <StudentLayout>
        Loading...
      </StudentLayout>
    );
  }

  return (

    <StudentLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Assigned Mentor
        </h1>

        <div className="bg-white rounded-xl shadow p-8">

          <UserRound
            size={60}
            className="mb-4"
          />

          <h2 className="text-2xl font-bold">

            {student.mentorName ||
              "Mentor Not Assigned"}

          </h2>

          <p className="text-slate-500 mt-2">
            Current Stage:
            {" "}
            {student.currentStage}
          </p>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">

            <h3 className="font-semibold mb-2">
              Mentor Notes
            </h3>

            <p>
              {student.mentorNotes ||
                "No notes available"}
            </p>

          </div>

        </div>

      </div>

    </StudentLayout>

  );
}