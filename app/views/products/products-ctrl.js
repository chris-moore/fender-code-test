(function() {
	angular.module('FenderCodeTest.products', [])
		.controller('ProductsCtrl', ProductsCtrl);

	ProductsCtrl.$inject = ['$scope'];

	function ProductsCtrl ($scope) {
		var self = this;
	}

})();