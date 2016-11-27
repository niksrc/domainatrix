angular
	.module('domx')
	.service('DigitaloceanService', [
		'$http',
		'$location',
		'$httpParamSerializerJQLike',
		'LocalStorageService',
		'DOAuthCallback',
		'ClientId',
		'AuthService',
		DigitaloceanService
	]);

	function DigitaloceanService($http, $location, paramSerializer, LocalStorageService, DOAuthCallback, ClientId, AuthService) {

		var api = "https://api.digitalocean.com/v2";
		var apiEndPoint = {
			getAllDomains: '/domains',
			deleteDomain: '/domains/',
			createDomain: '/domains',
			createDomainRecords: '/createDomain/{domainName}/records',
			editDomainRecords: '/domains',
			getAllDroplets: '/droplets'
		};

		var token = AuthService.digitalOcean.getToken();
		var headers = {
			'Content-Type': 'application/json',
			'Authorization' : 'Bearer' + ' ' + token.toString()
		}

		function getAllDomains() {
			return $http
				.get(api + apiEndPoint.getAllDomains, {
					headers: headers
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				});
		}

		function deleteDomain(domainName) {
			return $http
				.delete(api + apiEndPoint.deleteDomain + domainName, {
					headers: headers
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				})
		}

		function createDomain(domainData) {
			return $http
				.post(api + apiEndPoint.createDomain, {
					headers: headers,
					data: domainData
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				})
		}

		function createDomainRecords(domainName, domainRecords) {
			return $http
				.post(api + apiEndPoint.createDomainRecords.replace('{domainName}', domainName), {
					headers: headers,
					data: domainRecords
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				})
		}

		function editDomainRecords(domainRecords, domainName, recordId) {
			return $http
				.post(api + apiEndPoint.editDomainRecords + domainName + '/records/' + recordId, {
					headers: headers,
					data: domainRecords
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				})
		}


		function getAllDroplets() {
			return $http
				.get(api + apiEndPoint.getAllDroplets, {
					headers: headers
				})
				.then(function(response) {
					return response;
				}, function(error) {
					console.log(error);
				});
		}

		return {
			getAllDomains : getAllDomains,
			deleteDomain : deleteDomain,
			createDomain : createDomain,
			createDomainRecords : createDomainRecords,
			getAllDroplets : getAllDroplets
		};
	}
