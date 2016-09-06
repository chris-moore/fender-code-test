(function() {

  console.log("[nav-bar.js] ");

  angular.module('FenderCodeTest')
    .directive('navBar', navBar);

  function navBar () {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'components/nav-bar/nav-bar.html',
      controller: navBarCtrl,
      link: navBarLink,
      controllerAs: 'navBar',
      bindToController: true
    };

    return directive;
  }

  function navBarCtrl () {
    var self = this;
    self.page = 'TEST';

    init();


    /**
     * Initialize the component
     * @return {null}
     */
    function init () {
      console.log("[navBarCtrl.init] ");
    };

  }

  /**
   * Link function. Put DOM stuff here
   */
  function navBarLink (scope, element, attrs) {

    

  }

})();