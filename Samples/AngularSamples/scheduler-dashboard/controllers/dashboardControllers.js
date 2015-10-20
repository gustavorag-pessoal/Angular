var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('MonitorController', function($scope, $log, $filter, SebalImagesResource, TaskResource) {
	
	$scope.isStarted = false;
	$scope.tasksStates = [];
  $scope.sebalImages = [];
  $scope.tasks = [];
  $scope.itemsByPage = 5;


  $scope.getSebalImages = function() {
      $log.debug('Controller getting images into scope.sebalImages');
      SebalImagesResource.query(function(data) {
          $log.debug('Images: '+JSON.stringify(data));
          $scope.sebalImages = data;
          $scope.paginationItems = $scope.sebalImages;
      }); 
  };

  $scope.getTaskForImage = function(imageName) {

      $log.debug("Getting tasks for :"+imageName);
      TaskResource.get({ image: imageName }, function(data) {
          $scope.tasksStates = []; //Restart
          $scope.tasks = data;

          angular.forEach($scope.tasks, function(value, key) {

              //new event
              var temp_task = {taskId : value.taskId , resourceId: value.resourceId };

              var imageTaskState = $filter('filter')($scope.tasksStates, function (d) {return d.state === value.state;})[0];
              
              if(!angular.isDefined(imageTaskState)){
                $log.debug('Add New Task Type: '+value.state);
                var temp_tasksByState = [];
                imageTaskState = {state: value.state, tasks: temp_tasksByState}

                $scope.tasksStates.push(imageTaskState);

                $log.debug('Add new Task State:'+JSON.stringify(imageTaskState));
              }

              $log.debug('Add New Task: '+JSON.stringify(temp_task));
              imageTaskState.tasks.push(temp_task);
          });
      });
  };

});

app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

dashboardControllers.controller("PaginationController", function($scope, $log) {

  $scope.itemsPerPage = 5;
  $scope.itemsPerPageOptions = [5, 8, 10, 15, 20];
  $scope.currentPage = 0;
  $scope.prevPageDisabled = true;
  $scope.nextPageDisabled = true;

  var pageCount;

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
    prevPageCheck();
  };
 
  $scope.pageCount = function() {
    
    pageCount = Math.ceil($scope.sebalImages.length/$scope.itemsPerPage)-1;
    prevPageCheck();
    nextPageCheck();
    return pageCount;
  };

  $scope.getPages = function() {
    var pages = [];
    var range = $scope.pageCount()+1;
    for (var i = 0; i < range; i++) {
      pages.push(i+1);
    };
    return pages;
  };

  $scope.setPage = function(n) {
    $log.debug('Setting page:'+n);
    $scope.currentPage = n;
    prevPageCheck();
    nextPageCheck();
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
    nextPageCheck();
  };

  $scope.selectItensPerPage = function(n){
    $log.debug('Setting number of itens:'+n);  
    $scope.itemsPerPage = n;
  };

  function prevPageCheck(){
    if($scope.currentPage === 0){
        $scope.prevPageDisabled = true;
    }else{
        $scope.prevPageDisabled = false;
    }
    $log.debug('PrevPage:'+$scope.prevPageDisabled);
  }

  function nextPageCheck(){
    if($scope.currentPage === pageCount){
        $scope.nextPageDisabled = true;
    }else{
        $scope.nextPageDisabled = false;
    }
    $log.debug('NextPage:'+$scope.nextPageDisabled);
  }
  



});


