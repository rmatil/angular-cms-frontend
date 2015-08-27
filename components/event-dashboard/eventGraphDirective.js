'use strict';

function EventGraphDirective (EventService, EventGraphService, LoggerService) {
    var circleAttrs = {
            "fill": "#ee51da",
            "stroke": "#ee51da",
            "stroke-width": "1"
        },
        activeCircleAttrs = {
            "fill": "#8c8c8c",
            "stroke": "#8c8c8c",
            "stroke-width": "1"
        },
        lineAttrs = {
            "stroke": "#ee51da",
            "stroke-width": "1"
        },
        containerId = 'event-graph-container',
        events = [];


    return {
        restrict: 'E',
        isolate: true,
        link: function ($scope, $elm, $attrs) {

            EventService.getEvents()
                .then(function (data) {
                    EventGraphService.drawGraph(containerId, data, circleAttrs, activeCircleAttrs, lineAttrs);
                    events = data;
                });

            // redraw whole graph on resize of element or window
            var fn = function () {
                // remove graph first
                var cont = document.getElementById(containerId);
                while (cont.firstChild) {
                    cont.removeChild(cont.firstChild);
                }

                EventGraphService.drawGraph(containerId, events, circleAttrs, activeCircleAttrs, lineAttrs);
            };
            window.addEventListener('resize', fn, true);

            $elm.on('$destroy', function () {
                window.removeEventListener('resize', fn);
            });

        },
        scope: true,
        template: '<div id="event-graph-container" class="width-100"></div>'
    };
}


(function (angular) {

    angular.module('cms.directives')
        .directive('eventGraph', EventGraphDirective);

    EventGraphDirective.$inject = ['EventService', 'EventGraphService', 'LoggerService'];

})(angular);

