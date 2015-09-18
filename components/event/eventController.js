'use strict';

function EventDetailController (EventService, LocationService, FileService, NavigationService, UserGroupService, StringService, $scope, $location, $routeParams) {
    var vm = this,
        eventId = $routeParams.id,
        startDate,
        endDate;

    vm.event = {};
    vm.locations = undefined;
    vm.userGroups = undefined;
    vm.files = undefined;
    vm.start_date = vm.end_date = moment().format('DD.MM.YYYY HH:mm');

    activate();

    function activate () {
        vm.backgroundColorClass = NavigationService.getBackgroundColorClass($location.path());
        var elStart = document.getElementById('rome-calendar-start'),
            elEnd = document.getElementById('rome-calendar-end'),
            optionsStart = {
                "inputFormat": "DD.MM.YYYY HH:mm",
                "timeInterval": 900,
                "dateValidator": rome.val.beforeEq(elEnd)
            },
            optionsEnd = {
                "inputFormat": "DD.MM.YYYY HH:mm",
                "timeInterval": 900,
                "dateValidator": rome.val.afterEq(elStart)
            };

        startDate = rome(elStart, optionsStart);
        endDate = rome(elEnd, optionsEnd);

        EventService.getEvent(eventId)
            .then(function (data) {
                vm.event = data;

                vm.start_date = moment(vm.event.start_date, moment.ISO_8601).format('DD.MM.YYYY HH:mm');
                vm.end_date = moment(vm.event.end_date, moment.ISO_8601).format('DD.MM.YYYY HH:mm');

                startDate.setValue(vm.start_date);
                startDate.refresh();
                endDate.setValue(vm.end_date);
                endDate.refresh();

                LocationService.getLocations()
                    .then(function (data) {
                        vm.locations = data;
                    });
                FileService.getFiles()
                    .then(function (data) {
                        vm.files = data;
                    });
                UserGroupService.getUserGroups()
                    .then(function (data) {
                        vm.userGroups = data;
                    });
            });
    }


    vm.saveEvent = function () {
        saveEvent();
    };

    function saveEvent () {
        vm.event.start_date = startDate.getMoment().utc().format(moment.ISO_8601());
        vm.event.end_date = endDate.getMoment().utc().format(moment.ISO_8601());
        EventService.putEvent(vm.event);
    }

    $scope.$watch('vm.event.name', function (currentVal, newVal) {
        if (undefined === currentVal ||
            '' === currentVal) {
            return;
        }

        vm.event.url_name = StringService.buildUrlString(currentVal);
    });

}

function EventAddController (EventService, LocationService, FileService, NavigationService, UserGroupService, StringService, $scope, $location) {
    var vm = this,
        startDate,
        endDate;

    vm.event = {};
    vm.locations = undefined;
    vm.userGroups = undefined;
    vm.files = undefined;
    vm.start_date = vm.end_date = moment().format('DD.MM.YYYY HH:mm');

    activate();


    function activate () {
        vm.backgroundColorClass = NavigationService.getBackgroundColorClass($location.path());
        EventService.getEmptyEvent()
            .then(function (data) {
                vm.event = data;

                LocationService.getLocations()
                    .then(function (data) {
                        vm.locations = data;
                    });
                FileService.getFiles()
                    .then(function (data) {
                        vm.files = data;
                    });
                UserGroupService.getUserGroups()
                    .then(function (data) {
                        vm.userGroups = data;
                    })
            });

        var elStart = document.getElementById('rome-calendar-start'),
            elEnd = document.getElementById('rome-calendar-end'),
            optionsStart = {
                "inputFormat": "DD.MM.YYYY HH:mm",
                "timeInterval": 900,
                "dateValidator": rome.val.beforeEq(elEnd)
            },
            optionsEnd = {
                "inputFormat": "DD.MM.YYYY HH:mm",
                "timeInterval": 900,
                "dateValidator": rome.val.afterEq(elStart)
            };

        startDate = rome(elStart, optionsStart);
        endDate = rome(elEnd, optionsEnd);
    }


    vm.saveEvent = function () {
        saveEvent();
    };

    function saveEvent () {
        vm.event.start_date = startDate.getMoment().utc().format(moment.ISO_8601());
        vm.event.end_date = endDate.getMoment().utc().format(moment.ISO_8601());
        EventService.postEvent(vm.event);
    }

    $scope.$watch('vm.event.name', function (currentVal, newVal) {
        if (undefined === currentVal ||
            '' === currentVal) {
            return;
        }

        vm.event.url_name = StringService.buildUrlString(currentVal);
    });
}

(function(angular) {
    angular
        .module('cms.controllers')
        .controller('EventDetailController', EventDetailController)
        .controller('EventAddController', EventAddController);


    EventDetailController.$inject = ['EventService', 'LocationService', 'FileService', 'NavigationService', 'UserGroupService', 'StringService', '$scope', '$location', '$routeParams'];
    EventAddController.$inject = ['EventService', 'LocationService', 'FileService', 'NavigationService', 'UserGroupService', 'StringService', '$scope', '$location'];


})(angular);