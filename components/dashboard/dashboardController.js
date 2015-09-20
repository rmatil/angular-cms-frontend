'use strict';


(function(angular) {
/* controller for dashboard */
angular
    .module('cms.controllers')
    .controller('DashboardController', [
        'NavigationService',
        '$scope',

        function (NavigationService, $scope) {
            NavigationService.getMenuProperty('Dashboard');


    }]);

})(angular);
