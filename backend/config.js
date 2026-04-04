import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY =
  "sk_test_51TIRSMKQAYlaOC0TaI8OABPHGmqYKGELJziYnRaR3RJfPpgpJKAjtKjTTGqSwNBZXjWOKNqgiIvT3oSR9q4zRxmf00yLRo2U4c"

export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
};
