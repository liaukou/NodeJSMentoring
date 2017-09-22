const appConfig = require('./src/config/appConfig');
const { User, Product } = require('./src/models');
const Importer = require('./src/importer');

console.log(appConfig.name);

const user = new User();
const product = new Product();

const importer = new Importer('./src/data/', 1000);

const dataAsync = importer.import('./src/data/MOCK_DATA.csv');
dataAsync.then(data => {
    console.log(data);
});

const data = importer.importSync('./src/data/MOCK_DATA.csv');
console.log(data);

importer.importCsv();