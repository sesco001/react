import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function CategoryPage() {
  const { id } = useParams();
  const [tools, setTools] = useState([]);

  // A mega fallback with departments across the world 🌍
  const fallbackDepartments = {
    engineering: [
      { name: "AutoCAD AI", description: "AI-powered design assistant", url: "https://www.autodesk.com" },
      { name: "MATLAB Online", description: "Math and simulation software", url: "https://matlab.mathworks.com" },
      { name: "Humaniser", description: "Rewrite technical reports naturally", url: process.env.REACT_APP_HUMANISER_URL || "https://humaniser-11.vercel.app/" }
    ],
    business: [
      { name: "Grammarly", description: "Polish your business reports", url: "https://grammarly.com" },
      { name: "Tableau Public", description: "Data visualization & dashboards", url: "https://public.tableau.com" },
      { name: "Humaniser", description: "Make your proposals human-like", url: process.env.REACT_APP_HUMANISER_URL || "https://humaniser-11.vercel.app/" }
    ],
    arts: [
      { name: "Canva", description: "Design posters & presentations", url: "https://canva.com" },
      { name: "Artbreeder", description: "AI-generated artworks", url: "https://artbreeder.com" },
      { name: "RefFinder", description: "Citations & referencing support", url: "https://chat.openai.com" }
    ],
    law: [
      { name: "LexisNexis", description: "Case law research platform", url: "https://www.lexisnexis.com" },
      { name: "ChatGPT Legal", description: "Draft contracts and case summaries", url: "https://chat.openai.com" }
    ],
    medicine: [
      { name: "PubMed", description: "Research papers & journals", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { name: "Epocrates", description: "Drug & disease reference tool", url: "https://www.epocrates.com" }
    ],
    it: [
      { name: "GitHub Copilot", description: "AI coding assistant", url: "https://github.com/features/copilot" },
      { name: "Stack Overflow", description: "Community for developers", url: "https://stackoverflow.com" },
      { name: "Replit", description: "Code & collaborate online", url: "https://replit.com" }
    ],
    education: [
      { name: "Khan Academy", description: "Free learning resources", url: "https://khanacademy.org" },
      { name: "Coursera", description: "University courses online", url: "https://coursera.org" },
 { name: "Dictionary/Kamusi", description: "Search a word,Listen pronunciation and Translate", url: "https://makamesco-kamusi-sandy.vercel.app/" },
      { name: "Humaniser", description: "Simplify AI text for learning", url: process.env.REACT_APP_HUMANISER_URL || "https://humaniser-11.vercel.app/" }
    ],
    agriculture: [
      { name: "Agri-Tech AI", description: "Crop disease detection", url: "https://plantix.net" },
      { name: "FarmLogs", description: "Smart farm management", url: "https://farmlogs.com" }
    ]
  };

  useEffect(() => {
    // Try fetching from backend
    api.get(`/departments/${id}`).then((res) => {
      setTools(res.data.tools || fallbackDepartments[id] || []);
    }).catch(() => {
      setTools(fallbackDepartments[id] || []);
    });
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Tools for {id.charAt(0).toUpperCase() + id.slice(1)} Department
      </h1>

      {tools.length === 0 ? (
        <p className="text-gray-600">No tools available for this department yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <div key={i} className="p-4 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
              <div className="mt-3">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Open tool →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
