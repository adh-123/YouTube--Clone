import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope,} from "react-icons/fa";
import "./Auth.css";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [isError,SetIsError]=useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      setMsg("All fields required ❌");
      SetIsError(true);
      return;
    }

    try {
      const res = await fetch("https://youtube-backend-1-8m3s.onrender.com/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.detail);
      } else {
        setMsg("Signup successful ✅");
        SetIsError(false);

        localStorage.setItem("user", JSON.stringify(user));

        setUser({
          username: "",
          email: "",
          password: "",
        });

        setTimeout(() => navigate("/signin"), 1000);
      }
    } catch {
      setMsg("Server error ");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        
        <h2>
          <span>SIGN IN |</span>
          <span className="active">SIGN UP</span>
         
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={user.username}
            onChange={handleChange}
          />
           <FaUser className="icon" /></div>
          <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={user.email}
            onChange={handleChange}
          />
           <FaEnvelope className="icon" /></div>
          <div className="input-box
          ">
          <input
            name="password"
            type="password"
            placeholder="PASSWORD"
            value={user.password}
            onChange={handleChange}
          />
           </div>

          <button type="submit">SIGN UP</button>
        </form>

        {msg && <p style={{ textAlign: "center",color:isError ? "red":"green" }}>{msg}</p>}
      </div>
    </div>
  );
}

export default Signup;