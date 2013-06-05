var app = angular.module('App', ['ngResource', 'ui.bootstrap', 'Api', 'Service']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/video.html',
                controller: 'VideoController'
            })
            .when('/video/s/:query', {
                templateUrl: 'templates/video.html',
                controller: 'VideoController'
            })
            .when('/video/id/:id', {
                templateUrl: 'templates/single-video.html',
                controller: 'SingleVideoController'
            });

        $locationProvider.html5Mode(true);
    }]);

app.run(['$rootScope', 'pagination', function ($rootScope) {
    $rootScope.dataStorage = {};
}]);

app.controller('SearchController', ['$rootScope', '$scope', 'VideoApi', 'pagination', '$location',
    function ($rootScope, $scope, VideoApi, pagination, $location) {

        $scope.search = function (query) {

            if ($location.$$path !== '/' && $location.$$path !== '/video') {
                $location.path('/video/s/' + query);
                return;
            }

            var countVideo = $rootScope.videoCount(query);

            countVideo
                .then(function (data) {
                    if (undefined === data.count) {
                        return;
                    }

                    pagination.make(data.count, query);
                    $rootScope.pagination = pagination.model;
                })
                .then(function () {
                    $rootScope.listVideo();
                });
        }
    }]);

app.controller('VideoController', ['$scope', 'VideoApi', '$q', 'pagination', '$rootScope', 'dataStorage', '$location',
    function ($scope, VideoApi, $q, pagination, $rootScope, dataStorage, $location) {

        var path = $location.$$path.split('/');
        var urlString = '';

        if (path.length === 4) {
            urlString = path[3];
        }

        $rootScope.videoCount = function (query) {
            var deferred = $q.defer();
            VideoApi.Count({query: query}).get(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        var countVideo = $rootScope.videoCount(urlString);

        //start counting number of videos
        countVideo
            .then(function (data) {
                if (undefined === data.count) {
                    return;
                }

                pagination.make(data.count, urlString);
                $rootScope.pagination = pagination.model;
            })
            .then(function () {
                $scope.$watch('pagination.currentPage', function (page) {
                    $rootScope.pagination.currentPage = page;
                    $rootScope.listVideo();
                });
            });

        $rootScope.listVideo = function () {
            //try to get from cache
            var cacheID = 'vp-' + pagination.model.query + $rootScope.pagination.currentPage;
            var cacheData = dataStorage.getCache(cacheID);

            if (cacheData) {
                $rootScope.dataStorage.rows = cacheData;
                return;
            }

            VideoApi.List($rootScope.pagination).query(function (data) {
                if (data) {
                    $rootScope.dataStorage.rows = data;

                    //do some caching
                    dataStorage.setCache(cacheID, data);
                }
            });
        }

        $scope.youtube_parser = function (url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                console.log('incorrect url')
            }
        }

        $scope.view = function (data) {
            var url = data.url;
            $scope.youtube_id = $scope.youtube_parser(url);

            $location.path('/video/id/' + $scope.youtube_id);
        }

    }]);

app.controller('SingleVideoController', ['$scope', '$location', function($scope, $location){
    var searchPath = $location.$$path.split('/');
    $scope.youtube_id = searchPath[3];
}]);