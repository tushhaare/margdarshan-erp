import { motion } from "framer-motion";

import {
  Trophy,
  UserRound,
  ShieldCheck,
  GraduationCap
} from "lucide-react";

import { PROGRESS_STAGES } from "../data/progressStages";
import StudentLayout from "../layouts/StudentLayout";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  doc,
  getDoc,
  collection,
  getDocs
} from "firebase/firestore";

export default function StudentDashboard() {

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);
  const currentIndex =
  PROGRESS_STAGES.indexOf(
    student?.currentStage
  );

const progressPercent =
  currentIndex >= 0
    ? ((currentIndex + 1) /
        PROGRESS_STAGES.length) *
      100
    : 0;

  useEffect(() => {

    const fetchData = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const docSnap = await getDoc(
        doc(db, "students", user.uid)
      );

      if (docSnap.exists()) {
        setStudent(docSnap.data());
      }

      const noticeSnapshot = await getDocs(
        collection(db, "notices")
      );

      const noticeData = noticeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotices(noticeData);
    };

    fetchData();

  }, []);

  if (!student) {
    return (
      <div className="p-10">
        <h2 className="text-xl">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <StudentLayout>
    <div>

      <div className="max-w-7xl mx-auto">

        {/* Welcome Card */}

        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    rounded-3xl
    p-8
    mb-6
    text-white
    bg-gradient-to-r
    from-blue-600
    to-indigo-700
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
        Welcome Back,
        {" "}
        {student.fullName}
      </h1>

      <p className="mt-2 text-blue-100">
        {student.stream?.toUpperCase()}
        {" • "}
        CUET Score:
        {" "}
        {student.cuetScore}
      </p>

      <p className="mt-2">
        Current Stage:
        {" "}
        <strong>
          {student.currentStage}
        </strong>
      </p>

    </div>

  </div>

</motion.div>

        {/* Stats Row */}

        <div className="grid md:grid-cols-4 gap-4 mb-6">

  <div className="bg-white rounded-xl shadow p-5">
    <Trophy className="mb-3" />
    <p className="text-gray-500">
      CUET Score
    </p>
    <h2 className="text-3xl font-bold">
      {student.cuetScore}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <GraduationCap className="mb-3" />
    <p className="text-gray-500">
      Stream
    </p>
    <h2 className="text-2xl font-bold">
      {student.stream}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <ShieldCheck className="mb-3" />
    <p className="text-gray-500">
      Category
    </p>
    <h2 className="text-2xl font-bold">
      {student.category}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <UserRound className="mb-3" />
    <p className="text-gray-500">
      Mentor
    </p>
    <h2 className="text-xl font-bold">
      {student.mentorName ||
        "Pending"}
    </h2>
  </div>

</div>

<div className="bg-white rounded-xl shadow p-6 mb-6">

  <div className="flex justify-between mb-3">

    <h3 className="font-semibold">
      Admission Progress
    </h3>

    <span>
      {Math.round(progressPercent)}%
    </span>

  </div>

  <div className="w-full bg-slate-200 rounded-full h-4">

    <motion.div
      initial={{ width: 0 }}
      animate={{
        width: `${progressPercent}%`
      }}
      transition={{
        duration: 1
      }}
      className="
        bg-blue-600
        h-4
        rounded-full
      "
    />

  </div>

</div>

        {/* Notes + Profile */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-xl font-semibold mb-4">
              Mentor Notes
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">

  <p className="text-slate-700">

    {student.mentorNotes ||
      "No mentor notes available yet."}

  </p>

</div>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-xl font-semibold mb-4">
              Student Information
            </h3>

            <p>
              <strong>Email:</strong>{" "}
              {student.email}
            </p>

            <p className="mt-2">
              <strong>Category:</strong>{" "}
              {student.category || "-"}
            </p>

            <p className="mt-2">
              <strong>Quota:</strong>{" "}
              {student.quota || "-"}
            </p>

<p className="mt-2">
  <strong>Phone:</strong>{" "}
  {student.phone}
</p>

<p className="mt-2">
  <strong>Stream:</strong>{" "}
  {student.stream}
</p>

<p className="mt-2">
  <strong>Class XII %:</strong>{" "}
  {student.class12Percentage}
</p>

<p className="mt-2">
  <strong>CUET Score:</strong>{" "}
  {student.cuetScore}
</p>

          </div>

        </div>

        {/* Notices */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h3 className="text-xl font-semibold mb-4">
            Latest Notices
          </h3>

          {notices
            .filter(
              notice =>
                notice.audience === "students" ||
                notice.audience === "all"
            )
            .map(notice => (

         <motion.div
  key={notice.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    bg-gradient-to-r
    from-white
    to-slate-50
    border
    rounded-xl
    p-5
    mb-4
    shadow-sm
  "
>

  <div className="text-xs text-gray-500 mb-2">
    {new Date(
      notice.createdAt
    ).toLocaleString()}
  </div>

  <div className="flex justify-between items-center mb-2">

    <h4 className="font-bold text-lg">
      {notice.title}
    </h4>

    <span
      className="
        bg-blue-100
        text-blue-700
        text-xs
        px-3
        py-1
        rounded-full
      "
    >
      Notice
    </span>

  </div>

  <p className="mt-2 text-gray-700">
    {notice.content}
  </p>

</motion.div>

            ))}

        </div>

        {/* Timeline */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h3 className="text-xl font-semibold mb-4">
            Progress Timeline
          </h3>

          <div className="space-y-4">

  {PROGRESS_STAGES.map((stage, index) => {

    const completed =
      PROGRESS_STAGES.indexOf(
        student.currentStage
      ) >= index;

    const historyItem =
      student.progressHistory?.find(
        item => item.stage === stage
      );

    return (

      <div
        key={stage}
        className="flex items-start gap-4"
      >

        <div
          className={
            completed
              ? "w-5 h-5 rounded-full bg-green-500 mt-1"
              : "w-5 h-5 rounded-full bg-slate-300 mt-1"
          }
        />

        <div>

          <p
            className={
              completed
                ? "font-semibold"
                : "text-slate-500"
            }
          >
            {stage}
          </p>

          {historyItem && (

            <p className="text-sm text-slate-500">

              {new Date(
                historyItem.date
              ).toLocaleDateString()}

            </p>

          )}

        </div>

      </div>

    );

  })}

</div>

        </div>

        {/* Support */}

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-xl font-semibold mb-4">
            Need Help?
          </h3>

          <p className="mb-2">
            For technical issues regarding
            registration, login, payments
            or portal access:
          </p>

          <p className="font-bold text-lg">
            WhatsApp: +91 8595123633
          </p>

          <p className="text-gray-500 mt-2">
            Available: 10:00 AM - 8:00 PM
          </p>

        </div>

      </div>

    </div>
      </StudentLayout>

  );
}