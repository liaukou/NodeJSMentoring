const appConfig = require('./src/config/appConfig');
const { User, Product } = require('./src/models');
const DirWatcher = require('./src/dirwatcher');
const Importer = require('./src/importer');

console.log(appConfig.name);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch('./src/data', 1000);

let data = importer.import('./src/data/MOCK_DATA.csv');