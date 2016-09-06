(function() {

  angular.module('FenderCodeTest')
    .factory('productFactory', productFactory);

  productFactory.$inject = ['$http', '$q'];

  function productFactory ($http, $q) {
    var productsURL = 'assets/data/products.json';
    return {
      loadProducts: function () {
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: productsURL
        }).then(function successCallback(response) {
          var parsedArray = _
            .chain(response.data.documents)
            .filter(function (productObject) { 
              return productObject.prodTypeId === 'guitars'; 
            })
            .forEach(function (productObject) {
              productObject.selectedColor = 0;
              productObject.title = productObject.skuDisplayName_en[0].split(',')[0];
            })
            .value();
          deferred.resolve(parsedArray);
        }, function errorCallback(response) {
          deferred.reject(response);
        });

        return deferred.promise;
      }
    };
  }

})();