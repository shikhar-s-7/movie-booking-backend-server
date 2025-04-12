# Movie Booking Backend Server

A backend server for a movie ticket booking system, built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **JWT authentication**. This system supports two types of users — Normal Users and Admins — each with distinct permissions.

---

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB Atlas (with Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Testing Tool:** Postman
- **Deployment:** Hosted on render

---



---

##  Authentication

- **JWT-based authentication**
- Token must be sent in the `Authorization` header as `Bearer <token>` or make the token as an environment variable and then write as `Bearer {{token}}`

---

##  User Roles

### 1. **Normal User**
- Can **sign up** and **log in**
- Can **view movie list**
- Can **book** (1-4 seats) or **cancel** tickets
- Booking updates the available seats
- Cancellation removes all booked seats by that user for a movie

### 2. **Admin**
- Can **log in** only (no signup)
  - Username: `admin`
  - Password: `123456`
- Can **add a movie** (name, time, image, available seats)
- Cannot remove movies (if seats are booked)
- Cannot book/cancel movies

---

##  API Endpoints

###  User Routes (`/api/users`)
| Method | Route           | Description            |
|--------|------------------|------------------------|
| POST   | `/signup`        | User signup; raw json format:`{"username:"username","password":"password"}`|
| POST   | `/login`         | User login , upon logging in, user will get a token|
| GET    | `/me`            | Get current user info (requires token), use the JWT-Based Authentication  |
| POST   | `/book`      | Book tickets (user only)(requires token) |
| POST   | `/cancel`    | Cancel booking (user only)(requires token) |

###  Admin Routes (`/api/admin`)
| Method | Route           | Description            |
|--------|------------------|------------------------|
| POST   | `/login`         | Admin login            |
| POST   | `/add`        | Add a new movie (requires admin token) |

###  Movie Routes (`/api/movies`)
| Method | Route           | Description            |
|--------|------------------|------------------------|
| GET    | `/`              | Get list of all movies |


---

##  Testing with Postman

1. **Signup** → `POST /api/users/signup`
2. **Login (User/Admin)** → `POST /api/users/login` or `/api/admin/login`
3. **Use returned token in `Authorization` header** → `Bearer <token>`
4. **Test protected routes** like:
   - `POST /api/users/me`
   - `POST /api/admin/add`
---

## Environment Variables

Create a `.env` file with:
PORT,MONGO_URI,JWT_SECRET











