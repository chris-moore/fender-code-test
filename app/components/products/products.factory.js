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
              
              // temporarily showing an image, since images returned from JSON are 403
              productObject.images[0] = 'assets/images/guitar.jpg';

              // adding a random cost to better match the .com experience
              productObject.cost = (_.random(1, 15) * 100) + 99.99;
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