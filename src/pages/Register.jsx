import { registerStudent } from "../services/authService";

import { useState } from "react";

  const COURSES = [
  "B.Com.",
  "B.Com. (Hons.)",
  "B.A. (Hons.) Economics",
  "Bachelor of Business Administration in Financial Investment Analysis (BBA-FIA)",
  "B.A. (Hons.) Business Economics (BBE)",
  "Bachelor of Management Studies (BMS)",
  "B.A. (Hons.) English",
  "B.A. (Hons.) Hindi",
  "B.A. (Hons.) Applied Psychology",
  "B.A. (Hons.) Psychology",
  "B.A. (Hons.) Geography",
  "B.A. (Hons.) History",
  "B.A. (Hons.) Humanities and Social Sciences",
  "B.A. (Hons.) Journalism",
  "B.A. (Hons.) Multi-Media and Mass Communication",
  "Five Year Integrated Program in Journalism",
  "B.A. (Hons.) Philosophy",
  "B.A. (Hons.) Political Science",
  "B.A. (Hons.) Sociology",
  "B.Sc. (Hons.) Botany",
  "B.Sc. (Hons.) Chemistry",
  "B.Sc. (Hons.) Zoology",
  "B.Sc. (Hons.) Computer Science",
  "B.Sc. (Hons.) Mathematics",
  "B.Sc. (Hons.) Physics",
  "B.Tech. Information Technology and Mathematical Innovations",
  "B.Sc. (Prog.) Physical Science with Chemistry",
  "B.A. (Program)"
];
  
export default function Register() {
const [step, setStep] = useState(1);
  const [brochureRead, setBrochureRead] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] =
  useState(false);

const [countdown, setCountdown] =
  useState(7);
  const [form, setForm] = useState({
    email: "",
    password: "",

    fullName: "",
    phone: "",
    gender: "",
    category: "",
    quota: "",

    stream: "",
    cuetScore: "",

    targetedCourses: [],

    firstPreference: "",
    secondPreference: "",
    thirdPreference: "",
    fourthPreference: "",
    fifthPreference: "",

    priority: "",

    additionalNotes: "",

    transactionId: "",
    paymentDate: "",
    paymentTime: "",

    screenshotSent: false,
    declarationAccepted: false,
dataConsent: false
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
 
const handleSubmit = async () => {

  try {

    await registerStudent(form);

    setShowSuccess(true);

    let seconds = 7;

    const timer = setInterval(() => {

      seconds--;

      setCountdown(seconds);

      if (seconds <= 0) {

        clearInterval(timer);

        window.location.href = "/";

      }

    }, 1000);

  } catch (error) {

    alert(error.message);

  }

};

const canProceed = () => {

  if (step === 1) {
    return brochureRead && agreed;
  }

  if (step === 2) {
    return (
      form.email &&
      form.password &&
      form.fullName &&
      form.phone &&
      form.gender &&
      form.category &&
      form.quota
    );
  }

  if (step === 3) {

  return (
    form.stream &&
    form.cuetScore
  );

}

if (step === 4) {

  const requiredFilled =
  form.targetedCourses.length > 0 &&
  form.firstPreference &&
  form.priority;

  const preferences = [
  form.firstPreference,
  form.secondPreference,
  form.thirdPreference
].filter(
  pref =>
    pref &&
    pref !== "NONE"
);

const uniquePreferences =
  new Set(preferences).size === preferences.length;

  return (
    requiredFilled &&
    uniquePreferences
  );

}
if (step === 5) {

  return (
    form.transactionId &&
    form.paymentDate &&
    form.paymentTime &&
    form.screenshotSent
  );

}
if (step === 6) {

  return (
    form.declarationAccepted &&
    form.dataConsent
  );

}

return true;
};

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

        <div className="mb-8">

<div className="mb-8 overflow-hidden rounded-2xl shadow-lg">

  <img
    src="/banner.jpg"
    alt="MARGDARSHAN 2026"
    className="
      w-full
      h-auto
      object-cover
    "
  />

</div>

          <h1 className="text-3xl font-bold">
            MARGDARSHAN 2026
          </h1>

          <p className="text-slate-500">
            Step {step} of 6
          </p>

        </div>

        {/* Progress Bar */}

        <div className="w-full bg-slate-200 rounded-full h-3 mb-8">

          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{
              width: `${(step / 6) * 100}%`
            }}
          />

        </div>

        {/* Step Content */}

        {step === 1 && (

  <div>

    <div className="text-center mb-8">

      <h2 className="text-4xl font-bold mb-3">
        MARGDARSHAN 2026
      </h2>

      <p className="text-xl text-slate-600">
        1:1 DU Admission Mentorship Program
      </p>

    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">

      <p className="leading-7 text-slate-700">

        MARGDARSHAN 2026 is a personalised
        1-on-1 mentorship initiative by
        <strong> CUETbyNTA </strong>
        to guide CUET-UG 2026 aspirants through
        the Delhi University CSAS Admission Process,
        including Preference Sheet Planning,
        Seat Allocation Strategy,
        College/Course Selection and
        Real-Time Support.

      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-4 mb-6">

      <div className="bg-white border rounded-xl p-4 text-center">

        <p className="text-slate-500 text-sm">
          Registration Fee
        </p>

        <h3 className="text-3xl font-bold text-green-600">
          ₹199
        </h3>

      </div>

      <div className="bg-white border rounded-xl p-4 text-center">

        <p className="text-slate-500 text-sm">
          Deadline
        </p>

        <h3 className="text-xl font-bold text-red-600">
          1 July 2026
        </h3>

      </div>

      <div className="bg-white border rounded-xl p-4 text-center">

        <p className="text-slate-500 text-sm">
          Seats
        </p>

        <h3 className="text-xl font-bold text-orange-600">
          Limited
        </h3>

      </div>

    </div>

    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">

      <p className="font-medium">

        ⚠️ Seats are limited and will be allocated
        on a First Come, First Served basis.

      </p>

    </div>

    <div className="bg-slate-50 rounded-xl p-5 mb-6">

      <a
        href="YOUR_BROCHURE_LINK"
        target="_blank"
        rel="noreferrer"
        className="
          text-blue-600
          font-semibold
          underline
        "
      >
        📖 View Full Brochure
      </a>

      <p className="text-sm text-slate-500 mt-2">

        Please read the brochure carefully before
        proceeding.

      </p>

    </div>

    <div className="space-y-4">

      <label className="flex gap-3">

        <input
          type="checkbox"
          checked={brochureRead}
          onChange={(e) =>
            setBrochureRead(
              e.target.checked
            )
          }
        />

        I have read the brochure.

      </label>

      <label className="flex gap-3">

        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) =>
            setAgreed(
              e.target.checked
            )
          }
        />

        I agree to the Terms & Policies
        of the MARGDARSHAN 2026 Program.

      </label>

    </div>

  </div>

)}

        {step === 2 && (

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Personal Details
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({
            ...form,
            fullName: e.target.value
          })
        }
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="WhatsApp Number"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value
          })
        }
        className="border rounded-lg p-3"
      />

      <select
        value={form.gender}
        onChange={(e) =>
          setForm({
            ...form,
            gender: e.target.value
          })
        }
        className="border rounded-lg p-3"
      >
        <option value="">
          Select Gender
        </option>

        <option value="Male">
          Male
        </option>

        <option value="Female">
          Female
        </option>
      </select>

      <select
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value
          })
        }
        className="border rounded-lg p-3"
      >
        <option value="">
          Select Category
        </option>

        <option value="General">
          General (UR)
        </option>

        <option value="OBC-NCL">
          OBC-NCL
        </option>

        <option value="SC">
          SC
        </option>

        <option value="ST">
          ST
        </option>

        <option value="EWS">
          EWS
        </option>

      </select>

    </div>

    <div className="mt-4">

      <select
        value={form.quota}
        onChange={(e) =>
          setForm({
            ...form,
            quota: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      >

        <option value="">
          Applying under any quota?
        </option>

        <option value="NONE">
          NONE
        </option>

        <option value="ECA">
          ECA
        </option>

        <option value="Sports">
          Sports
        </option>

        <option value="CW">
          CW
        </option>

        <option value="KM">
          KM
        </option>

        <option value="Single Girl Child">
          Single Girl Child
        </option>

        <option value="Orphan">
          Orphan Quota
        </option>

        <option value="PwBD">
          PwBD
        </option>

        <option value="PMSSS">
          PMSSS
        </option>

        <option value="SS">
          SS
        </option>

        <option value="WQ">
          WQ
        </option>

      </select>

    </div>

  </div>

)}

        {step === 3 && (

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Academic Details
    </h2>

    <p className="text-slate-500 mb-6">
      Fill this section carefully.
    </p>

    <div className="space-y-4">

      <select
        value={form.stream}
        onChange={(e) =>
          setForm({
            ...form,
            stream: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      >
        <option value="">
          Class 12 Stream
        </option>

        <option value="Arts">
          Arts
        </option>

        <option value="Commerce">
          Commerce
        </option>

        <option value="Science">
          Science
        </option>

      </select>

      <input
        type="number"
        placeholder="CUET Score (Expected if result not declared)"
        value={form.cuetScore}
        onChange={(e) =>
          setForm({
            ...form,
            cuetScore: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      />

    </div>

  </div>

)}

        {step === 4 && (

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Course Preferences
    </h2>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">

  <p className="text-blue-700">

    We recommend selecting at least
    <strong> 3 courses </strong>
    to improve admission opportunities and
    allow better preference sheet planning.

  </p>

</div>

    <h3 className="font-semibold mb-3">
      Courses You Are Targeting
    </h3>

    <div className="grid md:grid-cols-2 gap-2 mb-8">

      {COURSES.map(course => (

        <label
          key={course}
          className="flex gap-2"
        >

          <input
            type="checkbox"
            checked={form.targetedCourses.includes(course)}
            onChange={(e) => {

              if (e.target.checked) {

                setForm({
                  ...form,
                  targetedCourses: [
                    ...form.targetedCourses,
                    course
                  ]
                });

              } else {

                setForm({
                  ...form,
                  targetedCourses:
                    form.targetedCourses.filter(
                      c => c !== course
                    )
                });

              }

            }}
          />

          {course}

        </label>

      ))}

    </div>

    <div className="space-y-4">



      <select
        value={form.firstPreference}
        onChange={(e) =>
          setForm({
            ...form,
            firstPreference: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select First Preference
        </option>

        {form.targetedCourses.map(course => (
  <option
    key={course}
    value={course}
  >
    {course}
  </option>
))}

      </select>

      <select
        value={form.secondPreference}
        onChange={(e) =>
          setForm({
            ...form,
            secondPreference: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select Second Preference
        </option>
<option value="NONE">
  NONE
</option>
        {form.targetedCourses.map(course => (
  <option
    key={course}
    value={course}
  >
    {course}
  </option>
))}

      </select>

      <select
        value={form.thirdPreference}
        onChange={(e) =>
          setForm({
            ...form,
            thirdPreference: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select Third Preference
        </option>
<option value="NONE">
  NONE
</option>
        {form.targetedCourses.map(course => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}

      </select>

      <select
        value={form.fourthPreference}
        onChange={(e) =>
          setForm({
            ...form,
            fourthPreference: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select Fourth Preference (if any)
        </option>
<option value="NONE">
  NONE
</option>
        {form.targetedCourses.map(course => (
  <option
    key={course}
    value={course}
  >
    {course}
  </option>
))}

      </select>

      <select
        value={form.fifthPreference}
        onChange={(e) =>
          setForm({
            ...form,
            fifthPreference: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select Fifth Preference (if any)
        </option>
<option value="NONE">
  NONE
</option>


        {form.targetedCourses.map(course => (
  <option
    key={course}
    value={course}
  >
    {course}
  </option>
))}

      </select>
{
  form.firstPreference &&
  form.secondPreference &&
  form.firstPreference !== "NONE" &&
  form.secondPreference !== "NONE" &&
  form.firstPreference === form.secondPreference && (

    <p className="text-red-600 text-sm">
      First and Second Preference cannot be the same.
    </p>

  )
}

{
  form.firstPreference &&
  form.thirdPreference &&
  form.firstPreference !== "NONE" &&
  form.thirdPreference !== "NONE" &&
  form.firstPreference === form.thirdPreference && (

    <p className="text-red-600 text-sm">
      First and Third Preference cannot be the same.
    </p>

  )
}

{
  form.secondPreference &&
  form.thirdPreference &&
  form.secondPreference !== "NONE" &&
  form.thirdPreference !== "NONE" &&
  form.secondPreference === form.thirdPreference && (

    <p className="text-red-600 text-sm">
      Second and Third Preference cannot be the same.
    </p>

  )
}
      <select
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Your Priority
        </option>

        <option value="College">
          College
        </option>

        <option value="Course">
          Course
        </option>

        <option value="Both">
          Both
        </option>

      </select>

      <textarea
        rows="5"
        placeholder="Anything more you want to tell us?"
        value={form.additionalNotes}
        onChange={(e) =>
          setForm({
            ...form,
            additionalNotes: e.target.value
          })
        }
        className="border rounded-lg p-3 w-full"
      />

    </div>

  </div>

)}

        {step === 5 && (

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Payment Window
    </h2>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">

      <p className="mb-2">
        To complete your registration, please follow the steps below:
      </p>

      <ol className="list-decimal ml-5 space-y-2">

        <li>
          Pay ₹199 using the QR Code below.
        </li>

        <li>
          Take a screenshot of the payment confirmation.
        </li>

        <li>
          Share the screenshot on WhatsApp:
          <strong> +91 8595123633</strong>
        </li>

        <li>
          Mention your Name and Transaction ID in WhatsApp.
        </li>

      </ol>

    </div>

    <div className="text-center mb-8">

      <img
        src="/qr.png"
        alt="Payment QR"
        className="
          w-72
          mx-auto
          rounded-xl
          shadow-lg
        "
      />

      <p className="mt-4 text-lg font-bold">
        Registration Fee: ₹199
      </p>

    </div>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="UPI Transaction ID"
        value={form.transactionId}
        onChange={(e) =>
          setForm({
            ...form,
            transactionId: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      />

      <input
        type="date"
        value={form.paymentDate}
        onChange={(e) =>
          setForm({
            ...form,
            paymentDate: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      />

      <input
        type="time"
        value={form.paymentTime}
        onChange={(e) =>
          setForm({
            ...form,
            paymentTime: e.target.value
          })
        }
        className="
          border
          rounded-lg
          p-3
          w-full
        "
      />

      <label className="flex gap-3">

        <input
          type="checkbox"
          checked={form.screenshotSent}
          onChange={(e) =>
            setForm({
              ...form,
              screenshotSent:
                e.target.checked
            })
          }
        />

        I have shared the payment screenshot
        on WhatsApp (+91 8595123633).

      </label>

    </div>

    <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-xl p-4">

      <p className="text-sm">

        <strong>Important:</strong>

        <br /><br />

        CUETbyNTA or any team member shall
        not be responsible for UPI failures,
        delays, double deductions or failed
        transactions arising from banking
        systems, technical issues or user-side
        errors.

        <br /><br />

        All payments are made at the user's
        own risk and responsibility.

      </p>

    </div>

  </div>

)}

        {step === 6 && (

  <div>

    <h2 className="text-2xl font-bold mb-6">
      Final Declaration
    </h2>

    <div className="bg-slate-50 rounded-xl p-6">

      <label className="flex gap-3 mb-4">

        <input
          type="checkbox"
          checked={form.declarationAccepted || false}
          onChange={(e) =>
            setForm({
              ...form,
              declarationAccepted:
                e.target.checked
            })
          }
        />

        <span>

          I hereby declare that all the
          information provided by me is
          correct to the best of my knowledge.

        </span>

      </label>

      <label className="flex gap-3">

        <input
          type="checkbox"
          checked={form.dataConsent || false}
          onChange={(e) =>
            setForm({
              ...form,
              dataConsent:
                e.target.checked
            })
          }
        />

        <span>

          I authorize CUETbyNTA and the
          MARGDARSHAN Team to use this
          information during any stage
          of my admission and counselling
          process.

        </span>

      </label>

    </div>

    <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5">

      <h3 className="font-bold mb-2">
        Registration Summary
      </h3>

      <p>
        <strong>Name:</strong> {form.fullName}
      </p>

      <p>
        <strong>Email:</strong> {form.email}
      </p>

      <p>
        <strong>CUET Score:</strong> {form.cuetScore}
      </p>

      <p>
        <strong>First Preference:</strong> {form.firstPreference}
      </p>

      <p>
        <strong>Transaction ID:</strong> {form.transactionId}
      </p>

    </div>

  </div>

)}

        {/* Navigation */}

        <div className="flex justify-between mt-10">

          {step > 1 ? (
            

            <button
              onClick={prevStep}
              className="
                bg-slate-200
                px-6
                py-3
                rounded-lg
              "
            >
              Previous
            </button>

          ) : (
            <div />
          )}

          {step < 6 && (

  <button
    onClick={nextStep}
    disabled={!canProceed()}
    className={`
      text-white
      px-6
      py-3
      rounded-lg

      ${
        canProceed()
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-400 cursor-not-allowed"
      }
    `}
  >
    Next
  </button>

)}

{step === 6 && (

  <button
    onClick={handleSubmit}
    disabled={!canProceed()}
    className={`
      text-white
      px-6
      py-3
      rounded-lg

      ${
        canProceed()
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gray-400"
      }
    `}
  >
    Submit Registration
  </button>

)}
        </div>

{showSuccess && (

  <div
    className="
      fixed
      inset-0
      bg-black/60
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        rounded-2xl
        p-8
        max-w-lg
        w-full
        mx-4
        text-center
        shadow-2xl
      "
    >

      <div className="text-6xl mb-4">
        🎉
      </div>

      <h2 className="text-3xl font-bold mb-4">

        Registration Successful

      </h2>

      <p className="text-slate-600 mb-6">

        Thank you for choosing
        <strong> CUETbyNTA</strong>.

        <br /><br />

        Your registration has been
        received successfully.

        <br /><br />

        Your profile will be verified
        within 24 hours.

        <br /><br />

        You will receive updates on
        WhatsApp after verification.

      </p>

      <div
        className="
          text-xl
          font-bold
          text-blue-600
          mb-6
        "
      >

        Redirecting in {countdown}s

      </div>

      <button
        onClick={() =>
          window.location.href = "/"
        }
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        Go to Login Page

      </button>

    </div>

  </div>

)}
      </div>

    </div>
  );
  
}