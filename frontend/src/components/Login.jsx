import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.errors ||
            error.response.data.message ||
            "Login failed."
        );
      } else {
        setErrorMessage("Unable to connect to the server. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <section className="relative flex flex-1 overflow-hidden border-b border-slate-800 px-6 py-8 lg:min-h-screen lg:items-center lg:border-r lg:border-b-0 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_30%)]" />
          <div className="relative w-full">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="CourseHaven" className="h-12 w-12 rounded-2xl" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Member Access
                </p>
                <h1 className="text-2xl font-semibold text-white">CourseHaven</h1>
              </div>
            </Link>

            <div className="mt-16 max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                Learn with clarity
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Return to your learning space and keep building real skills.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Access paid content, continue your purchased courses, and explore
                a sharper course experience from one place.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
                  Login
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Welcome back</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Log in to view purchases, access courses, and continue learning.
                </p>
              </div>
              <Link
                to="/signup"
                className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Create account
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  placeholder="name@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Login"}
                <FiArrowRight />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
