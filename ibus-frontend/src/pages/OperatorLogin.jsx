import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OperatorLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

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

            if (data.user.role !== "operator") {
                alert("This login is only for bus operators");
                return;
            }

            localStorage.setItem(
                "operator",
                JSON.stringify(data.user)
            );

            navigate("/operator/dashboard");
        } catch (error) {
            console.error(error);
            alert("Unable to login");
        }
    };

    return (
        <div className="operator-login-page">
            <div className="operator-login-card">

                <h1>iBus</h1>

                <h2>Operator Login</h2>

                <p>
                    Login to manage your buses
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter operator email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <button
                    className="back-to-user-login"
                    onClick={() => navigate("/login")}
                >
                    Passenger Login
                </button>

            </div>
        </div>
    );
}

export default OperatorLogin;