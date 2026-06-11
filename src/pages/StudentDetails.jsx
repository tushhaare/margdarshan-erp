import { auth, db } from "../firebase/config";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROGRESS_STAGES } from "../data/progressStages";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore";


export default function StudentDetails() {

  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [currentStage, setCurrentStage] = useState("");
  const [mentorNotes, setMentorNotes] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {

    const fetchData = async () => {

const user = auth.currentUser;

if (user) {

  const userDoc = await getDoc(
    doc(db, "users", user.uid)
  );

  if (userDoc.exists()) {

    setRole(
      userDoc.data().role
    );

  }
}

      const docSnap = await getDoc(
        doc(db, "students", id)
      );

      if (docSnap.exists()) {

  const studentData = docSnap.data();

  setStudent(studentData);

  setCurrentStage(
    studentData.currentStage || "Registered"
  );

  setMentorNotes(
    studentData.mentorNotes || ""
  );

  setSelectedMentor(
    studentData.mentorId || ""
  );

}

      const mentorSnapshot = await getDocs(
        collection(db, "mentors")
      );

      const mentorData = mentorSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMentors(mentorData);
    };


    
    fetchData();


  }, [id]);

  const saveProgress = async () => {

    const existingHistory =
      student.progressHistory || [];

    const latestStage =
      existingHistory.length > 0
        ? existingHistory[
            existingHistory.length - 1
          ].stage
        : null;

    let updatedHistory = existingHistory;

    if (latestStage !== currentStage) {

      updatedHistory = [
        ...existingHistory,
        {
          stage: currentStage,
          date: new Date().toISOString()
        }
      ];
    }

    await updateDoc(
      doc(db, "students", id),
      {
        currentStage,
        mentorNotes,
        progressHistory: updatedHistory
      }
    );

    setStudent(prev => ({
  ...prev,
  currentStage,
  mentorNotes,
  progressHistory: updatedHistory
}));

alert("Progress Updated");


  };

  const assignMentor = async () => {

    const mentor = mentors.find(
      m => m.id === selectedMentor
    );

    if (!mentor) {
      alert("Select a mentor");
      return;
    }

    await updateDoc(
      doc(db, "students", id),
      {
        mentorAssigned: true,
        mentorId: mentor.id,
        mentorName: mentor.name
      }
    );

    setStudent(prev => ({
  ...prev,
  mentorAssigned: true,
  mentorId: mentor.id,
  mentorName: mentor.name
}));

alert("Mentor Assigned");

  };

  if (!student) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      {/* Hero */}

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

        <h1 className="text-4xl font-bold">
          {student.fullName}
        </h1>

        <p className="mt-2 text-blue-100">
          {student.stream?.toUpperCase()}
          {" • "}
          {student.category}
        </p>

        <div className="flex flex-wrap gap-8 mt-6">

          <div>
            <p className="text-blue-100">
              CUET Score
            </p>
            <h2 className="text-2xl font-bold">
              {student.cuetScore}
            </h2>
          </div>

          <div>
            <p className="text-blue-100">
              Class XII %
            </p>
            <h2 className="text-2xl font-bold">
              {student.class12Percentage}
            </h2>
          </div>

          <div>
            <p className="text-blue-100">
              Current Stage
            </p>
            <h2 className="text-2xl font-bold">
              {student.currentStage}
            </h2>
          </div>

          <div>
            <p className="text-blue-100">
              Status
            </p>
            <h2 className="text-2xl font-bold">
              {student.status}
            </h2>
          </div>

        </div>

      </div>

      {/* Student Info */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Student Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <p><strong>Email:</strong> {student.email}</p>

          <p><strong>Phone:</strong> {student.phone}</p>

          <p><strong>Gender:</strong> {student.gender}</p>

          <p><strong>Category:</strong> {student.category}</p>

          <p><strong>Quota:</strong> {student.quota}</p>

          <p><strong>Priority:</strong> {student.priority}</p>

          <p>
  <strong>Target Courses:</strong>
  {" "}
  {student.targetedCourses?.join(", ")}
</p>

<p>
  <strong>1st Preference:</strong>
  {" "}
  {student.firstPreference}
</p>

<p>
  <strong>2nd Preference:</strong>
  {" "}
  {student.secondPreference}
</p>

<p>
  <strong>3rd Preference:</strong>
  {" "}
  {student.thirdPreference}
</p>

<p>
  <strong>4th Preference:</strong>
  {" "}
  {student.fourthPreference || "None"}
</p>

<p>
  <strong>5th Preference:</strong>
  {" "}
  {student.fifthPreference || "None"}
</p>

          <p><strong>Transaction ID:</strong> {student.transactionId}</p>

          <p><strong>Mentor:</strong> {student.mentorName || "Not Assigned"}</p>

          {student.mentorNotes && (

  <div className="md:col-span-2 mt-4">

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

      <p className="font-semibold text-blue-700 mb-2">
        Message for Student
      </p>

      <p className="text-slate-700">
        {student.mentorNotes}
      </p>

    </div>

  </div>

)}

        </div>

      </div>

      {/* Mentor Assignment */}

<div className="flex gap-3 mb-4">

  <button
    onClick={async () => {

      await updateDoc(
        doc(db, "students", id),
        {
          status: "verified"
        }
      );

      setStudent(prev => ({
        ...prev,
        status: "verified"
      }));

    }}
    className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded-lg
    "
  >
    Verify Student
  </button>

  <button
    onClick={async () => {

      await updateDoc(
        doc(db, "students", id),
        {
          status: "payment_issue"
        }
      );

      setStudent(prev => ({
        ...prev,
        status: "payment_issue"
      }));

    }}
    className="
      bg-red-600
      text-white
      px-4
      py-2
      rounded-lg
    "
  >
    Payment Issue
  </button>

</div>

      {role === "admin" && (

<div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Assign Mentor
        </h2>

        <div className="flex gap-3 flex-wrap">

          <select
            value={selectedMentor}
            onChange={(e) =>
              setSelectedMentor(e.target.value)
            }
            className="
              border
              rounded-lg
              px-4
              py-2
            "
          >

            <option value="">
              Select Mentor
            </option>

            {mentors.map(mentor => (

              <option
                key={mentor.id}
                value={mentor.id}
              >
                {mentor.name}
              </option>

            ))}

          </select>

          <button
            onClick={assignMentor}
            className="
              bg-green-600
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Assign Mentor
          </button>

        </div>

      </div>
)}
      {/* Progress */}

      {(role === "admin" || role === "mentor") && (

<div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Progress Tracking
        </h2>

        <select
          value={currentStage}
          onChange={(e) =>
            setCurrentStage(e.target.value)
          }
          className="
            border
            rounded-lg
            px-4
            py-2
            mb-4
            w-full
          "
        >

          {PROGRESS_STAGES.map(stage => (

            <option
              key={stage}
              value={stage}
            >
              {stage}
            </option>

          ))}

        </select>

        <textarea
          rows="5"
          value={mentorNotes}
          onChange={(e) =>
            setMentorNotes(e.target.value)
          }
          placeholder="Write a message for this student..."
          className="
            border
            rounded-lg
            w-full
            p-3
          "
        />

        <button
          onClick={saveProgress}
          className="
            mt-4
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Save Progress
        </button>

      </div>
)}
      {/* History */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Progress History
        </h2>

        <div className="space-y-4">

          {(student.progressHistory || []).map(
            (item, index) => (

              <div
                key={index}
                className="
                  border-l-4
                  border-green-500
                  pl-4
                "
              >

                <p className="font-semibold">
                  {item.stage}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
}