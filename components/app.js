'use strict';

(function (angular) {
    angular
        .module('cms', [
            'ngRoute',
            'ngFileUpload',
            'cms.services',
            'cms.directives',
            'cms.controllers',
            'ngCkeditor',
            'angular-momentjs',
            'ngSanitize',
            'ngCookies',
            'gToast',
            'angular-loading-bar',
            'ui.codemirror'
        ])
        .constant('CONFIG', {
            "API_ENDPOINT": "http://dev.cmsv4.rmatil.vagrant/api",
            "AUTHENTICATION_ENDPOINT": 'http://dev.cmsv4.rmatil.vagrant/authenticate'
        })
        .config([
            '$routeProvider',
            '$locationProvider',
            '$provide',
            '$httpProvider',
            'cfpLoadingBarProvider',
            function ($routeProvider, $locationProvider, $provide, $httpProvider, cfpLoadingBarProvider) {

                $routeProvider.when('/login', {
                    templateUrl: 'components/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/dashboard', {
                    templateUrl: 'components/dashboard/dashboard.html',
                    controller: 'DashboardController'
                });

                $routeProvider.when('/articles/list', {
                    templateUrl: 'components/article/articles.html',
                    controller: 'ArticleController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/articles/article/:id', {
                    templateUrl: 'components/article/article.html',
                    controller: 'ArticleDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/articles/add', {
                    templateUrl: 'components/article/article.html',
                    controller: 'ArticleAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/pages/list', {
                    templateUrl: 'components/page/pages.html',
                    controller: 'PageController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/pages/page/:id', {
                    templateUrl: 'components/page/page.html',
                    controller: 'PageDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/pages/add', {
                    templateUrl: 'components/page/page.html',
                    controller: 'PageAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/events/list', {
                    templateUrl: 'components/event-dashboard/event-dashboard',
                    controller: 'EventDashboardController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/events/event/:id', {
                    templateUrl: 'components/event/event.html',
                    controller: 'EventDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/events/add', {
                    templateUrl: 'components/event/event.html',
                    controller: 'EventAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/locations/location/:id', {
                    templateUrl: 'components/location/location.html',
                    controller: 'LocationDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/locations/add', {
                    templateUrl: 'components/location/location.html',
                    controller: 'LocationAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/files/list', {
                    templateUrl: 'components/media/media.html',
                    controller: 'MediaController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/files/add', {
                    templateUrl: 'components/media/add-media.html',
                    controller: 'MediaAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/files/file/:id', {
                    templateUrl: 'components/media/media-detail.html',
                    controller: 'MediaDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/users/list', {
                    templateUrl: 'components/user/users.html',
                    controller: 'UserController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/users/add', {
                    templateUrl: 'components/user/user.html',
                    controller: 'UserAddController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/users/user/:id', {
                    templateUrl: 'components/user/user.html',
                    controller: 'UserDetailController',
                    controllerAs: 'vm'
                });

                $routeProvider.when('/settings/list', {
                    templateUrl: 'components/setting/setting.html',
                    controller: 'SettingController',
                    controllerAs: 'vm'
                });

                $routeProvider.otherwise({
                    redirectTo: '/dashboard'
                });

                // use HTML5 history API
                $locationProvider.html5Mode(true);

                // angular-loading-bar
                cfpLoadingBarProvider.includeSpinner = false;


            }])
        .run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authData;
            }

            // redirect to login page if not logged in
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });

        }]);

})(angular);
