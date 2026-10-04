import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [travelDate, setTravelDate] = useState("");

    const [buses, setBuses] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!from || !to || !travelDate) {
            alert("Please enter From, To and Travel Date");
            return;
        }

        try {
            setLoading(true);
            setSearched(false);



            const response = await fetch(
                `http://localhost:5001/api/buses/search?from=${encodeURIComponent(
                    from
                )}&to=${encodeURIComponent(
                    to
                )}&travelDate=${encodeURIComponent(
                    travelDate
                )}`
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setBuses(data);
            setSearched(true);
        } catch (error) {
            console.error(error);
            alert("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="home-page">

            <Navbar />

            <main className="home-content">

                <div className="search-container">

                    <h1>Search Bus</h1>

                    <form
                        className="search-form"
                        onSubmit={handleSearch}
                    >

                        <div className="search-field">
                            <label>From</label>

                            <input
                                type="text"
                                placeholder="e.g. Hyderabad"
                                value={from}
                                onChange={(e) =>
                                    setFrom(e.target.value)
                                }
                            />
                        </div>

                        <div className="search-field">
                            <label>To</label>

                            <input
                                type="text"
                                placeholder="e.g. Bangalore"
                                value={to}
                                onChange={(e) =>
                                    setTo(e.target.value)
                                }
                            />
                        </div>

                        <div className="search-field">
                            <label>Travel Date</label>

                            <input
                                type="date"
                                value={travelDate}
                                onChange={(e) =>
                                    setTravelDate(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search Buses
                        </button>

                    </form>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="bus-results">
                        <p>Searching for buses...</p>
                    </div>
                )}

                {/* No results */}
                {!loading &&
                    searched &&
                    buses.length === 0 && (
                        <div className="bus-results">
                            <h2>No buses found</h2>

                            <p>
                                No buses are available for{" "}
                                {from} → {to}.
                            </p>
                        </div>
                    )}

                {/* Bus Results */}
                {!loading &&
                    buses.length > 0 && (
                        <div className="bus-results">

                            <h2>
                                Available Buses
                            </h2>

                            <p className="results-route">
                                {from} → {to} · {travelDate}
                            </p>

                            <div className="bus-list">

                                {buses.map((bus) => (

                                    <div
                                        className="bus-card"
                                        key={bus._id}
                                    >

                                        <div className="bus-info">

                                            <h3>
                                                {bus.operator}
                                            </h3>

                                            <p>
                                                {bus.busNumber} ·{" "}
                                                {bus.type}
                                            </p>

                                        </div>

                                        <div className="bus-time">

                                            <div>
                                                <span>Departure</span>
                                                <strong>
                                                    {bus.departure}
                                                </strong>
                                            </div>

                                            <span className="arrow">
                                                →
                                            </span>

                                            <div>
                                                <span>Arrival</span>
                                                <strong>
                                                    {bus.arrival}
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="bus-price">

                                            <strong>
                                                ₹{bus.price}
                                            </strong>


                                            <span>
                                                {bus.availableSeats} seats available
                                            </span>

                                        </div>

                                        <button
                                            className="select-bus-button"
                                            onClick={() =>
                                                navigate("/seat-selection", {
                                                    state: {
                                                        bus: {
                                                            ...bus,
                                                            seats: bus.totalSeats,
                                                        },
                                                        travelDate,
                                                    },
                                                })
                                            }
                                        >
                                            Select Bus
                                        </button>


                                    </div>

                                ))}

                            </div>

                        </div>
                    )}

            </main>

        </div>
    );
}

export default Home;