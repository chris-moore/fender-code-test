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
    self.filterObject = {};

    self.openSubFilter = openSubFilter;
    self.selectFilter = selectFilter;
    self.removeFilter = removeFilter;
    self.isFilterEmpty = isFilterEmpty;
    self.clearFilters = clearFilters;

    init();

    function openSubFilter (filterObject) {
      if (self.subFiltersObject && self.subFiltersObject.id === filterObject.id) {
        self.subFiltersObject = null;
      } else {
        self.subFiltersObject = filterObject;
      }
    }

    function selectFilter (filterObject, filterId) {
      self.subFiltersObject = null;
      self.filterObject[filterId] = filterObject.value;
    }

    function removeFilter (filterId) {
       delete self.filterObject[filterId];
    }

    function isFilterEmpty () {
      return !_.isEmpty(self.filterObject);
    }

    function clearFilters () {
      self.filterObject = {};
    }

    function init () {
      productFactory.loadProducts().then(function success (response) {
        self.productsArray = response.products;
        self.productCount = self.productsArray.length;
        self.filtersArray = response.filters;
      }, function fail (response) {
        console.warn('[productsCtrl.init] failed to load products, response: ', response);
      });
    }
  }

})();