'use strict';

function LoadingQueue ($rootScope, $timeout) {

    var queueSize = 0;

    this.increaseQueue = function (size) {
        queueSize += size;
        broadcastChange(queueSize);
    };

    this.decreaseQueue = function (size) {
        queueSize = Math.max(0, queueSize - size);
        broadcastChange(queueSize);
    };

    // clear queue size when switching view
    $rootScope.$on('$routeChangeStart', function () {
        queueSize = 0;
    });

    function broadcastChange(newVal) {
        if (newVal > 0) {
            $rootScope.statusIsLoading = true;
        } else {
            $timeout(function () {
                $rootScope.statusIsLoading = false;
            }, 1000);
        }
    }

}

(function (angular) {
    angular
        .module('cms.services')
        .service('LoadingQueue', LoadingQueue);

    LoadingQueue.$inject = ['$rootScope', '$timeout'];

})(angular);