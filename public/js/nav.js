angular.module('Widget', [])

    .controller('', ['$scope', '$routeParams', function ($scope, $routeParams) {

        $scope.index = $routeParams.index;

        jQuery('#content').redactor({
            minHeight: 200
        }).setCode('');

    }])
