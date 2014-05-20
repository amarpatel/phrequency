var app = angular.module('phrequency', ['colorpicker.module', 'ngAnimate', 'fx.animations'])

// .config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: '../templates/indicators.html',
//       controller: 'indicatorController'
//     })
// }])

.controller('indicatorController', ['$scope', '$interval', 'restful', 'intervalCreator', function ($scope, $interval, restful, intervalCreator) {

  $scope.changeClass = function (item) {
    item.class = (item.class === "happening") ? "notHappening" : "happening";
  };

  $scope.get = function () {
    restful.getIndicators().then(function (promise){
      $scope.indicators = promise.data;
      for (var i=0;i<$scope.indicators.length;i++) {
        intervalCreator.createInterval($scope.changeClass, $scope.indicators[i].frequency, $scope.indicators[i]);
      }
    });
  };

  $scope.get();

  $scope.click = function (inputName, inputFrequency, inputBackground, inputFontColor) {
    restful.sendIndicator(inputName, inputFrequency, inputBackground, inputFontColor).then(function (promise) {
      $scope.inputName = '';
      $scope.inputFrequency = '';
    });
  };
}])

.factory('restful', ['$http', function ($http) {
  return {
    sendIndicator: function (inputName, inputFrequency, inputBackground, inputFontColor) {
      return $http({
        method: 'POST',
        url: '/submit',
        data: {name: inputName, frequency: inputFrequency, background: inputBackground, font: inputFontColor}
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

.factory('intervalCreator', ['$interval', function ($interval) {
  return {
    createInterval: function (func, interval, item) {
      return $interval(function () {
        func.call(this, item);
      }, interval);
    }
  }
}])







