const express = require('express');
const routers = require('./Routers/router');
const DB_connection = require('./Config/db_config');

const port = process.env.port || 9010;

const app = express();
DB_connection();

app.use(express.json());
app.use(express.static('Public'));
app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");  // set view engine to ejs
app.set("views",__dirname + "/Views")  // set view path
app.use("", routers);

app.listen(port,()=> console.log(`Server is running on port ${port}`));
