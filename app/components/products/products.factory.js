(function() {

  angular.module('FenderCodeTest')
    .factory('productFactory', productFactory);

  productFactory.$inject = ['$http', '$q'];

  function productFactory ($http, $q) {
    var productsURL = 'assets/data/products.json';
    var parseProducts = function (productsArray) {
      return _.chain(productsArray)
              .forEach(function (productObject) {
                productObject.selectedColor = 0;
                productObject.title = productObject.skuDisplayName_en[0].split(',')[0];
                
                // temporarily showing an image, since images returned from JSON are 403
                productObject.images[0] = 'assets/images/guitar.jpg';

                // adding a random cost to better match the .com experience
                productObject.price = (_.random(1, 10) * 100) + 99.99;
              })
              .value();
    };
    var getGroupArray = function (sortArray, sortString) {
      return _(sortArray)
            .groupBy(sortString)
            .map((items, value) => ({ value, count: items.length }))
            .value();
    };
    return {
      loadProducts: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: productsURL
        }).then(function successCallback(response) {
          var parsedArray = parseProducts(response.data.documents);
          deferred.resolve({
            products: parsedArray,
            filters: [
              {title: 'Series', items: getGroupArray(parsedArray, 'series')},
              {title: 'Product Type', items: getGroupArray(parsedArray, 'productType')},
              {title: 'Price', items: getGroupArray(parsedArray, 'price')}
            ]
          });
        }, function errorCallback(response) {
          deferred.reject(response);
        });
        return deferred.promise;
      }
    };
  }

})();