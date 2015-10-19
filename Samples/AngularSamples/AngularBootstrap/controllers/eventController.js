var app = angular.module('EventModule', []);

app.controller('eventController', function($scope, $http) {
    $scope.getEvents = function() {
      $http.get('http://localhost:9192/event').success(function(data) {
  			$scope.events = data;
		});
    };
  });