(function() {

  angular.module('FenderCodeTest')
    .directive('bannerBar', bannerBar);

  function bannerBar () {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/banner-bar/banner-bar.html'
    };

    return directive;
  }

})();