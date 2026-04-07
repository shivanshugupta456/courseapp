import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";
import config from "../config.js"; // ✅ import fix




// ================= CREATE COURSE =================
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const { image } = req.files;

    const allowedFormat = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file format. Only PNG, JPG, JPEG, and WEBP are allowed",
      });
    }

    // ✅ Cloudinary upload
    const uploadSource = image.tempFilePath
      ? image.tempFilePath
      : `data:${image.mimetype};base64,${image.data.toString("base64")}`;

    const cloud_response = await cloudinary.uploader.upload(uploadSource);

    if (!cloud_response || cloud_response.error) {
      return res.status(400).json({
        errors: "Error uploading file to cloudinary",
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      creatorId: adminId,
    });

    res.json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: error.message || "Error creating course",
    });
  }
};


// ================= UPDATE COURSE =================
export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;

  try {
    const courseSearch = await Course.findById(courseId);

    if (!courseSearch) {
      return res.status(404).json({ errors: "Course not found" });
    }

    const course = await Course.findOneAndUpdate(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      },
      { new: true } // ✅ returns updated doc
    );

    if (!course) {
      return res.status(404).json({
        errors: "Can't update, created by other admin",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in course updating" });
  }
};


// ================= DELETE COURSE =================
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });

    if (!course) {
      return res.status(404).json({
        errors: "Can't delete, created by other admin",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in course deleting" });
  }
};


// ================= GET ALL COURSES =================
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses }); // ✅ 200 instead of 201
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in getting courses" });
  }
};


// ================= COURSE DETAILS =================
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ course });

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in getting course details" });
  }
};


// ================= BUY COURSE (STRIPE) =================
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });

    if (existingPurchase) {
      return res.status(400).json({
        errors: "User has already purchased this course",
      });
    }

    // ✅ IMPORTANT: convert to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      message: "Payment initiated",
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in course buying" });
  }
};
