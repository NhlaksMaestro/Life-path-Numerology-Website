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