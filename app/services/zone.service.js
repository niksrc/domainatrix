angular
	.module('domx')
	.service('Zone', ['$window', Zone]);

	function Zone($window) {
		return {
			parse: $window.zonefile_parse,
			generate: $window.zonefile_generate
		};
	}
