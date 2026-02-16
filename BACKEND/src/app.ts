import express, {static as static_} from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./database";
import doctorRoutes from "./doctor/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/api", doctorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  dbConnect();
});