angular
	.module('domx')
	.service('Google', ['DigitaloceanService', 'AuthService', '$http', Google])

	function Google(DigitaloceanService, AuthService, $http) {
		var apiURL = ' https://www.googleapis.com/siteVerification/v1';

		function getHeaders() {
			var token = AuthService.google.getToken();
			if (!token) {
				AuthService.google.authorize();
				return;
			}

			var headers = {
				'Authorization' : 'Bearer' + ' ' + token.toString(),
				'Content-Type': 'application/json',
			}
			return headers;
		}

		function get(id) {
			var headers = getHeaders();
			var requestURL = apiURL + '/webResource/' + id;
			return $http
				.get(requestURL, {
					headers: headers
				});
		}

		function list() {
			var headers = getHeaders();
			var requestURL = apiURL + '/webResource';
			return $http
				.get(requestURL, {
					headers: headers
				});
		}

		function getToken(domainName) {
			var headers = getHeaders();
			var requestURL = apiURL + '/token';

			var requestParams = {
				site: {
					type: 'INET_DOMAIN',
					identifier: domainName,
				},
				verificationMethod: 'DNS_TXT'
			}

			return $http({
				method: 'POST',
				url:requestURL,
				headers: headers,
				data: requestParams,
			});
		}

		function verifyAtGoogle() {
			var headers = getHeaders();
			var requestURL = apiURL + '/webResource/?verificationMethod=DNS_TXT';

			return $http({
				method: 'POST',
				url:requestURL,
				headers: headers,
				data: {
					verificationMethod: 'DNS_TXT'
				}
			});
		}

		function verify(domainName) {
			return getToken(domainName)
				.then(function (response) {
					var token = response.data.token;
					var txtRecord = {
						type: 'TXT',
						name: '@',
						data: token,
					};

					return DigitaloceanService.createDomainRecords(domainName, txtRecord);
				})
				.then(function () {
					return verifyAtGoogle();
				});
		}

		return {
			list: list,
			get: get,
			verify: verify,
			getVerificationToken: getToken,
		}
	}
