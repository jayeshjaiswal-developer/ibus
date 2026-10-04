import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Login successful
      localStorage.setItem("isLoggedIn", "true");

      // Store logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>iBus</h2>

        <p className="login-subtitle">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        <div className="operator-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="operator-login-button"
          onClick={() => navigate("/operator/login")}
        >
          Bus Operator Login
        </button>

      </div>

    </div>
  );
}

export default Login;