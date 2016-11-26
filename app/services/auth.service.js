angular
	.module('domx')
	.service('AuthService', [
		'$window',
		'$location',
		'$httpParamSerializerJQLike',
		'LocalStorageService',
		'DOAuthCallback',
		'ClientId',
		AuthService
	]);

	function AuthService($window, $location, paramSerializer, LocalStorageService, DOAuthCallback, ClientId) {
		return {
			digitalOcean: {
				authorize: authorizeDO,
				handleCallback: handleDOCallback
			}
		};

		// Authenticate with Digital Ocean api
		function authorizeDO() {
			var api = 'https://cloud.digitalocean.com/v1/oauth/authorize/'
			var params = {
				client_id: ClientId,
				redirect_uri: DOAuthCallback,
				response_type: 'token'
			};

			var queryParams = '?client_id=' + params.client_id;
			queryParams += '&redirect_uri=' + params.redirect_uri;
			queryParams += '&response_type=' + params.response_type;
			$window.location.href = api + queryParams;
		}

		function handleDOCallback() {
			var result = $location.hash();
			if (!result) {
				$location.url('/');
				return;
			}

			var tokenParam = result
				.split('&')
				.filter(function (str) {
					return str.indexOf('access_token') + 1;
				});

			if (tokenParam.length !== 1) {
			$location.url('/');
			return;
			}

			var tokenArr = tokenParam[0].split('=');
			var token = tokenArr[1];
			if (!token) {
				$location.url('/');
			}

			LocalStorageService.set('do_tok', token);
			$location.url('/app');
		}
	}
