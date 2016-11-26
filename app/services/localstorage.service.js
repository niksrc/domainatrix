angular
	.module('domx')
	.service('LocalStorageService', ['$window', LocalStorageService]);

	function LocalStorageService($window) {
		return {
			get: get,
			set: set,
			del: del,
			clear: clear
		};

		function get(key) {
			return $window.localStorage.getItem(key);
		}

		function set(key, val) {
			return $window.localStorage.setItem(key, val);
		}

		function del(key, val) {
			return $window.localStorage.removeItem(key, val);
		}

		function clear(key, val) {
			return $window.localStorage.clear(key, val);
		}
	}
