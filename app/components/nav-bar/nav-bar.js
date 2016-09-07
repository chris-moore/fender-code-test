(function() {

  angular.module('FenderCodeTest')
    .directive('navBar', navBar);

  function navBar () {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/nav-bar/nav-bar.html',
      controller: navBarCtrl,
      controllerAs: 'navBar',
      bindToController: true
    };

    return directive;
  }

  function navBarCtrl () {
    var self = this;
  }

})();