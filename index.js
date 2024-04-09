const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const adminRoute = require("./routes/authAdminRoute");
const userRoute = require("./routes/authUserRoute");
const schemeRoute = require("./routes/schemeRoute");
const path = require("path");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization,Token,Cookies", // Allow all headers
  credentials: true,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/api", schemeRoute);
const runApp = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit the process if unable to connect to database
  }
};
runApp();
