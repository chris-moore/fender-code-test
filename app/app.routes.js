(function() {
  console.log("[app.routes.js] ");

  angular.module('FenderCodeTest.routes', [
    'ui.router'
  ])
  .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routes ($stateProvider, $urlRouterProvider) {
    console.log("[FenderCodeTest.routes] ");
    $stateProvider

    // home state
    .state('products', {
      url: '/products',
      templateUrl: 'views/products/products.html',
      controller: 'ProductsCtrl',
      controllerAs: 'ProductsCtrl',
      data: { authenticate: false }
    });

    $urlRouterProvider.otherwise('/products');
  }

})();