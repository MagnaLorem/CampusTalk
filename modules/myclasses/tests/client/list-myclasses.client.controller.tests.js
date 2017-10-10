(function () {
  'use strict';

  describe('Myclasses List Controller Tests', function () {
    // Initialize global variables
    var MyclassesListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      MyclassesService,
      mockMyclass;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _MyclassesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      MyclassesService = _MyclassesService_;

      // create mock article
      mockMyclass = new MyclassesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Myclass Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Myclasses List controller.
      MyclassesListController = $controller('MyclassesListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockMyclassList;

      beforeEach(function () {
        mockMyclassList = [mockMyclass, mockMyclass];
      });

      it('should send a GET request and return all Myclasses', inject(function (MyclassesService) {
        // Set POST response
        $httpBackend.expectGET('api/myclasses').respond(mockMyclassList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.myclasses.length).toEqual(2);
        expect($scope.vm.myclasses[0]).toEqual(mockMyclass);
        expect($scope.vm.myclasses[1]).toEqual(mockMyclass);

      }));
    });
  });
}());
