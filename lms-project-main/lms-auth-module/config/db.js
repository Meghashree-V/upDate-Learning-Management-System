// config/db.js
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI missing in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser/useUnifiedTopology no longer required on latest mongoose
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
