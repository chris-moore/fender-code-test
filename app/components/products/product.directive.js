(function() {

  angular.module('FenderCodeTest')
    .directive('product', product);

  function product () {
    var directive = {
      link: productLink,
      restrict: 'A',
      replace: true,
      scope: {
        title: '@',
        image: '@',
        cost: '@',
        config: '='
      },
      controller: productCtrl,
      controllerAs: 'product',
      templateUrl: 'components/products/product.html'
    };

    return directive;
  }

  productCtrl.$inject = ['$scope', '$uibModal'];

  function productCtrl ($scope, $uibModal) {
    var self = this;
    self.openProductModal = openProductModal;

    function openProductModal () {
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/products/product-modal.html',
        controller: productModalCtrl,
        controllerAs: 'productModal',
        scope: $scope,
        size: 'lg',
        resolve: {
          items: function () {
            return product.items;
          }
        }
      });
    }
  }

  productModalCtrl.$inject = ['$uibModalInstance'];

  function productModalCtrl ($uibModalInstance) {
    var self = this;
    self.cancel = cancel;

    function cancel () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  function productLink () {
    
  }

})();