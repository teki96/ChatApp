-- DROP existing tables, if any
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

-- Create user table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create message table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id VARCHAR(36) NOT NULL,
  username VARCHAR(36) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (username) REFERENCES users(username)
);

-- Insert sample users
INSERT INTO users (id, username, email, password)
VALUES
  ('9f06d2d4-b763-46f1-a0ff-09e94c05b244', 'user1', 'user1@example.com', 'password1'),
  ('55cd42a8-f634-42f0-be8e-327fe2a82eb1', 'user2', 'user2@example.com', 'password2');

-- Insert sample messages
INSERT INTO messages (sender_id, username, message)
VALUES
  ('9f06d2d4-b763-46f1-a0ff-09e94c05b244', 'user1', 'Hello user2, how are you?'),
  ('55cd42a8-f634-42f0-be8e-327fe2a82eb1', 'user2', 'I am good, how about you?'),
  ('9f06d2d4-b763-46f1-a0ff-09e94c05b244', 'user1', 'I am also good, thanks for asking!');
