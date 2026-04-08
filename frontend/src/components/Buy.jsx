import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCheckCircle, FiLock, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readStoredJson } from "../utils/storage";
import { BACKEND_URL } from "../utils/utils";

function Buy() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const user = readStoredJson("user");
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/${courseId}`, {
          withCredentials: true,
        });
        setCourse(res.data.course || {});
      } catch (err) {
        console.log(err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);

      await axios.post(
        `${BACKEND_URL}/order`,
        {
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Course purchased successfully");
      navigate("/purchases");
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed");
    } finally {
      setIsPurchasing(false);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="w-full max-w-lg rounded-[2rem] border border-red-500/20 bg-slate-900 p-8 text-center shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">{error}</p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
        >
          <FiArrowLeft />
          Back to Courses
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">
            <img
              src={course.image?.url || "https://via.placeholder.com/300"}
              alt={course.title}
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Course Checkout</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">{course.title}</h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                {course.description || "No description available for this course yet."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-5">
                  <FiShoppingBag className="text-xl text-orange-300" />
                  <h3 className="mt-4 text-xl font-semibold">Single purchase</h3>
                  <p className="mt-2 text-sm text-slate-400">One time access to this course.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-5">
                  <FiLock className="text-xl text-sky-300" />
                  <h3 className="mt-4 text-xl font-semibold">Protected checkout</h3>
                  <p className="mt-2 text-sm text-slate-400">Available to signed-in learners only.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-5">
                  <FiCheckCircle className="text-xl text-emerald-300" />
                  <h3 className="mt-4 text-xl font-semibold">Instant access</h3>
                  <p className="mt-2 text-sm text-slate-400">The course appears in your purchases right away.</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Order Summary</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Buy this course</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Review the details and complete your purchase to add this course to your personal library.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Course</span>
                <span className="text-sm font-medium text-white">{course.title}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-400">Price</span>
                <span className="text-2xl font-semibold text-orange-300">Rs. {course.price}</span>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="mt-8 w-full rounded-2xl bg-orange-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPurchasing ? "Processing purchase..." : "Buy Now"}
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-slate-500">
              After payment, this course will appear in your purchases page immediately.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Buy;
