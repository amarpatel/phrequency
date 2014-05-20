var app = angular.module('phrequency', ['colorpicker.module', 'ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // When user wants to create an indicator
    .state('/create', {
      url: '/create',
      views: {
        inputs: { templateUrl: 'client/templates/inputs.html', controller: 'indicatorInputController'},
        indicators: { templateUrl: 'client/templates/indicators.html', controller: 'indicatorInputController'}
      }
    })

    // Initial state
    .state('/', {
      url: '/',
      views: {
        inputs: { templateUrl: 'client/templates/createButton.html', controller: 'indicatorInputController'},
        indicators: { templateUrl: 'client/templates/indicators.html', controller: 'indicatorInputController'}
      }
    })
})

.controller('indicatorInputController', ['$scope', 'restful', 'intervalCreator', '$location', function ($scope, restful, intervalCreator, $location) {

  $scope.showInputField = function (view) {
    $location.path(view);
  };

  $scope.click = function (inputName, inputFrequency, inputBackground, inputFontColor) {
    restful.sendIndicator(inputName, inputFrequency, inputBackground, inputFontColor).then(function (promise) {
      $scope.inputName = '';
      $scope.inputFrequency = '';
    });
  };

  //toggles class
  $scope.changeClass = function (item) {
    item.class = (item.class === "happening") ? "notHappening" : "happening";
  };

  //calls /submit and GETs data; assigns data to $scope.indicators
  $scope.get = function () {
    restful.getIndicators().then(function (promise){
      $scope.indicators = promise.data;
      for (var i=0;i<$scope.indicators.length;i++) {
        //creates interval for each indicator's frequency
        intervalCreator.createInterval($scope.changeClass, $scope.indicators[i].frequency, $scope.indicators[i]);
      }
    });
  };
  
  $scope.get();

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

