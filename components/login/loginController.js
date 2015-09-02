'use strict';

function LoginController (AuthenticationService) {
    var vm = this;

    vm.login = function () {
        login();
    };

    function login() {
        AuthenticationService.login(vm.username, vm.password)
            .then( function (data) {
                AuthenticationService.setCredentials(vm.username, vm.password);
            }).catch( function (data) {
                console.error(data);
            });
    }

}

(function (angular) {

    angular
        .module('cms.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService'];

})(angular);