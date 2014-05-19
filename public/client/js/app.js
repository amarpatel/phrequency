var app = angular.module('phrequency', [])

.controller('indicatorController', ['$scope', '$interval', 'restful', 'intervalCreator', function ($scope, $interval, restful, intervalCreator) {

  // $scope.changeClass = function (item) {
  //   $scope.class = ($scope.class === "happening") ? "notHappening" : "happening";
  // };

  $scope.changeClass = function (item) {
    item.class = (item.class === "happening") ? "notHappening" : "happening";
  };

  $scope.get = function () {
    restful.getIndicators().then(function (promise){
      $scope.indicators = promise.data;
      console.log($scope.indicators);





      for (var i=0;i<$scope.indicators.length;i++) {
        console.log($scope.indicators[i].frequency)

        intervalCreator.createInterval($scope.changeClass, $scope.indicators[i].frequency, $scope.indicators[i]);
      }


    });
  };

  $scope.get();

  $scope.click = function (inputName, inputFrequency) {
    restful.sendIndicator(inputName, inputFrequency).then(function (promise) {
      $scope.inputName = '';
      $scope.inputFrequency = '';
    });
  };


  $scope.class = "happening"

}])
.factory('restful', ['$http', function ($http) {
  return {
    sendIndicator: function (inputName, inputFrequency) {
      return $http({
        method: 'POST',
        url: '/submit',
        data: {name: inputName, frequency: inputFrequency}
      }).success(function (data, status) {
        console.log('success!', data);
        return data;
      }).error(function (data, status) {
        console.log('error!', data, status);
      });
    },
    getIndicators: function () {
      return $http({
        method: 'GET',
        url: '/submit'
      }).success(function (data, status) {
        return data;
      }).error(function (data, status) {
        console.log('error!', data, status);
      });
    }
  }
}])

.factory('intervalCreator', [ '$interval', function ($interval) {
  return {
    createInterval: function (func, interval, item) {
      return $interval(function () {
        func.call(this, item);
      }, interval);
    }
  }
}])


/*
create factory
input object
output function/promise
in controller
  invoke factory
  append .then and call the function over and over again

*/