import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

function PassengerDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        bus,
        travelDate,
        selectedSeats,
        totalAmount,
    } = location.state || {};

    const [passengers, setPassengers] = useState(
        selectedSeats
            ? selectedSeats.map((seat) => ({
                  seat,
                  name: "",
                  age: "",
                  gender: "",
              }))
            : []
    );

    // If booking information is missing
    if (!bus || !selectedSeats) {
        return (
            <div className="passenger-page">

                <Navbar />

                <div className="no-passenger-info">
                    <h2>No booking information found</h2>

                    <button
                        onClick={() => navigate("/home")}
                    >
                        Go to Home
                    </button>
                </div>

            </div>
        );
    }

    // Handle passenger field changes
    const handleChange = (
        index,
        field,
        value
    ) => {
        const updatedPassengers = [
            ...passengers,
        ];

        updatedPassengers[index][field] = value;

        setPassengers(updatedPassengers);
    };

    // Continue to booking summary
    const handleContinue = (e) => {
        e.preventDefault();

        const incomplete = passengers.some(
            (passenger) =>
                !passenger.name.trim() ||
                !passenger.age ||
                !passenger.gender
        );

        if (incomplete) {
            alert(
                "Please enter details for all passengers"
            );
            return;
        }

        navigate("/booking-summary", {
            state: {
                bus,
                travelDate,
                selectedSeats,
                passengers,
                totalAmount,
            },
        });
    };

    return (
        <div className="passenger-page">

            <Navbar />

            <div className="passenger-container">

                <h1>Passenger Details</h1>

                <p className="passenger-subtitle">
                    Enter details for each selected passenger
                </p>

                {/* Bus Information */}
                <div className="booking-info">

                    <h2>{bus.operator}</h2>

                    <p>
                        {bus.busNumber} · {bus.type}
                    </p>

                    <p>
                        {bus.from} → {bus.to}
                    </p>

                    <p>
                        {bus.departure} → {bus.arrival}
                    </p>

                    <p>
                        Travel Date: {travelDate}
                    </p>

                </div>

                {/* Passenger Forms */}
                <form onSubmit={handleContinue}>

                    {passengers.map(
                        (passenger, index) => (

                            <div
                                className="passenger-card"
                                key={passenger.seat}
                            >

                                <h3>
                                    Passenger {index + 1}
                                </h3>

                                <p className="seat-label">
                                    Seat:{" "}
                                    <strong>
                                        {passenger.seat}
                                    </strong>
                                </p>

                                <div className="passenger-fields">

                                    {/* Name */}
                                    <div>
                                        <label>
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter full name"
                                            value={
                                                passenger.name
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Age */}
                                    <div>
                                        <label>
                                            Age
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="Age"
                                            min="1"
                                            max="100"
                                            value={
                                                passenger.age
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "age",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label>
                                            Gender
                                        </label>

                                        <select
                                            value={
                                                passenger.gender
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                    {/* Booking Summary */}
                    <div className="passenger-summary">

                        <div>
                            <span>
                                Selected Seats
                            </span>

                            <strong>
                                {selectedSeats.join(", ")}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{totalAmount}
                            </strong>
                        </div>

                        <button
                            type="submit"
                            className="continue-button"
                        >
                            Continue
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default PassengerDetails;