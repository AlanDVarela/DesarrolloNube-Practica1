import { Request, Response } from "express";
import { DoctorModel, AppointmentModel } from "./model";

// GET: Obtener todos los doctores
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await DoctorModel.find();
    res.json(doctors); // <--- JSON, NO RENDER
  } catch (error) {
    res.status(500).json({ message: "Error al obtener doctores" });
  }
};

// GET: Obtener un doctor por ID
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);
    res.json(doctor); // <--- JSON
  } catch (error) {
    res.status(404).json({ message: "Doctor no encontrado" });
  }
};

// POST: Crear Cita
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientName, patientPhone, patientEmail, doctorId, time } = req.body;
    // Aquí podrías buscar el nombre del doctor si lo necesitas guardar
    await AppointmentModel.create({
      patientName,
      patientPhone,
      patientEmail,
      doctorId,
      time
    });
    res.json({ message: "Cita creada con éxito" }); // <--- JSON
  } catch (error) {
    res.status(500).json({ message: "Error al crear cita" });
  }
};