import { Router } from "express";
import User from "../models/User";

const router = Router();

// 👉 Create User
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.create({ firstName, lastName, email, phone, password, role });
    res.status(201).json(user);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: "Error creating user", details: err.message });
  }
});

// 👉 Get All Users
router.get("/", async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// 👉 Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// 👉 Update User
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error updating user" });
  }
});

// 👉 Delete User
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
