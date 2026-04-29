import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "./Auth.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("Enter all fields ❌");
      setIsError(true);
      return;
    }

    try {
      const res = await fetch(
        "https://youtube-backend-1-8m3s.onrender.com/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json(); // ✅ FIXED

      console.log("API Response:", data);

      if (!res.ok) {
        setMsg(data.detail || "Login failed ❌");
        setIsError(true);
      } else {
        setMsg("Login successful ✅");
        setIsError(false);

        // ✅ STORE USER (IMPORTANT)
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/");
        window.location.reload(); // ✅ refresh Navbar
      }
    } catch (e) {
      console.log("error login:", e);
      setMsg("Server error ❌");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>
          <span className="active">SIGN IN |</span>
          <span onClick={() => navigate("/signup")}>SIGN UP</span>
        </h2>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">SIGN IN</button>
        </form>

        {msg && (
          <p style={{ textAlign: "center", color: isError ? "red" : "green" }}>
            {msg}
          </p>
        )}

      </div>
    </div>
  );
}

export default Signin;