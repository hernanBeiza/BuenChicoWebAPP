angular.module('ProductosController', [])

.controller('ProductosController', ['$rootScope','$scope', '$routeParams','$location','UsuarioDAO',
  
	function($rootScope,$scope,$routeParams,$location,$UsuarioDAO){
      
		$scope.init = function(){
			console.log("ProductosController: init();");
			console.log($rootScope.model);
		}

  }


])