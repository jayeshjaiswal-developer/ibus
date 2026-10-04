# iBus – Online Bus Booking and Reservation System

iBus is a full-stack online bus booking and reservation system that allows passengers to search for buses, select seats, enter passenger details, make bookings, and manage their tickets.

The system also provides a separate Bus Operator Portal, where bus operators can log in and add their buses. Newly added buses automatically become available to passengers for booking.

---

## Features

### Passenger Portal

- User registration and login
- Search buses by source, destination, and travel date
- View available buses and seats
- Date-wise seat availability
- Select multiple seats
- Passenger details entry
- Booking summary
- Payment simulation
- Booking confirmation
- Automatic PNR generation
- View previous bookings
- Cancel confirmed bookings

### Bus Operator Portal

- Separate operator login
- Operator dashboard
- Add new buses
- View buses added by the operator
- Operator-specific bus ownership
- Added buses become visible to passengers

### Backend

- REST APIs using Express.js
- MongoDB database
- User role management
- Bus management
- Booking management
- Date-wise seat availability
- Booking cancellation
- PNR generation

---

## Technologies Used

### Frontend

- React.js
- Vite
- React Router
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- CORS
- dotenv

---

## Project Structure

```text
ibus/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── ibus-backend/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   │   ├── User.js
│   │   ├── Bus.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── busRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── operatorRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── createOperator.js
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Prerequisites

Before running the project, install:

- Node.js
- npm
- MongoDB Atlas account

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jayeshjaiswal-developer/ibus.git
```

Go into the project:

```bash
cd ibus
```

---

## Backend Setup

Open a terminal and go to the backend:

```bash
cd ibus-backend
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file inside `ibus-backend`:

```env
PORT=5001
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB Atlas connection string.

Example:

```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ibus
```

Do not commit the `.env` file to GitHub.

---

## Start the Backend

From the `ibus-backend` directory:

```bash
npm run dev
```

The backend should start at:

```text
http://localhost:5001
```

You should see:

```text
MongoDB connected successfully
Server running on http://localhost:5001
```

---

## Create a Bus Operator

The project includes a script for creating a bus operator.

From the `ibus-backend` directory, run:

```bash
node createOperator.js
```

Example operator credentials:

```text
Email: vrl@gmail.com
Password: operator123
```

The operator can then log in through:

```text
http://localhost:5173/operator/login
```

---

## Frontend Setup

Open another terminal.

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## Application Flow

### Passenger

```text
Login
  |
  v
Home
  |
  v
Search Bus
  |
  v
Select Bus
  |
  v
Select Seats
  |
  v
Passenger Details
  |
  v
Booking Summary
  |
  v
Payment
  |
  v
Booking Confirmation
  |
  v
My Bookings
```

### Bus Operator

```text
Operator Login
  |
  v
Operator Dashboard
  |
  v
Add Bus
  |
  v
Bus Stored in MongoDB
  |
  v
Bus Becomes Available to Passengers
```

---

## Bus Operator Example

An operator can add:

```text
Bus Number: IB103
Type: AC Sleeper
From: Hyderabad
To: Pune
Departure: 08:00 PM
Arrival: 07:00 AM
Price: 900
Total Seats: 36
```

After the bus is added, passengers searching for:

```text
Hyderabad -> Pune
```

can see the newly added bus.

---

## Seat Management

The system supports:

- 18 lower-deck seats
- 18 upper-deck seats
- 36 total seats

Seat states:

```text
Green  -> Available
Red    -> Booked
Blue   -> Selected
```

Seat availability is maintained according to the travel date.

For example:

```text
IB103
Hyderabad -> Pune

10/10/2026
L1 -> Booked

11/10/2026
L1 -> Available
```

---

## Payment

The current project uses a payment simulation.

After selecting a payment method, the booking is created and marked as:

```text
Payment Status: Paid
```

A real payment gateway such as Razorpay can be integrated later.

---

## Database

MongoDB is used to store the following data.

### Users

```text
name
email
password
role
```

Roles:

```text
user
operator
admin
```

### Buses

```text
operatorId
operator
busNumber
type
from
to
departure
arrival
price
totalSeats
```

### Bookings

```text
userId
pnr
bus
travelDate
selectedSeats
passengers
totalAmount
paymentStatus
status
```

---

## Security

The following files should never be committed:

```text
.env
node_modules/
```

The project `.gitignore` should contain:

```text
node_modules/
.env
```

---

## Running the Complete Application

You need two terminals.

### Terminal 1 – Backend

```bash
cd ibus/ibus-backend
npm install
npm run dev
```

### Terminal 2 – Frontend

```bash
cd ibus/frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## Future Enhancements

Possible future improvements:

- JWT-based authentication
- Admin dashboard
- Real Razorpay payment integration
- Operator bus editing and deletion
- Ticket PDF generation
- Email/SMS booking confirmation
- Bus schedule management
- Passenger reviews and ratings
- Advanced search and filtering
- Deployment using cloud services

---

## Author

Jayesh Jaiswal

GitHub: https://github.com/jayeshjaiswal-developer
