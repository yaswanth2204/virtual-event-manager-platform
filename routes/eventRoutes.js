const express = require("express")
const router = express.Router()
const { authMiddleware, roleMiddleware } = require("../middlewares/authorization")
const {getAllEvents,createEvent,updateEvent,deleteEvent,registerForEvent} = require("../controllers/eventsController")

router.get('/', getAllEvents);
router.post('/', authMiddleware,roleMiddleware('organizer'), createEvent);
router.put('/:id', authMiddleware, roleMiddleware('organizer'), updateEvent);
router.delete('/:id', authMiddleware, roleMiddleware('organizer'), deleteEvent);
router.post('/:id/register', authMiddleware, registerForEvent);


module.exports = router