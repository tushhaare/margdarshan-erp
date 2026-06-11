import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import MentorLayout from "../../layouts/MentorLayout";

export default function MentorProfile() {

  const [mentor, setMentor] = useState(null);

  useEffect(() => {

    const fetchMentor = async () => {

      const user = auth.currentUser;

      if (!user) return;

      const docSnap = await getDoc(
        doc(db, "mentors", user.uid)
      );

      if (docSnap.exists()) {
        setMentor(docSnap.data());
      }

    };

    fetchMentor();

  }, []);

  if (!mentor) {
    return (
      <MentorLayout>
        <div>Loading...</div>
      </MentorLayout>
    );
  }

  return (

    <MentorLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold mb-6">
            My Profile
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-slate-500">
                Full Name
              </p>

              <h2 className="font-semibold text-lg">
                {mentor.name}
              </h2>
            </div>

            <div>
              <p className="text-slate-500">
                Email
              </p>

              <h2 className="font-semibold text-lg">
                {mentor.email}
              </h2>
            </div>

            <div>
              <p className="text-slate-500">
                Phone
              </p>

              <h2 className="font-semibold text-lg">
                {mentor.phone || "-"}
              </h2>
            </div>

            <div>
              <p className="text-slate-500">
                Role
              </p>

              <h2 className="font-semibold text-lg">
                Mentor
              </h2>
            </div>

          </div>

        </div>

      </div>

    </MentorLayout>

  );
}