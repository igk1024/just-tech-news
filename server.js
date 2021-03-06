const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

//add stylesheet in public folder
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

//set up handlebars as template engine
const exphbs = require('express-handlebars');

//import helper functions
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

//use express session and sequelize store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//automatically store user's cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//set up handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//stylesheet in public folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});