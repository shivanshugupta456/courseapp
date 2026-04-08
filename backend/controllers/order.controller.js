import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const orderData = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, amount, paymentId, status, email } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ errors: "User or course details are missing" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(200).json({
        message: "Course already purchased",
        purchase: existingPurchase,
      });
    }

    const orderInfo = await Order.create({
      userId,
      courseId,
      amount,
      paymentId,
      status,
      email,
    });

    const purchase = await Purchase.create({ userId, courseId });

    res.status(201).json({
      message: "Order created successfully",
      orderInfo,
      purchase,
    });
  } catch (error) {
    console.log("Error in order: ", error);
    res.status(401).json({ errors: "Error in order creation" });
  }
};
