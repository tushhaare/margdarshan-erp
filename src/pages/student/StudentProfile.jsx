import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentProfile() {

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

        <div className="p-10">
          Loading...
        </div>

      </StudentLayout>

    );
  }

  return (

    <StudentLayout>

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            rounded-3xl
            p-8
            mb-6
          "
        >

          <div className="flex items-center gap-6">

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
                text-3xl
                font-bold
              "
            >

              {student.fullName
                ?.split(" ")
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {student.fullName}
              </h1>

              <p className="text-blue-100 mt-2">
                {student.stream}
              </p>

            </div>

          </div>

        </div>

        {/* Personal + Academic */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Personal Information
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Email:</strong>{" "}
                {student.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {student.phone}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {student.gender}
              </p>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Academic Information
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Stream:</strong>{" "}
                {student.stream}
              </p>

              <p>
                <strong>Class XII %:</strong>{" "}
                {student.class12Percentage}
              </p>

              <p>
                <strong>CUET Score:</strong>{" "}
                {student.cuetScore}
              </p>

            </div>

          </div>

        </div>

        {/* Admission Details */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Admission Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <p>
              <strong>Category:</strong>{" "}
              {student.category}
            </p>

            <p>
              <strong>Quota:</strong>{" "}
              {student.quota}
            </p>

            <p>
              <strong>Current Stage:</strong>{" "}
              {student.currentStage}
            </p>

            <p>
              <strong>Assigned Mentor:</strong>{" "}
              {student.mentorName || "Pending"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {student.status}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {student.priority}
            </p>

          </div>

        </div>

      </div>

    </StudentLayout>

  );
}