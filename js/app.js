var app = angular.module('app', ['ui.router', 'ngSanitize', 'ngRoute', 'ui.bootstrap.datetimepicker']);
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            controller: 'homeController',
            templateUrl: './app/home/home.html'
        }).otherwise({ redirectTo: "/" })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .constant('uiDatetimePickerConfig', {
        dateFormat: 'yyyy-MM-dd',
        defaultTime: '00:00:00',
        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        initialPicker: 'date',
        reOpenDefault: false,
        enableDate: true,
        enableTime: false,
        buttonBar: {
            show: false,
            now: {
                show: true,
                text: 'Now',
                cls: 'btn-sm btn-default'
            },
            today: {
                show: true,
                text: 'Today',
                cls: 'btn-sm btn-default'
            },
            clear: {
                show: true,
                text: 'Clear',
                cls: 'btn-sm btn-default'
            },
            date: {
                show: true,
                text: 'Date',
                cls: 'btn-sm btn-default'
            },
            time: {
                show: true,
                text: 'Time',
                cls: 'btn-sm btn-default'
            },
            close: {
                show: true,
                text: 'Close',
                cls: 'btn-sm btn-default'
            }
        },
        closeOnDateSelection: true,
        closeOnTimeNow: false,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: {},
        saveAs: false,
        readAs: false
    });

angular.module('app').
    controller('homeController', ['$scope', 'lifePathService', function ($scope, lifePathService) {
        var home = this;

        home.lifePath = {};
        home.isOpen = false;
        home.userDate = new Date(2017, 01, 01);

        home.datePickerEvent = function (e, props) {
            e.preventDefault();
            e.stopPropagation();

            home.isOpen = true;
        }

        home.calculateLifePath = function (selectedDate) {
            var day = selectedDate.getDate().toString(),
                month = (selectedDate.getMonth() + 1).toString(),
                year = selectedDate.getFullYear().toString(),
                calculatedDay = 0,
                calculatedMonth = 0,
                calculatedYear = 0,
                calculatedPath = 0,
                calculatedPathString = "";

            calculatedDay = day.split("").map(getSingleInt).reduce(add, 0);
            calculatedMonth = month.split("").map(getSingleInt).reduce(add, 0);
            calculatedYear = year.split("").map(getSingleInt).reduce(add, 0);

            while (calculatedYear > 9 || calculatedDay > 9) {
                calculatedDay = day.split("").map(getSingleInt).reduce(add, 0);
                day = calculatedDay.toString();

                calculatedYear = year.split("").map(getSingleInt).reduce(add, 0);
                year = calculatedYear.toString();
            }

            calculatedPath = calculatedDay + calculatedMonth + calculatedYear;
            calculatedPathString = calculatedPath.toString();

            while (calculatedPath > 9) {
                calculatedPath = calculatedPathString.split("").map(getSingleInt).reduce(add, 0);
                calculatedPathString = calculatedPath.toString();
            }

            lifePathService.getLifePaths()
               .then(lifePathsSuccessHandler, lifePathsErrorHandler);

            //Private functions
            function lifePathsSuccessHandler(data) {
                angular.forEach(data, function (object) {
                    if (object.id=== calculatedPath) {
                        home.lifePath = object;
                    }
                });
            }
            function lifePathsErrorHandler(jobs) {
                $scope.viewModel.jobs = jobs.result;
                $scope.viewModel.messageHandler = jobs.messageHandler;
            }

            function getSingleInt(x) {
                return parseInt(x);
            }
            function add(a, b) {
                return a + b;
            }


        }
    }]);
angular.module('app')
    .service('lifePathService', [
    '$http',
    '$log',
    '$q',
    lifePathService
    ]);

function lifePathService($http, $log, $q) {
    var _urlPath = "http://localhost:51190/";

    this.getLifePaths = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: _urlPath + 'dataService/lifePaths.json',
        })
        .then(function (response, status, headers) {
            deferred.resolve(response.data);
        })
        //.error(function (response, status, headers) {
        //    deferred.reject(response);
        //    $log.error(response);
        //});
        return deferred.promise;
    };
}