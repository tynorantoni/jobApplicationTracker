angular.module('appModule')
	.component('application', {
		templateUrl: 'app/appModule/application/application.component.html',
		controller: function(appService, $scope, $location, $timeout, responseService){
			var vm = this;
			vm.loading = 1;
			vm.applicationSelected = null;
			vm.createApplication = null;
			vm.upateApplication = null;
			vm.applications = [];
			
/******************************* show all responses, hide apps ***************************************/
			$scope.$on('viewResponses', function(){
//				console.log('click recieved')
//				$location.path('/responses');
				vm.showResponses();
			});
			
			vm.showResponses = function(){
				vm.hideApps = true;
			};
			
			
/******************************* refresh page ***************************************/
			var reload = function(){
				vm.loading = 1;
				vm.applicationSelected = null;
				appService.index().then(function(res){
					vm.applications = res.data;
					console.log(vm.applications)
					vm.loading = 0;
				})
				.catch(function(err) {
					$location.path('/login');
				});
			};
			
			reload();
			
/******************************* show create form ***************************************/
			$scope.$on('viewApps', function(){
				vm.createApplication = null;
				vm.hideApps = false;
			});
			
/******************************* show create form ***************************************/
			$scope.$on('create', function(){
				vm.setCreateApplication();
			});
			
			vm.setCreateApplication = function(){
				vm.applicationSelected = null;
				vm.createApplication = true;
				vm.hideApps = false;
			};
			
/******************************* show response creation form ***************************************/
			vm.viewResponseCreationForm = function(aid){
				
			};
			
/******************************* create new application ***************************************/
			vm.newApp = {};
			vm.newAppSubmit = function(newApp){
				vm.loading = 1;
				console.log(newApp);
				appService.create(newApp).then(function(res){
					console.log(res)
					vm.createApplication = null;
					reload();
				})
			}
			
/******************************* show update form ***************************************/
			vm.setUpateApplication = function(app){
				vm.updateApp = app;
				vm.updateApp.date = new Date(app.date);
				vm.upateApplication = true;
				console.log(vm.updateApp)
			};
			
/******************************* show update form ***************************************/
			vm.updateAppSubmit = function(app){
				vm.loading = 1;
				console.log(app);
				appService.update(app).then(function(res){
					console.log(res);
					vm.updateApplication = false;
					vm.loading = 0;
				})
			};
			
/******************************* Delete Application ***************************************/
			vm.deleteSelected = function(app){
				vm.loading = 1;
				console.log(app);
				appService.destroy(app).then(function(res){
					console.log(res);
					vm.loading = 0;
					reload();
				});
			};
			
/******************************* show detail view ***************************************/
			vm.setSelected = function(app){
				console.log(app)
				vm.applicationSelected = app;
			};
		},
		controllerAs: 'vm'
	});