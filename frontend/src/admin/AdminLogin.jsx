import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("admin", JSON.stringify(response.data));
      toast.success(response.data.message);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.errors ||
            error.response.data.message ||
            "Admin login failed."
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
                  Admin Access
                </p>
                <h1 className="text-2xl font-semibold text-white">CourseHaven</h1>
              </div>
            </Link>

            <div className="mt-16 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
                <FiShield />
                Secure admin workspace
              </div>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Step back into the control room with a cleaner admin sign in.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Manage courses, review your catalog, and keep your learning
                platform sharp from one focused dashboard.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Admin workflow</p>
                <h3 className="mt-2 text-xl font-semibold">Create and update faster</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Jump straight into course creation, editing, and catalog management.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Protected session</p>
                <h3 className="mt-2 text-xl font-semibold">Built for admin access</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Keep management routes separate from the student experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
                  Admin Login
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Welcome back
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Log in to access your admin dashboard and course controls.
                </p>
              </div>
              <Link
                to="/admin/signup"
                className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Create admin
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
                  placeholder="admin@coursehaven.com"
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
                {isSubmitting ? "Signing in..." : "Login to Admin"}
                <FiArrowRight />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
              <span>Need an admin account first?</span>
              <div className="flex gap-3">
                <Link to="/admin/signup" className="text-orange-300 transition hover:text-orange-200">
                  Admin signup
                </Link>
                <Link to="/courses" className="transition hover:text-white">
                  Browse courses
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminLogin;
