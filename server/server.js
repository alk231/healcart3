require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend domain
app.use(cors({
  origin: ["http://localhost:3000", "https://healcart4-ruls.onrender.com"],
  credentials: true
}));

app.use(express.json());

// middlewares and routes
const connectDB = require("./db/connectDB");
const { errorHandler } = require("./middlewares/errorHandler");
const setMiddlewares = require("./middlewares/middlewares");
const setRoutes = require("./routes/routes");

setMiddlewares(app);
setRoutes(app);

// test route
app.get("/", (req,res) => {
  res.status(200).json({ success:true, message:"Welcome to HealCart API" });
});

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success:true, message:"Server is healthy" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "404 Page not found" });
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
});
