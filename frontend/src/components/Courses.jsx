import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Check login
  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fetch courses (FINAL FIX)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("API:", `${BACKEND_URL}/api/course/courses`);

        const response = await axios.get(
          `${BACKEND_URL}/api/course/courses`
        );

        setCourses(response.data?.courses || []);
      } catch (error) {
        console.log("error in fetchCourses ", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Logout FIX
  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/user/logout`); // 🔥 FIXED API

      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="logo" className="rounded-full h-12 w-12" />
        </div>

        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>

            <li className="mb-4 text-blue-500 flex items-center">
              <FaDiscourse className="mr-2" /> Courses
            </li>

            <li className="mb-4">
              <Link to="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>

            <li className="mb-4 flex items-center">
              <IoMdSettings className="mr-2" /> Settings
            </li>

            <li>
              {isLoggedIn ? (
                <Link to="/" onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Courses</h1>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10"
              />
              <button className="h-10 border border-gray-300 rounded-r-full px-4">
                <FiSearch />
              </button>
            </div>

            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">
              No course available
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={
                      course.image?.url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={course.title}
                    className="rounded mb-4 w-full h-40 object-cover"
                  />

                  <h2 className="font-bold text-lg mb-2">
                    {course.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {course.description?.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description || "No description"}
                  </p>

                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}
                    </span>
                  </div>

                  <Link
                    to={`/buy/${course._id}`}
                    className="block text-center bg-orange-500 text-white py-2 rounded hover:bg-blue-900"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;