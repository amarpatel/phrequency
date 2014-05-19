var app = angular.module('phrequency', ['ngAnimate', 'fx.animations'])

.controller('indicatorController', ['$scope', '$interval', 'restful', function ($scope, $interval, restful) {

  $scope.indicators = [
    {name: 'heartbeat', frequency: 60},
    {name: 'baby', frequency: 30},
    {name: 'something', frequency: 90}
  ];

  $scope.click = function (inputName, inputFrequency) {
    restful.sendIndicator(inputName, inputFrequency)
    // console.log(inputName, inputFrequency);

  }



  $scope.class = "happening"

  $scope.changeClass = function () {
    $scope.class = ($scope.class === "happening") ? "notHappening" : "happening";
  }

  $interval($scope.changeClass, 1000)

}])

.factory('restful', function ($http) {
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
    }
  }
})


/*
create factory
input object
output function/promise
in controller
  invoke factory
  append .then and call the function over and over again

*/