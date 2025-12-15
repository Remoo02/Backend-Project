// config/seed.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Ski = require('../models/Ski');

async function seedDatabase() {
    console.log('🔍 Checking if database needs seeding...');

    const userCount = await User.countDocuments();
    const skiCount = await Ski.countDocuments();

    // ---- Seed users ----
    if (userCount === 0) {
        console.log('👤 No users found. Creating default users...');

        const password = 'Password123!'; // dev password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await User.insertMany([
            {
                email: 'admin@skishop.com',
                passwordHash,
                role: 'admin'
            },
            {
                email: 'user@skishop.com',
                passwordHash,
                role: 'user'
            }
        ]);

        console.log(' Default users created:');
        console.log('   admin@skishop.com / Password123!');
        console.log('   user@skishop.com  / Password123!');
    } else {
        console.log(`👤 Users already exist (count: ${userCount}), skipping user seed.`);
    }

    // ---- Seed skis ----
    if (skiCount === 0) {
        console.log(' No skis found. Creating sample skis...');

        await Ski.insertMany([
            {
                brand: 'Atomic',
                model: 'Redster G9',
                length: 177,
                category: 'race',
                skillLevel: 'expert',
                price: 1199,
                inStock: true
            },
            {
                brand: 'Salomon',
                model: 'QST 98',
                length: 172,
                category: 'all-mountain',
                skillLevel: 'intermediate',
                price: 749,
                inStock: true
            },
            {
                brand: 'Fischer',
                model: 'Ranger 102',
                length: 184,
                category: 'freeride',
                skillLevel: 'advanced',
                price: 899,
                inStock: false
            },
            {
                brand: 'Dynafit',
                model: 'Tour 88',
                length: 166,
                category: 'touring',
                skillLevel: 'intermediate',
                price: 699,
                inStock: true
            },
            {
                brand: 'Rossignol',
                model: 'Experience 76',
                length: 168,
                category: 'all-mountain',
                skillLevel: 'beginner',
                price: 499,
                inStock: true
            }
        ]);

        console.log('✅ Sample skis created.');
    } else {
        console.log(`Skis already exist (count: ${skiCount}), skipping ski seed.`);
    }

    console.log('Seeding finished.');
}

module.exports = seedDatabase;
