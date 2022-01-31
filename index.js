const helmet = require('helmet');
const logger = require('./util/logger');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '500kb'}));
app.use(bodyParser.urlencoded({limit: '500kb', extended: true}));
app.use(helmet());

require('./routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;