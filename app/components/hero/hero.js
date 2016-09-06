(function() {

  angular.module('FenderCodeTest')
    .directive('hero', hero);

  function hero () {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/hero/hero.html'
    };

    return directive;
  }

})();