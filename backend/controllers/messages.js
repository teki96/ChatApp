/* eslint-disable camelcase */
const messages = require('../models/messages')

const getMessages = async (req, res) => {
  try {
    const response = await messages.findAll()
    res.send(response)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const createMessage = async (req, res) => {
  const { sender_id, username, message } = req.body

  const newMessage = {
    sender_id,
    username,
    message
  }

  try {
    const response = await messages.create(newMessage)
    if (response) {
      res.status(201).json({
        senderId: newMessage.senderId,
        username: newMessage.username,
        message: newMessage.message
      })
    } else {
      res.status(500).send('Something went wrong creating the message')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const getMessageById = async (req, res) => {
  const { id } = req.params

  try {
    const response = await messages.findById(id)
    res.send(response)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const updateMessageById = async (req, res) => {
  const { id } = req.params
  const { sender_id, username, message } = req.body

  const updatedMessage = {
    sender_id,
    username,
    message
  }

  try {
    const result = await messages.updateById(id, updatedMessage)
    if (!result) {
      return res.status(500).send('Something went wrong updating the message')
    }

    res.status(200).json({
      id: updatedMessage.id,
      senderId: updatedMessage.senderId,
      username: updatedMessage.username,
      message: updatedMessage.message
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const deleteMessageById = async (req, res) => {
  const { id } = req.params
  console.log('id: ', id)

  try {
    const result = await messages.deleteById(id)
    if (!result) {
      return res.status(500).send('Something went wrong deleting the message')
    }

    res.status(200).send('Message deleted')
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

module.exports = {
  getMessages,
  createMessage,
  getMessageById,
  updateMessageById,
  deleteMessageById
}
