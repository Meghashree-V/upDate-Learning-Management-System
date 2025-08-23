import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User';

/*
  One-time admin seeding script.

  Run (Windows PowerShell):
      $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="StrongPass!234"; npm run seed:admin

  Notes:
  - Uses MONGODB_URI from server/.env
  - Requires ADMIN_EMAIL and ADMIN_PASSWORD environment variables.
  - If the user with ADMIN_EMAIL exists, it will be promoted to role "admin" and password updated.
  - If the user does not exist, it will be created as admin with the provided credentials.
*/

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || '';
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in environment. Set it in server/.env');
    process.exit(1);
  }

  const ADMIN_EMAIL_RAW = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const FIRST_NAME = process.env.ADMIN_FIRST_NAME || 'Admin';
  const LAST_NAME = process.env.ADMIN_LAST_NAME || 'User';
  const PHONE = process.env.ADMIN_PHONE || '';

  if (!ADMIN_EMAIL_RAW || !ADMIN_PASSWORD) {
    console.error('Missing required env. Set ADMIN_EMAIL and ADMIN_PASSWORD before running.');
    process.exit(1);
  }

  const ADMIN_EMAIL = ADMIN_EMAIL_RAW.toLowerCase();

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (user) {
      console.log(`User ${ADMIN_EMAIL} exists. Ensuring role=admin`);
      user.role = 'admin';
      user.password = await bcrypt.hash(ADMIN_PASSWORD, 10);
      console.log('Updated admin password.');
      await user.save();
      console.log('Admin user updated:', { id: user.id, email: user.email });
    } else {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      user = await User.create({
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: ADMIN_EMAIL,
        phone: PHONE,
        password: hashed,
        role: 'admin',
      });
      console.log('Admin user created:', { id: user.id, email: user.email });
    }
  } catch (err) {
    console.error('Seed admin error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(process.exitCode || 0);
  }
}

main();
