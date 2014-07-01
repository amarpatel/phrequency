angular.module('phrequency', ['colorpicker.module', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // Initial state
    .state('/', {
      url: '/',
      views: {
        inputsView: { templateUrl: '../templates/createButton.html', controller: 'indicatorInputController'},
        footerView: { templateUrl: '../templates/footer.html', controller: 'indicatorInputController'},
        indicatorsView: { templateUrl: '../templates/indicators.html', controller: 'indicatorInputController'}
      }
    })
    
    // When user wants to create an indicator
    .state('/create', {
      url: '/create',
      views: {
        inputsView: { templateUrl: '../templates/inputs.html', controller: 'indicatorInputController'},
        footerView: { templateUrl: '../templates/footer.html', controller: 'indicatorInputController'},
        indicatorsView: { templateUrl: '../templates/indicators.html', controller: 'indicatorInputController'}
      }
    })
}])

.controller('indicatorInputController', ['$scope', 'restful', 'intervalCreator', '$location', function ($scope, restful, intervalCreator, $location) {

  //creates interval for each indicator's frequency
  $scope.intervalSetter = function (promiseData) {
    for (var i=0;i<promiseData.length;i++) {
      intervalCreator.createInterval($scope.changeClass, promiseData[i].frequency, promiseData[i]);
    }
  }

  $scope.showInputField = function (view) {
    $location.path(view);
  };

  $scope.click = function (inputName, inputFrequency, inputBackground, inputFontColor) {
    restful.sendIndicator(inputName, inputFrequency, inputBackground, inputFontColor).then(function (promise) {
      if (promise) {
        $scope.indicators.push(promise.data);
        $scope.intervalSetter(promise.data);
        $scope.inputName = '';
        $scope.inputFrequency = '';
        $scope.showInputField('/');
      }
    });
  };

  //toggles class
  $scope.changeClass = function (item) {
    item.class = (item.class === "happening") ? "notHappening" : "happening";
  };

  //calls /submit and GETs data; assigns data to $scope.indicators
  $scope.get = function () {
    $scope.indicators = undefined;
    restful.getIndicators().then(function (promise){
      $scope.indicators = promise.data;
      $scope.intervalSetter($scope.indicators);
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
}]);

