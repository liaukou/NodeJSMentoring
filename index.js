const appConfig = require('./config/appConfig');
const models = require('./models');

console.log(appConfig.name);

const user = new models.User();
const product = new models.Product();