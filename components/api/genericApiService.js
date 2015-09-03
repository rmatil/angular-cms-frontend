'use strict';

function GenericApiService(CONFIG, LoadingQueue, $http, $log) {

    var apiEndPoint = CONFIG.API_ENDPOINT;

    var printError = function (error) {
        // TODO: make a generic version of this
        // TODO: set log level for information to debug in $logProvider
        $log.error('[' + error.config.method + '] ' + error.status + ' "' + error.statusText + '" "' + error.config.url + '"');
    };

    this.get = function (objectIdentifier) {
        LoadingQueue.increaseQueue(1);
        return $http.get(apiEndPoint + '/' + objectIdentifier)
            .then(function (response) {
                return response.data;
            }).finally(function () {
                LoadingQueue.decreaseQueue(1);
            }).catch(function (error) {
                printError(error);
                return [];
            });
    };

    this.getObject = function (objectIdentifier, objectId) {
        LoadingQueue.increaseQueue(1);
        return $http.get(apiEndPoint + '/' + objectIdentifier + '/' + objectId)
            .then(function (response) {
                return response.data;
            }).finally(function () {
                LoadingQueue.decreaseQueue(1);
            }).catch(function (error) {
                printError(error);
                return [];
            });
    };

    this.getEmptyObject = function (objectIdentifier) {
        LoadingQueue.increaseQueue(1);
        return $http.get(apiEndPoint + '/empty/' + objectIdentifier )
            .then(function (response) {
                return response.data;
            }).finally(function () {
                LoadingQueue.decreaseQueue(1);
            }).catch(function (error) {
                printError(error);
                return [];
            });
    };

    this.post = function (objectIdentifier, object) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier,
            method: 'POST',
            data: object
        }).then(function (response) {
            return response.data;
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        }).catch(function (error) {
            printError(error);
            return [];
        });
    };

    this.put = function (objectIdentifier, object) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier + '/' + object.id,
            method: 'PUT',
            data: object
        }).then(function (response) {
            return response.data;
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        }).catch(function (error) {
            printError(error);
            return [];
        });
    };

    this.remove = function (objectIdentifier, objectId) {
        LoadingQueue.increaseQueue(1);
        return $http.delete(apiEndPoint + '/' + objectIdentifier + '/' + objectId)
            .then(function (response) {
                return response.data;
            }).finally(function () {
                LoadingQueue.decreaseQueue(1);
            }).catch(function (error) {
                printError(error);
                return [];
            });
    }

}

(function () {
    angular
        .module('cms.services')
        .service('GenericApiService', GenericApiService);

        GenericApiService.$inject = ['CONFIG', 'LoadingQueue', '$http', '$log'];
}());