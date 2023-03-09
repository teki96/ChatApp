const express = require('express')
const router = express.Router()
const { getMessages, createMessage, getMessageById, updateMessageById, deleteMessageById } = require('../controllers/messages')
const verifyToken = require('../middleware/verifyToken')

router.get('/', getMessages)
router.post('/', createMessage)
router.get('/:id', getMessageById)
router.put('/:id', updateMessageById)
router.delete('/:id', deleteMessageById)

router.use(verifyToken)

module.exports = router
