import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function MentorDashboard() {

  const [students, setStudents] = useState([]);

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

  return (
    <div style={{ padding: "30px" }}>
      <h1>Mentor Dashboard</h1>

      <h3>
        Assigned Students: {students.length}
      </h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>CUET Score</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.fullName}</td>
              <td>{student.status}</td>
              <td>{student.cuetScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}