var VideoCtrl = angular.module('VideoController', ['ui.bootstrap', 'Service', 'Api']);

VideoCtrl.config(['$routeProvider', '$locationProvider', function ($route, $location) {

    $route
        .when('/video/feeds', {
            templateUrl: '/protected/video/feeds',
            controller: 'Feeds'
        });

    $location.html5Mode(true);
}]);

VideoCtrl.controller('Feeds', ['$scope', '$http','$location', 'dataStorage',
    function ($scope, $http, $location, dataStorage) {


        $scope.getFeeds = function (user) {
            var url = 'https://gdata.youtube.com/feeds/api/users/'+user+'/uploads?alt=json';

            $http.get(url)
                .success(function(data){
                    console.log(data)
                }).
                error(function(data, status){
                    $scope.rows = video;
                })
        }
console.log('p')
        $scope.getFeeds('rv8C1wjbsKw');

    }]);
