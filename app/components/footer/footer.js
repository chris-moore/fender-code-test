(function() {

  angular.module('FenderCodeTest')
    .directive('footer', footer);

  function footer () {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/footer/footer.html'
    };
    return directive;
  }
  
})();