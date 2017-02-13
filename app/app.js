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
