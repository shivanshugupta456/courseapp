import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiImage, FiLayers, FiUploadCloud } from "react-icons/fi";
import { BACKEND_URL } from "../utils/utils";

function CourseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();

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

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;
    if (!token) {
      toast.error("Please login as admin first.");
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully");
      navigate("/admin/our-courses");
      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors ||
          error.response?.data?.error ||
          "Failed to create course"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_28%),radial-gradient(circle_at_left,_rgba(249,115,22,0.16),_transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
                Course Builder
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Create a course page that looks ready to sell.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Add clean course details, upload a strong cover image, and publish
                from the same admin workspace.
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
                to="/admin/our-courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
              >
                <FiLayers />
                View Courses
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-lg shadow-black/20">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                New Course
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Course details
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Fill in the essential information carefully so your course looks
                polished before it goes live.
              </p>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-6">
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
                  Course Image
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-600 bg-slate-950 px-4 py-4 text-slate-300 transition hover:border-orange-400 hover:text-white">
                  <FiUploadCloud className="text-xl" />
                  <span>{image ? image.name : "Upload course cover image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changePhotoHandler}
                    className="hidden"
                    required={!image}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  Create Course
                </button>
                <Link
                  to="/admin/dashboard"
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
                  <h3 className="text-xl font-semibold text-white">Course card</h3>
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
                Publishing Notes
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Make the course look stronger
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                <p>Use a short, specific title that tells learners what they will get.</p>
                <p>Write a benefit-focused description instead of a generic summary.</p>
                <p>Choose a clean cover image that matches your course topic and quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCreate;
