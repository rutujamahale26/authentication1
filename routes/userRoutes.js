import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import authRoles from "../middleware/roleMiddleware.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.get("/admin", verifyToken, authRoles("admin"), async (req, res) => {
  try {
    const { date } = req.query;
    const filter = {};

    // 📅 Filter by registration date (createdAt)
    if (date) {
      const startDate = new Date(date); // e.g. 2025-06-20
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1); // exclusive next day

      filter.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const users = await User.find(filter).select("-password");

    res.json({
      message: "Welcome to admin panel",
      datetime: new Date(),
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

router.get("/user", verifyToken, authRoles("admin", "user"), (req, res) => {
  res.json({ message: "Welcome to users panel " });
});

export default router;
