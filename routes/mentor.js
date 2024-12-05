const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/create', mentorController.createMentor);
router.post('/assign-students', mentorController.assignStudents);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);

module.exports = router;
