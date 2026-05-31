const express = require('express');
const Rsvp = require('../models/Rsvp');

const router = express.Router();

/**
 * POST /api/rsvp
 * Create a new RSVP record.
 * Body: { name: string, maxGuests: number }
 * Returns 201 + saved record on success, 400 on validation failure.
 */
router.post('/', async (req, res) => {
  const { name, maxGuests } = req.body;

  // Manual validation before Mongoose (fast-fail, clear client messages)
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  if (!trimmedName) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: 'name is required and must be non-empty',
    });
  }
  const guestCount = Number(maxGuests);
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: 'maxGuests must be an integer of at least 1',
    });
  }

  try {
    const saved = await new Rsvp({ name: trimmedName, maxGuests: guestCount }).save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('POST /api/rsvp error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
});

/**
 * GET /api/rsvp
 * Retrieve all RSVP records sorted by newest first.
 * Returns { success, count, totalHeadcount, data }.
 */
router.get('/', async (_req, res) => {
  try {
    const records = await Rsvp.find().sort({ createdAt: -1 });
    const totalHeadcount = records.reduce((sum, r) => sum + r.maxGuests, 0);
    return res.status(200).json({
      success: true,
      count: records.length,
      totalHeadcount,
      data: records,
    });
  } catch (err) {
    console.error('GET /api/rsvp error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to retrieve RSVPs. Please try again.',
    });
  }
});

module.exports = router;
