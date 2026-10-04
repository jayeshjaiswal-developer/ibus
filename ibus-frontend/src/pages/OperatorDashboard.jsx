import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OperatorDashboard() {
    const navigate = useNavigate();

    const [operator, setOperator] = useState(null);
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedOperator =
            JSON.parse(localStorage.getItem("operator"));

        if (
            !storedOperator ||
            storedOperator.role !== "operator"
        ) {
            navigate("/operator/login");
            return;
        }

        setOperator(storedOperator);

        const fetchBuses = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5001/api/operators/${storedOperator.id}/buses`
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message);
                    return;
                }

                setBuses(data);
            } catch (error) {
                console.error(error);
                alert("Unable to load buses");
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("operator");
        navigate("/operator/login");
    };

    if (loading) {
        return (
            <div className="operator-page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="operator-page">

            <nav className="operator-navbar">

                <div className="operator-logo">
                    iBus Operator
                </div>

                <div>
                    <span>
                        {operator?.name}
                    </span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </nav>

            <main className="operator-dashboard">

                <div className="dashboard-header">

                    <div>
                        <h1>Operator Dashboard</h1>

                        <p>
                            Manage your buses and routes
                        </p>
                    </div>

                    <button
                        className="add-bus-button"
                        onClick={() =>
                            navigate("/operator/add-bus")
                        }
                    >
                        + Add Bus
                    </button>

                </div>

                <section>

                    <h2>My Buses</h2>

                    {buses.length === 0 ? (
                        <div className="no-buses">
                            <h3>No buses added</h3>

                            <p>
                                Add your first bus to make it
                                available to passengers.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/operator/add-bus"
                                    )
                                }
                            >
                                Add Bus
                            </button>
                        </div>
                    ) : (
                        <div className="operator-bus-list">

                            {buses.map((bus) => (
                                <div
                                    className="operator-bus-card"
                                    key={bus._id}
                                >

                                    <div>
                                        <h3>
                                            {bus.busNumber}
                                        </h3>

                                        <p>
                                            {bus.type}
                                        </p>
                                    </div>

                                    <div>
                                        <strong>
                                            {bus.from}
                                        </strong>

                                        <span> → </span>

                                        <strong>
                                            {bus.to}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Departure
                                        </span>

                                        <strong>
                                            {bus.departure}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Price
                                        </span>

                                        <strong>
                                            ₹{bus.price}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Seats
                                        </span>

                                        <strong>
                                            {bus.totalSeats}
                                        </strong>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default OperatorDashboard;