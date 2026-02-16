import { Request, Response } from "express";
import { DoctorModel, AppointmentModel } from "./model";

// GET: Obtener todos los doctores
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await DoctorModel.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener doctores" });
  }
};

// GET: Obtener un doctor por ID (optionally filter availability by date via ?date=YYYY-MM-DD)
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const doctor = await DoctorModel.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor no encontrado" });

    if (date) {
      const dateStr = String(date);
      const appointments = await AppointmentModel.find({ doctorId: doctor._id, date: dateStr }).select('time -_id');
      const bookedTimes = appointments.map(a => a.time);
      const available = (doctor.availableHours || []).filter((h: string) => !bookedTimes.includes(h));
      const docObj: any = doctor.toObject();
      docObj.availableHours = available;
      return res.json(docObj);
    }

    res.json(doctor);
  } catch (error) {
    res.status(404).json({ message: "Doctor no encontrado" });
  }
};

// POST: Crear Cita (prevents double-booking and validates against doctor's schedule)
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientName, patientPhone, patientEmail, doctorId, time, date } = req.body;
    if (!patientName || !patientPhone || !patientEmail || !doctorId || !time) {
      return res.status(400).json({ message: "Campos faltantes" });
    }

    const dateStr = date ? String(date) : new Date().toISOString().slice(0, 10);

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor no encontrado" });

    // ensure the requested time is part of the doctor's schedule
    if (!doctor.availableHours.includes(time)) {
      return res.status(400).json({ message: "Horario no disponible para este doctor" });
    }

    // check for existing appointment (double-booking)
    const existing = await AppointmentModel.findOne({ doctorId, date: dateStr, time });
    if (existing) {
      return res.status(409).json({ message: "Horario ya reservado" });
    }

    await AppointmentModel.create({
      patientName,
      patientPhone,
      patientEmail,
      doctorId,
      doctorName: doctor.name,
      date: dateStr,
      time
    });

    res.json({ message: "Cita creada con éxito" });
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) return res.status(409).json({ message: "Horario ya reservado" });
    res.status(500).json({ message: "Error al crear cita" });
  }
};

// PATCH: Actualizar el horario disponible del doctor (body: { availableHours: string[] })
export const updateDoctorSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { availableHours } = req.body;
    if (!Array.isArray(availableHours)) return res.status(400).json({ message: "availableHours debe ser un arreglo" });

    const doctor = await DoctorModel.findByIdAndUpdate(id, { availableHours }, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor no encontrado" });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar horario" });
  }
};