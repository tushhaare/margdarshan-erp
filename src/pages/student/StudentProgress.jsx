import StudentLayout from "../../layouts/StudentLayout";
import { auth, db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { PROGRESS_STAGES } from "../../data/progressStages";
import { motion } from "framer-motion";

export default function StudentProgress() {

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

  const currentIndex =
    PROGRESS_STAGES.indexOf(
      student.currentStage
    );

  const progressPercent =
    ((currentIndex + 1) /
      PROGRESS_STAGES.length) *
    100;

  return (

    <StudentLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Admission Progress
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="flex justify-between mb-3">

            <span>
              Progress
            </span>

            <span>
              {Math.round(progressPercent)}%
            </span>

          </div>

          <div className="w-full bg-slate-200 h-4 rounded-full">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${progressPercent}%`
              }}
              transition={{ duration: 1 }}
              className="
                bg-blue-600
                h-4
                rounded-full
              "
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-bold mb-6">
            Timeline
          </h2>

          <div className="space-y-4">

            {PROGRESS_STAGES.map(
              (stage, index) => {

                const completed =
                  currentIndex >= index;

                const historyItem =
                  student.progressHistory?.find(
                    item =>
                      item.stage === stage
                  );

                return (

                  <div
                    key={stage}
                    className="
                      flex
                      items-start
                      gap-4
                    "
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
              }
            )}

          </div>

        </div>

      </div>

    </StudentLayout>

  );
}