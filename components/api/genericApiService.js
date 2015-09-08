'use strict';

function GenericApiService(CONFIG, LoadingQueue, gToast, LoggerService, $http) {

    var apiEndPoint = CONFIG.API_ENDPOINT;

    var printError = function (error) {
        LoggerService.error('[' + error.config.method + '] ' + error.status + ' ' + error.config.url + ' "' + error.data.message + '"');
    };

    this.get = function (objectIdentifier) {
        return $http({
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'GET'
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    };

    this.getObject = function (objectIdentifier, objectId) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier + '/' + objectId,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'GET'
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    };

    this.getEmptyObject = function (objectIdentifier) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: apiEndPoint + '/empty/' + objectIdentifier,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'GET'
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    };

    this.post = function (objectIdentifier, object) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'POST',
            data: object
        }).then(function (response) {
            gToast.open("Created");
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    };

    this.put = function (objectIdentifier, object) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier + '/' + object.id,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'PUT',
            data: object
        }).then(function (response) {
            gToast.open("Updated");
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    };

    this.remove = function (objectIdentifier, objectId) {
        LoadingQueue.increaseQueue(1);
        return $http({
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: apiEndPoint + '/' + objectIdentifier + '/' + objectId,
            withCredentials: true, // allows sending cookies if not on the same domain
            method: 'DELETE'
        }).then(function (response) {
            gToast.open("Removed");
            return response.data;
        }).catch(function (error) {
            gToast.open(error.data.error + ': ' + error.data.message);
            printError(error);
            return [];
        }).finally(function () {
            LoadingQueue.decreaseQueue(1);
        });
    }

}

(function () {
    angular
        .module('cms.services')
        .service('GenericApiService', GenericApiService);

        GenericApiService.$inject = ['CONFIG', 'LoadingQueue', 'gToast', 'LoggerService', '$http'];
}());