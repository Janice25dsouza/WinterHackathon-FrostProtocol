import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("central");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (role === "central") {
      if (password === "admin123") navigate("/central");
      else alert("Wrong central password");
    }

    if (role === "scheme") {
      if (
        (username === "scheme1" && password === "scheme123") ||
        (username === "scheme2" && password === "scheme456")
      ) navigate("/scheme");
      else alert("Invalid scheme credentials");
    }

    if (role === "beneficiary") {
      if (
        (username === "ben1" && password === "ben123") ||
        (username === "ben2" && password === "ben234") ||
        (username === "ben3" && password === "ben345")
      ) navigate("/beneficiary");
      else alert("Invalid beneficiary credentials");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>FundFlow Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="central">Central Government</option>
          <option value="scheme">Scheme Officer</option>
          <option value="beneficiary">Beneficiary</option>
        </select>

        {(role === "scheme" || role === "beneficiary") && (
          <input
            placeholder={role === "scheme" ? "Scheme ID" : "Beneficiary ID"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#b5c4e1",     // light gray background
    fontFamily: "Arial, sans-serif",
    padding:"0px",
    margin:"0px"
  },

  card: {
    width: 360,
    background: "#ffffff",     // white card
    borderRadius: 8,
    padding: 30,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  title: {
    marginBottom: 20,
    color: "#333"
  },

  input: {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 5,
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",   // ✅ forces equal sizing
  appearance: "none"         // ✅ removes browser select styling
},


  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "none",
    background: "#071535",     // solid blue button
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10
  }
};

export default Login;
