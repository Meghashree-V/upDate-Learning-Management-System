import { Request, Response } from "express";
import User from "../models/User";

// Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.create({ name, email, role });
    return res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: "Email already exists" });
    return res.status(400).json({ message: error.message });
  }
};

// Read all
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Read single
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    // optional: avoid duplicate email on update
    if (req.body.email) {
      const exists = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id } });
      if (exists) return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: "Email already exists" });
    return res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
