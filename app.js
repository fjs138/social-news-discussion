var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// Require mongoose, connect and require mongoose models
var mongoose = require('mongoose');
var passport = require('passport');

// Create and authenticate users
var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true},
	hash: String,
	salt: String
});

mongoose.model('User', UserSchema);

// Setting and validating passwords
var crypto = require('crypto');

// Accept a password then generate a salt and associated password hash
UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	// pbkdf2Sync() function takes four parameters:
	// password, salt, iterations, and key length. 
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Accept a password and compare it to the hash stored, return a boolean
UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	
	return this.hash == hash;
};

UserSchema.methods.generateJWT = function() {
	
	// Set expiration to 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	
	return jwt.sign({
		_id: this._id
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
		// Hardcoded secret for signing tokens for security.
		// This should be referenced with an environment variable
		// and kept out of the codebase, not hardcoded explicitly here.
	}, 'SECRET');
};

mongoose.connect('mongodb://localhost/news');
require('./models/Posts');
require('./models/Comments');
require('./models/Users');
require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
