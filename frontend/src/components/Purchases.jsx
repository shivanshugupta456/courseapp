import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiBookOpen, FiLogOut, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { readStoredJson } from "../utils/storage";
import { BACKEND_URL } from "../utils/utils";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = readStoredJson("user");
  const token = user?.token;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
    navigate("/login");
  }, [navigate, token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchases(response.data.courseData || []);
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading purchases...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
              <FiShoppingBag className="text-xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Learner Area</p>
              <h1 className="text-2xl font-semibold text-white">My Purchases</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
            >
              <FiArrowLeft />
              Back to Courses
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                <FiLogOut />
                Logout
              </button>
            )}
          </div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Owned Courses</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Revisit everything you already paid for in one cleaner space.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Keep track of your purchased content and jump back into the courses you
                own without digging around the platform.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/60 px-6 py-5">
              <p className="text-sm text-slate-400">Your library</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{purchases.length}</h3>
              <p className="mt-2 text-sm text-slate-400">Purchased courses</p>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        {purchases.length > 0 ? (
          <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {purchases.map((purchase) => (
              <div
                key={purchase._id || purchase.title}
                className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900 shadow-lg shadow-black/20"
              >
                <img
                  className="h-52 w-full object-cover"
                  src={purchase.image?.url || "https://via.placeholder.com/200"}
                  alt={purchase.title}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-white">{purchase.title}</h3>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Owned
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {purchase.description?.length > 130
                      ? `${purchase.description.slice(0, 130)}...`
                      : purchase.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Paid</p>
                      <p className="mt-1 text-lg font-semibold text-orange-300">Rs. {purchase.price}</p>
                    </div>
                    <FiBookOpen className="text-xl text-sky-300" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="mt-8 rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center">
            <FiShoppingBag className="mx-auto text-3xl text-orange-300" />
            <h3 className="mt-4 text-2xl font-semibold text-white">You have no purchases yet</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore the course library and add your first course to start building your learning collection.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
            >
              Browse Courses
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

export default Purchases;
