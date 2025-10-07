import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // your axios instance

export default function Earn() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const [balance, setBalance] = useState(0);
  const [referrals, setReferrals] = useState({ count: 0, earnings: 0 });
  const [activeTab, setActiveTab] = useState("local");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false); // verification paid
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    // fetch wallet / referral / verification state
    const load = async () => {
      try {
        const res = await api.get("/earn/me"); // returns balance, referrals, verified
        setBalance(res.data.balance || 0);
        setReferrals(res.data.referrals || { count: 0, earnings: 0 });
        setVerified(res.data.verified || false);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [activeTab, verified]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      // server returns only assignments user can access (if verified)
      const res = await api.get(`/earn/assignments?type=${activeTab}`);
      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayVerification = async () => {
    // placeholder: open payment flow / redirect to checkout
    try {
      setPayLoading(true);
      const res = await api.post("/earn/pay/verification", { amount: 5 }); // amount in your currency/unit
      // server returns { checkoutUrl } or client_token for payment widget
      // for demo we'll assume checkoutUrl redirect
      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        alert("Payment flow started. Complete payment to verify.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start payment. Try again.");
    } finally {
      setPayLoading(false);
    }
  };

  const handleAccept = async (assignmentId) => {
    try {
      const res = await api.post(`/earn/assignments/${assignmentId}/accept`);
      alert(res.data.message || "Assignment accepted — check your portal");
      // refresh balance / assignments
      const me = await api.get("/earn/me");
      setBalance(me.data.balance);
      fetchAssignments();
    } catch (err) {
      const msg = err.response?.data?.error || "Could not accept assignment";
      alert(msg);
    }
  };

  const referralLink = `${window.location.origin}/register?ref=${user?.id || ""}`;

  return (
    <div className="space-y-8 p-6">
      <header className="flex items-center justify-between bg-white p-6 rounded shadow">
        <div>
          <h1 className="text-2xl font-bold">Earn — Assignments & Referrals</h1>
          <p className="text-sm text-gray-600">Wallet: <strong>{balance} credits</strong></p>
        </div>
        <div className="text-right">
          <p className="text-sm">Referrals: {referrals.count}</p>
          <p className="text-sm">Referral earnings: {referrals.earnings} credits</p>
        </div>
      </header>

      {/* Referral card */}
      <section className="bg-white p-6 rounded shadow space-y-3">
        <h2 className="font-semibold">Share & Earn</h2>
        <p className="text-sm text-gray-700">
          Share your referral link. When someone registers and becomes active, you earn credits.
        </p>
        <div className="flex gap-2 mt-2">
          <input className="flex-1 p-2 border rounded" readOnly value={referralLink} />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert("Referral link copied!");
            }}
          >
            Copy
          </button>
        </div>
      </section>

      {/* Verification */}
      {!verified && (
        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="mb-2">
            To access assignments you must pay a verification fee (one-time). This helps
            confirm identity and keeps the marketplace fair.
          </p>
          <div className="flex gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handlePayVerification}
              disabled={payLoading}
            >
              {payLoading ? "Starting payment..." : "Pay verification (5 credits)"}
            </button>
            <span className="text-sm text-gray-600 self-center">Or check your wallet to top-up.</span>
          </div>
        </section>
      )}

      {/* Tabs */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "local" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("local")}
          >
            Local Assignments
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "international" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            onClick={() => setActiveTab("international")}
          >
            International Assignments
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.length === 0 && <p className="text-gray-600">No assignments available.</p>}
            {assignments.map((a) => (
              <div key={a._id} className="p-4 border rounded">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.summary}</p>
                <p className="text-sm mt-2">Pay: <strong>{a.pay} credits</strong></p>
                <div className="mt-3 flex gap-2">
                  <a href={a.documentLink} target="_blank" rel="noreferrer" className="text-sm underline">
                    Open Document
                  </a>
                  <button
                    className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(a._id)}
                    disabled={!verified}
                    title={!verified ? "Pay verification first" : "Accept this assignment"}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
