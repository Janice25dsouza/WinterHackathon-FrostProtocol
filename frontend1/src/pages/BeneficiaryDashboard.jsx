import { useState } from "react";
import { addBeneficiaryRequest } from "../data/beneficiaryRequests";

function BeneficiaryDashboard() {
  const [scheme, setScheme] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");

  function submitRequest() {
    if (!scheme || !beneficiary || !purpose || !amount) {
      alert("Fill all fields");
      return;
    }

    addBeneficiaryRequest({
      scheme,
      beneficiary,
      purpose,
      amount
    });

    alert("✅ Request sent to Scheme");
    setScheme("");
    setBeneficiary("");
    setPurpose("");
    setAmount("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎯 Beneficiary Dashboard</h2>

        {/* Scheme selector */}
        <select
          style={styles.input}
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
        >
          <option value="">Select Scheme</option>
          <option value="scheme1">Scheme 1</option>
          <option value="scheme2">Scheme 2</option>
        </select>

        {/* Beneficiary selector */}
        <select
          style={styles.input}
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
        >
          <option value="">Select Beneficiary</option>
          <option value="ben1">Beneficiary 1</option>
          <option value="ben2">Beneficiary 2</option>
          <option value="ben3">Beneficiary 3</option>
        </select>

        <input
          style={styles.input}
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button style={styles.button} onClick={submitRequest}>
          Request Funds
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#b5c4e1",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: 380,
    background: "#ffffff",
    borderRadius: 8,
    padding: 30,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    marginBottom: 20,
    color: "#333",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
    appearance: "none",
  },

  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "none",
    background: "#071535",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
};

export default BeneficiaryDashboard;
