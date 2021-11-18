const helmet = require('helmet');
const logger = require('./utill/logger');
const express = require('express');
const app = express();
app.use(helmet());

require('./routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;