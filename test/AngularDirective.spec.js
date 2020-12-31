describe('Directive', () => {
  let $compile;
  let $controller;
  let $httpBackend;
  let $rootScope;
  let $window;

  let scope;
  let DirectiveController;

  beforeEach(() => {
    module('app.directive');

    inject((_$rootScope_, _$httpBackend_, _$compile_, _$controller_, _$window_) => {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $window = _$window_;
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      const locals = { $window };
      const bindings = { customString: 'custom-string' };

      DirectiveController = $controller('directive', locals, bindings);
    });
  });

  describe('Directive Controller', () => {
    it('should be a contoller', () => {
      expect(DirectiveController).toBeDefined();
    });
  });

  describe('Compiled Directive', () => {
    let responseText;

    beforeEach(() => {
      responseText = 'directive';
      $httpBackend.whenGET('/app/components/directive.html').respond(responseText);
    });

    it('should compile directive', () => {
      const element = $compile('<DirectiveController></DirectiveController>')(scope);
      scope.$digest();
      $httpBackend.flush();
      expect(element.html()).toContain(responseText);
    });
  });
});
