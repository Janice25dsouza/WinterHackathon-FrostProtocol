import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("central");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // CENTRAL GOVERNMENT
    if (role === "central") {
      if (password === "admin123") {
        navigate("/central");
      } else {
        alert("Wrong central password");
      }
    }

    // SCHEME USERS
    if (role === "scheme") {
      if (
        (username === "scheme1" && password === "scheme123") ||
        (username === "scheme2" && password === "scheme456")
      ) {
        navigate("/scheme");
      } else {
        alert("Invalid scheme credentials");
      }
    }

    // BENEFICIARY USERS
    if (role === "beneficiary") {
      if (
        (username === "ben1" && password === "ben123") ||
        (username === "ben2" && password === "ben234") ||
        (username === "ben3" && password === "ben345")
      ) {
        navigate("/beneficiary");
      } else {
        alert("Invalid beneficiary credentials");
      }
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="central">Central Government</option>
        <option value="scheme">Scheme</option>
        <option value="beneficiary">Beneficiary</option>
      </select>

      {(role === "scheme" || role === "beneficiary") && (
        <input
          placeholder={role === "scheme" ? "Scheme Name" : "Beneficiary ID"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
