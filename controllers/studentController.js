const Student = require('../models/student');
const Mentor = require('../models/mentor');

exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send({ message: "Student created successfully", student });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.changeMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;
        const student = await Student.findById(studentId);

        if (!student) return res.status(404).send("Student not found");

        if (student.mentor) student.previousMentors.push(student.mentor);

        student.mentor = mentorId;
        await student.save();

        res.status(200).send({ message: "Mentor changed successfully", student });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getPreviousMentors = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('previousMentors');
        if (!student) return res.status(404).send("Student not found");

        res.status(200).send(student.previousMentors);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
