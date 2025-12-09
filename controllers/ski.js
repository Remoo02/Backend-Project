// src/controllers/ski.controller.js
const Ski = require('../models/Ski');

// GET /api/skis
// Supports filters: brand, category, skillLevel, inStock, minLength, maxLength, minPrice, maxPrice, q
exports.listSkis = async (req, res) => {
    try {
        const {
            brand,
            category,
            skillLevel,
            inStock,
            minLength,
            maxLength,
            minPrice,
            maxPrice,
            q
        } = req.query;

        const filter = {};

        if (brand) {
            filter.brand = new RegExp(brand, 'i'); // case-insensitive
        }

        if (category) {
            filter.category = category;
        }

        if (skillLevel) {
            filter.skillLevel = skillLevel;
        }

        if (typeof inStock !== 'undefined') {
            // expect "true" or "false"
            filter.inStock = inStock === 'true';
        }

        if (minLength || maxLength) {
            filter.length = {};
            if (minLength) filter.length.$gte = Number(minLength);
            if (maxLength) filter.length.$lte = Number(maxLength);
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (q) {
            // simple text search on brand + model
            filter.$or = [
                { brand: new RegExp(q, 'i') },
                { model: new RegExp(q, 'i') }
            ];
        }

        const skis = await Ski.find(filter).sort({ createdAt: -1 });
        res.json(skis);
    } catch (err) {
        console.error('Error listing skis:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/skis/:id
exports.getSkiById = async (req, res) => {
    try {
        const ski = await Ski.findById(req.params.id);
        if (!ski) {
            return res.status(404).json({ message: 'Ski not found' });
        }
        res.json(ski);
    } catch (err) {
        console.error('Error getting ski:', err);
        // Invalid ObjectId also ends here
        res.status(400).json({ message: 'Invalid ID' });
    }
};

// POST /api/skis
// Body already validated by Joi in middleware
exports.createSki = async (req, res) => {
    try {
        const ski = new Ski(req.body);
        const saved = await ski.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Error creating ski:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /api/skis/:id
// Body already validated by Joi in middleware
exports.updateSki = async (req, res) => {
    try {
        const updated = await Ski.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Ski not found' });
        }

        res.json(updated);
    } catch (err) {
        console.error('Error updating ski:', err);
        res.status(400).json({ message: 'Invalid ID or data' });
    }
};

// DELETE /api/skis/:id
exports.deleteSki = async (req, res) => {
    try {
        const deleted = await Ski.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Ski not found' });
        }

        // 204 normally has no body; but many APIs return deleted entity; your choice
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting ski:', err);
        res.status(400).json({ message: 'Invalid ID' });
    }
};
