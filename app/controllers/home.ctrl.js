angular
	.module('domx')
	.controller('HomeCtrl', ['AuthService', HomeCtrl])


	function HomeCtrl(AuthService) {
		var vm = this;
		vm.auth = AuthService.digitalOcean.authorize;
	}
