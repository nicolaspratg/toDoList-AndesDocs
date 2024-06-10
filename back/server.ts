import "dotenv/config";
import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./config";
import toDoRoutes from "./src/routes/toDoRoutes";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", toDoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
