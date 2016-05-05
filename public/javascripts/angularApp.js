var app = angular.module('redditclone', [
        'ui.router'
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
		
        $stateProvider
            //home state
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['postRepository', function(postRepository){
                        return postRepository.getAll();
                    }]
                }
            })
			
			// posts state
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'postRepository', function($stateParams, postRepository) {
                        return postRepository.get($stateParams.id);
                    }]
                }
            });
            // login state
            .state('login', {
			url: '/login',
			templateUrl: '/login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
					}
				}]
			})
.state('register', {
  url: '/register',
  templateUrl: '/register.html',
  controller: 'AuthCtrl',
  onEnter: ['$state', 'auth', function($state, auth){
    if(auth.isLoggedIn()){
      $state.go('home');
    }
  }]
});

        $urlRouterProvider.otherwise('home');
    }
]);

.factory('posts', ['$http', 'auth', function($http, auth){


// auth Factory
.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

  return auth;
}])

// For getting and setting our token to localStorage
auth.saveToken = function (token){
  $window.localStorage['flapper-news-token'] = token;
};

// Returns the username of the user that's logged in.
auth.getToken = function (){
  return $window.localStorage['flapper-news-token'];
}

// Return a boolean value for if the user is logged in.
auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

// Returns the username of the user that's logged in.
auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.username;
  }
};

// Posts a user to our /register route and saves the token returned.
auth.register = function(user){
  return $http.post('/register', user).success(function(data){
    auth.saveToken(data.token);
  });
};
// Posts a user to our /login route and saves the token returned.
auth.logIn = function(user){
  return $http.post('/login', user).success(function(data){
    auth.saveToken(data.token);
  });
};

auth.logOut = function(){
  $window.localStorage.removeItem('flapper-news-token');
};


app.factory('postRepository', ['$http', function($http){
    var o = {
        posts: []
    };

    o.get = function(id) {
        return $http.get('/posts/' + id).then(function(res){
            return res.data;
        });
    };

    o.getAll = function() {
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };

    o.create = function(post) {
  return $http.post('/posts', post, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
    o.posts.push(data);
  });
};

o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote', null, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
    post.upvotes += 1;
  });
};

o.addComment = function(id, comment) {
  return $http.post('/posts/' + id + '/comments', comment, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  });
};

o.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
  }).success(function(data){
    comment.upvotes += 1;
  });
};

    return o;
}]);

.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;
	}]);

// Authentication Controller
.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])


//Main Controller
app.controller('MainCtrl', [
    '$scope',
    'postRepository',
    function($scope, postRepository){
		$scope.isLoggedIn = auth.isLoggedIn;

        $scope.test = 'Hello world!';

        $scope.posts = postRepository.posts;

        $scope.addPost = function(){
            if(!$scope.title || $scope.title === '') { return; }
            postRepository.create({
                title: $scope.title,
                link: $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            postRepository.upvote(post);
        };

    }
]);

// Posts Controller
app.controller('PostsCtrl', [
    '$scope',
    'postRepository',
    'post',
    function($scope, postRepository, post){
        $scope.post = post;
$scope.isLoggedIn = auth.isLoggedIn;

        $scope.addComment = function(){
            if($scope.body === '') { return; }
            postRepository.addComment(post._id, {
                body: $scope.body,
                author: 'user'
            }).success(function(comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementCommentUpvotes = function(comment){
            postRepository.upvoteComment(post, comment);
        };
    }
]);
