const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

//add stylesheet in public folder
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//stylesheet in public folder
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

//set up handlebars as template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
