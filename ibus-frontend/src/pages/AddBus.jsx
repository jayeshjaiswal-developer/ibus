import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBus() {
    const navigate = useNavigate();

    const operator = JSON.parse(
        localStorage.getItem("operator")
    );

    const [formData, setFormData] = useState({
        busNumber: "",
        type: "",
        from: "",
        to: "",
        departure: "",
        arrival: "",
        price: "",
        totalSeats: 36,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!operator || operator.role !== "operator") {
            alert("Operator login required");
            navigate("/operator/login");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/operators/${operator.id}/buses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: Number(formData.price),
                        totalSeats: Number(
                            formData.totalSeats
                        ),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Bus added successfully!");

            navigate("/operator/dashboard");
        } catch (error) {
            console.error(error);
            alert("Unable to add bus");
        }
    };

    return (
        <div className="operator-page">

            <nav className="operator-navbar">

                <div className="operator-logo">
                    iBus Operator
                </div>

                <button
                    onClick={() =>
                        navigate("/operator/dashboard")
                    }
                >
                    Dashboard
                </button>

            </nav>

            <main className="add-bus-container">

                <h1>Add New Bus</h1>

                <p>
                    Add a bus that will be visible to
                    passengers.
                </p>

                <form
                    className="add-bus-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-row">

                        <div>
                            <label>Bus Number</label>

                            <input
                                name="busNumber"
                                placeholder="Example: IB103"
                                value={formData.busNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Bus Type</label>

                            <input
                                name="type"
                                placeholder="Example: AC Sleeper"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div>
                            <label>From</label>

                            <input
                                name="from"
                                placeholder="Hyderabad"
                                value={formData.from}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>To</label>

                            <input
                                name="to"
                                placeholder="Bangalore"
                                value={formData.to}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div>
                            <label>Departure</label>

                            <input
                                name="departure"
                                placeholder="08:00 PM"
                                value={formData.departure}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Arrival</label>

                            <input
                                name="arrival"
                                placeholder="07:00 AM"
                                value={formData.arrival}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div>
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                placeholder="900"
                                min="1"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Total Seats</label>

                            <input
                                type="number"
                                name="totalSeats"
                                min="1"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="save-bus-button"
                    >
                        Add Bus
                    </button>

                </form>

            </main>

        </div>
    );
}

export default AddBus;