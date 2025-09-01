import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./helpers/prisma";
import authRouter from "./routes/authRouter";
import picturesRouter from "./routes/picturesRouter";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/pictures", picturesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

interface CustomError extends Error {
  status?: number;
  message: string;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
const { DB_HOST, PORT = 4000 } = process.env;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to the database:", error.message);
    } else {
      console.error("Error connecting to the database:", error);
    }
    process.exit(1);
  }
}

startServer();
