// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var App = angular.module('starter', ['ionic','ngRoute']);
App.config(['$routeProvider', function($routeProvider) {    
        $routeProvider
            .when('/', {              
                templateUrl: "index.html",
                controller: "AppCtrl"
            })
            .when('/login', {
                templateUrl: "login.html",
               
                controller: "AppCtrl"

            })
          }])
App.service("imdb",["$http","$log",imdb]);
angular.module('services', [])
.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});


App.controller("AppCtrl",["$scope","$log","imdb","$location",AppCtrl]);

App.controller("home_new",["$scope","$log","$location","imdb",home_new]);

/*function AppCtrl($scope,$log,imdb){

  $scope.data = [];
  $scope.refresh = function(d){
    console.log(d);
    var d = (d.split(" ")).join("+") ;
       console.log(d);
  imdb.getmovie($scope,d);

}

}*/
/*function imdb($http,$log){
  d = []
  this.getmovie = function($scope,d){
    $http.jsonp("http://www.omdbapi.com/?s="+d+"&callback=JSON_CALLBACK")
    .success(function(result){

      $scope.data = result.Search;
      $scope.$broadcast("scroll.refreshComplete");
      $log.info(JSON.stringify(result.Search));

    });
  };
}*/

function AppCtrl($scope,$log,imdb,$location){

  $scope.data = [];

  $scope.refresh = function(d){
    console.log(d);
  /*  $location.path("/login"); */
    /*$location.url('#/login')*/
   /* window.location = "http://192.168.43.87:8100/#/login.html";*/

   /* $location.reload();*/
   console.log($scope.data)

  imdb.getmovie($scope,d);
    $("form").css("display",None);
  console.log("i m here");
 
/*scope.$apply(function() { $location.path("/login"); });*/


}

}


function imdb($http,$log,$scope){
  d = []
/*  this.getmovie = function($scope,d){
    $http.jsonp("http://192.168.43.106:5000/api/get/user1")
    .success(function(result){
      


     $log.info("sdfsds");
      $log.info(JSON.stringify(result));

    });


  };*/

 this.getmovie= function($scope){$http({
  method: 'GET',
  url: 'https://192.168.43.106:5000/api/get/user1'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available

    console.log(response);
    console.log(response["data"])
    d.push(response["data"]);
      $scope.data = d;
          console.log($scope.data)
       /* home.get_data($scope,d);*/
       home_new(d,$scope);
      /*$(location).attr("href","/login.html");*/
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log("fail");
  });
}


}


function home_new(d,$scope,$log,$location){
  console.log("asa");
  $scope.final = []

    $scope.final = d;

    console.log( $scope.final);


  }













/*apikey=6341e4e4*/ 
App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



App.controller('WelcomeCtrl', function($scope, $state, UserService, $ionicLoading) {
  // This method is executed when the user press the "Sign in with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        UserService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.home');
      },
      function (msg) {
        $ionicLoading.hide();
      }
    );
  };
})



