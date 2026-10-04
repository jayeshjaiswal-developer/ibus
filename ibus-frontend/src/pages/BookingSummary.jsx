import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookingSummary() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        bus,
        travelDate,
        selectedSeats,
        passengers,
        totalAmount,
    } = location.state || {};

    // Check booking information
    if (!bus || !selectedSeats || !passengers) {
        return (
            <div className="summary-page">

                <Navbar />

                <div className="no-booking">
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

    // Proceed to payment
    const handleProceedToPayment = () => {
        navigate("/payment", {
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
        <div className="summary-page">

            <Navbar />

            <main className="summary-container">

                <h1>Booking Summary</h1>

                <p className="summary-subtitle">
                    Please review your booking details before payment.
                </p>

                {/* Bus Details */}
                <section className="summary-card">

                    <h2>Bus Details</h2>

                    <div className="bus-summary-details">

                        <div>
                            <span>Operator</span>
                            <strong>
                                {bus.operator}
                            </strong>
                        </div>

                        <div>
                            <span>Bus</span>
                            <strong>
                                {bus.busNumber} · {bus.type}
                            </strong>
                        </div>

                        <div>
                            <span>Journey</span>
                            <strong>
                                {bus.from} → {bus.to}
                            </strong>
                        </div>

                        <div>
                            <span>Travel Date</span>
                            <strong>
                                {travelDate}
                            </strong>
                        </div>

                        <div>
                            <span>Departure</span>
                            <strong>
                                {bus.departure}
                            </strong>
                        </div>

                        <div>
                            <span>Arrival</span>
                            <strong>
                                {bus.arrival}
                            </strong>
                        </div>

                    </div>

                </section>

                {/* Selected Seats */}
                <section className="summary-card">

                    <h2>Selected Seats</h2>

                    <div className="selected-seat-list">

                        {selectedSeats.map((seat) => (
                            <div
                                className="summary-seat"
                                key={seat}
                            >
                                {seat}
                            </div>
                        ))}

                    </div>

                </section>

                {/* Passenger Details */}
                <section className="summary-card">

                    <h2>Passenger Details</h2>

                    <div className="passenger-summary-list">

                        {passengers.map(
                            (passenger, index) => (

                                <div
                                    className="summary-passenger"
                                    key={passenger.seat}
                                >

                                    <div className="passenger-number">
                                        {index + 1}
                                    </div>

                                    <div className="passenger-info">

                                        <strong>
                                            {passenger.name}
                                        </strong>

                                        <span>
                                            {passenger.age} years ·{" "}
                                            {passenger.gender}
                                        </span>

                                    </div>

                                    <div className="passenger-seat">
                                        Seat {passenger.seat}
                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </section>

                {/* Fare Details */}
                <section className="summary-card">

                    <h2>Fare Details</h2>

                    <div className="fare-row">

                        <span>
                            Seat Fare
                        </span>

                        <span>
                            ₹{totalAmount}
                        </span>

                    </div>

                    <div className="fare-row">

                        <span>
                            Convenience Fee
                        </span>

                        <span>
                            ₹0
                        </span>

                    </div>

                    <div className="fare-divider"></div>

                    <div className="fare-total">

                        <strong>
                            Total Amount
                        </strong>

                        <strong>
                            ₹{totalAmount}
                        </strong>

                    </div>

                </section>

                {/* Bottom */}
                <div className="summary-bottom">

                    <div>

                        <span>
                            Total Payable
                        </span>

                        <strong>
                            ₹{totalAmount}
                        </strong>

                    </div>

                    <button
                        className="payment-button"
                        onClick={handleProceedToPayment}
                    >
                        Proceed to Payment
                    </button>

                </div>

            </main>

        </div>
    );
}

export default BookingSummary;