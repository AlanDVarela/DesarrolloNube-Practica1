import { Router } from "express";
import { getDoctors, getDoctorById, createAppointment, updateDoctorSchedule } from "./controller";

const router = Router();


router.get("/", (_req, res) => res.send("API working"));
router.get("/doctors", getDoctors);
router.patch("/doctors/:id/schedule", updateDoctorSchedule);
router.get("/doctors/:id", getDoctorById);
router.post("/appointments", createAppointment);

export default router;