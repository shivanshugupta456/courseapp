import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiImage, FiLayers, FiRefreshCw, FiUploadCloud } from "react-icons/fi";
import { readStoredJson } from "../utils/storage";
import { BACKEND_URL } from "../utils/utils";

function UpdateCourse() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/course/${id}`, {
          withCredentials: true,
        });
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("imageUrl", image);
    }
    const admin = readStoredJson("admin");
    const token = admin?.token;
    if (!token) {
      toast.error("Please login to admin");
      navigate("/admin/login");
      return;
    }
    try {
      const response = await axios.put(
        `${BACKEND_URL}/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course updated successfully");
      navigate("/admin/our-courses");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.errors || "Failed to update course");
    }
  };

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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_28%),radial-gradient(circle_at_left,_rgba(249,115,22,0.16),_transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                Course Editor
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Refresh your course with a cleaner editing flow.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Update your course details, replace the cover image, and keep the
                listing aligned with the rest of your admin experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/our-courses"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <FiArrowLeft />
                Back to Courses
              </Link>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
              >
                <FiLayers />
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-lg shadow-black/20">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Edit Course
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Update details
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Refine the title, pricing, description, and image so the course stays
                sharp and current.
              </p>
            </div>

            <form onSubmit={handleUpdateCourse} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter your course title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  placeholder="Write a short and clear description for your course"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter your course price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                  Replace Course Image
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-600 bg-slate-950 px-4 py-4 text-slate-300 transition hover:border-orange-400 hover:text-white">
                  <FiUploadCloud className="text-xl" />
                  <span>{typeof image === "object" ? image.name : "Upload a new cover image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changePhotoHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  Update Course
                </button>
                <Link
                  to="/admin/our-courses"
                  className="flex-1 rounded-2xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                  <FiImage className="text-xl" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                    Live Preview
                  </p>
                  <h3 className="text-xl font-semibold text-white">Updated card</h3>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950">
                <div className="h-56 w-full bg-slate-900">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                      No image selected yet
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h4 className="text-xl font-semibold text-white">
                    {title || "Your course title will appear here"}
                  </h4>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                    {description ||
                      "A strong description helps learners understand what they will gain from this course."}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Course Price</span>
                    <span className="text-lg font-semibold text-orange-300">
                      {price ? `Rs. ${price}` : "Rs. 0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Update Notes
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Before saving changes
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                <p>Keep the title clean and specific so the course remains easy to scan.</p>
                <p>Refresh the description when the course outcome or content changes.</p>
                <p>Use a stronger image if the current cover no longer matches the offer.</p>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-slate-300">
                <FiRefreshCw className="text-orange-300" />
                <p className="text-sm">Save updates when the preview looks right.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;
