const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/create', studentController.createStudent);
router.post('/change-mentor', studentController.changeMentor);
router.get('/:studentId/previous-mentors', studentController.getPreviousMentors);

module.exports = router;
