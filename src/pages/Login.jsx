
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginService";

import {
  GraduationCap,
  Mail,
  Lock
} from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const userData = await loginUser(
        email,
        password
      );

      if (userData.role === "admin") {
        navigate("/admin");
      }

      else if (userData.role === "mentor") {
        navigate("/mentor");
      }

      else {
        navigate("/student");
      }

    } catch (error) {

      alert(
        error.code +
        " : " +
        error.message
      );

    }

  };

  return (

    <div className="min-h-screen flex">

      {/* Left Side */}

      <div
        className="
          hidden
          lg:flex
          w-1/2
          bg-gradient-to-br
          from-blue-700
          via-indigo-700
          to-purple-700
          text-white
          items-center
          justify-center
          p-12
        "
      >

        <div>

          <h1 className="text-5xl font-bold mb-4">
            MARGDARSHAN 2026
          </h1>

          <p className="text-xl text-blue-100">

            Portal for Students,
            Mentors & Administrators
            

          </p>

          <div className="mt-10">

            <div className="flex items-center gap-3 mb-4">
              ✓ Admission Tracking
            </div>

            <div className="flex items-center gap-3 mb-4">
              ✓ Mentor Assignment
            </div>

            <div className="flex items-center gap-3 mb-4">
              ✓ Progress Monitoring
            </div>

            <div className="flex items-center gap-3">
              Forgot Password? Write us at cuetbynta@yahoo.com
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div
        className="
          w-full
          lg:w-1/2
          flex
          items-center
          justify-center
          bg-slate-100
          p-8
        "
      >

        <div
          className="
            bg-white
            shadow-xl
            rounded-3xl
            p-10
            w-full
            max-w-md
          "
        >

          <div className="text-center mb-8">

            <div
              className="
                w-16
                h-16
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              "
            >
              <GraduationCap size={30} />
            </div>

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to continue
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="mb-5">

              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-3
                    top-3.5
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    pl-10
                    pr-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                  placeholder="Enter email"
                />

              </div>

            </div>

            <div className="mb-6">

              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="
                    absolute
                    left-3
                    top-3.5
                    text-slate-400
                  "
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    pl-10
                    pr-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                  placeholder="Enter password"
                />

              </div>

            </div>

            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}