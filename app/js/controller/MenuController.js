angular.module('MenuController', [])

.controller('MenuController', ['$rootScope','$scope', '$routeParams','$location','UsuarioDAO',
  
	function($rootScope,$scope,$routeParams,$location,$UsuarioDAO){
      
		$scope.init = function(){
			console.log("MenuController: init();");
		}

		$scope.logout = function(){
			console.log("MenuController: logout();");
			console.log($rootScope.model);
			$UsuarioDAO.logout().then(function(data){
				console.warn(data);
				if(data.result){
					$rootScope.model.logueado = false;
					console.log($rootScope.model);
					$location.path('/login');
				} else {
					alert(data.errores);
				}
			},function(errorData){
				console.error(errorData);
				$rootScope.model.logueado = false;
				$location.path('/login');
			})

		}

  }


])