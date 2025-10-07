import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-12 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          Learn 📚 & Earn 💸 — Powered by AI for Comrades
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Unlock endless opportunities: master academics with premium AI tools, and earn
          money by completing assignments or referring your friends. Your campus hustle,
          elevated.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/learn"
            className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold shadow hover:scale-105 transition"
          >
            Start Learning
          </Link>
          <Link
            to="/earn"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded font-semibold shadow hover:scale-105 transition"
          >
            Start Earning
          </Link>
        </div>
      </section>

      {/* Learn Section */}
      <section>
        <h2
          onClick={() => toggleSection("learn")}
          className="text-2xl font-bold cursor-pointer flex items-center justify-between"
        >
          Learn with AI 🚀
          <span>{openSection === "learn" ? "▲" : "▼"}</span>
        </h2>
        {openSection === "learn" && (
          <div className="mt-4 bg-white rounded shadow p-6 space-y-3">
            <p>
              Access premium tools designed to give you an academic edge:
              <strong> Humaniser</strong> for paraphrasing, <strong>No Limit AI</strong> for
              writing without restrictions, and a library of academic resources curated by
              department.
            </p>
            <p>
              Departments include: Engineering, Business, Arts & Social Sciences,
              Education, Medicine, Law and more — each with specialized AI platforms and
              resources to suit your field.
            </p>
            <Link
              to="/categories"
              className="text-indigo-600 font-semibold underline"
            >
              Explore Departments →
            </Link>
          </div>
        )}
      </section>

      {/* Earn Section */}
      <section>
        <h2
          onClick={() => toggleSection("earn")}
          className="text-2xl font-bold cursor-pointer flex items-center justify-between"
        >
          Earn as a Comrade 💼
          <span>{openSection === "earn" ? "▲" : "▼"}</span>
        </h2>
        {openSection === "earn" && (
          <div className="mt-4 bg-white rounded shadow p-6 space-y-3">
            <p>
              Turn your skills into cash! Complete assignments through our platform and
              get paid directly to your account. Choose from{" "}
              <strong>Local Assignments</strong> (Kenyan campuses) or{" "}
              <strong>International Assignments</strong> (global clients) for higher pay.
            </p>
            <p>
              Plus, our <strong>Referral Program</strong> rewards you whenever a friend
              joins and starts using our services. Every referral = instant funds to your
              wallet. 🎉
            </p>
            <Link
              to="/earn"
              className="text-yellow-600 font-semibold underline"
            >
              Learn How to Earn →
            </Link>
          </div>
        )}
      </section>

      {/* Departments */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "engineering", name: "Engineering" },
            { id: "business", name: "Business & Economics" },
            { id: "arts", name: "Arts & Social Sciences" },
            { id: "law", name: "Law" },
            { id: "medicine", name: "Medicine" },
            { id: "education", name: "Education" },
          ].map((d) => (
            <Link key={d.id} to={`/category/${d.id}`}>
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  AI tools & resources tailored for {d.name}.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-bold mb-4">What Comrades Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              text: "This platform saved me during finals! The AI tools are 🔥",
              name: "Brian – Engineering",
            },
            {
              text: "The referral system gave me extra cash every month.",
              name: "Mercy – Business",
            },
            {
              text: "Assignments are fast, legit, and international jobs pay well.",
              name: "Ali – Arts & Social Sciences",
            },
            {
              text: "UI is clean, easy to use, and I love the department-specific resources.",
              name: "Cynthia – Education",
            },
            {
              text: "Finally, a hustle that combines study & money 💯",
              name: "Kevin – Medicine",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded shadow hover:shadow-md transition"
            >
              <p className="italic mb-2">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{t.name}</p>
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

