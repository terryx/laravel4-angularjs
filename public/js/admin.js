var app = angular.module('App', []);

app.config(['$routeProvider', '$locationProvider', function ($route, $location) {

    $route
        .when('/video/feeds', {
            templateUrl: '/protected/video/feeds',
            controller: 'Feeds'
        });

    $location.html5Mode(true);
}]);

app.controller('Feeds', [function(){
    console.log('okok')
}])
