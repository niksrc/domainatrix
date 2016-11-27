angular
	.module('domx')
	.controller('AppCtrl', ['$window', 'AuthService', 'Zone', 'DigitaloceanService', 'Google', AppCtrl])

	function AppCtrl($window, AuthService, Zone, DigitaloceanService, Google) {
		var vm = this;
		vm.googleAuth = AuthService.google.authorize;
		vm.google = {};
		vm.google.status = 'Loading...';
		vm.verify = Google.verify
		vm.google.auth = true;
		Google
			.list()
			.then(function(data) {
				var items = data.data.items || {};
				vm.google.domainList = items
					.map(function (item) {
						return $window.decodeURIComponent(item.id);
					});
				vm.google.fetched = true;
				vm.google.status = 'Done';
			}, function (res) {
				if (res.status === 401) {
					vm.google.fetched = true;
					vm.google.status = 'Login with google to control';
					vm.google.auth = false;
				};
			})

		vm.checkIfVerified = function (domainName) {
			var isVerified = vm.google.domainList
				.filter(function (name) {
					return name.indexOf(domainName) !== -1;
				});

			return isVerified.length > 0;
		}

		vm.domains = [];

		vm.domainDetails = {
			name: '',
			ip: '',
			records: {
									root: '',
									subdomain: {
																name: '',
																ip: ''
									}
								}
			};

		// vm.domainRecordDetails = {
		// 	root: '',
		// 	subdomain: {
		// 		name: '',
		// 		ip: ''
		// 	}
		// };

		vm.droplets = {};
		vm.domainDetailsReq = {}

		DigitaloceanService.getAllDroplets().then( function(data) {
			vm.droplets = data.data.droplets;
			console.log(vm.droplets);
		}, function(error) {
			console.log(error);
		});

		DigitaloceanService.getAllDomains().then( function(data) {
			vm.domains = data.data.domains.map(function(domain){
				domain.zone = Zone.parse(domain.zone_file);
				return domain
			});
			console.log(vm.domains);
		}, function(error) {
			console.log('error is', error);
		});

		vm.deleteDomain = function(domainName, index) {
			DigitaloceanService.deleteDomain(domainName).then( function(data) {
				console.log(data);
				vm.domains.splice(index, 1);
			})
		}

		vm.createDomain = function(domainDetail) {
			var createDomainParams = {
				name: domainDetail.name,
				ip_address: domainDetail.ip.networks.v4[0].ip_address
			};

			DigitaloceanService.createDomain(createDomainParams).then(function(data) {
				var domainName = data.data.domain.name;
				vm.createARecord(domainDetail);
				vm.createCRecord(domainName, domainDetail);
			})
		}

		var createAnyRecord = function(type, name, data) {
			return {
				type: type,
				name: name,
				data: data,
			}
		}

		vm.createARecord = function(domainRecordDetail) {
			ARecordParams = createAnyRecord('A', domainRecordDetail.records.subdomain.name, domainRecordDetail.ip.networks.v4[0].ip_address );
			DigitaloceanService.createDomain(ARecordParams).then(function(data) {
				console.log(data);
			})
		}

		vm.createCRecord = function(domainName, domainRecordDetail) {
			CRecordParams = createAnyRecord('CNAME', domainRecordDetail.records.root, domainName+'.');
			DigitaloceanService.createDomain(CRecordParams).then(function(data) {
				console.log(data);
			})
		}

		vm.createTRecord = function(domainRecordDetail) {
			CRecordParams = createAnyRecord('TXT', '@', '');
			DigitaloceanService.createDomain(CRecordParams).then(function(data) {
				console.log(data);
			})
		}


	}

