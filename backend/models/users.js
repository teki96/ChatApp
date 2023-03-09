const db = require('../db/pool')

const users = {
  findAll: () => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query('SELECT * FROM users;', (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }),
  create: (user) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release()
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      const selectQuery = 'SELECT * FROM users WHERE email LIKE ?;'
      connection.query(selectQuery, email, (err, result) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}

module.exports = users
