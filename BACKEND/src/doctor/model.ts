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
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  doctorName: { type: String },
  // Store date as ISO YYYY-MM-DD string for easy comparison
  date: { type: String, required: true, default: () => new Date().toISOString().slice(0, 10) },
  time: { type: String, required: true },
});

// Prevent double-booking for the same doctor/date/time
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

export const DoctorModel = model("Doctor", doctorSchema);
export const AppointmentModel = model("Appointment", appointmentSchema);