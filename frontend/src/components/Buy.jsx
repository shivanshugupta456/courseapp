import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Buy() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 📦 Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/course/${courseId}`
        );
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

  // 💰 Dummy purchase (no Stripe)
  const handlePurchase = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${BACKEND_URL}/order`,
        {
          courseId: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Course Purchased Successfully 🎉");
      navigate("/purchases");
    } catch (error) {
      console.log(error);
      toast.error("Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
          <p className="text-lg font-semibold">{error}</p>
          <Link
            to="/courses"
            className="mt-3 block text-center bg-orange-500 text-white py-2 rounded"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // ⏳ Loading
  if (loading) {
    return (
      <h1 className="text-center mt-20 text-gray-600">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        
        <h1 className="text-xl font-bold mb-4">Buy Course</h1>

        <img
          src={course.image?.url || "https://via.placeholder.com/300"}
          alt={course.title}
          className="w-full h-40 object-cover rounded mb-4"
        />

        <h2 className="text-lg font-semibold">{course.title}</h2>

        <p className="text-gray-500 mt-2">
          {course.description || "No description"}
        </p>

        <p className="text-xl font-bold text-green-600 mt-4">
          ₹{course.price}
        </p>

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default Buy;