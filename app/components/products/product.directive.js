(function() {

  angular.module('FenderCodeTest')
    .directive('product', product);

  function product () {
    var directive = {
      restrict: 'A',
      replace: true,
      scope: {
        title: '@',
        image: '@',
        cost: '@'
      },
      templateUrl: 'components/products/product.html'
    };

    return directive;
  }

})();