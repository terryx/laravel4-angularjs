angular.module('Router', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

        $routeProvider
            .when('/admin/video', {
                templateUrl: '/admin/video/feeds',
                controller: 'VideoFeeds'
            })
            .when('/admin/video/feeds', {
                templateUrl: '/admin/video/feeds',
                controller: 'VideoFeeds'
            })
            .when('/admin/video/add', {
                templateUrl: '/admin/video/add',
                controller: 'VideoAdd'
            })
            .when('/admin/video/list', {
                templateUrl: '/admin/video/list',
                controller: 'VideoList'
            })
            .when('/admin/video/edit/:id', {
                templateUrl: '/admin/video/edit',
                controller: 'VideoEdit'
            })
        $locationProvider.html5Mode(true);
    }])