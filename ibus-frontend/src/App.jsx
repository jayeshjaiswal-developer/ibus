import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import BookingSummary from "./pages/BookingSummary";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import Register from "./pages/Register";
import OperatorLogin from "./pages/OperatorLogin";
import OperatorDashboard from "./pages/OperatorDashboard";
import AddBus from "./pages/AddBus";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/seat-selection"
          element={<SeatSelection />}
        />

        <Route
          path="/passenger-details"
          element={<PassengerDetails />}
        />

        <Route
          path="/booking-confirmation"
          element={<BookingConfirmation />}
        />

        <Route
          path="/booking-summary"
          element={<BookingSummary />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/operator/login"
          element={<OperatorLogin />}
        />

        <Route
          path="/operator/dashboard"
          element={<OperatorDashboard />}
        />

        <Route
          path="/operator/add-bus"
          element={<AddBus />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;