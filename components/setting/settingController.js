'use strict';

function SettingController(SettingService, NavigationService, $location) {
    var vm = this;

    vm.settings = [];

    activate();

    vm.saveSettings = function () {
        saveSettings();
    };

    function activate() {
        vm.backgroundColorClass = NavigationService.getBackgroundColorClass($location.path());
        SettingService.getSettings()
            .then(function (data) {
                vm.settings = data;
            });
    }

    function saveSettings() {
        for (var key in vm.settings) {
            if (vm.settings.hasOwnProperty(key)) {
                SettingService.putSetting(vm.settings[key]);
            }
        }
    }

}

(function (angular) {
    angular
        .module('cms.controllers')
        .controller('SettingController', SettingController);

    SettingController.$inject = ['SettingService', 'NavigationService', '$location'];

})(angular);