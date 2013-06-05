angular.module('Api', ['ngResource'])
    .factory('VideoApi', ['$resource', function ($resource) {
        return {
            List: function (data) {
                return $resource('/video/list/', data)
            },
            Delete: function (data) {
                return $resource('/video/delete/', data);
            },
            Get: function (id) {
                return $resource('/video/get/:id', id)
            },
            Add: function (data) {
                return $resource('/video/add/', data);
            },
            Edit: function (data) {
                return $resource('/video/edit/', data);
            },
            Search: function (data) {
                return $resource('/video/search/:query', data);
            },
            Count: function(data){
                return $resource('/video/count/:query', data);
            }
        }
    }])