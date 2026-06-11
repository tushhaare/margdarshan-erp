import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import AdminLayout from "../../layouts/AdminLayout";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function NoticesPage() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("all");
  const [notices, setNotices] = useState([]);

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

    await addDoc(
      collection(db, "notices"),
      {
        title,
        content,
        audience,
        createdAt: new Date().toISOString()
      }
    );

    alert("Notice Created");

    setTitle("");
    setContent("");
    setAudience("all");

    fetchNotices();
  };

  const deleteNotice = async (noticeId) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this notice?"
  );

  if (!confirmed) return;

  try {

    await deleteDoc(
      doc(db, "notices", noticeId)
    );

    setNotices(
      notices.filter(
        notice => notice.id !== noticeId
      )
    );

    alert("Notice Deleted");

  } catch (error) {

    console.error(error);
    alert("Failed to delete notice");

  }

};

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Notice Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">

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
          <option value="all">
            Everyone
          </option>

          <option value="students">
            Students Only
          </option>

          <option value="mentors">
            Mentors Only
          </option>
        </select>

        <textarea
          rows="5"
          placeholder="Notice Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="border p-3 w-full rounded mb-4"
        />

        <button
          onClick={createNotice}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Publish Notice
        </button>

      </div>

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-semibold mb-4">
          Existing Notices
        </h2>

        {notices.map(notice => (

          <div
  key={notice.id}
  className="border rounded p-4 mb-4"
>

  <div className="flex justify-between items-start">

    <div>

      <h3 className="font-bold text-lg">
        {notice.title}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        Audience: {notice.audience}
      </p>

      <p className="mb-2">
        {notice.content}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(
          notice.createdAt
        ).toLocaleString()}
      </p>

    </div>

    <button
      onClick={() =>
        deleteNotice(notice.id)
      }
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-4
        py-2
        rounded-lg
      "
    >
      Delete
    </button>

  </div>

</div>

        ))}

      </div>

    </AdminLayout>
  );
}