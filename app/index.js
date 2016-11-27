angular.module('domx', ['ngRoute']);

angular
	.module('domx')
	.config(['AuthServiceProvider', '$locationProvider', '$routeProvider', config])

	// Routes
	function config(AuthServiceProvider, $locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true, {
			requireBase: true,
			rewriteLinks: true
		});

		$routeProvider
			.when('/', {
					templateUrl: 'partials/home.html',
					controller: 'HomeCtrl',
					controllerAs: 'vm'
			})
			.when('/auth/digitalocean/callback', {
				template:'',
				controller: function () {
					AuthServiceProvider.$get().digitalOcean.handleCallback();
				},
			})
			.when('/app', {
					templateUrl: 'partials/app.html',
					controller: 'AppCtrl',
					controllerAs: 'vm'
			})
			.otherwise('/');

	}

angular
	.module('domx')
	.constant('ClientId', '4d249af57527279c8dd85595041ace3fe1f7eeea1b4a783629181126ea4aba68');

angular
	.module('domx')
	.constant('DOAuthCallback', 'http://127.0.0.1:3000/auth/digitalocean/callback/');
