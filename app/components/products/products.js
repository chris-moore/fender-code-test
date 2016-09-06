(function() {

  angular.module('FenderCodeTest')
    .directive('products', products);

  function products () {
    var directive = {
      restrict: 'A',
      replace: true,
      scope: {},
      controller: productsCtrl,
      controllerAs: 'products',
      bindToController: true,
      templateUrl: 'components/products/products.html'
    };

    return directive;
  }

  productsCtrl.$inject = ['productFactory'];

  function productsCtrl (productFactory) {
    var self = this;
    self.productsArray;

    init();

    function init () {
      productFactory.loadProducts().then(function success (response) {
        console.log("[productsCtrl.init] response: ", response);
        self.productsArray = response;
      }, function fail (response) {
        console.warn('[productsCtrl.init] failed to load products, response: ', response);
      });
    }
  }

})();