angular
	.module('domx')
	.service('AuthService', [
		'$window',
		'$location',
		'$httpParamSerializerJQLike',
		'LocalStorageService',
		'GoogleAuthCallback',
		'DOAuthCallback',
		'ClientId',
		'GoogClientId',
		AuthService
	]);

	function AuthService($window, $location, paramSerializer, LocalStorageService, GoogleAuthCallback, DOAuthCallback, ClientId, GoogClientId) {
		return {
			digitalOcean: {
				authorize: authorizeDO,
				handleCallback: handleDOCallback,
				getToken: doGetToken
			},
			google: {
				authorize: authorizeGoogle,
				handleCallback: handleGoogleCallback,
				getToken: googleGetToken
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
			queryParams += '&scope=read%20write';
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

		function doGetToken() {
			var token = LocalStorageService.get('do_tok');
			if(!token) {
				$location.url('/');
			}

			return token;
		}

		// Authenticate with Digital Ocean api
		function authorizeGoogle() {
			var api = 'https://accounts.google.com/o/oauth2/v2/auth'
			var params = {
				client_id: GoogClientId,
				redirect_uri: GoogleAuthCallback,
				response_type: 'token',
			};

			var queryParams = '?client_id=' + params.client_id;
			queryParams += '&redirect_uri=' + params.redirect_uri;
			queryParams += '&response_type=' + params.response_type;
			queryParams += '&include_granted_scopes=true';
			queryParams += '&scope=https://www.googleapis.com/auth/siteverification';
			queryParams += ' https://www.googleapis.com/auth/siteverification.verify_only';
			$window.location.href = api + queryParams;
		}

		function handleGoogleCallback() {
			var result = $location.hash();
			if (!result) {
				$location.url('/app?google-auth-failed');
				return;
			}

			var tokenParam = result
				.split('&')
				.filter(function (str) {
					return str.indexOf('access_token') + 1;
				});

			if (tokenParam.length !== 1) {
				$location.url('/app?google-auth-failed');
				return;
			}

			var tokenArr = tokenParam[0].split('=');
			var token = tokenArr[1];
			if (!token) {
				$location.url('/app?google-auth-failed');
			}

			LocalStorageService.set('goog_tok', token);
			$location.url('/app');
		}

		function googleGetToken() {
			var token = LocalStorageService.get('goog_tok');
			if(!token) {
				authorizeGoogle();
			}

			return token;
		}
	}
