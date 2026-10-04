import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="confirmation-page">
        <Navbar />

        <div className="no-confirmation">
          <h2>No booking information found</h2>

          <button onClick={() => navigate("/home")}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <Navbar />

      <main className="confirmation-container">

        {/* Success */}
        <div className="success-section">
          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>

          <p>
            Your bus ticket has been booked successfully.
          </p>
        </div>


        {/* PNR */}
        <div className="pnr-card">
          <span>PNR</span>
          <strong>{booking.pnr}</strong>
        </div>


        {/* Bus Details */}
        <div className="confirmation-card">
          <h2>Bus Details</h2>

          <div className="confirmation-info">
            <span>Operator</span>
            <strong>{booking.bus.operator}</strong>
          </div>

          <div className="confirmation-info">
            <span>Bus Number</span>
            <strong>{booking.bus.busNumber}</strong>
          </div>

          <div className="confirmation-info">
            <span>Bus Type</span>
            <strong>{booking.bus.type}</strong>
          </div>

          <div className="confirmation-info">
            <span>Journey</span>
            <strong>
              {booking.bus.from} → {booking.bus.to}
            </strong>
          </div>

          <div className="confirmation-info">
            <span>Travel Date</span>
            <strong>{booking.travelDate}</strong>
          </div>

          <div className="confirmation-info">
            <span>Departure</span>
            <strong>{booking.bus.departure}</strong>
          </div>

          <div className="confirmation-info">
            <span>Arrival</span>
            <strong>{booking.bus.arrival}</strong>
          </div>
        </div>


        {/* Seats */}
        <div className="confirmation-card">
          <h2>Selected Seats</h2>

          <div className="confirmed-seats">
            {booking.selectedSeats.map((seat) => (
              <span key={seat}>
                {seat}
              </span>
            ))}
          </div>
        </div>


        {/* Passenger Details */}
        <div className="confirmation-card">
          <h2>Passenger Details</h2>

          {booking.passengers.map((passenger, index) => (
            <div
              className="confirmed-passenger"
              key={index}
            >
              <div className="passenger-number">
                Passenger {index + 1}
              </div>

              <div>
                <strong>{passenger.name}</strong>

                <p>
                  Age: {passenger.age} ·{" "}
                  Gender: {passenger.gender}
                </p>

                <p>
                  Seat:{" "}
                  <strong>{passenger.seat}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* Payment */}
        <div className="confirmation-card">
          <h2>Payment Details</h2>

          <div className="confirmation-info">
            <span>Payment Status</span>

            <strong className="paid">
              {booking.paymentStatus}
            </strong>
          </div>

          <div className="confirmation-info">
            <span>Total Amount</span>

            <strong>
              ₹{booking.totalAmount}
            </strong>
          </div>
        </div>


        {/* Actions */}
        <div className="confirmation-actions">

          <button
            className="download-button"
            onClick={() =>
              alert("Ticket download coming soon!")
            }
          >
            Download Ticket
          </button>

          <button
            className="home-button"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>

        </div>

      </main>
    </div>
  );
}

export default BookingConfirmation;