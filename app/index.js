angular.module('domx', ['ngRoute']);

angular
	.module('domx')
	.config(['$routeProvider', config])

	// Routes
	function config($routeProvider) {
		$routeProvider
			.when('/', {
					templateUrl: 'partials/home.html',
					controller: 'HomeCtrl',
					controllerAs: 'vm'
			});
	}
