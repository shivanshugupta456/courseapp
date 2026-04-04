import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51TIRSMKQAYlaOC0T0lAYnxXmjQHMBc2nVARDhGGWbJlya6I9uTgvkqoJWSMMpS3CnWy9yzXb6WC8Iiz8pxXwnznU00Sap0KNjt"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
