// config/db.js
const mongoose = require('mongoose');

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB connected');
        console.log('✅ Using DB:', mongoose.connection.name); // <= ADD THIS
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
}

module.exports = connectDB;
