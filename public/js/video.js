angular.module('Video', ['ngSanitize', 'ui.bootstrap', 'Router', 'Service', 'Api'])
    .controller('VideoFeeds', ['$scope', '$http', '$location', 'dataStorage',
        function ($scope, $http, $location, dataStorage) {
//            https://gdata.youtube.com/feeds/api/users/userId/uploads

            $scope.artist = '';
            $scope.artists = dataStorage.video.artist;

            $scope.getFeeds = function (artist) {
                var url = 'https://gdata.youtube.com/feeds/api/users/'+artist+'/uploads?alt=json';
                jQuery.ajax({
                    type: 'GET',
                    url: url,
                    success: function (data) {
                        var feeds = data['feed']['entry'];
                        var video = [];
                        for (var i = 0, len = feeds.length; i < len; i++) {
                            video.push({
                                url: feeds[i]['link'][0]['href'],
                                title: feeds[i]['media$group']['media$title']['$t'],
                                thumbnail: feeds[i]['media$group']['media$thumbnail'][0]['url']
                            });
                        }
                        $http.get('https://gdata.youtube.com/feeds/api/videos/rv8C1wjbsKw?alt=json').
                            success(function(data){
                            }).
                            error(function(data, status){
                                $scope.rows = video;
                            })
                    }
                })
            }

            $.ajax({
                url:adasd,

            })

            $scope.videoModal = function(data){
                console.log(data)
            }

            $scope.searchArtist = function(){
                $scope.getFeeds($scope.artist);
            }

        }])
    .controller('VideoAdd', ['$scope', '$routeParams', 'Video', '$location', 'dataStorage',
        function ($scope, $routeParams, Api, $location, dataStorage) {

            $scope.url = '';
            $scope.visibility = 'true';
            $scope.visibilityChecked = true;
            $scope.error = '';
            $scope.alert = false;
            $scope.type = '';
            $scope.types = dataStorage.video.type;
            $scope.rows = [];

            $scope.showContent = function (data) {
                data['updated_at'] = moment(['updated_at']).fromNow();
                $scope.rows.push(data);
            }

            $scope.submit = function () {

                if ($scope.url === '') {
                    $scope.error = 'Specify url';
                    $scope.alert = true;
                    return;
                }

                if ($scope.type === '') {
                    $scope.error = 'Specify a type';
                    $scope.alert = true;
                    return;
                }

                jQuery('button').removeAttr('disabled');
                Api.Add({
                    url: $scope.url,
                    type: $scope.type,
                    visibility: $scope.visibility
                }).save(function (data) {
                        jQuery('button').attr('disabled');
                        $scope.showContent(data);
                        $scope.url = '';
                        $scope.type = '';
                        dataStorage.cache.clear();
                    });
            }
        }])

    .controller('VideoList', ['$scope', '$routeParams', 'Video', '$location' , '$http', 'dataStorage',
        function ($scope, $routeParams, Api, $location, $http, dataStorage) {

            $scope.selected = 'active';

            $scope.list = function (page) {

                var cache = dataStorage.cache.get('video.page' + page);
                if (cache !== null) {
                    $scope.rows = cache;
                } else {
                    Api.List({page: page}).query(function (data) {
                        var i, len;

                        for (i = 0, len = data.length; i < len; i++) {
                            data[i]['updated_at'] = moment(data[i]['updated_at']).fromNow();
                        }
                        $scope.rows = data;
                        dataStorage.cache.set('video.page' + page, data);
                    });
                }
            }

            $scope.setPage = function () {
                $scope.$watch('currentPage', function () {
                    $scope.list($scope.currentPage);
                })
            }

            $scope.count = function (callback) {
                $http.get('/video/count').success(function (data) {
                    data = JSON.parse(data);
                    callback(data);
                });
            };

            $scope.edit = function (row) {
                $location.path('/admin/video/edit/' + row.id);
                dataStorage.setData(row);
            }

            //check cache before count
            $scope.maxSize = 20;
            var videoCount = dataStorage.cache.get('video.count');
            if (videoCount === null) {
                $scope.count(function (count) {

                    $scope.noOfPages = Math.ceil(count / $scope.maxSize);
                    $scope.currentPage = 1;
                    dataStorage.cache.set('video.count', count);
                    $scope.setPage();
                });
            } else {
                $scope.noOfPages = Math.ceil(videoCount / $scope.maxSize);
                $scope.currentPage = 1;
                $scope.setPage();
            }

        }])
    .controller('VideoEdit', ['$scope', '$routeParams', 'Video', '$location', 'dataStorage',
        function ($scope, $routeParams, Api, $location, dataStorage) {

            $scope.id = '';
            $scope.title = '';
            $scope.url = '';
            $scope.visibility = 'off';
            $scope.visibilityChecked = false;
            $scope.type = '';
            $scope.types = dataStorage.video.type;

            $scope.showContent = function (data) {
                $scope.id = data.id;
                $scope.title = data.title;
                $scope.url = data.url;
                for (var i in $scope.types) {
                    if ($scope.types[i] === data.type) {
                        $scope.type = $scope.types[i];
                        break;
                    }
                }

                if (data.visibility == 1) {
                    $scope.visibilityChecked = true;
                    $scope.visibility = true;
                }
            }

            var data = dataStorage.getData();
            if (!data.id) {
                Api.Get($routeParams).query(function (data) {
                    if (data.length === 0) {
                        return;
                    }
                    data = data[0];

                    $scope.showContent(data);
                });
            } else {
                $scope.id = data.id;
                $scope.showContent(data);
            }

            $scope.submit = function () {
                Api.Edit({
                    id: $scope.id,
                    title: $scope.title,
                    type: $scope.type,
                    visibility: $scope.visibility
                }).save(function (data) {
                        if (data['error']) {
                            window.alert(data['error']);
                            return;
                        }

                        dataStorage.cache.clear();
                        $location.path('/admin/video/list');
                    });
            }

            $scope.deleteOne = function () {
                Api.Delete({id: $scope.id}).save(function (data) {
                    if (!data['errors']) {
                        dataStorage.cache.clear();
                        $location.path('/admin/video/list');
                    }
                })
            }
        }])