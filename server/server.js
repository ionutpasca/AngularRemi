var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var path = require('path');

var port = process.env.PORT || 3000;

var app = express();
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(__dirname));

app.use(session({
    secret: 'aiudshsiuefcjdiej23e4324wijacsdd'
}));

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes.js')(app, passport);
require('./config/passport')(passport);
require('./chat/socketIoChat')(app);
require('./gameCore/socketIoGame')(app);


app.listen(port);
