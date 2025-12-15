const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const skiController = require('../controllers/ski');
const validate = require('../middleware/validate');
const { skiCreateSchema, skiUpdateSchema } = require('../validators/ski');

const router = express.Router();

// Public for authenticated users
router.get('/',requireAuth, skiController.listSkis);
router.get('/:id', requireAuth, skiController.getSkiById);

// Admin only
router.post(
    '/',
    requireAuth,
    requireRole('admin'),
    validate(skiCreateSchema),
    skiController.createSki
);

router.put(
    '/:id',
    requireAuth,
    requireRole('admin'),
    validate(skiUpdateSchema),
    skiController.updateSki
);

router.delete(
    '/:id',
    requireAuth,
    requireRole('admin'),
    skiController.deleteSki
);

module.exports = router;
