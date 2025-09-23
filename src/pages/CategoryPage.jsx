import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function CategoryPage() {
  const { id } = useParams();
  const [tools, setTools] = useState([]);

  useEffect(() => {
    // fetch department tools from backend, else use sample
    api.get(`/departments/${id}`).then((res) => {
      setTools(res.data.tools || []);
    }).catch(() => {
      // sample fallback tools
      setTools([
        { name: "Humaniser", description: "Rewrite text to sound natural", url: process.env.REACT_APP_HUMANISER_URL || "https://humaniser-11.vercel.app/" },
        { name: "EssayAid", description: "Outline and structure essays", url: "https://essayflow.ai/" },
        { name: "RefFinder", description: "Find references and citations", url: "https://chat.openai.com" }
      ]);
    });
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tools for {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((t, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-600">{t.description}</p>
            <div className="mt-3">
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600">
                Open tool →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
