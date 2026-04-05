import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Fetch courses
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

  // Logout
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

  // Slider settings
  const settings = {
    dots: true,
    infinite: courses.length > 3,
    speed: 500,
    slidesToShow: Math.min(4, courses.length || 1),
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, courses.length || 1),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, courses.length || 1),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 text-white min-h-screen">
      <div className="container mx-auto px-4">

        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">
              CourseHaven
            </h1>
          </div>

          <div className="space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="border px-4 py-2 rounded hover:bg-white hover:text-black duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="border px-4 py-2 rounded">
                  Login
                </Link>
                <Link to="/signup" className="border px-4 py-2 rounded">
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl font-bold text-orange-500">
            CourseHaven
          </h1>
          <p className="text-gray-400 mt-4">
            Sharpen your skills with expert courses 🚀
          </p>

          <div className="mt-6 space-x-4">
            <Link
              to="/courses"
              className="bg-green-500 px-6 py-3 rounded hover:bg-white hover:text-black duration-300"
            >
              Explore Courses
            </Link>
          </div>
        </section>

        {/* Slider Section */}
        <section className="py-10">
          {courses.length === 0 ? (
            <p className="text-center text-gray-400">
              Loading courses...
            </p>
          ) : (
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course._id} className="p-4">
                  <div className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                    <img
                      className="h-40 w-full object-cover"
                      src={
                        course.image?.url ||
                        "https://via.placeholder.com/300"
                      }
                      alt="course"
                    />
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-bold">
                        {course.title}
                      </h2>
                      <Link
                        to={`/buy/${course._id}`}
                        className="inline-block mt-4 bg-orange-500 px-4 py-2 rounded hover:bg-blue-500"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-gray-700 mt-10">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">

            <div>
              <h2 className="text-xl text-orange-500 font-bold mb-2">
                CourseHaven
              </h2>
              <div className="flex justify-center md:justify-start gap-4 mt-3">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Links</h3>
              <p className="text-gray-400">YouTube</p>
              <p className="text-gray-400">Telegram</p>
              <p className="text-gray-400">GitHub</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                © 2026 All Rights Reserved
              </h3>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;