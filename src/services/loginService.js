import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const loginUser = async (email, password) => {

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  const userDoc = await getDoc(
    doc(db, "users", uid)
  );

  if (!userDoc.exists()) {
    throw new Error("User data not found");
  }

  return userDoc.data();
};