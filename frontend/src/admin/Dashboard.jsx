import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiGrid,
  FiHome,
  FiLogOut,
  FiPlusCircle,
  FiSettings,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function Dashboard() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("admin"));
  const adminProfile = adminData?.admin;

  const stats = [
    {
      title: "Course Control",
      value: "Manage",
      description: "Update, review, and organize your full catalog.",
      icon: FiBookOpen,
      accent: "from-amber-400 to-orange-500",
    },
    {
      title: "Growth View",
      value: "Active",
      description: "Keep your admin area sharp and ready for new launches.",
      icon: FiTrendingUp,
      accent: "from-sky-400 to-blue-500",
    },
    {
      title: "Team Space",
      value: "Admin",
      description: "Your control center for every teaching workflow.",
      icon: FiUsers,
      accent: "from-emerald-400 to-teal-500",
    },
  ];

  const quickActions = [
    {
      title: "Create a New Course",
      description: "Add fresh content, upload media, and publish your next offer.",
      to: "/admin/create-course",
      icon: FiPlusCircle,
      style:
        "bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400",
    },
    {
      title: "Manage Existing Courses",
      description: "Edit details, review content, and remove outdated listings.",
      to: "/admin/our-courses",
      icon: FiGrid,
      style:
        "border border-slate-700 bg-slate-900/70 text-slate-100 hover:border-slate-500 hover:bg-slate-800",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    } finally {
      localStorage.removeItem("admin");
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="relative overflow-hidden border-b border-slate-800 bg-slate-900 lg:min-h-screen lg:w-80 lg:border-r lg:border-b-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.16),_transparent_30%)]" />
          <div className="relative flex h-full flex-col p-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CourseHaven" className="h-12 w-12 rounded-2xl" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Admin Panel
                </p>
                <h1 className="text-2xl font-semibold text-white">CourseHaven</h1>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-lg font-bold text-slate-950">
                  {adminProfile?.firstName?.[0] || "A"}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Signed in as</p>
                  <h2 className="text-lg font-semibold">
                    {adminProfile?.firstName
                      ? `${adminProfile.firstName} ${adminProfile?.lastName || ""}`
                      : "Admin"}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {adminProfile?.email || "coursehaven admin"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="mt-8 space-y-3">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-orange-200 transition hover:bg-orange-500/20"
              >
                <FiGrid className="text-lg" />
                <span>Dashboard Overview</span>
              </Link>
              <Link
                to="/admin/create-course"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3 text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/70"
              >
                <FiPlusCircle className="text-lg" />
                <span>Create Course</span>
              </Link>
              <Link
                to="/admin/our-courses"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3 text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/70"
              >
                <FiBookOpen className="text-lg" />
                <span>Our Courses</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3 text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/70"
              >
                <FiHome className="text-lg" />
                <span>Back to Home</span>
              </Link>
            </nav>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-center gap-3">
                <FiSettings className="text-lg text-orange-300" />
                <h3 className="text-lg font-semibold">Admin Focus</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Keep your dashboard clean, update courses regularly, and make the
                admin experience feel as polished as the student side.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-auto flex items-center justify-center gap-3 rounded-2xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-400"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_left,_rgba(249,115,22,0.18),_transparent_28%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                  Welcome Back
                </p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Run your course business from one sharp control room.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                  Create courses, manage updates, and keep your teaching platform
                  organized with a cleaner admin workflow.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/admin/create-course"
                  className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
                >
                  Launch New Course
                </Link>
                <Link
                  to="/admin/our-courses"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Open Course Library
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stats.map(({ title, value, description, icon: Icon, accent }) => (
              <div
                key={title}
                className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      {value}
                    </h3>
                  </div>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-xl text-slate-950`}
                  >
                    <Icon />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-lg shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                    Quick Actions
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Move faster inside the admin panel
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {quickActions.map(({ title, description, to, icon: Icon, style }) => (
                  <Link
                    key={title}
                    to={to}
                    className={`group rounded-[1.5rem] p-5 transition ${style}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold">{title}</h4>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-inherit/80">
                          {description}
                        </p>
                      </div>
                      <Icon className="mt-1 text-2xl transition group-hover:scale-110" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-lg shadow-black/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Workflow
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Suggested admin routine
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-orange-300">Step 01</p>
                  <h4 className="mt-1 text-lg font-semibold">Create or update</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Add a new course or polish the existing details before traffic
                    starts coming in.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-sky-300">Step 02</p>
                  <h4 className="mt-1 text-lg font-semibold">Review the library</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Check pricing, descriptions, and images so the catalog stays
                    consistent.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm text-emerald-300">Step 03</p>
                  <h4 className="mt-1 text-lg font-semibold">Stay in control</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Use the dashboard as your home base for publishing and admin
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
