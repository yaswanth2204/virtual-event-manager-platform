
const { sendEmail } = require("../util/sendEmail")
const { eventRegistrationMessage } = require("../messageTemplates/eventRegistrationMessage");
const eventModel = require('../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find()

        res.status(200).send(events)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}

const createEvent = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        if (req.user.role != "organizer") {
            return res.status(403).send({ msg: 'Only organizers can create events' });
        }
        if (!title || !description || !date || !time) {
            return res.status(400).send({ msg: 'All required fields must be provided' });
        }
        const event = await eventModel.create({
            title,
            description,
            date,
            time,
            createdBy: req.user._id
        })
        res.status(201).send({ msg: 'Event created successfully', event })

    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong', error: error.message });
    }

}

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = req.body;

        const event = await eventModel.findById(id);

        if (!event || event.isDeleted === true) {
            return res.status(404).send({ msg: 'Event not found' });
        }

        if (req.user.role !== 'organizer') {
            return res.status(403).send({ msg: 'Only organizers can update events' });
        }

        Object.assign(event, updatedEvent);
        event.modifiedBy = req.user._id;
        event.modifiedAt = new Date();

        await event.save();
        res.status(200).send({ msg: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await eventModel.findById(id);

        if (!event) {
            return res.status(404).send({ msg: 'Event not found or already deleted' });
        }

        if (req.user.role !== 'organizer') {
            return res.status(403).send({ msg: 'Only organizers can delete events' });
        }

        await eventModel.deleteOne(event);

        res.status(200).send({ msg: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }



}

const registerForEvent = async (req, res) => {
    try {

        const { id } = req.params;
        const event = await eventModel.findById(id);
        const { title, date, time } = event
        if (!event) {
            return res.status(404).send({ msg: 'Event not found' });
        }

        if (event.participants.includes(req.user._id)) {
            return res.status(400).send({ msg: 'Already registered' });
        }
        event.participants.push(req.user._id);

        await event.save();
        await sendEmail(req.user.email, `✅ You're registered for ${title}`,
            eventRegistrationMessage(req.user.username, title, date, time));
        res.status(200).send({ msg: 'Registered successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    registerForEvent,
};