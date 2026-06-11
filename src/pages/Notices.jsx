import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Notices() {
const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNotice = async () => {

    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    await addDoc(
  collection(db, "notices"),
  {
    title,
    content,
    audience,
    createdAt:
      new Date().toISOString()
  }
);

    alert("Notice Created");

    setTitle("");
    setContent("");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Create Notice</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

<select
  value={audience}
  onChange={(e) =>
    setAudience(e.target.value)
  }
>

  <option value="all">
    Everyone
  </option>

  <option value="students">
    Students
  </option>

  <option value="mentors">
    Mentors
  </option>

</select>

<br /><br />

      <textarea
        rows="5"
        cols="50"
        placeholder="Notice Content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createNotice}>
        Publish Notice
      </button>

    </div>
  );
}