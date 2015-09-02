'use strict';

function LogoutDirective (AuthenticationService, $location) {


    return {
        restrict: 'E',
        isolate: true,
        link: function ($scope, $elm, $attrs) {
            $scope.logout = function () {
                AuthenticationService.clearCredentials();
                $location.path('/login');
            };
        },
        scope: true,
        template: '<span ng-click="logout()" class="cursor-pointer"><i class="fa fa-sign-out"></i>Logout</span>'
    };
}

(function (angular) {
    angular
        .module('cms.directives')
        .directive('logout', LogoutDirective);

    LogoutDirective.$inject = ['AuthenticationService', '$location'];

})(angular);