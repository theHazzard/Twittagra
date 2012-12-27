
/*
 * GET home page.
 */
var elJson = {};
var request = require('request');
exports.index = function(req, res){
  request({uri:'https://api.twitter.com/1.1/statuses/home_timeline.json',
		oauth:{ consumer_key: 'hBERNmk8i49jaYJpA00cQ'
        , consumer_secret: '0cXgorJPGvhhyo0gT5DK4KvXC1tgBrFIhx2NFpqQco'
        , token: '7182302-2irZJmLUs2F47kqA6cRLs95Bt9kbNRCtczRYcH27w'
        , token_secret: 'jxyD4pFfbCy8brpuPs4U8inHKzlN8pYPKma9pB2OrBY'
        },
		json:true},function(req,res,body){
 		elJson = body;

  });
  res.render('index', { title: 'Twittagra!', user: req.user, tweets: elJson });
};