const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const passport = require('passport');


router.get('/logout', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const query = 'UPDATE users SET token = NULL WHERE id = $1';
    await pool.query(query, [userId]);

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong while logging out.' });
  }
});

module.exports = router;