import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiEdit3,
  FiPlusCircle,
  FiTrash2,
} from "react-icons/fi";
import { BACKEND_URL } from "../utils/utils";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  useEffect(() => {
    if (!token) {
      toast.error("Please login to admin");
      navigate("/admin/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.log("Error in deleting course ", error);
      toast.error(error.response?.data?.errors || "Error in deleting course");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_28%),radial-gradient(circle_at_left,_rgba(249,115,22,0.16),_transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                Course Library
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Manage every course from one cleaner workspace.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Review your catalog, update course content, and remove outdated
                listings with a more polished admin view.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>
              <Link
                to="/admin/create-course"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
              >
                <FiPlusCircle />
                Create Course
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-[1.75rem] border border-slate-800 bg-slate-900/80 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
              <FiBookOpen className="text-xl" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Total Courses
              </p>
              <h2 className="text-2xl font-semibold text-white">{courses.length}</h2>
            </div>
          </div>
          <p className="hidden text-sm text-slate-400 md:block">
            Keep your course cards clean, current, and ready to convert.
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900 shadow-lg shadow-black/20"
              >
                <div className="h-52 w-full bg-slate-800">
                  <img
                    src={course?.image?.url}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Active
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {course.description.length > 180
                      ? `${course.description.slice(0, 180)}...`
                      : course.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Price
                      </p>
                      <p className="mt-1 text-lg font-semibold text-orange-300">
                        Rs. {course.price}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">Editable anytime</p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      to={`/admin/update-course/${course._id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      <FiEdit3 />
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">No courses yet</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Start by creating your first course and your catalog will appear here.
            </p>
            <Link
              to="/admin/create-course"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
            >
              <FiPlusCircle />
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurCourses;
