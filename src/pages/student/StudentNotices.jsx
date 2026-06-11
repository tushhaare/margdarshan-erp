import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import StudentLayout from "../../layouts/StudentLayout";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function StudentNotices() {

  const [notices, setNotices] = useState([]);

  useEffect(() => {

    const fetchNotices = async () => {

      const snapshot = await getDocs(
        collection(db, "notices")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotices(data);
    };

    fetchNotices();

  }, []);

  return (

    <StudentLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Bell />
          Notices
        </h1>

        {notices
          .filter(
            notice =>
              notice.audience === "students" ||
              notice.audience === "all"
          )
          .map(notice => (

            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                bg-white
                rounded-xl
                shadow
                p-6
                mb-4
              "
            >

              <div className="flex justify-between mb-3">

                <h3 className="font-bold text-lg">
                  {notice.title}
                </h3>

                <span
                  className="
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                  "
                >
                  Notice
                </span>

              </div>

              <p className="text-slate-700">
                {notice.content}
              </p>

              <p className="text-xs text-slate-500 mt-3">

                {notice.createdAt
                  ? new Date(
                      notice.createdAt
                    ).toLocaleString()
                  : "No Date"}

              </p>

            </motion.div>

          ))}

      </div>

    </StudentLayout>

  );
}