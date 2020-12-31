var healthcareApp = angular.module('healthcareApp', ['ui.router']);

healthcareApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/blog');
    
    $stateProvider
        .state('blog', {
            url: '/blog',
            templateUrl: 'blog.html'
        })
        .state('glossary', {
            url: '/glossary',
            templateUrl: 'glossary.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact.html'
        });

});

healthcareApp.controller('blogController', function($scope) {
        $scope.message = "blog controller";
});

healthcareApp.controller('glossaryController', function($scope) {
        $scope.message = "glossary controller";
});

healthcareApp.controller('contactController', function($scope) {

		$scope.reasonsModel = "";

        $scope.reasons = [
        	{ reason: 'Healthcare Marketplace' },
        	{ reason: 'Technical Support' },
        	{ reason: 'Website Feedback' }
        ];

        $scope.submit = function() {
        	if (true) {
        		/* window.alert > alert, no need to speculate, so skip to end of chain */
        		$window.alert('This form is valid');
        	} else {
        		$window.alert('This form is invalid');
        	};
      	};

});