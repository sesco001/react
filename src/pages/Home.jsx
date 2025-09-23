import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="bg-indigo-600 text-white rounded-lg p-10 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Your AI-powered Assignment Hub 🚀</h1>
            <p className="mb-4">
              Submit assignments, discover the best AI platforms by department, and use our tools to
              improve your work. Fast, secure, and tailored to your field.
            </p>
            <div className="flex gap-3">
              <Link to="/submit" className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold">
                Submit Assignment
              </Link>
              <Link to="/categories" className="border border-white px-4 py-2 rounded">
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white text-gray-800 p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Why choose us?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Department-specific AI tool recommendations.</li>
                <li>Secure submissions & admin processing.</li>
                <li>Access powerful tools like the Humaniser.</li>
                <li>Track status & receive email notifications.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* You can fetch this list from API later */}
          {[
            { id: "engineering", name: "Engineering" },
            { id: "business", name: "Business & Economics" },
            { id: "arts", name: "Arts & Social Sciences" },
          ].map((d) => (
            <Link key={d.id} to={`/category/${d.id}`}>
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Top AI platforms & tools for {d.name}.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What our students say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <p className="italic">"Saved me during finals — fast and reliable!"</p>
            <p className="mt-4 text-sm font-semibold">— Student A</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <p className="italic">"Department-specific recommendations are a game changer."</p>
            <p className="mt-4 text-sm font-semibold">— Student B</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <p className="italic">"Great UI, easy submission, quick responses."</p>
            <p className="mt-4 text-sm font-semibold">— Student C</p>
          </div>
        </div>
      </section>
    </div>
  );
}
