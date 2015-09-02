'use strict';

function DashboardDirective () {
    return {
        restrict: 'E',
        isolate: true,
        link: function ($scope, $elm, $attrs) {

        },
        scope: true,
        templateUrl: 'components/dashboard/dashboard-template.html'
    };
}

(function (angular) {
    angular
        .module('cms.directives')
        .directive('dashboard', DashboardDirective);

})(angular);
