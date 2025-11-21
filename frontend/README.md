# [Project Name]

A fullstack web application for searching, viewing and booking accommodations.

## 📦 Tech Stack

### Frontend
- React + Vite
- React Router
- Tailwind CSS
- Axios
- React state / Context

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- dotenv

---

## 🚀 Install & Run

### Backend
cd backend
npm install
npm run dev

Create a `.env` file based on `.env.example`.

### Frontend
cd frontend
npm install
npm run dev

---

## 🔗 API Endpoints

### Listings
GET /listings  
GET /listings/:id  
POST /listings  

### Bookings
POST /bookings  
GET /bookings/me  

### Auth
POST /auth/register  
POST /auth/login  

---

## 🧪 Manual Tests

- Register user → works  
- Login user → token saved  
- Search listings → returns filtered results  
- View detail page → correct data  
- Create booking → booking saved  
- View "my bookings" → shows correct bookings  
- Responsive layout mobile  
- Navigation works  

---

## 📄 Documentation
See `/docs/technical-documentation.pdf` or Word file.

## 🧪 Manuella tester (Manual tests)

✔ Register user  
✔ Login user  
✔ Token saved 
✔ Fetch all listings  
✔ Search by place  
✔ Search by guests  
✔ Open detail page  
✔ Create booking  
✔ Booking visible under "My bookings"  
✔ Responsive layout mobile  
✔ Navigation works  
