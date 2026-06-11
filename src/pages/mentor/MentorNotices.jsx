import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";
import MentorLayout from "../../layouts/MentorLayout";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function MentorNotices() {

  const [notices, setNotices] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("students");

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

  useEffect(() => {

    fetchNotices();

  }, []);

  const createNotice = async () => {

    if (!title || !content) {

      alert("Please fill all fields");
      return;

    }

    try {

      await addDoc(
        collection(db, "notices"),
        {
          title,
          content,
          audience,
          createdBy: "mentor",
          createdAt: new Date().toISOString()
        }
      );

      alert("Notice Published");

      setTitle("");
      setContent("");
      setAudience("students");

      fetchNotices();

    } catch (error) {

      console.error(error);
      alert("Failed to create notice");

    }

  };

  return (

    <MentorLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Bell />
          Notices
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Create Notice
          </h2>

          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-3 w-full rounded mb-4"
          />

          <select
            value={audience}
            onChange={(e) =>
              setAudience(e.target.value)
            }
            className="border p-3 w-full rounded mb-4"
          >

            <option value="students">
              Students
            </option>

            <option value="all">
              Everyone
            </option>

          </select>

          <textarea
            rows="4"
            placeholder="Notice Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="border p-3 w-full rounded mb-4"
          />

          <button
            onClick={createNotice}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Publish Notice
          </button>

        </div>

        <h2 className="text-xl font-semibold mb-4">
          Existing Notices
        </h2>

        {notices
          .filter(
            notice =>
              notice.audience === "mentors" ||
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

                <div>

                  <h3 className="font-bold text-lg">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-500">

                    Posted by: {
                      notice.createdBy === "mentor"
                        ? "Mentor"
                        : "Admin"
                    }

                  </p>

                </div>

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

    </MentorLayout>

  );
}