var dashboardServices = angular.module('dashboardServices', ['ngResource']);


dashboardServices.factory('SebalImagesResource', function($resource) {
  return $resource('http://localhost:9192/images');
});

dashboardServices.service('TaskResource', function($resource) {
  return $resource("http://localhost:9192/tasks/:image", {}, {
    get: { method: "GET", isArray: true }
  });
});


//Using HTTP.get
//dashboardServices.service('SebalImagesService', function($http, $filter, $log) {
//
//	this.getImages = function() {
//
//	    $log.debug('Getting images from http://localhost:9192/images');
//	    $http.get('http://localhost:9192/images').success(function(data) {
//	    	var images = data;
//	    	$log.debug('Returning images: '+JSON.stringify(images));
//	      	return images;
//	    });
//          
//  };
//
//});

//dashboardServices.service('TaskResource', function($http, $filter, $log) {
//
//	this.getTaskForImage = function(imgName) {
//
//    	console.log("Getting tasks for :"+imgName);
//    	$http.get('http://localhost:9192/tasks/'+imgName).success(function(data) {
//    		return data;
//		});          
//  };
//
//});



/* Services */
//Template for Services
//var phonecatServices = angular.module('phonecatServices', ['ngResource']);
//
//phonecatServices.factory('Phone', ['$resource',
//  function($resource){
//    return $resource('phones/:phoneId.json', {}, {
//      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//    });
//  }]);