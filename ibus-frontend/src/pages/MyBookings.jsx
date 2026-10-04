import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          alert("Please login again");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5001/api/bookings/my-bookings/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setBookings(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // Cancel booking
  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this ticket?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );

      alert("Booking cancelled successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bookings-page">
        <Navbar />

        <main className="bookings-container">
          <h1>My Bookings</h1>

          <p className="bookings-subtitle">
            Loading your bookings...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="bookings-page">

      <Navbar />

      <main className="bookings-container">

        <h1>My Bookings</h1>

        <p className="bookings-subtitle">
          View your booked bus tickets
        </p>

        {bookings.length === 0 ? (
          <div className="no-bookings">

            <h2>No bookings found</h2>

            <p>
              You have not booked any bus tickets yet.
            </p>

            <button onClick={() => navigate("/home")}>
              Book a Bus
            </button>

          </div>
        ) : (
          <div className="booking-list">

            {bookings.map((booking) => (

              <div
                className={`booking-card ${
                  booking.status === "Cancelled"
                    ? "cancelled-booking"
                    : ""
                }`}
                key={booking._id}
              >

                {/* Header */}
                <div className="booking-header">

                  <div>
                    <h2>{booking.bus.operator}</h2>

                    <p>
                      {booking.bus.busNumber} ·{" "}
                      {booking.bus.type}
                    </p>
                  </div>

                  <div
                    className={`booking-status ${
                      booking.status === "Cancelled"
                        ? "cancelled-status"
                        : ""
                    }`}
                  >
                    {booking.status}
                  </div>

                </div>

                {/* Journey */}
                <div className="booking-journey">

                  <div>
                    <span>Departure</span>

                    <strong>
                      {booking.bus.departure}
                    </strong>
                  </div>

                  <div className="journey-arrow">
                    →
                  </div>

                  <div>
                    <span>Arrival</span>

                    <strong>
                      {booking.bus.arrival}
                    </strong>
                  </div>

                </div>

                {/* Booking Details */}
                <div className="booking-details">

                  <div>
                    <span>PNR</span>

                    <strong>
                      {booking.pnr}
                    </strong>
                  </div>

                  <div>
                    <span>Travel Date</span>

                    <strong>
                      {booking.travelDate}
                    </strong>
                  </div>

                  <div>
                    <span>Seats</span>

                    <strong>
                      {booking.selectedSeats.join(", ")}
                    </strong>
                  </div>

                  <div>
                    <span>Passengers</span>

                    <strong>
                      {booking.passengers.length}
                    </strong>
                  </div>

                  <div>
                    <span>Total Paid</span>

                    <strong>
                      ₹{booking.totalAmount}
                    </strong>
                  </div>

                </div>

                {/* Actions */}
                <div className="booking-actions">

                  <button
                    onClick={() =>
                      navigate("/booking-confirmation", {
                        state: {
                          booking: booking,
                        },
                      })
                    }
                    disabled={booking.status === "Cancelled"}
                  >
                    View Ticket
                  </button>

                  {booking.status === "Confirmed" && (
                    <button
                      className="cancel-button"
                      onClick={() =>
                        handleCancel(booking._id)
                      }
                    >
                      Cancel Ticket
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default MyBookings;