/* eslint-disable no-unused-vars */
describe('Test a Controller that uses Promise', () => {
  let deferred;
  let $q;
  let $rootScope;
  let $scope;
  let mockSearchService;

  const mockData = 872139678;

  beforeEach(module('testApp'));

  beforeEach(
    inject((_$q_, _$rootScope_) => {
      $q = _$q_;
      $rootScope = _$rootScope_;

      deferred = _$q_.defer();
    })
  );

  beforeEach(
    inject(($controller, searchService) => {
      $scope = $rootScope.$new();

      // Jasmine Spy to return the deferred promise via mock
      spyOn(searchService, 'search').and.returnValue(deferred.promise);

      // Init and pass spy instance
      $controller('MainCtrl', {
        $scope,
        searchService
      });
    })
  );

  it('should resolve promise', () => {
    // Prepare mockData
    deferred.resolve(mockData);

    // Must call apply
    $scope.$apply();

    // Apply assertions
    expect($scope.results).toBe(mockData);
    expect($scope.error).toBe(undefined);
  });

  it('should reject promise', () => {
    // Call .catch function
    deferred.reject();

    // Must call apply
    $scope.$apply();

    // Apply assertions
    expect($scope.results).toBe(undefined);
    expect($scope.error).toBe('Error!');
  });
});
