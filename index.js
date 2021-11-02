const helmet = require('helmet');
const logger = require('./utill/logger');
const express = require('express');
const app = express();
app.use(helmet());

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;