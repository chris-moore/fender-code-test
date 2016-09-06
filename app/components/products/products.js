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
    self.productCount = 0;
    self.filtersArray;
    self.subFiltersObject = null;
    self.openSubFilter = openSubFilter;
    self.selectFilter = selectFilter;
    self.filterString = '';

    init();

    function openSubFilter (filterObject) {
      if (self.subFiltersObject && self.subFiltersObject.title === filterObject.title) {
        self.subFiltersObject = null;
      } else {
        self.subFiltersObject = filterObject;
      }
    }

    function selectFilter (filterObject) {
      self.subFiltersObject = null;
      self.filterString = filterObject.value;
    }

    function init () {
      productFactory.loadProducts().then(function success (response) {
        console.log("[productsCtrl.init] response: ", response);
        self.productsArray = response.products;
        self.productCount = self.productsArray.length;
        self.filtersArray = response.filters;
      }, function fail (response) {
        console.warn('[productsCtrl.init] failed to load products, response: ', response);
      });
    }
  }

})();