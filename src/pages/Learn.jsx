import React from "react";
import { Link } from "react-router-dom";

export default function Learn() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-indigo-600 text-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">📚 Learn with Ease</h1>
        <p className="text-lg">
          This is the only platform where you get **Humaniser + AI + Kamusi/Dictionary**
          all in one place — free for comrades. Do your assignments smarter, faster, and better.
        </p>
      </section>

      {/* Humaniser */}
<section className="p-6 bg-white rounded-lg shadow space-y-3">
  <h2 className="text-2xl font-semibold">📝 Humaniser</h2>
  <p>
    Tired of AI-generated text sounding robotic? Use our Humaniser to transform
    any AI content into natural, human-like writing that passes any test.
  </p>
  <Link
    to="#"
    onClick={(e) => {
      e.preventDefault(); // stop internal routing
      if (!navigator.onLine) {
        alert("⚠️ You are offline! Please connect to the internet to try Humaniser.");
        // Or use toast.error("You are offline!");
      } else {
        window.open(
          "https://humaniser-11.vercel.app/",
          "_blank",
          "noopener,noreferrer"
        );
      }
    }}
    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Try Humaniser
  </Link>
</section>


    {/* AI Assistant */}
<section className="p-6 bg-white rounded-lg shadow space-y-3">
  <h2 className="text-2xl font-semibold">🤖 AI Assistant</h2>
  <p>
    Ask our AI anything — from essays, research, coding, or explanations. It
    responds perfectly to every task, saving you hours of stress.
  </p>
  <Link
    to="#"
    onClick={(e) => {
      e.preventDefault(); // prevent internal navigation
      if (!navigator.onLine) {
        alert("⚠️ You are offline! Connect to the internet to use AI Assistant.");
        // Or use toast.error("You are offline!");
      } else {
        window.open(
          "https://maka-ai-eight.vercel.app/",
          "_blank",
          "noopener,noreferrer"
        );
      }
    }}
    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Use AI Assistant
  </Link>
</section>


      {/* Kamusi / Dictionary */}
<section className="p-6 bg-white rounded-lg shadow space-y-3">
  <h2 className="text-2xl font-semibold">📖 Kamusi / Dictionary</h2>
  <p>
    Your multipurpose tool — translate words, get meanings, hear pronunciations,
    and access a powerful dictionary. Everything you need in one place.
  </p>
  <Link
    to="#"
    onClick={(e) => {
      e.preventDefault(); // prevent normal navigation
      if (!navigator.onLine) {
        // ❌ User is offline
        alert("You are offline! Please connect to the internet to open Kamusi.");
        // If using toast: toast.error("You are offline!");
      } else {
        // ✅ User is online
        window.open(
          "https://makamesco-kamusi-sandy.vercel.app/",
          "_blank",
          "noopener,noreferrer"
        );
      }
    }}
    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Open Kamusi
  </Link>
</section>


      {/* Experts Option */}
      <section className="p-6 bg-white rounded-lg shadow space-y-3">
        <h2 className="text-2xl font-semibold">🎓 Let Experts Handle It</h2>
        <p>
          Don’t want to stress? Submit your assignment and let our professional experts
          do it for you. ⚠️ *Note: This service is not free.*
        </p>
        <Link
          to="/submit"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Assignment
        </Link>
      </section>
    </div>
  );
}
