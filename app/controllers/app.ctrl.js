angular
	.module('domx')
	.controller('AppCtrl', ['Zone', 'DigitaloceanService', AppCtrl])

	function AppCtrl(Zone, DigitaloceanService) {
		var vm = this;
		vm.domains = [];

		vm.domainDetails = {
			name: '',
			ip: '',
			subdomain: {
				name: '',
				ip: ''
			}
		};

		vm.droplets = {};

		vm.domainDetailsReq = function(domainDetails) {
			return {
				name: domainDetails.name,
				ip: domainDetails.ip.networks.v4[0].ip_address
			}
		}

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
			debugger
			DigitaloceanService.createDomain(domainDetail).then(function(data) {
				console.log(data);
			})
		}
	}

