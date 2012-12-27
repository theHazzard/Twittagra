
/**
 * Module dependencies.
 */
var usertoken,usersecret;
var express = require('express')
  , routes = require('./routes')(usertoken,usersecret)
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var passport = require('passport')
, TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var app = express();

passport.use(new TwitterStrategy({
    consumerKey: '07BhinJu0WvqBZ0a3wYMog',
    consumerSecret: 'wW819wb2t8MTQzgvu24CddBFSa7oCU1vO6hdGIEEgY',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      usertoken = token;
      usersecret = tokenSecret;
      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, {usuario: profile, usertoken:token, usersecret:tokenSecret});
    });
  }
));

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/twitteagrar', routes.twitteagrar);

app.get('/auth/twitter', passport.authenticate('twitter'));


app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
