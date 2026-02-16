import { Router } from "express";
import { getDoctors, getDoctorById, createAppointment } from "./controller";

const router = Router();

router.get("/doctors", getDoctors);
router.get("/doctors/:id", getDoctorById);
router.post("/appointments", createAppointment);

export default router;