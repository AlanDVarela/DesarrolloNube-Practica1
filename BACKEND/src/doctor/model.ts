import { Schema, model } from "mongoose";

// Modelo de Doctor
const doctorSchema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  imageUrl: { type: String, required: true },
  availableHours: [{ type: String }],
});

// Modelo de Cita
const appointmentSchema = new Schema({
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String, required: true },
  doctorName: { type: String }, 
  date: { type: String, default: () => new Date().toLocaleDateString() },
  time: { type: String, required: true },
});

export const DoctorModel = model("Doctor", doctorSchema);
export const AppointmentModel = model("Appointment", appointmentSchema);