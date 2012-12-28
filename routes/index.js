
/*
 * GET home page.
 */
var elJson = {};
var request = require('request');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
module.exports = function(usertoken,usersecret){
	return {
		twitteagrar : function(req, res){
			var tweet = req.body['tweet'];
			console.log(req.body['tweet']);
			var token = req.user ? req.user['usertoken'] : null;
			var tokensecret = req.user ? req.user['usersecret'] : null;
		  	request.post({url:'https://api.twitter.com/1.1/statuses/update.json',
				oauth:{ consumer_key: '07BhinJu0WvqBZ0a3wYMog'
		        , consumer_secret: 'wW819wb2t8MTQzgvu24CddBFSa7oCU1vO6hdGIEEgY'
		        , token: token
		        , token_secret: tokensecret		       
		        },
				json:true,
				body: 'status='+tweet
				},function(req,res){	
		  	});
		  	res.redirect('http://twittagra.jit.su');
		},
		index : function(req, res){
		  var token = req.user ? req.user['usertoken'] : null;
		  var tokensecret = req.user? req.user['usersecret'] : null;
		  request({uri:'https://api.twitter.com/1.1/statuses/home_timeline.json',
				oauth:{ consumer_key: '07BhinJu0WvqBZ0a3wYMog'
		        , consumer_secret: 'wW819wb2t8MTQzgvu24CddBFSa7oCU1vO6hdGIEEgY'
		        , token: token
		        , token_secret: tokensecret
		        },
				json:true},function(requ,resp,body){
		 			elJson = body;
		  });
		  res.render('index', { title: 'Twittagra', user: req.user, tweets: elJson });
		}
	}
}
