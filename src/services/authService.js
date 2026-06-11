import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerStudent = async (data) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
    
  );

  
  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    role: "student",
    name: data.fullName,
    email: data.email,
    status: "pending_verification",
    createdAt: new Date(),

    currentStage: "Registered",

progressHistory: [
  {
    stage: "Registered",
    date: new Date().toISOString()
  }
],

mentorNotes: "",
  });


  
  await setDoc(doc(db, "students", uid), {

  // Personal Details

  fullName: data.fullName,
  email: data.email,
  phone: data.phone,
  gender: data.gender,
  category: data.category,
  quota: data.quota,

  // Academic Details

  stream: data.stream,
  cuetScore: data.cuetScore,

  // Course Preferences

  targetedCourses:
    data.targetedCourses || [],

  firstPreference:
    data.firstPreference || "",

  secondPreference:
    data.secondPreference || "",

  thirdPreference:
    data.thirdPreference || "",

  fourthPreference:
    data.fourthPreference || "",

  fifthPreference:
    data.fifthPreference || "",

  priority:
    data.priority || "",

  additionalNotes:
    data.additionalNotes || "",

  // Payment

  transactionId:
    data.transactionId || "",

  paymentDate:
    data.paymentDate || "",

  paymentTime:
    data.paymentTime || "",

  screenshotSent:
    data.screenshotSent || false,

  paymentVerified: false,

  // Portal Fields

  status: "pending_verification",

  registrationDate:
    new Date().toISOString(),

  registrationFee: 199,

  currentStage: "Registered",

  progressHistory: [
    {
      stage: "Registered",
      date: new Date().toISOString()
    }
  ],

  mentorAssigned: false,

  mentorId: null,

  mentorName: null,

  mentorNotes: ""

});
};