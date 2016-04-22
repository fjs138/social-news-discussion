var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// -------- Mongoose ----------
var mongoose = require('mongoose');
var Post = mongoose.model('Post');          // load post model
var Comment = mongoose.model('Comment');    // load comment model

// ----------- REST Routes --------------
// Get all posts
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) { return next(err); }
		
		res.json(posts);
	});
});

// Create new post; making a POST request to the server 
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});


module.exports = router;
