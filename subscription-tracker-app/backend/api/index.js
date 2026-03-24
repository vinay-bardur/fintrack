const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const authRoutes = require("../routes/auth");
const activeRoutes = require("../routes/api/active");
const freeTrialRoutes = require("../routes/api/freetrial");
const userRoutes = require("../routes/api/user");
const adminUserRoutes = require("../routes/api/adminuser");

const app = express();
let corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://subscrimate-app-backend.vercel.app",
    "https://subscrimate-app.vercel.app",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

// use the routes module as a middleware
// Use the authentication routes
app.use("/auth", authRoutes);

// for the /api/subscription/active path
app.use("/api/subscription/active", activeRoutes);

// for the /api/subscription/freetrial path
app.use("/api/subscription/freetrial", freeTrialRoutes);

// for the /admin/user path
app.use("/api/user", userRoutes);

// for the /admin/user path
app.use("/admin/user", adminUserRoutes);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
