import express from "express";
import morgan from "morgan";
import cors from "cors";
// import mongoose from "mongoose";
import dotenv from "dotenv";
// import authRouter from "./routes/authRouter.js";
// import picturesRouter from "./routes/picturesRouter.js";
import { prisma } from "./helpers/prisma.js";

dotenv.config();

const app = express();

// app.get("/", (req, res) => {
//   res.json("Hello from Zhinomyr!!!");
// });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// app.use("/users", authRouter);
// app.use("/pictures", picturesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
const { DB_HOST, PORT = 4000 } = process.env;
// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT, () => {
//       console.log(`Server is running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
}

startServer();
