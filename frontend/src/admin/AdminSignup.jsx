import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        `${BACKEND_URL}/admin/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.errors ||
            error.response.data.message ||
            "Admin signup failed."
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
                Create an admin account
              </div>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Set up a polished admin identity for the CourseHaven workspace.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Join the control panel, manage course publishing, and keep your
                product side as intentional as the student experience.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Admin onboarding</p>
                <h3 className="mt-2 text-xl font-semibold">Built for management</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Create your admin profile and get access to your private dashboard.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Fast launch</p>
                <h3 className="mt-2 text-xl font-semibold">Start shipping courses</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Move from sign up to course creation in a much cleaner workflow.
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
                  Admin Signup
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Create your admin account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Use a secure email and password so your dashboard stays protected.
                </p>
              </div>
              <Link
                to="/admin/login"
                className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Admin login
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium text-slate-300">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium text-slate-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a secure password"
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
                {isSubmitting ? "Creating account..." : "Create Admin Account"}
                <FiArrowRight />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminSignup;
