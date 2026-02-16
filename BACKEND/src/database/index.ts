import { connect, set } from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    set("strictQuery", false);
    await connect(process.env.MONGO_URL!, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB conectado a: ${process.env.DB_NAME}`);
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err);
  }
};

export default dbConnect;