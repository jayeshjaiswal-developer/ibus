import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        bus,
        travelDate,
        selectedSeats,
        passengers,
        totalAmount,
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] =
        useState("upi");

    // Check booking information
    if (!bus || !travelDate || !selectedSeats || !passengers) {
        return (
            <div className="payment-page">

                <Navbar />

                <div className="no-payment">

                    <h2>
                        No booking information found
                    </h2>

                    <button
                        onClick={() => navigate("/home")}
                    >
                        Go to Home
                    </button>

                </div>

            </div>
        );
    }

    // Handle payment
    const handlePayment = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user || !user.id) {
                alert("Please login again");
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5001/api/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userId: user.id,

                        bus: {
                            operator: bus.operator,
                            busNumber: bus.busNumber,
                            type: bus.type,
                            from: bus.from,
                            to: bus.to,
                            departure: bus.departure,
                            arrival: bus.arrival,
                            price: bus.price,
                        },

                        travelDate,

                        selectedSeats,

                        passengers,

                        totalAmount,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Payment successful!");

            navigate("/booking-confirmation", {
                state: {
                    booking: data.booking,
                },
            });

        } catch (error) {
            console.error(
                "Booking error:",
                error
            );

            alert("Unable to complete booking");
        }
    };

    return (
        <div className="payment-page">

            <Navbar />

            <main className="payment-container">

                <h1>Payment</h1>

                <div className="payment-layout">

                    {/* Left Section */}
                    <div className="payment-left">

                        {/* Booking Details */}
                        <div className="payment-card">

                            <h2>
                                Booking Details
                            </h2>

                            <div className="payment-info">

                                <span>
                                    Bus
                                </span>

                                <strong>
                                    {bus.operator}
                                </strong>

                            </div>

                            <div className="payment-info">

                                <span>
                                    Bus Number
                                </span>

                                <strong>
                                    {bus.busNumber}
                                </strong>

                            </div>

                            <div className="payment-info">

                                <span>
                                    Journey
                                </span>

                                <strong>
                                    {bus.from} → {bus.to}
                                </strong>

                            </div>

                            <div className="payment-info">

                                <span>
                                    Travel Date
                                </span>

                                <strong>
                                    {travelDate}
                                </strong>

                            </div>

                            <div className="payment-info">

                                <span>
                                    Timing
                                </span>

                                <strong>
                                    {bus.departure} → {bus.arrival}
                                </strong>

                            </div>

                            <div className="payment-info">

                                <span>
                                    Seats
                                </span>

                                <strong>
                                    {selectedSeats.join(", ")}
                                </strong>

                            </div>

                        </div>

                        {/* Payment Method */}
                        <div className="payment-card">

                            <h2>
                                Payment Method
                            </h2>

                            <label className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={
                                        paymentMethod === "upi"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div>

                                    <strong>
                                        UPI
                                    </strong>

                                    <p>
                                        Pay using Google Pay,
                                        PhonePe, Paytm etc.
                                    </p>

                                </div>

                            </label>

                            <label className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={
                                        paymentMethod === "card"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div>

                                    <strong>
                                        Credit / Debit Card
                                    </strong>

                                    <p>
                                        Visa, Mastercard,
                                        RuPay etc.
                                    </p>

                                </div>

                            </label>

                            <label className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    value="netbanking"
                                    checked={
                                        paymentMethod ===
                                        "netbanking"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div>

                                    <strong>
                                        Net Banking
                                    </strong>

                                    <p>
                                        Pay using your bank
                                        account
                                    </p>

                                </div>

                            </label>

                        </div>

                    </div>

                    {/* Right Section */}
                    <div className="payment-right">

                        <div className="payment-card amount-card">

                            <h2>
                                Payment Summary
                            </h2>

                            <div className="amount-row">

                                <span>
                                    Seat Fare
                                </span>

                                <span>
                                    ₹{totalAmount}
                                </span>

                            </div>

                            <div className="amount-row">

                                <span>
                                    Convenience Fee
                                </span>

                                <span>
                                    ₹0
                                </span>

                            </div>

                            <div className="amount-divider"></div>

                            <div className="amount-total">

                                <span>
                                    Total Payable
                                </span>

                                <strong>
                                    ₹{totalAmount}
                                </strong>

                            </div>

                            <button
                                className="pay-button"
                                onClick={handlePayment}
                            >
                                Pay ₹{totalAmount}
                            </button>

                            <p className="secure-text">
                                🔒 Secure payment
                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Payment;