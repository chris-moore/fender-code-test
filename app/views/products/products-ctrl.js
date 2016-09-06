(function() {
	console.log("[products-controller.js] ");

	angular.module('FenderCodeTest.products', [])
		.controller('ProductsCtrl', ProductsCtrl);

	ProductsCtrl.$inject = ['$scope'];

	function ProductsCtrl ($scope) {
		var self = this;
		self.test = 'Test Bind';

		init();

		function init() {
			console.log("[products-controller.init] ");
		}

		function test() {

		}
	}

})();