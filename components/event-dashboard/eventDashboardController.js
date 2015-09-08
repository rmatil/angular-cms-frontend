'use strict';

function EventDashboardController (EventService, EventGraphService, LocationService) {
    var vm = this;

    vm.events = undefined;
    vm.locations = undefined;

    vm.beforeEvents = undefined;
    vm.nextEvent = {};
    vm.afterEvents = undefined;

    activate();

    function activate() {
        // TODO: get events, locations, funny stats, etc
        EventService.getEvents()
            .then(function (data) {
                vm.events = data;

                var eventObjects = EventGraphService.buildEventObjects(data),
                    classifiedEvents = EventGraphService.getClassifiedEvents(eventObjects);

                vm.beforeEvents = classifiedEvents.eventsBefore;
                vm.nextEvent = classifiedEvents.nextEvent;
                vm.afterEvents = classifiedEvents.eventsAfter;
            });
        LocationService.getLocations()
            .then(function (data) {
                vm.locations = data;
            });
    }
}

(function(angular){
    angular
        .module('cms.controllers')
        .controller('EventDashboardController', EventDashboardController);

    EventDashboardController.$inject = ['EventService', 'EventGraphService', 'LocationService']
})(angular);