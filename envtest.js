// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});
