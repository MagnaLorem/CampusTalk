'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','$rootScope',
  function ($scope, $state, Authentication, Menus,$rootScope) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.getDefaultPage = function(){

      if($scope.authentication.user){
        console.log($state.previous.params.log);

        console.log($rootScope.previous);
        $state.previous.params.log = 'home-signin';
        $state.go('home-signin', $state.previous.params);
      }
      else{
        console.log($state.previous.params.log);
        $state.previous.params.log = 'home';
        $state.go('home', $state.previous.params);
      }
      
    }
  }
]);
