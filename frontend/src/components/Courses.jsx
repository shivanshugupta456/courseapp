import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { FiBookOpen, FiFilter, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });

        const courseList = response.data?.courses || [];
        setCourses(courseList);
        setFilteredCourses(courseList);
      } catch (error) {
        console.log("error in fetchCourses ", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      setFilteredCourses(courses);
      return;
    }

    setFilteredCourses(
      courses.filter((course) => {
        return (
          course.title?.toLowerCase().includes(normalized) ||
          course.description?.toLowerCase().includes(normalized)
        );
      })
    );
  }, [courses, searchTerm]);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CourseHaven" className="h-12 w-12 rounded-2xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Browse</p>
              <h1 className="text-2xl font-semibold text-white">Course Library</h1>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/purchases"
              className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
            >
              Purchases
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Login
              </Link>
            )}
          </div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Explore</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Discover courses designed to feel worth your time.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Search by topic, compare options quickly, and jump into the course that
                fits your current goal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Available now</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{courses.length}</h3>
                <p className="mt-2 text-sm text-slate-400">Courses in the library</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Student ready</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">Curated</h3>
                <p className="mt-2 text-sm text-slate-400">Cleaner course discovery</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xl">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-12 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              />
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm">
                <FiFilter />
                Filtered view
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm">
                <FaCircleUser />
                Learner mode
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center text-slate-400">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center">
              <FiBookOpen className="mx-auto text-3xl text-orange-300" />
              <h3 className="mt-4 text-2xl font-semibold text-white">No course matched your search</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Try a broader keyword or clear the search to browse everything again.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-slate-700"
                >
                  <img
                    src={course.image?.url || "https://via.placeholder.com/300"}
                    alt={course.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-white">{course.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {course.description?.length > 130
                        ? `${course.description.slice(0, 130)}...`
                        : course.description || "No description"}
                    </p>

                    <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                        <p className="mt-1 text-lg font-semibold text-orange-300">Rs. {course.price}</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        Available now
                      </span>
                    </div>

                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-5 block rounded-2xl bg-orange-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-400"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Courses;
