const { app, http } = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});