import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const config = {
  JWT_USER_PASSWORD: process.env.JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD: process.env.JWT_ADMIN_PASSWORD,
  stripe,
};

export default config;