import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // ✅ store user properly
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful");
        navigate("/");
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">SIGN IN</button>
      </form>
    </div>
  );
};

export default Signin;