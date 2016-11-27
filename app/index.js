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
			.when('/auth/google/callback', {
				template:'',
				controller: function () {
					AuthServiceProvider.$get().google.handleCallback();
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
	.constant('GoogClientId', '604808695576-o0s8ukjeesa8aoqe30301jacsc92n09d.apps.googleusercontent.com');

angular
	.module('domx')
	.constant('DOAuthCallback', 'https://127.0.0.1:3000/auth/digitalocean/callback/');

angular
	.module('domx')
	.constant('GoogleAuthCallback', 'https://127.0.0.1:3000/auth/google/callback/');
