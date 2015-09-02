'use strict';

function LoginController (AuthenticationService, $location, $timeout) {
    var vm = this,
        dashboardElem = 'dashboard',
        loginElem = '#login-container',
        navElem = 'nav',
        blur = {
            "-webkit-filter": "blur(5px)",
            "-moz-filter": "blur(5px)",
            "-ms-filter": "blur(5px)",
            "filter": "blur(5px)",
            "transition": "-webkit-filter 0.75s ease-in, -ms-filter 0.75s ease-in, -moz-filter 0.75s ease-in, filter 0.75s ease-in"
        },
        unblur = {
            "-webkit-filter": "blur(0px)",
            "-moz-filter": "blur(0px)",
            "-ms-filter": "blur(0px)",
            "filter": "blur(0px)",
            "transition": "-webkit-filter 1s ease-out, -ms-filter 1s ease-out, -moz-filter 1s ease-out, filter 1s ease-out"
        };

    activate();

    vm.login = function () {
        login();
    };

    function activate() {
        applyBlur();
    }

    function applyBlur() {
        $(dashboardElem).css('z-index', '99').css(blur);
        $(loginElem).css('z-index', '100');
        $(navElem).css(blur);
    }

    function removeBlur() {
        $(dashboardElem).css(unblur);
        $(navElem).css(unblur);
    }

    function removeLoginContainer() {
        $(loginElem).css({
            "opacity": "0", // use opacity instead of visibility or display
            "transition": "opacity 1s ease-out"
        });
    }


    function login() {
        // this prevents storing wrong credentials
        AuthenticationService.clearCredentials();

        AuthenticationService.login(vm.username, vm.password)
            .then(function (data) {
                AuthenticationService.setCredentials(vm.username, vm.password);
                removeBlur();
                removeLoginContainer();
                // wait until transistions are done
                $timeout(function () {

                    $location.path('/dashboard');
                }, 1000);
            }).catch( function (data) {
                console.error(data);
            });
    }

}

(function (angular) {

    angular
        .module('cms.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService', '$location', '$timeout'];

})(angular);