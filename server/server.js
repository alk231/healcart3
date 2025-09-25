require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const { errorHandler } = require("./middlewares/errorHandler");
const setMiddlewares = require("./middlewares/middlewares");
const setRoutes = require("./routes/routes");

const app = express();

// ✅ CORS FIRST
app.use(cors({
  origin: ["http://localhost:3000", "https://healcart4-ruls.onrender.com"],
  credentials: true
}));

// then JSON parser
app.use(express.json());

// then custom middlewares
setMiddlewares(app);

// then routes
setRoutes(app);

// test route
app.get("/", (req,res) => {
  res.status(200).json({success:true,message:"Welcome to HealCart API"});
});

// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// catch not found pages
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "404 Page not found" });
});

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

console.log("Connecting to database...");
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server running at port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));

