import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiArrowRight, FiBookOpen, FiLogOut, FiPlayCircle, FiTrendingUp } from "react-icons/fi";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(res.data.courses || []);
      } catch (error) {
        console.log("Error fetching courses:", error);
        toast.error("Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const settings = {
    dots: true,
    infinite: courses.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, courses.length || 1),
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, courses.length || 1),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CourseHaven" className="h-12 w-12 rounded-2xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Learning Platform
              </p>
              <h1 className="text-2xl font-semibold text-white">CourseHaven</h1>
            </div>
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
            >
              Explore Courses
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                <FiLogOut />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-6 py-12 shadow-2xl shadow-black/30 sm:px-10 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_28%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-orange-300">
                Learn Better
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Build practical skills with courses that look and feel premium.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                Discover clean, focused learning paths, access your purchased content,
                and move from curiosity to confidence with a sharper course platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  Explore Courses
                  <FiArrowRight />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Start Free
                  <FiPlayCircle />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 p-5">
                  <FiBookOpen className="text-xl text-orange-300" />
                  <h3 className="mt-4 text-2xl font-semibold">{courses.length}+</h3>
                  <p className="mt-2 text-sm text-slate-400">Courses ready to explore</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 p-5">
                  <FiTrendingUp className="text-xl text-sky-300" />
                  <h3 className="mt-4 text-2xl font-semibold">Focused</h3>
                  <p className="mt-2 text-sm text-slate-400">Cleaner learning journey</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 p-5">
                  <FiPlayCircle className="text-xl text-emerald-300" />
                  <h3 className="mt-4 text-2xl font-semibold">On Demand</h3>
                  <p className="mt-2 text-sm text-slate-400">Learn at your pace</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Why CourseHaven</p>
                <h3 className="mt-4 text-2xl font-semibold">A more intentional course experience</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Browse structured content, manage your purchases, and move through a
                  product that feels designed instead of thrown together.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-orange-500/20 bg-orange-500/10 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-orange-200">Admin Ready</p>
                <h3 className="mt-4 text-2xl font-semibold">Built for creators too</h3>
                <p className="mt-4 text-sm leading-7 text-orange-50/80">
                  Your admin panel is now aligned with the same premium product style.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-lg shadow-black/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured Courses</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Start with the most inviting picks</h3>
            </div>
            <Link to="/courses" className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
              View all courses
            </Link>
          </div>

          <div className="mt-8">
            {courses.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-700 bg-slate-950/60 px-6 py-12 text-center text-slate-400">
                Loading featured courses...
              </div>
            ) : (
              <Slider {...settings}>
                {courses.map((course) => (
                  <div key={course._id} className="px-3 pb-3">
                    <div className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-slate-700">
                      <img
                        className="h-48 w-full object-cover"
                        src={course.image?.url || "https://via.placeholder.com/300"}
                        alt={course.title}
                      />
                      <div className="p-5">
                        <h4 className="text-xl font-semibold text-white">{course.title}</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          {course.description?.length > 110
                            ? `${course.description.slice(0, 110)}...`
                            : course.description}
                        </p>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-lg font-semibold text-orange-300">
                            Rs. {course.price}
                          </span>
                          <Link
                            to={`/buy/${course._id}`}
                            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>

        <footer className="mt-10 grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 px-6 py-8 text-sm text-slate-400 md:grid-cols-3">
          <div>
            <h4 className="text-xl font-semibold text-white">CourseHaven</h4>
            <p className="mt-3 leading-6">
              A cleaner platform for learners and creators who want better courses.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Explore</h4>
            <div className="mt-3 space-y-2">
              <p>Courses</p>
              <p>Purchases</p>
              <p>Admin Dashboard</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="mt-3 flex gap-4 text-lg text-slate-300">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
            <p className="mt-4">Copyright 2026 CourseHaven. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
