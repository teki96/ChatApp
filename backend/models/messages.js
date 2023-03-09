const db = require('../db/pool')

const messages = {
  findAll: () => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query('SELECT * FROM messages;', (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }),
  create: (message) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query('INSERT INTO messages SET ?;', message, (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }),
  findById: (id) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      const selectQuery = 'SELECT * FROM messages WHERE id = ?;'
      connection.query(selectQuery, id, (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }),
  updateById: (id, updates) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      const updateQuery = 'UPDATE messages SET ? WHERE id = ?;'
      connection.query(updateQuery, [updates, id], (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      const deleteQuery = 'DELETE FROM messages WHERE id = ?;'
      connection.query(deleteQuery, id, (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}

module.exports = messages
