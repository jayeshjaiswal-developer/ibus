import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SeatSelection() {
    const location = useLocation();
    const navigate = useNavigate();

    const { bus, travelDate } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [loadingSeats, setLoadingSeats] = useState(true);

    // Fetch date-wise booked seats
    useEffect(() => {
        const fetchBookedSeats = async () => {
            if (!bus || !travelDate) {
                setLoadingSeats(false);
                return;
            }

            try {
                setLoadingSeats(true);

                const response = await fetch(
                    `http://localhost:5001/api/bookings/booked-seats/${encodeURIComponent(
                        bus.busNumber
                    )}/${encodeURIComponent(travelDate)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message);
                    return;
                }

                setBookedSeats(data.bookedSeats || []);

            } catch (error) {
                console.error(error);
                alert("Unable to load seat availability");
            } finally {
                setLoadingSeats(false);
            }
        };

        fetchBookedSeats();
    }, [bus, travelDate]);


    // If no bus is selected
    if (!bus) {
        return (
            <div className="seat-page">

                <Navbar />

                <div className="no-bus-selected">
                    <h2>No bus selected</h2>

                    <button
                        onClick={() => navigate("/home")}
                    >
                        Go Back
                    </button>
                </div>

            </div>
        );
    }


    // Handle seat click
    const handleSeatClick = (seat) => {

        // Already booked
        if (bookedSeats.includes(seat)) {
            return;
        }

        // Remove from selected seats
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(
                selectedSeats.filter(
                    (item) => item !== seat
                )
            );
        }

        // Add to selected seats
        else {
            setSelectedSeats([
                ...selectedSeats,
                seat,
            ]);
        }
    };


    // Total amount
    const totalAmount =
        selectedSeats.length * bus.price;


    // Continue to passenger details
    const handleContinue = () => {

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat");
            return;
        }

        navigate("/passenger-details", {
            state: {
                bus,
                travelDate,
                selectedSeats,
                totalAmount,
            },
        });
    };


    // Create 18 seats
    const createSeats = (prefix) => {
        return Array.from(
            { length: 18 },
            (_, index) =>
                `${prefix}${index + 1}`
        );
    };


    const lowerSeats = createSeats("L");
    const upperSeats = createSeats("U");


    // Render individual seat
    const renderSeat = (seat, type) => {

        const booked =
            bookedSeats.includes(seat);

        const selected =
            selectedSeats.includes(seat);

        return (
            <button
                key={seat}
                type="button"
                className={`sleeper-seat ${type}
                    ${booked ? "booked" : ""}
                    ${selected ? "selected" : ""}
                `}
                disabled={booked}
                onClick={() =>
                    handleSeatClick(seat)
                }
            >

                <span className="seat-number">
                    {seat}
                </span>

                <span className="seat-price">
                    ₹{bus.price}
                </span>

            </button>
        );
    };


    // Render deck
    const renderDeck = (seats, title) => {

        return (
            <div className="bus-deck">

                <h2>{title}</h2>

                <div className="deck-body">

                    {/* Front */}
                    <div className="bus-front">
                        Front
                    </div>


                    {/* Seats */}
                    <div className="seat-layout">

                        {seats.map(
                            (seat, index) => {

                                // Three seats per row
                                if (index % 3 !== 0) {
                                    return null;
                                }

                                const singleSeat =
                                    seats[index];

                                const doubleSeat1 =
                                    seats[index + 1];

                                const doubleSeat2 =
                                    seats[index + 2];

                                return (
                                    <div
                                        className="seat-row"
                                        key={singleSeat}
                                    >

                                        {/* Single berth */}
                                        {renderSeat(
                                            singleSeat,
                                            "single-seat"
                                        )}

                                        {/* Aisle */}
                                        <div className="aisle"></div>

                                        {/* Double berth */}
                                        <div className="double-berth">

                                            {renderSeat(
                                                doubleSeat1,
                                                "double-seat"
                                            )}

                                            {renderSeat(
                                                doubleSeat2,
                                                "double-seat"
                                            )}

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>


                    {/* Emergency Exit */}
                    <div className="emergency-exit">
                        Emergency Exit
                    </div>

                </div>

            </div>
        );
    };


    return (
        <div className="seat-page">

            <Navbar />


            <main className="seat-content">

                {/* Bus Details */}
                <div className="bus-summary">

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


                {/* Loading */}
                {loadingSeats ? (
                    <div className="seat-loading">
                        <p>
                            Loading seat availability...
                        </p>
                    </div>
                ) : (

                    <>
                        {/* Lower + Upper Deck */}
                        <div className="decks-container">

                            {renderDeck(
                                lowerSeats,
                                "Lower Deck"
                            )}

                            {renderDeck(
                                upperSeats,
                                "Upper Deck"
                            )}

                        </div>


                        {/* Legend */}
                        <div className="seat-legend">

                            <div>
                                <span className="legend-box available"></span>
                                Available
                            </div>

                            <div>
                                <span className="legend-box booked-box"></span>
                                Booked
                            </div>

                            <div>
                                <span className="legend-box selected-box"></span>
                                Selected
                            </div>

                        </div>


                        {/* Selection Summary */}
                        <div className="selection-summary">

                            <div>

                                <span>
                                    Selected Seats
                                </span>

                                <strong>
                                    {selectedSeats.length > 0
                                        ? selectedSeats.join(", ")
                                        : "None"}
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
                                type="button"
                                className="continue-button"
                                onClick={handleContinue}
                            >
                                Continue
                            </button>

                        </div>

                    </>
                )}

            </main>

        </div>
    );
}

export default SeatSelection;