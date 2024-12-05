const Mentor = require('../models/mentor');
const Student = require('../models/student');

exports.createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send({ message: "Mentor created successfully", mentor });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.assignStudents = async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;
        const mentor = await Mentor.findById(mentorId);

        if (!mentor) return res.status(404).send("Mentor not found");

        await Student.updateMany(
            { _id: { $in: studentIds }, mentor: null },
            { mentor: mentorId }
        );

        mentor.students.push(...studentIds);
        await mentor.save();

        res.status(200).send({ message: "Students assigned to mentor", mentor });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) return res.status(404).send("Mentor not found");

        res.status(200).send(mentor.students);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
