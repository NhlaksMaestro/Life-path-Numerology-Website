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